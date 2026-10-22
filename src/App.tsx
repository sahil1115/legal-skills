import { useCallback, useEffect, useRef, useState } from 'react';
import type { TabId } from './types/skill';
import { skills } from './data/skills';
import { jurisdictions } from './data/jurisdictions';
import { categories } from './data/categories';
import { isWorkflowTag } from './data/tags';
import { useSkillFilters } from './hooks/useSkillFilters';
import { useSkillRoute } from './hooks/useSkillRoute';
import { Catalogue } from './components/Catalogue';
import { SkillDetail } from './components/SkillDetail';
import { SkillShowcase } from './components/SkillShowcase';
import { RoadmapPanel } from './components/RoadmapPanel';
import { AGENT_ITEMS, CONNECTOR_ITEMS } from './data/roadmap';
import {
  AgentIcon,
  ArrowDownIcon,
  ConnectorIcon,
  GithubIcon,
  MoonIcon,
  ScaleIcon,
  SkillIcon,
  SunIcon,
} from './components/Icons';
import { REPO_URL } from './config';
import {
  initAnalytics,
  trackOutboundLink,
  trackPageView,
  trackSkillViewed,
} from './lib/analytics';

const TABS: { id: TabId; label: string; count: number | null }[] = [
  { id: 'skills', label: 'Skills', count: skills.length },
  { id: 'agents', label: 'Agents', count: null },
  { id: 'connectors', label: 'Connectors', count: null },
];

const activeCategories = categories.filter((c) => skills.some((s) => s.category === c.id));

export default function App() {
  const [tab, setTab] = useState<TabId>('skills');
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const catalogueRef = useRef<HTMLElement>(null);

  // The URL owns which skill is open, so Back/Forward stay in sync.
  const { openSkill, open: handleOpen, close: handleClose } = useSkillRoute();

  const filterApi = useSkillFilters();
  const { filters, toggle } = filterApi;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('legal-skills:theme', theme);
    } catch {
      // Private browsing or blocked storage — the theme just won't persist.
    }
  }, [theme]);

  // Analytics: no-ops entirely unless VITE_GOATCOUNTER_CODE is configured.
  // `initAnalytics` is idempotent, so StrictMode's double-invoked effect in
  // development cannot load the script or register pageviews twice.
  useEffect(() => {
    initAnalytics();
  }, []);

  // One pageview per navigation. The skill route is the only thing that changes
  // the URL, so opening a skill, moving between skills and returning to the
  // catalogue each register — rather than the whole app counting as one page.
  //
  // Each skill has its own hash URL, so its pageview *is* the "skill viewed"
  // record and shows up as a distinct path in the dashboard. The ref guard
  // means this fires once per actual navigation, never once per render.
  const lastPageKey = useRef<string | null>(null);
  useEffect(() => {
    const key = openSkill?.id ?? '';
    if (lastPageKey.current === key) return;
    lastPageKey.current = key;
    if (openSkill) trackSkillViewed(openSkill);
    else trackPageView();
  }, [openSkill]);

  // Not a hash link: the hash is the skill route, and "#catalogue" would be
  // read as a skill id.
  const scrollToCatalogue = useCallback(() => {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // A tag picked inside the sheet filters the catalogue. The scroll waits for
  // the sheet to close, because closing restores focus to wherever the sheet
  // was opened from — possibly the hero — and that would scroll back up.
  const scrollOnClose = useRef(false);
  useEffect(() => {
    if (!openSkill && scrollOnClose.current) {
      scrollOnClose.current = false;
      scrollToCatalogue();
    }
  }, [openSkill, scrollToCatalogue]);

  const handleTagSelect = useCallback(
    (tag: string) => {
      // Workflow tags have their own "Task type" facet.
      const facet = isWorkflowTag(tag) ? 'tasks' : 'tags';
      if (!(filters[facet] as string[]).includes(tag)) toggle(facet, tag);
      setTab('skills');
      scrollOnClose.current = true;
    },
    [filters, toggle],
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
              onClick={() => trackOutboundLink('github-repo')}
            >
              <GithubIcon />
              <span className="ghost-btn__label">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="shell hero__inner">
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
            <div className="hero__actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={scrollToCatalogue}>
                Browse {skills.length} skills
                <ArrowDownIcon />
              </button>
              <a
                className="btn btn--secondary btn--lg"
                href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackOutboundLink('github-contributing')}
              >
                <GithubIcon />
                Contribute a skill
              </a>
            </div>
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
          </div>

          <SkillShowcase onOpen={handleOpen} />
        </section>

        <section
          className="catalogue"
          ref={catalogueRef}
          aria-labelledby="catalogue-title"
        >
          <div className="shell">
            <div className="catalogue__head">
              <div>
                <h2 className="catalogue__title" id="catalogue-title">
                  Skills for every legal need
                </h2>
                <p className="catalogue__lede">
                  Filter by jurisdiction, practice area, task type and industry, or search
                  everything — names, tags and the prompts themselves.
                </p>
              </div>

              <div className="segmented" role="tablist" aria-label="Library sections">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    className="segmented__item"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                  >
                    {t.id === 'agents' && <AgentIcon size={15} />}
                    {t.id === 'skills' && <SkillIcon size={15} />}
                    {t.id === 'connectors' && <ConnectorIcon size={15} />}
                    {t.label}
                    {t.count !== null ? (
                      <span className="segmented__count">{t.count}</span>
                    ) : (
                      <span className="segmented__soon">Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {tab === 'skills' && <Catalogue api={filterApi} onOpen={handleOpen} />}

            {tab === 'agents' && (
              <div className="panel">
                <RoadmapPanel
                  icon={<AgentIcon size={18} />}
                  title="Agents"
                  body="Agents will chain several skills into an end-to-end workflow that runs with less hand-holding — taking a document in at one end and returning a reviewed, cited work product at the other. The catalogue below sketches where this is heading."
                  items={AGENT_ITEMS}
                />
              </div>
            )}

            {tab === 'connectors' && (
              <div className="panel">
                <RoadmapPanel
                  icon={<ConnectorIcon size={18} />}
                  title="Connectors"
                  body="Connectors will let a skill read from where your documents already live instead of relying on copy and paste. Any connector added here will be opt-in and configured locally — the project's default remains that nothing leaves your browser."
                  items={CONNECTOR_ITEMS}
                />
              </div>
            )}
          </div>
        </section>
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
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackOutboundLink('github-repo')}
            >
              GitHub
            </a>
            <a
              href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackOutboundLink('github-contributing')}
            >
              Contribute a skill
            </a>
            <a
              href={`${REPO_URL}/issues`}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackOutboundLink('github-issues')}
            >
              Report an issue
            </a>
            <a
              href={`${REPO_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackOutboundLink('github-license')}
            >
              MIT License
            </a>
            <a
              href={`${REPO_URL}/blob/main/DISCLAIMER.md`}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackOutboundLink('github-disclaimer')}
            >
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
