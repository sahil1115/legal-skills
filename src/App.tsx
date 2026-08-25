import { useCallback, useEffect, useState } from 'react';
import type { TabId } from './types/skill';
import { skills } from './data/skills';
import { jurisdictions } from './data/jurisdictions';
import { categories } from './data/categories';
import { useSkillFilters } from './hooks/useSkillFilters';
import { useSkillRoute } from './hooks/useSkillRoute';
import { FilterBar } from './components/FilterBar';
import { SkillCard } from './components/SkillCard';
import { SkillDetail } from './components/SkillDetail';
import { RoadmapPanel } from './components/RoadmapPanel';
import { AGENT_ITEMS, CONNECTOR_ITEMS } from './data/roadmap';
import {
  AgentIcon,
  ConnectorIcon,
  FilterOffIcon,
  GithubIcon,
  MoonIcon,
  ScaleIcon,
  SkillIcon,
  SunIcon,
} from './components/Icons';
import { REPO_URL } from './config';

const TABS: { id: TabId; label: string; count: number | null }[] = [
  { id: 'agents', label: 'Agents', count: null },
  { id: 'skills', label: 'Skills', count: skills.length },
  { id: 'connectors', label: 'Connectors', count: null },
];

const activeCategories = categories.filter((c) => skills.some((s) => s.category === c.id));

export default function App() {
  const [tab, setTab] = useState<TabId>('skills');
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // The URL owns which skill is open, so Back/Forward stay in sync.
  const { openSkill, open: handleOpen, close: handleClose } = useSkillRoute();

  const {
    filters,
    results,
    tags,
    total,
    isFiltered,
    setQuery,
    setJurisdiction,
    setCategory,
    setIndustry,
    toggleTag,
    clearFilters,
  } = useSkillFilters();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('legal-skills:theme', theme);
    } catch {
      // Private browsing or blocked storage — the theme just won't persist.
    }
  }, [theme]);

  const handleTagSelect = useCallback(
    (tag: string) => {
      if (!filters.tags.includes(tag)) toggleTag(tag);
      setTab('skills');
    },
    [filters.tags, toggleTag],
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="shell topbar__inner">
          <div className="brand">
            <span className="brand__mark">
              <ScaleIcon size={17} />
            </span>
            Legal Skills
          </div>
          <div className="topbar__actions">
            <button
              type="button"
              className="ghost-btn ghost-btn--icon"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              className="ghost-btn"
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              style={{ textDecoration: 'none' }}
            >
              <GithubIcon />
              <span className="ghost-btn__label">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="shell">
          <section className="hero">
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden />
              Free and open source · No sign-up · Nothing leaves your browser
            </span>
            <h1 className="hero__title">
              Reusable legal skills for
              <br />
              the AI tools you already use.
            </h1>
            <p className="hero__lede">
              A catalogue of structured prompts for legal work — contract review, privacy operations,
              employment, regulatory and litigation tasks — written for specific jurisdictions and
              designed to be copied into any model. Browse, search, copy, run it wherever you like.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">{skills.length}</span>
                <span className="hero__stat-label">skills</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">{jurisdictions.length}</span>
                <span className="hero__stat-label">jurisdictions</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">{activeCategories.length}</span>
                <span className="hero__stat-label">practice areas</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">0</span>
                <span className="hero__stat-label">accounts required</span>
              </div>
            </div>
          </section>

          <section className="workspace">
            <div className="workspace__head">
              <div className="workspace__icon">
                <ScaleIcon size={22} />
              </div>
              <div className="workspace__meta">
                <div className="workspace__title">
                  Legal
                  <span className="badge badge--accent">Workspace</span>
                </div>
                <p className="workspace__desc">
                  Skills, agents and connectors for legal, compliance and legal operations teams.
                </p>
              </div>
            </div>

            <div className="tabs" role="tablist" aria-label="Workspace sections">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {t.id === 'agents' && <AgentIcon size={15} />}
                  {t.id === 'skills' && <SkillIcon size={15} />}
                  {t.id === 'connectors' && <ConnectorIcon size={15} />}
                  {t.label}
                  {t.count !== null && <span className="tab__count">{t.count}</span>}
                </button>
              ))}
            </div>

            {tab === 'skills' && (
              <>
                <FilterBar
                  filters={filters}
                  tags={tags}
                  isFiltered={isFiltered}
                  onQueryChange={setQuery}
                  onJurisdictionChange={setJurisdiction}
                  onCategoryChange={setCategory}
                  onIndustryChange={setIndustry}
                  onTagToggle={toggleTag}
                  onClear={clearFilters}
                />

                <div className="results-bar" role="status" aria-live="polite">
                  <span>
                    Showing <strong>{results.length}</strong> of <strong>{total}</strong> skills
                    {filters.jurisdiction !== 'all' &&
                      ` in ${jurisdictions.find((j) => j.id === filters.jurisdiction)?.name}`}
                  </span>
                </div>

                {results.length > 0 ? (
                  <div className="grid">
                    {results.map(({ skill }) => (
                      <SkillCard key={skill.id} skill={skill} onOpen={handleOpen} />
                    ))}
                  </div>
                ) : (
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
                )}
              </>
            )}

            {tab === 'agents' && (
              <RoadmapPanel
                icon={<AgentIcon size={18} />}
                title="Agents"
                body="Agents will chain several skills into an end-to-end workflow that runs with less hand-holding — taking a document in at one end and returning a reviewed, cited work product at the other. The catalogue below sketches where this is heading."
                items={AGENT_ITEMS}
              />
            )}

            {tab === 'connectors' && (
              <RoadmapPanel
                icon={<ConnectorIcon size={18} />}
                title="Connectors"
                body="Connectors will let a skill read from where your documents already live instead of relying on copy and paste. Any connector added here will be opt-in and configured locally — the project's default remains that nothing leaves your browser."
                items={CONNECTOR_ITEMS}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <p className="footer__note">
            <strong>Legal Skills is not a law firm and does not give legal advice.</strong> Every
            skill here produces AI-assisted research and drafting support that must be reviewed by a
            qualified lawyer in the relevant jurisdiction before you rely on it. The app is entirely
            client-side: no accounts, no tracking, no API keys, and nothing you type is sent
            anywhere.
          </p>
          <nav className="footer__links">
            <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer noopener">
              Contribute a skill
            </a>
            <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer noopener">
              Report an issue
            </a>
            <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer noopener">
              MIT License
            </a>
            <a href={`${REPO_URL}/blob/main/DISCLAIMER.md`} target="_blank" rel="noreferrer noopener">
              Disclaimer
            </a>
          </nav>
        </div>
      </footer>

      {openSkill && (
        <SkillDetail
          skill={openSkill}
          onClose={handleClose}
          onTagSelect={handleTagSelect}
          onOpenSkill={handleOpen}
        />
      )}
    </div>
  );
}

function getInitialTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem('legal-skills:theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Storage unavailable; fall through to the system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
