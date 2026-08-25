import type { ReactNode } from 'react';
import type { RoadmapItem } from '../data/roadmap';
import { REPO_URL } from '../config';

interface RoadmapPanelProps {
  icon: ReactNode;
  title: string;
  body: string;
  items: RoadmapItem[];
}

/**
 * Shared panel for the Agents and Connectors tabs. Both are roadmap surfaces:
 * the data model already carries the fields they will need, but nothing is
 * shipped yet, and the panel says so plainly rather than faking a catalogue.
 */
export function RoadmapPanel({ icon, title, body, items }: RoadmapPanelProps) {
  return (
    <div className="roadmap">
      <div className="roadmap__head">
        <h2 className="roadmap__title">
          {icon}
          {title}
          <span className="badge">Planned</span>
        </h2>
        <p className="roadmap__body">{body}</p>
      </div>

      <div className="roadmap__grid">
        {items.map((item) => (
          <div className="roadmap__item" key={item.name}>
            <div className="roadmap__item-name">{item.name}</div>
            <p className="roadmap__item-desc">{item.description}</p>
          </div>
        ))}
      </div>

      <p className="roadmap__note">
        Nothing here is built yet. The skill model in <code>src/types/skill.ts</code> already reserves
        the fields these surfaces need, so they can be added without a breaking change.{' '}
        <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
          Contributions welcome
        </a>
        .
      </p>
    </div>
  );
}
