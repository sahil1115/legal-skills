import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FacetId, FilterState, SortId } from '../types/skill';
import { skills } from '../data/skills';
import { jurisdictions } from '../data/jurisdictions';
import { categories } from '../data/categories';
import { industries } from '../data/industries';
import { WORKFLOW_TAGS } from '../data/tags';
import { applyFacets, buildIndex, facetCounts, matchQuery, sortResults } from '../lib/search';

const EMPTY: FilterState = {
  query: '',
  jurisdictions: [],
  categories: [],
  industries: [],
  tasks: [],
  tags: [],
};

const SORTS: SortId[] = ['relevance', 'name', 'reviewed'];

/** Query-string key for each facet. Short, readable and stable once shared. */
const PARAM: Record<FacetId, string> = {
  jurisdictions: 'jurisdiction',
  categories: 'area',
  industries: 'industry',
  tasks: 'task',
  tags: 'tag',
};

/** Every value a facet can legitimately hold, so a hand-edited URL cannot inject junk. */
const KNOWN: Record<FacetId, ReadonlySet<string>> = {
  jurisdictions: new Set(jurisdictions.map((j) => j.id)),
  categories: new Set(categories.map((c) => c.id)),
  industries: new Set(industries.map((i) => i.id)),
  tasks: new Set(WORKFLOW_TAGS),
  tags: new Set(skills.flatMap((s) => s.tags)),
};

const FACET_IDS = Object.keys(PARAM) as FacetId[];

/**
 * Filters live in the query string so a filtered view can be shared or
 * bookmarked. The free-text search is deliberately left out: anything typed
 * stays in the browser, and a query string is sent to the host on reload.
 */
function readUrl(): { filters: FilterState; sort: SortId } {
  const params = new URLSearchParams(window.location.search);
  const read = (facet: FacetId) => [
    ...new Set((params.get(PARAM[facet]) ?? '').split(',').filter((v) => KNOWN[facet].has(v))),
  ];
  const facets = Object.fromEntries(FACET_IDS.map((f) => [f, read(f)])) as Pick<
    FilterState,
    FacetId
  >;
  const sort = params.get('sort') as SortId | null;
  return {
    filters: { ...EMPTY, ...facets },
    sort: sort && SORTS.includes(sort) ? sort : 'relevance',
  };
}

function writeUrl(filters: FilterState, sort: SortId) {
  const parts: string[] = [];
  for (const facet of FACET_IDS) {
    const values = filters[facet] as string[];
    if (values.length > 0) parts.push(`${PARAM[facet]}=${values.map(encodeURIComponent).join(',')}`);
  }
  if (sort !== 'relevance') parts.push(`sort=${sort}`);

  const url =
    window.location.pathname + (parts.length ? `?${parts.join('&')}` : '') + window.location.hash;
  if (url !== window.location.pathname + window.location.search + window.location.hash) {
    // Keep the entry's state: the skill route stores its history marker there.
    window.history.replaceState(window.history.state, '', url);
  }
}

/**
 * Owns all filter state and derives the visible skill list from it. Kept in one
 * hook so the filter UI and the grid never disagree about what is showing.
 */
export function useSkillFilters() {
  const [initial] = useState(readUrl);
  const [filters, setFilters] = useState<FilterState>(initial.filters);
  const [sort, setSort] = useState<SortId>(initial.sort);

  // The corpus is static, so the index is built once for the app's lifetime.
  const index = useMemo(() => buildIndex(skills), []);

  const matched = useMemo(() => matchQuery(index, filters.query), [index, filters.query]);
  const results = useMemo(
    () => sortResults(applyFacets(matched, filters), sort),
    [matched, filters, sort],
  );
  const counts = useMemo(() => facetCounts(matched, filters), [matched, filters]);

  // The URL mirrors the filters; it never drives them after the first load.
  const latest = useRef({ filters, sort });
  useEffect(() => {
    latest.current = { filters, sort };
    writeUrl(filters, sort);
  }, [filters, sort]);

  // Opening a skill pushes a history entry, and closing it goes Back to the
  // entry before — which predates any filter picked inside the sheet (a tag,
  // say). Re-mirror onto whichever entry Back or Forward lands on.
  useEffect(() => {
    const sync = () => writeUrl(latest.current.filters, latest.current.sort);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const setQuery = useCallback((query: string) => {
    setFilters((f) => ({ ...f, query }));
  }, []);

  const toggle = useCallback((facet: FacetId, value: string) => {
    setFilters((f) => {
      const current = f[facet] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...f, [facet]: next };
    });
  }, []);

  const clearFacet = useCallback((facet: FacetId) => {
    setFilters((f) => ({ ...f, [facet]: [] }));
  }, []);

  const clearFilters = useCallback(() => setFilters(EMPTY), []);

  const activeCount = FACET_IDS.reduce((n, facet) => n + filters[facet].length, 0);
  const isFiltered = filters.query.trim() !== '' || activeCount > 0;

  return {
    filters,
    sort,
    results,
    counts,
    total: skills.length,
    activeCount,
    isFiltered,
    setQuery,
    setSort,
    toggle,
    clearFacet,
    clearFilters,
  };
}

export type SkillFilters = ReturnType<typeof useSkillFilters>;
