import type { Skill } from '../types/skill';
import { skills } from '../data/skills';
import { jurisdictions } from '../data/jurisdictions';
import { SkillCard } from './SkillCard';

const ROWS = 3;
const PER_ROW = 12;

/**
 * Picks skills round-robin across jurisdictions, so every row shows a spread
 * of regimes rather than a block of US skills followed by a block of UK ones.
 * Deterministic, so the hero is identical on every load.
 */
const rows: Skill[][] = (() => {
  const queues = jurisdictions
    .map((j) => skills.filter((s) => s.jurisdiction === j.id))
    .filter((q) => q.length > 0);
  const picked: Skill[] = [];
  while (picked.length < ROWS * PER_ROW && queues.some((q) => q.length > 0)) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next) picked.push(next);
    }
  }
  return Array.from({ length: ROWS }, (_, r) => picked.filter((_, i) => i % ROWS === r));
})();

/**
 * The scrolling wall of skills in the hero. Purely a preview: it is hidden
 * from assistive technology and the tab order, because the catalogue below
 * lists every skill accessibly. Each row is rendered twice so the loop is
 * seamless, and it stands still under `prefers-reduced-motion`.
 */
export function SkillShowcase({ onOpen }: { onOpen: (skill: Skill) => void }) {
  return (
    <div className="showcase" aria-hidden>
      {rows.map((row, r) => (
        <div className={`showcase__row showcase__row--${r + 1}`} key={r}>
          {[...row, ...row].map((skill, i) => (
            <div className="showcase__item" key={`${skill.id}-${i}`}>
              <SkillCard skill={skill} onOpen={onOpen} variant="showcase" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
