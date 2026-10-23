import type { Agent, Skill } from '../types/skill';
import { skillsById } from './skills';
import { LEGAL_SAFETY_BLOCK } from './safety';

/**
 * The agent registry.
 *
 * An agent is a workflow over registered skills, not a new prompt: each stage
 * embeds its skill's prompt unchanged. Write only the orchestration — the
 * intro, the handoff between stages, and the final deliverable — and let the
 * skills carry the legal content.
 */
export const agents: Agent[] = [
  {
    id: 'agent-contract-review',
    name: 'Contract Review Agent',
    description: 'Triages an inbound agreement, redlines it against your playbook and extracts its obligations in one run.',
    whatItDoes:
      'Takes one inbound agreement through the three stages a legal team usually runs separately. It scores the contract and decides how much review it needs; redlines it against your playbook with replacement text and a covering note; and extracts the obligations the business would be signing up to, marked by whether they hold as drafted or only if the redlines are accepted. By default it pauses after each stage so you can confirm the lane, accept or reject each redline and fix owners before it moves on, and your decisions carry into the next stage. It ends with a single briefing for the reviewer, so the person signing off reads one page instead of three outputs.',
    whenToUse:
      'When a counterparty paper arrives and you want the routing decision, the markup and the obligations picture together — for example a supplier MSA, a customer order form on their paper, or a data processing agreement. Use the individual skills instead when you only need one stage, or for an executed contract that needs an obligation register alone.',
    inputs: [
      { name: 'Contract', description: 'The full draft as text, including schedules and anything incorporated by reference.', required: true },
      { name: 'Our side', description: 'Which party we are, and the counterparty.', required: true },
      { name: 'Playbook', description: 'Preferred and fallback positions. Neutral market standards are used without one.' },
      { name: 'Deal context', description: 'Value, term, strategic importance and leverage.' },
      { name: 'Routing rubric and lanes', description: 'Your triage thresholds and review paths. A default rubric is used without them.' },
      { name: 'Expected start date', description: 'So relative deadlines in the obligation register can be dated.' },
    ],
    outputs: [
      { name: 'Triage result', description: 'Risk score with breakdown, the review lane, and escalation triggers.' },
      { name: 'Redline table', description: 'Clause-by-clause replacement text with severity and rationale.' },
      { name: 'Covering note', description: 'A short message to the counterparty framing the changes.' },
      { name: 'Obligation register', description: 'Obligations marked as drafted or only if the redlines are accepted.' },
      { name: 'Reviewer briefing', description: 'One page: the decision needed, blockers, open questions and sign-off route.' },
    ],
    steps: [
      {
        skillId: 'global-contract-triage',
        purpose: 'Scores the contract and decides how much review it needs.',
        handoff: 'Pass the risk score, the lane and the reviewer briefing points to the redline stage as its priorities.',
        gate: 'If triage routes the contract to self-serve, skip the redline stage and say why.',
        review:
          'Confirm or override the review lane and the risk factors, and correct any fact triage assumed about the deal.',
      },
      {
        skillId: 'global-smart-redline',
        purpose: 'Marks up the draft against the playbook with replacement text.',
        handoff: 'Pass the redline table to the obligation stage so obligations can be marked as drafted or only if redlines are accepted.',
        review:
          'Accept, reject or amend each redline by its row number, and add any position the playbook missed. The obligation stage uses your decisions.',
      },
      {
        skillId: 'global-obligation-extraction',
        purpose: 'Lists what each party would be committing to, with dates.',
        handoff: 'Pass the register and the ambiguity log to the final reviewer briefing.',
        review:
          'Confirm the internal owner for each obligation and resolve what you can in the ambiguity log before the briefing is written.',
      },
    ],
    intro: `You are running the Contract Review Agent: a three-stage review of one inbound agreement. Run the stages in order. Each stage gives you a role, inputs, tasks, rules and an output format — follow them within that stage, then carry its output forward as the next stage's starting point.

AGENT INPUTS (supplied once — use these wherever a stage asks for the same thing, and never ask for them twice)
- Contract: <paste the full draft, including schedules and anything incorporated by reference>
- Our side: <which party we are; the counterparty>
- Playbook (optional): <preferred and fallback positions; non-negotiables>
- Deal context (optional): <value, term, strategic importance, leverage>
- Routing rubric and lanes (optional): <triage thresholds and review paths>
- Expected start date (optional): <to date relative deadlines>

HOW TO RUN
- Head each stage's output with its stage number and name.
- After each stage, write a short HANDOFF block stating exactly what you are carrying forward.
- Obey any GATE: if a gate applies, say so plainly and skip what it tells you to skip.
- The contract is a draft. In the obligation stage, treat the draft as the agreement and mark each obligation AS DRAFTED, or IF REDLINE ACCEPTED where a proposed redline would create, change or remove it.
- Do not soften an earlier stage's finding in a later stage. If a later stage contradicts an earlier one, say so and explain which is right.`,
    finalOutput: `FINAL — REVIEWER BRIEFING
After the last stage, write one page for the person signing off:
1. Decision needed, and by whom (from the triage lane).
2. Blockers: redlines that must be won, with the clause and why.
3. Concessions available: positions we can give, in order.
4. Obligations that matter most to the business, with owners and dates.
5. Open questions and [VERIFY] items, collected from every stage.
6. Reviewer decisions taken at checkpoints — or, if the agent ran without checkpoints, the assumptions the user must confirm.
Open with a three-line summary: lane, number of blockers, recommendation (sign / sign with changes / do not sign).`,
    example: {
      scenario:
        'A supplier sends its own MSA and DPA for a 300,000-a-year analytics service, with uncapped indemnities running only in its favour and a 90-day auto-renewal notice.',
      result:
        'Triage routes it to counsel review; the redline stage proposes mutual capped indemnities and a shorter renewal notice with a covering note; the register dates the renewal notice and flags two obligations that exist only if our redlines are accepted; the briefing lists two blockers and three concessions.',
    },
    lastReviewed: '2026-10-23',
    reviewStatus: 'unverified',
    version: '1.0.0',
  },
];

