import { useCallback, useEffect, useRef } from 'react';
import type { Skill } from '../types/skill';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';
import { DEFAULT_DISCLAIMER } from '../data/disclaimer';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CheckIcon, CloseIcon, CopyIcon, InfoIcon } from './Icons';

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
  onTagSelect: (tag: string) => void;
}

export function SkillDetail({ skill, onClose, onTagSelect }: SkillDetailProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { copy, status } = useCopyToClipboard();

  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);
  const disclaimer = skill.disclaimer ?? DEFAULT_DISCLAIMER;

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

  // Reset the scroll position when navigating between skills without unmounting.
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [skill.id]);

  const handleCopy = useCallback(() => {
    void copy(skill.prompt);
  }, [copy, skill.prompt]);

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
                  Works with any LLM — paste into Claude, ChatGPT, Gemini, Cursor or your own tooling.
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
              <pre className="prompt__code">{skill.prompt}</pre>
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
            {status === 'copied' ? 'Prompt copied' : status === 'error' ? 'Copy failed' : 'Copy prompt'}
          </button>
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
