import type { Skill } from '../types/skill';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';
import { WORKFLOW_LABELS, primaryTask } from '../data/tags';
import { JurisdictionFlag } from './Flag';
import { ArrowRightIcon, CategoryIcon, TaskIcon } from './Icons';

interface SkillCardProps {
  skill: Skill;
  onOpen: (skill: Skill) => void;
  /**
   * `showcase` is the decorative marquee in the hero: no description, and kept
   * out of the tab order because every skill is reachable in the catalogue.
   */
  variant?: 'grid' | 'showcase';
}

export function SkillCard({ skill, onOpen, variant = 'grid' }: SkillCardProps) {
  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);
  const task = primaryTask(skill.tags);
  const showcase = variant === 'showcase';

  return (
    <button
      type="button"
      className={`card card--${variant}`}
      onClick={() => onOpen(skill)}
      aria-label={showcase ? undefined : `Open ${skill.name}`}
      tabIndex={showcase ? -1 : undefined}
      // A showcase card must not take focus on click: it sits in an
      // aria-hidden region, and the sheet restores focus to it on close.
      onMouseDown={showcase ? (e) => e.preventDefault() : undefined}
    >
      <span className="card__top">
        <span className="card__icon">
          <CategoryIcon id={skill.category} size={16} />
        </span>
        <span className="card__chips">
          <span className="meta-chip">{category.name}</span>
          <span className="meta-chip" title={jurisdiction.name}>
            <JurisdictionFlag id={skill.jurisdiction} />
            {jurisdiction.short}
          </span>
        </span>
      </span>

      <span className="card__body">
        <span className="card__name">{skill.name}</span>
        {!showcase && <span className="card__desc">{skill.description}</span>}
      </span>

      <span className="card__foot">
        {task && (
          <span className="card__task">
            <TaskIcon />
            {WORKFLOW_LABELS[task]}
          </span>
        )}
        {!showcase && <ArrowRightIcon size={15} className="card__arrow" />}
      </span>
    </button>
  );
}

/** Dense single-line layout for the list view. */
export function SkillRow({ skill, onOpen }: Omit<SkillCardProps, 'variant'>) {
  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);
  const task = primaryTask(skill.tags);

  return (
    <button
      type="button"
      className="row"
      onClick={() => onOpen(skill)}
      aria-label={`Open ${skill.name}`}
    >
      <span className="card__icon">
        <CategoryIcon id={skill.category} size={16} />
      </span>
      <span className="row__main">
        <span className="row__name">{skill.name}</span>
        <span className="row__desc">{skill.description}</span>
      </span>
      <span className="row__meta">
        <span className="meta-chip">{category.name}</span>
        <span className="meta-chip" title={jurisdiction.name}>
          <JurisdictionFlag id={skill.jurisdiction} />
          {jurisdiction.short}
        </span>
        {task && <span className="row__task">{WORKFLOW_LABELS[task]}</span>}
      </span>
      <ArrowRightIcon size={15} className="row__arrow" />
    </button>
  );
}
