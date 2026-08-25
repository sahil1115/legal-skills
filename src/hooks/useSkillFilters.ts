import { useCallback, useMemo, useState } from 'react';
import type { CategoryId, FilterState, JurisdictionId } from '../types/skill';
import { skills } from '../data/skills';
import { availableTags, buildIndex, searchSkills } from '../lib/search';

const EMPTY: FilterState = { query: '', jurisdiction: 'all', category: 'all', tags: [] };

/**
 * Owns all filter state and derives the visible skill list from it. Kept in one
 * hook so the filter UI and the grid never disagree about what is showing.
 */
export function useSkillFilters() {
  const [filters, setFilters] = useState<FilterState>(EMPTY);

  // The corpus is static, so the index is built once for the app's lifetime.
  const index = useMemo(() => buildIndex(skills), []);

  const results = useMemo(() => searchSkills(index, filters), [index, filters]);
  const tags = useMemo(() => availableTags(results), [results]);

  const setQuery = useCallback((query: string) => {
    setFilters((f) => ({ ...f, query }));
  }, []);

  const setJurisdiction = useCallback((jurisdiction: JurisdictionId | 'all') => {
    setFilters((f) => ({ ...f, jurisdiction }));
  }, []);

  const setCategory = useCallback((category: CategoryId | 'all') => {
    setFilters((f) => ({ ...f, category }));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilters((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  }, []);

  const clearFilters = useCallback(() => setFilters(EMPTY), []);

  const isFiltered =
    filters.query !== '' ||
    filters.jurisdiction !== 'all' ||
    filters.category !== 'all' ||
    filters.tags.length > 0;

  return {
    filters,
    results,
    tags,
    total: skills.length,
    isFiltered,
    setQuery,
    setJurisdiction,
    setCategory,
    toggleTag,
    clearFilters,
  };
}
