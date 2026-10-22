import { useMemo, useState, type ReactNode } from 'react';
import type { FacetId } from '../types/skill';
import type { SkillFilters } from '../hooks/useSkillFilters';
import { skills } from '../data/skills';
import { jurisdictions } from '../data/jurisdictions';
import { categories } from '../data/categories';
import { industries } from '../data/industries';
import { WORKFLOW_LABELS, WORKFLOW_TAGS } from '../data/tags';
import { JurisdictionFlag } from './Flag';
import { CategoryIcon, CheckIcon, ChevronDownIcon, SearchIcon } from './Icons';

/** How many tag chips to show before the "show all" toggle. */
const TAG_PREVIEW = 12;

interface FacetOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface FacetGroupConfig {
  facet: Exclude<FacetId, 'tags'>;
  title: string;
  hint?: string;
  options: FacetOption[];
}

/**
 * The checkbox facets, in display order. A value no skill uses at all is left
 * out rather than offered as a dead option, so it is safe to declare a category
 * or industry ahead of the skills that will use it.
 */
const GROUPS: FacetGroupConfig[] = [
  {
    facet: 'jurisdictions',
    title: 'Jurisdiction',
    options: jurisdictions
      .filter((j) => skills.some((s) => s.jurisdiction === j.id))
      .map((j) => ({ value: j.id, label: j.name, icon: <JurisdictionFlag id={j.id} size={16} /> })),
  },
  {
    facet: 'categories',
    title: 'Practice area',
    options: categories
      .filter((c) => skills.some((s) => s.category === c.id))
      .map((c) => ({ value: c.id, label: c.name, icon: <CategoryIcon id={c.id} size={15} /> })),
  },
  {
    facet: 'tasks',
    title: 'Task type',
    options: WORKFLOW_TAGS.filter((t) => skills.some((s) => s.tags.includes(t))).map((t) => ({
      value: t,
      label: WORKFLOW_LABELS[t],
    })),
  },
  {
    facet: 'industries',
    title: 'Industry',
    hint: 'Skills that apply to every industry are always included.',
    options: industries
      .filter((i) => skills.some((s) => s.industries?.includes(i.id)))
      .map((i) => ({ value: i.id, label: i.name })),
  },
];

interface FilterPanelProps {
  api: SkillFilters;
  /** The drawer supplies its own title bar, so the panel's is optional. */
  showHeader?: boolean;
}

export function FilterPanel({ api, showHeader = true }: FilterPanelProps) {
  const { filters, counts, activeCount, toggle, clearFacet, clearFilters } = api;

  return (
    <div className="facets">
      {showHeader && (
        <div className="facets__head">
          <span className="facets__title">Filters</span>
          {activeCount > 0 && (
            <button type="button" className="link-btn" onClick={clearFilters}>
              Clear all
            </button>
          )}
        </div>
      )}

      {GROUPS.map((group) => {
        const selected = filters[group.facet] as string[];
        return (
          <FacetGroup
            key={group.facet}
            title={group.title}
            selectedCount={selected.length}
            onClear={() => clearFacet(group.facet)}
          >
            <div className="facet__options">
              {group.options.map((option) => {
                const checked = selected.includes(option.value);
                const count = counts[group.facet].get(option.value) ?? 0;
                return (
                  <label
                    key={option.value}
                    className="facet__option"
                    data-empty={count === 0 && !checked ? '' : undefined}
                  >
                    <input
                      type="checkbox"
                      className="facet__input"
                      checked={checked}
                      disabled={count === 0 && !checked}
                      onChange={() => toggle(group.facet, option.value)}
                    />
                    <span className="facet__box" aria-hidden>
                      <CheckIcon size={11} />
                    </span>
                    {option.icon && <span className="facet__icon">{option.icon}</span>}
                    <span className="facet__label">{option.label}</span>
                    <span className="facet__count">{count}</span>
                  </label>
                );
              })}
            </div>
            {group.hint && <p className="facet__hint">{group.hint}</p>}
          </FacetGroup>
        );
      })}

      <TagFacet
        counts={counts.tags}
        selected={filters.tags}
        onToggle={(tag) => toggle('tags', tag)}
        onClear={() => clearFacet('tags')}
      />
    </div>
  );
}

interface FacetGroupProps {
  title: string;
  selectedCount: number;
  onClear: () => void;
  children: ReactNode;
}

function FacetGroup({ title, selectedCount, onClear, children }: FacetGroupProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="facet">
      <div className="facet__head">
        <button
          type="button"
          className="facet__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {title}
          {selectedCount > 0 && <span className="facet__badge">{selectedCount}</span>}
          <ChevronDownIcon className="facet__chevron" />
        </button>
        {selectedCount > 0 && (
          <button type="button" className="link-btn" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      {open && <div className="facet__body">{children}</div>}
    </section>
  );
}

interface TagFacetProps {
  counts: Map<string, number>;
  selected: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}

function TagFacet({ counts, selected, onToggle, onClear }: TagFacetProps) {
  const [showAll, setShowAll] = useState(false);
  const [find, setFind] = useState('');

  const all = useMemo(() => {
    const list = [...counts.entries()].map(([tag, count]) => ({ tag, count }));
    // A selected tag stays listed even when nothing matches, so it can be undone.
    for (const tag of selected) if (!counts.has(tag)) list.push({ tag, count: 0 });
    return list.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [counts, selected]);

  const needle = find.trim().toLowerCase();
  const pool = needle ? all.filter((t) => t.tag.includes(needle)) : all;
  // Selected tags stay visible even when collapsed, so a filter is never hidden.
  const visible =
    showAll || needle
      ? pool
      : [
          ...pool.slice(0, TAG_PREVIEW),
          ...pool.slice(TAG_PREVIEW).filter((t) => selected.includes(t.tag)),
        ];

  return (
    <FacetGroup title="Tags" selectedCount={selected.length} onClear={onClear}>
      <div className="facet__find">
        <SearchIcon size={14} className="facet__find-icon" />
        <input
          type="search"
          className="facet__find-input"
          placeholder={`Find among ${all.length} tags`}
          value={find}
          onChange={(e) => setFind(e.target.value)}
          aria-label="Find a tag"
        />
      </div>
      <div className="facet__tags">
        {visible.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            className="chip"
            aria-pressed={selected.includes(tag)}
            onClick={() => onToggle(tag)}
          >
            {tag}
            <span className="chip__count">{count}</span>
          </button>
        ))}
        {visible.length === 0 && <p className="facet__hint">No tags match “{find}”.</p>}
      </div>
      {!needle && pool.length > TAG_PREVIEW && (
        <button type="button" className="link-btn facet__more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? 'Show fewer' : `Show all ${pool.length}`}
        </button>
      )}
    </FacetGroup>
  );
}
