import type { Skill } from '../types/skill';
import { getJurisdiction } from '../data/jurisdictions';
import { getCategory } from '../data/categories';
import { ArrowRightIcon } from './Icons';

interface SkillCardProps {
  skill: Skill;
  onOpen: (skill: Skill) => void;
}

export function SkillCard({ skill, onOpen }: SkillCardProps) {
  const jurisdiction = getJurisdiction(skill.jurisdiction);
  const category = getCategory(skill.category);

  return (
    <button
      type="button"
      className="card"
      onClick={() => onOpen(skill)}
      aria-label={`Open ${skill.name}`}
    >
      <div className="card__top">
        <span className="card__name">{skill.name}</span>
        <ArrowRightIcon size={15} className="card__arrow" />
      </div>

      <p className="card__desc">{skill.description}</p>

      <div className="card__foot">
        <span className="pill pill--jurisdiction">
          <span
            className="pill__dot"
            style={{ background: jurisdiction.color }}
            aria-hidden
          />
          {jurisdiction.short}
        </span>
        <span className="pill">{category.name}</span>
      </div>
    </button>
  );
}
