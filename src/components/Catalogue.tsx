import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { FacetId, Skill, SortId, ViewMode } from '../types/skill';
import type { SkillFilters } from '../hooks/useSkillFilters';
import { useDialog } from '../hooks/useDialog';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';
import { getIndustry } from '../data/industries';
import { WORKFLOW_LABELS } from '../data/tags';
import { FilterPanel } from './FilterPanel';
import { JurisdictionFlag } from './Flag';
import { SkillCard, SkillRow } from './SkillCard';
import {
  ChevronDownIcon,
  CloseIcon,
  FilterOffIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
  SlidersIcon,
} from './Icons';

const SORT_LABEL: Record<SortId, string> = {
  relevance: 'Relevance',
  name: 'Name A–Z',
  reviewed: 'Last reviewed',
};

/** Matches the CSS breakpoint at which the sidebar replaces the drawer. */
const DESKTOP = '(min-width: 1024px)';

interface CatalogueProps {
  api: SkillFilters;
  onOpen: (skill: Skill) => void;
}

export function Catalogue({ api, onOpen }: CatalogueProps) {
  const { filters, sort, results, total, activeCount, isFiltered, setQuery, setSort, clearFilters } =
    api;
  const [view, setView] = useState<ViewMode>(getInitialView);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('legal-skills:view', view);
    } catch {
      // Private browsing or blocked storage — the layout just won't persist.
    }
  }, [view]);

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

  // The drawer only exists below the desktop breakpoint; widening the window
  // past it closes the drawer so the scroll lock is not left behind.
  useEffect(() => {
    if (!drawerOpen) return;
    const mq = window.matchMedia(DESKTOP);
    const onChange = () => {
      if (mq.matches) setDrawerOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="catalogue__layout">
      <aside className="catalogue__sidebar" aria-label="Filters">
        <FilterPanel api={api} />
      </aside>

      <div className="catalogue__main">
        <div className="toolbar">
          <div className="search">
            <SearchIcon className="search__icon" />
            <input
              ref={inputRef}
              type="search"
              className="search__input"
              placeholder="Search skills, tags, prompts…"
              value={filters.query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search skills"
            />
            {filters.query ? (
              <button
                type="button"
                className="search__clear"
                onClick={() => {
                  setQuery('');
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

          <div className="toolbar__controls">
            <button
              type="button"
              className="btn btn--secondary toolbar__filters"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersIcon />
              Filters
              {activeCount > 0 && <span className="count-badge">{activeCount}</span>}
            </button>

            <div className="select">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                aria-label="Sort skills"
              >
                {(Object.keys(SORT_LABEL) as SortId[]).map((id) => (
                  <option key={id} value={id}>
                    {SORT_LABEL[id]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="select__chevron" />
            </div>

            <div className="view-toggle" role="group" aria-label="Layout">
              <button
                type="button"
                aria-pressed={view === 'grid'}
                aria-label="Grid view"
                title="Grid view"
                onClick={() => setView('grid')}
              >
                <GridIcon />
              </button>
              <button
                type="button"
                aria-pressed={view === 'list'}
                aria-label="List view"
                title="List view"
                onClick={() => setView('list')}
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="results-bar">
          <span role="status" aria-live="polite">
            Showing <strong>{results.length}</strong> of <strong>{total}</strong> skills
          </span>
          {isFiltered && (
            <button type="button" className="link-btn" onClick={clearFilters}>
              Reset all
            </button>
          )}
        </div>

        <ActiveFilters api={api} />

        {results.length === 0 ? (
          <div className="empty">
            <div className="empty__icon">
              <FilterOffIcon />
            </div>
            <p className="empty__title">No skills match those filters</p>
            <p className="empty__body">
              Try a broader search term, or clear the filters to see all {total} skills.
            </p>
            <button type="button" className="btn btn--primary" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid">
            {results.map(({ skill }) => (
              <SkillCard key={skill.id} skill={skill} onOpen={onOpen} />
            ))}
          </div>
        ) : (
          <div className="list">
            {results.map(({ skill }) => (
              <SkillRow key={skill.id} skill={skill} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>

      {drawerOpen && (
        <FilterDrawer api={api} onClose={closeDrawer} resultCount={results.length} />
      )}
    </div>
  );
}

/** The current selection as removable chips, so no filter is ever out of sight. */
function ActiveFilters({ api }: { api: SkillFilters }) {
  const { filters, toggle } = api;

  const chips: { facet: FacetId; value: string; label: string; icon?: ReactNode }[] = [
    ...filters.jurisdictions.map((id) => ({
      facet: 'jurisdictions' as const,
      value: id,
      label: getJurisdiction(id).name,
      icon: <JurisdictionFlag id={id} />,
    })),
    ...filters.categories.map((id) => ({
      facet: 'categories' as const,
      value: id,
      label: getCategory(id).name,
    })),
    ...filters.tasks.map((id) => ({
      facet: 'tasks' as const,
      value: id,
      label: WORKFLOW_LABELS[id],
    })),
    ...filters.industries.map((id) => ({
      facet: 'industries' as const,
      value: id,
      label: getIndustry(id).name,
    })),
    ...filters.tags.map((tag) => ({ facet: 'tags' as const, value: tag, label: `#${tag}` })),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="active-filters">
      {chips.map((chip) => (
        <button
          key={`${chip.facet}:${chip.value}`}
          type="button"
          className="active-chip"
          onClick={() => toggle(chip.facet, chip.value)}
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.icon}
          {chip.label}
          <CloseIcon size={12} />
        </button>
      ))}
    </div>
  );
}

interface FilterDrawerProps {
  api: SkillFilters;
  resultCount: number;
  onClose: () => void;
}

function FilterDrawer({ api, resultCount, onClose }: FilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(drawerRef, closeRef, onClose);

  return (
    <div
      className="overlay overlay--drawer"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        <header className="drawer__head">
          <h2 className="drawer__title" id="filter-drawer-title">
            Filters
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="sheet__close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="drawer__body">
          <FilterPanel api={api} showHeader={false} />
        </div>
        <footer className="drawer__foot">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={api.clearFilters}
            disabled={!api.isFiltered}
          >
            Clear all
          </button>
          <button type="button" className="btn btn--primary" onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? 'skill' : 'skills'}
          </button>
        </footer>
      </div>
    </div>
  );
}

function getInitialView(): ViewMode {
  try {
    const stored = localStorage.getItem('legal-skills:view');
    if (stored === 'grid' || stored === 'list') return stored;
  } catch {
    // Storage unavailable; fall back to the default.
  }
  return 'grid';
}
