import { useMemo, useState } from 'react';
import type { Agent, Skill } from '../types/skill';
import { agentSkills, composeAgentPrompt } from '../data/agents';
import { getJurisdiction } from '../data/jurisdictions';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { JurisdictionFlag } from './Flag';
import {
  AgentIcon,
  ArrowRightIcon,
  CategoryIcon,
  CheckIcon,
  CheckpointIcon,
  CopyIcon,
  InfoIcon,
} from './Icons';

interface AgentPanelProps {
  agent: Agent;
  onOpenSkill: (skill: Skill) => void;
}

/**
 * A built agent: its stages as a pipeline of the skills it runs, what it needs
 * and returns, and the one prompt to copy — with or without a review pause
 * after each stage.
 */
export function AgentPanel({ agent, onOpenSkill }: AgentPanelProps) {
  const [checkpoints, setCheckpoints] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const { copy, status } = useCopyToClipboard();

  const skills = useMemo(() => agentSkills(agent), [agent]);
  const prompt = useMemo(() => composeAgentPrompt(agent, { checkpoints }), [agent, checkpoints]);

  return (
    <article className="agent" aria-labelledby={`${agent.id}-title`}>
      <header className="agent__head">
        <span className="agent__icon">
          <AgentIcon size={20} />
        </span>
        <div className="agent__meta">
          <div className="agent__badges">
            <span className="badge badge--accent">Agent</span>
            <span className="badge">{agent.steps.length} stages</span>
            <span className="badge">v{agent.version}</span>
            <span className="badge">Unverified</span>
          </div>
          <h3 className="agent__name" id={`${agent.id}-title`}>
            {agent.name}
          </h3>
          <p className="agent__desc">{agent.description}</p>
        </div>
      </header>

      <p className="agent__text">{agent.whatItDoes}</p>

      <h4 className="section__label">How it runs</h4>
      <ol className="pipeline">
        {agent.steps.map((step, i) => {
          const skill = skills[i];
          return (
            <li className="pipeline__step" key={step.skillId}>
              <button
                type="button"
                className="pipeline__card"
                onClick={() => onOpenSkill(skill)}
                aria-label={`Stage ${i + 1}: ${skill.name}. Open skill`}
              >
                <span className="pipeline__top">
                  <span className="pipeline__num">{i + 1}</span>
                  <span className="meta-chip">
                    <JurisdictionFlag id={skill.jurisdiction} />
                    {getJurisdiction(skill.jurisdiction).short}
                  </span>
                </span>
                <span className="pipeline__name">
                  <CategoryIcon id={skill.category} size={15} />
                  {skill.name}
                </span>
                <span className="pipeline__purpose">{step.purpose}</span>
                {step.gate && <span className="pipeline__gate">{step.gate}</span>}
                <span className="pipeline__open">
                  Open skill <ArrowRightIcon size={13} />
                </span>
              </button>
              {checkpoints && (
                <div className="pipeline__review">
                  <CheckpointIcon />
                  <span>
                    <strong>Your review:</strong> {step.review}
                  </span>
                </div>
              )}
            </li>
          );
        })}
        <li className="pipeline__step pipeline__step--final">
          <div className="pipeline__card pipeline__card--final">
            <span className="pipeline__top">
              <span className="pipeline__num">
                <CheckIcon size={13} />
              </span>
            </span>
            <span className="pipeline__name">Reviewer briefing</span>
            <span className="pipeline__purpose">
              One page for whoever signs off: decision, blockers, concessions, key obligations
              {checkpoints ? ' and your checkpoint decisions.' : ' and assumptions to confirm.'}
            </span>
          </div>
        </li>
      </ol>

      <div className="agent__cols">
        <section>
          <h4 className="section__label">You provide once</h4>
          <ul className="agent__list">
            {agent.inputs.map((input) => (
              <li key={input.name}>
                <strong>{input.name}</strong>
                {!input.required && <span className="deflist__optional">optional</span>} —{' '}
                {input.description}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="section__label">You get back</h4>
          <ul className="agent__list">
            {agent.outputs.map((output) => (
              <li key={output.name}>
                <strong>{output.name}</strong> — {output.description}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <h4 className="section__label">When to use it</h4>
      <p className="agent__text">{agent.whenToUse}</p>

      <h4 className="section__label">Example</h4>
      <div className="example">
        <div className="example__row">
          <div className="example__label">Scenario</div>
          <p className="example__text">{agent.example.scenario}</p>
        </div>
        <div className="example__row">
          <div className="example__label">What you get back</div>
          <p className="example__text">{agent.example.result}</p>
        </div>
      </div>

      <div className="agent__run">
        <label className="switch">
          <input
            type="checkbox"
            className="switch__input"
            checked={checkpoints}
            onChange={(e) => setCheckpoints(e.target.checked)}
          />
          <span className="switch__track" aria-hidden />
          <span className="switch__label">Pause for my review after each stage</span>
        </label>
        <p className="agent__hint">
          {checkpoints
            ? 'The prompt stops after every stage and waits. Reply CONTINUE to move on, or correct it — your decisions carry into the next stage. Reply "run to the end" to stop pausing.'
            : 'The prompt runs all stages in one response and lists every assumption it made for you to confirm.'}
        </p>
        <div className="agent__actions">
          <button
            type="button"
            className={`btn ${status === 'copied' ? 'btn--copied' : 'btn--primary'}`}
            onClick={() => void copy(prompt)}
          >
            {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
            {status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy agent prompt'}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            aria-expanded={showPrompt}
            onClick={() => setShowPrompt((v) => !v)}
          >
            {showPrompt ? 'Hide prompt' : 'Show prompt'}
          </button>
        </div>
        {showPrompt && (
          <div className="prompt">
            <div className="prompt__head">
              <span className="prompt__head-label">
                One prompt, {skills.length} skills, shared legal-safety rules included once. Works
                with any LLM.
              </span>
            </div>
            <pre className="prompt__code">{prompt}</pre>
          </div>
        )}
      </div>

      <div className="disclaimer">
        <InfoIcon className="disclaimer__icon" />
        <p className="disclaimer__text">
          <strong>Not legal advice.</strong> Each stage runs an unverified skill. Every output must
          be reviewed by a qualified lawyer before anyone relies on it.
        </p>
      </div>
    </article>
  );
}