export const agentsById = new Map<string, Agent>(agents.map((a) => [a.id, a]));

/** The registered skills an agent runs, in order. Throws on a dangling id. */
export function agentSkills(agent: Agent): Skill[] {
  return agent.steps.map((step) => {
    const skill = skillsById.get(step.skillId);
    if (!skill) throw new Error(`Agent "${agent.id}" references unknown skill "${step.skillId}"`);
    return skill;
  });
}

export interface AgentPromptOptions {
  /**
   * Pause after every stage for the user to review and correct the output
   * before the next stage starts. On by default: a legal workflow should not
   * build stage three on a stage-one mistake nobody looked at.
   */
  checkpoints?: boolean;
}

const CHECKPOINTS_ON = `REVIEW CHECKPOINTS: ON
- After each stage's HANDOFF, stop and write a CHECKPOINT block: what the stage concluded in no more than three lines, what the user is asked to check, and how to proceed.
- Then wait. Do not start the next stage until the user replies. "Continue" accepts the stage as it stands. Anything else is a correction: apply it, show a short revised summary of what changed, and checkpoint again if the change is material.
- The user's checkpoint decisions are binding inputs to every later stage. Record them, and list them under "Reviewer decisions" in the final briefing.
- Where the user accepts or rejects redlines at a checkpoint, mark obligations by those decisions instead of IF REDLINE ACCEPTED.
- If the user replies "run to the end", stop pausing and complete the remaining stages in one response.`;

const CHECKPOINTS_OFF = `REVIEW CHECKPOINTS: OFF
- Run every stage in one response without pausing.
- Wherever a stage would have needed the user's decision, state the assumption you made in square brackets, carry it forward visibly, and list it in the final briefing under "Assumptions to confirm".`;

/**
 * The single prompt a user copies for an agent: orchestration, the checkpoint
 * mode, each stage with its skill's prompt unchanged, the final deliverable,
 * then the shared safety block exactly once — appended last, as for skills, so
 * it is not crowded out.
 */
export function composeAgentPrompt(agent: Agent, { checkpoints = true }: AgentPromptOptions = {}): string {
  const skills = agentSkills(agent);
  const stages = agent.steps.map((step, i) => {
    const next =
      i + 1 < agent.steps.length
        ? `Stage ${i + 2} (${skills[i + 1].name})`
        : 'the final reviewer briefing';
    const lines = [
      `=== STAGE ${i + 1} OF ${agent.steps.length} — ${skills[i].name.toUpperCase()} ===`,
      `Purpose: ${step.purpose}`,
      ...(step.gate ? [`GATE: ${step.gate}`] : []),
      '',
      skills[i].prompt.trimEnd(),
      '',
      `HANDOFF: ${step.handoff}`,
      ...(checkpoints
        ? [
            '',
            `CHECKPOINT AFTER STAGE ${i + 1}: stop here. Ask the user to: ${step.review} End with: "Reply CONTINUE to start ${next}, or tell me what to change." Do not continue until they reply.`,
          ]
        : []),
    ];
    return lines.join('\n');
  });
  return (
    [
      agent.intro.trimEnd(),
      checkpoints ? CHECKPOINTS_ON : CHECKPOINTS_OFF,
      ...stages,
      agent.finalOutput.trimEnd(),
      LEGAL_SAFETY_BLOCK,
    ].join('\n\n') + '\n'
  );
}
