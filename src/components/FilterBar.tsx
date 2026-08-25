import { useEffect, useRef, useState } from 'react';
import type { CategoryId, FilterState, JurisdictionId } from '../types/skill';
import { jurisdictions } from '../data/jurisdictions';
import { categories } from '../data/categories';
import { countsByCategory, countsByJurisdiction } from '../data/skills';
import { ChevronDownIcon, CloseIcon, SearchIcon } from './Icons';

/** How many tag chips to show before the "show all" toggle. */
const TAG_PREVIEW = 12;

interface FilterBarProps {
  filters: FilterState;
  tags: { tag: string; count: number }[];
  isFiltered: boolean;
  onQueryChange: (q: string) => void;
  onJurisdictionChange: (j: JurisdictionId | 'all') => void;
  onCategoryChange: (c: CategoryId | 'all') => void;
  onTagToggle: (tag: string) => void;
  onClear: () => void;
}

export function FilterBar({
  filters,
  tags,
  isFiltered,
  onQueryChange,
  onJurisdictionChange,
  onCategoryChange,
  onTagToggle,
  onClear,
}: FilterBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  // "/" focuses search, the way most catalogue UIs behave. Ignored while the
  // user is already typing somewhere, so it never eats a literal slash.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      if (el instanceof HTMLElement && el.isContentEditable) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Selected tags stay visible even when collapsed, so a filter is never hidden.
  const visibleTags = showAllTags
    ? tags
    : [
        ...tags.slice(0, TAG_PREVIEW),
        ...tags.slice(TAG_PREVIEW).filter((t) => filters.tags.includes(t.tag)),
      ];

  return (
    <div className="filters">
      <div className="filters__row">
        <div className="search">
          <SearchIcon className="search__icon" />
          <input
            ref={inputRef}
            type="search"
            className="search__input"
            placeholder="Search skills, tags, prompts…"
            value={filters.query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search skills"
          />
          {filters.query ? (
            <button
              type="button"
              className="search__clear"
              onClick={() => {
                onQueryChange('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <CloseIcon size={15} />
            </button>
          ) : (
            <span className="search__kbd" aria-hidden>
              <kbd>/</kbd>
            </span>
          )}
        </div>

        <div className="select">
          <select
            value={filters.jurisdiction}
            onChange={(e) => onJurisdictionChange(e.target.value as JurisdictionId | 'all')}
            aria-label="Filter by jurisdiction"
          >
            <option value="all">All jurisdictions</option>
            {jurisdictions.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name} ({countsByJurisdiction[j.id] ?? 0})
              </option>
            ))}
          </select>
          <ChevronDownIcon className="select__chevron" />
        </div>

        <div className="select">
          <select
            value={filters.category}
            onChange={(e) => onCategoryChange(e.target.value as CategoryId | 'all')}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories
              .filter((c) => (countsByCategory[c.id] ?? 0) > 0)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({countsByCategory[c.id]})
                </option>
              ))}
          </select>
          <ChevronDownIcon className="select__chevron" />
        </div>

        {isFiltered && (
          <button type="button" className="filters__clear" onClick={onClear}>
            <CloseIcon size={14} />
            Clear filters
          </button>
        )}
      </div>

      {visibleTags.length > 0 && (
        <div className="filters__tags">
          <span className="filters__tags-label">Tags</span>
          {visibleTags.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              className="chip"
              aria-pressed={filters.tags.includes(tag)}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              <span className="chip__count">{count}</span>
            </button>
          ))}
          {tags.length > TAG_PREVIEW && (
            <button
              type="button"
              className="filters__more"
              onClick={() => setShowAllTags((v) => !v)}
            >
              {showAllTags ? 'Show fewer' : `+${tags.length - TAG_PREVIEW} more`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
