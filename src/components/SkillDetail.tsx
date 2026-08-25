import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReviewStatus, Skill, SourceAuthority } from '../types/skill';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';
import { getIndustry } from '../data/industries';
import { DEFAULT_DISCLAIMER } from '../data/disclaimer';
import { composePrompt } from '../data/safety';
import { getSkill } from '../data/skills';
import { downloadSkillJson, downloadSkillMarkdown } from '../lib/export';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  InfoIcon,
  ShieldIcon,
} from './Icons';

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
  onTagSelect: (tag: string) => void;
  onOpenSkill: (skill: Skill) => void;
}

/** Human labels for the source-authority tiers, ordered strongest first. */
const AUTHORITY_LABEL: Record<SourceAuthority, string> = {
  primary: 'Primary law',
  regulator: 'Regulator instrument',
  guidance: 'Guidance',
  secondary: 'Secondary',
};

const AUTHORITY_ORDER: SourceAuthority[] = ['primary', 'regulator', 'guidance', 'secondary'];

const REVIEW_LABEL: Record<ReviewStatus, string> = {
  unverified: 'Unverified',
  'community-reviewed': 'Community reviewed',
  'practitioner-reviewed': 'Practitioner reviewed',
};

const REVIEW_EXPLAINER: Record<ReviewStatus, string> = {
  unverified:
    'Drafted against the sources listed below, but not signed off by a lawyer qualified in this jurisdiction. Treat every legal proposition it produces as unconfirmed.',
  'community-reviewed':
    'Checked by a contributor with relevant knowledge, but not by a qualified practitioner. Still verify before relying on it.',
  'practitioner-reviewed':
    'Checked by a lawyer qualified in this jurisdiction as at the review date. Law changes — confirm currency before relying on it.',
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function SkillDetail({ skill, onClose, onTagSelect, onOpenSkill }: SkillDetailProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { copy, status } = useCopyToClipboard();

  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);
  const disclaimer = skill.disclaimer ?? DEFAULT_DISCLAIMER;

  // The prompt shown and copied is the composed one, so what a user reads on
  // screen is byte-for-byte what lands on their clipboard and in their exports.
  const fullPrompt = useMemo(() => composePrompt(skill), [skill]);

  const sortedSources = useMemo(
    () =>
      [...skill.sources].sort(
        (a, b) => AUTHORITY_ORDER.indexOf(a.authority) - AUTHORITY_ORDER.indexOf(b.authority),
      ),
    [skill.sources],
  );

  const related = useMemo(
    () => (skill.relatedSkills ?? []).map((id) => getSkill(id)).filter((s): s is Skill => !!s),
    [skill.relatedSkills],
  );

  // Escape closes; Tab is trapped inside the dialog while it is open.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Lock background scroll while the sheet is open, and restore focus on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove('no-scroll');
      previouslyFocused?.focus?.();
    };
  }, []);

  // Reset scroll when navigating between skills without unmounting the sheet.
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [skill.id]);

  const handleCopy = useCallback(() => {
    void copy(fullPrompt);
  }, [copy, fullPrompt]);

  const copyLabel =
    status === 'copied' ? 'Prompt copied' : status === 'error' ? 'Copy failed' : 'Copy prompt';

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-detail-title"
      >
        <header className="sheet__head">
          <div className="sheet__head-meta">
            <div className="sheet__pills">
              <span className="pill pill--jurisdiction">
                <span
                  className="pill__dot"
                  style={{ background: jurisdiction.color }}
                  aria-hidden
                />
                {jurisdiction.name}
              </span>
              <span className="pill">{category.name}</span>
              {skill.industries?.map((id) => (
                <span className="pill" key={id}>
                  {getIndustry(id).name}
                </span>
              ))}
            </div>
            <h2 className="sheet__title" id="skill-detail-title">
              {skill.name}
            </h2>
            <p className="sheet__subtitle">{skill.description}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="sheet__close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Provenance sits directly under the title, before any legal content,
            so a reader sees how much this skill has been checked before they
            read anything they might act on. */}
        <div className={`provenance provenance--${skill.reviewStatus}`}>
          <div className="provenance__row">
            <div className="provenance__item">
              <span className="provenance__label">Review status</span>
              <span className="provenance__value">
                <ShieldIcon size={13} />
                {REVIEW_LABEL[skill.reviewStatus]}
              </span>
            </div>
            <div className="provenance__item">
              <span className="provenance__label">Last reviewed</span>
              <span className="provenance__value">
                <time dateTime={skill.lastReviewed}>{formatDate(skill.lastReviewed)}</time>
              </span>
            </div>
            <div className="provenance__item">
              <span className="provenance__label">Version</span>
              <span className="provenance__value">v{skill.version}</span>
            </div>
            <div className="provenance__item">
              <span className="provenance__label">Sources</span>
              <span className="provenance__value">{skill.sources.length}</span>
            </div>
          </div>
          <p className="provenance__note">{REVIEW_EXPLAINER[skill.reviewStatus]}</p>
        </div>

        <div className="sheet__body" ref={bodyRef}>
          <section className="section">
            <h3 className="section__label">What this skill does</h3>
            <p className="section__text">{skill.whatItDoes}</p>
          </section>

          <section className="section">
            <h3 className="section__label">When to use it</h3>
            <p className="section__text">{skill.whenToUse}</p>
          </section>

          <section className="section">
            <h3 className="section__label">Inputs</h3>
            <div className="deflist">
              {skill.inputs.map((input) => (
                <div className="deflist__item" key={input.name}>
                  <div className="deflist__term">
                    {input.name}
                    {!input.required && <span className="deflist__optional">optional</span>}
                  </div>
                  <div className="deflist__desc">{input.description}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h3 className="section__label">Expected output</h3>
            <div className="deflist">
              {skill.outputs.map((output) => (
                <div className="deflist__item" key={output.name}>
                  <div className="deflist__term">{output.name}</div>
                  <div className="deflist__desc">{output.description}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h3 className="section__label">Prompt</h3>
            <div className="prompt">
              <div className="prompt__head">
                <span className="prompt__head-label">
                  Includes the shared legal-safety rules. Works with any LLM.
                </span>
                <button
                  type="button"
                  className={`btn btn--copy ${status === 'copied' ? 'btn--copied' : 'btn--secondary'}`}
                  onClick={handleCopy}
                >
                  {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
                  {status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy prompt'}
                </button>
              </div>
              <pre className="prompt__code">{fullPrompt}</pre>
            </div>
          </section>

          <section className="section">
            <h3 className="section__label">Example</h3>
            <div className="example">
              <div className="example__row">
                <div className="example__label">Scenario</div>
                <p className="example__text">{skill.example.scenario}</p>
              </div>
              <div className="example__row">
                <div className="example__label">What you get back</div>
                <p className="example__text">{skill.example.result}</p>
              </div>
            </div>
          </section>

          <section className="section">
            <h3 className="section__label">Sources</h3>
            <ul className="sources">
              {sortedSources.map((source) => (
                <li className="sources__item" key={source.citation}>
                  <div className="sources__head">
                    <span className={`authority authority--${source.authority}`}>
                      {AUTHORITY_LABEL[source.authority]}
                    </span>
                    <span className="sources__citation">{source.citation}</span>
                  </div>
                  {source.publisher && <div className="sources__publisher">{source.publisher}</div>}
                  {source.note && <p className="sources__note">{source.note}</p>}
                  {source.url && (
                    <a
                      className="sources__link"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {source.url.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p className="sources__caveat">
              Landing pages, not pinpoint citations. This catalogue deliberately does not publish
              section numbers or deep links it has not verified — locate the provision yourself and
              confirm it is current.
            </p>
          </section>

          <section className="section">
            <h3 className="section__label">Classification</h3>
            <div className="meta-grid">
              <div>
                <div className="meta-grid__item-label">Jurisdiction</div>
                <div className="meta-grid__item-value">{jurisdiction.name}</div>
                <div className="meta-grid__item-note">{jurisdiction.blurb}</div>
              </div>
              <div>
                <div className="meta-grid__item-label">Legal area</div>
                <div className="meta-grid__item-value">{category.name}</div>
                <div className="meta-grid__item-note">{category.blurb}</div>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="section">
              <h3 className="section__label">Works well with</h3>
              <div className="related">
                {related.map((r) => {
                  const rj = getJurisdiction(r.jurisdiction);
                  return (
                    <button
                      type="button"
                      className="related__item"
                      key={r.id}
                      onClick={() => onOpenSkill(r)}
                    >
                      <span className="related__name">{r.name}</span>
                      <span className="related__desc">{r.description}</span>
                      <span className="pill pill--jurisdiction">
                        <span className="pill__dot" style={{ background: rj.color }} aria-hidden />
                        {rj.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className="section">
            <h3 className="section__label">Tags</h3>
            <div className="tag-row">
              {skill.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="tag"
                  onClick={() => {
                    onTagSelect(tag);
                    onClose();
                  }}
                  title={`Filter by ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="disclaimer">
              <InfoIcon className="disclaimer__icon" />
              <p className="disclaimer__text">
                <strong>Not legal advice.</strong> {disclaimer}
              </p>
            </div>
          </section>
        </div>

        <footer className="sheet__foot">
          <button
            type="button"
            className={`btn ${status === 'copied' ? 'btn--copied' : 'btn--primary'}`}
            onClick={handleCopy}
          >
            {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
            {copyLabel}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => downloadSkillMarkdown(skill)}
            title="Agent Skills-compatible Markdown package"
          >
            <DownloadIcon />
            SKILL.md
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => downloadSkillJson(skill)}
            title="Machine-readable JSON export"
          >
            <DownloadIcon />
            JSON
          </button>
        </footer>
      </div>
    </div>
  );
}
