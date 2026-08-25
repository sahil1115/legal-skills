import { useCallback, useEffect, useState } from 'react';
import type { Skill } from '../types/skill';
import { ID_ALIASES, getSkill } from '../data/skills';

/**
 * Marker stored on the history entries this app pushes.
 *
 * It lives in `history.state` rather than a React ref on purpose. A ref
 * desyncs the moment the URL changes by any route we do not control — a
 * same-document fragment navigation (which does NOT remount React), an
 * edit to the address bar, or a restored session. The marker travels with
 * the entry it describes, so it is correct however the entry was reached.
 */
const PUSHED = 'legalSkillsPushed';

interface PushedState {
  [PUSHED]?: boolean;
}

function readHash(): string {
  return decodeURIComponent(window.location.hash.replace(/^#/, ''));
}

function isOurEntry(): boolean {
  return (window.history.state as PushedState | null)?.[PUSHED] === true;
}

/**
 * Deep-link routing for the skill detail view.
 *
 * The URL is the single source of truth: React state is derived from the hash,
 * never set independently of it. That is what makes Back and Forward work, and
 * it is what the original implementation got wrong — it pushed a history entry
 * on *close* as well as on open, so closing a skill and pressing Back reopened
 * the one you had just dismissed.
 *
 * The rules:
 * - Opening a skill pushes a marked entry, so Back returns where you came from.
 * - Navigating between skills pushes, so Back walks the trail you actually took.
 * - Closing pops our own entry (`history.back()`) rather than adding a new one,
 *   so the trail does not grow every time a sheet is dismissed.
 * - Closing a skill that was deep-linked into directly has no entry of ours to
 *   pop, so it strips the hash with `replaceState` instead of navigating the
 *   visitor off the site.
 * - `hashchange` and `popstate` are both handled: browsers differ on which
 *   fires for fragment-only history navigation.
 */
export function useSkillRoute() {
  const [openSkill, setOpenSkill] = useState<Skill | null>(() => getSkill(readHash()) ?? null);

  useEffect(() => {
    function sync() {
      const raw = readHash();
      const skill = getSkill(raw) ?? null;

      // A retired id still resolves; rewrite the URL to the current one so the
      // address bar, and anything copied from it, uses the live id. Preserve
      // the entry's state so its pushed-marker is not lost by the rewrite.
      if (skill && raw && raw !== skill.id && ID_ALIASES[raw]) {
        window.history.replaceState(window.history.state, '', `#${skill.id}`);
      }

      setOpenSkill(skill);
    }

    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const open = useCallback((skill: Skill) => {
    if (readHash() === skill.id) return;
    const state: PushedState = { [PUSHED]: true };
    window.history.pushState(state, '', `#${skill.id}`);
    setOpenSkill(skill);
  }, []);

  const close = useCallback(() => {
    if (isOurEntry()) {
      // Undo our own entry. The popstate handler updates `openSkill`.
      window.history.back();
    } else {
      // Deep-linked straight in, or arrived by fragment navigation: there is
      // nothing of ours to pop, and back() here would send the visitor away.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setOpenSkill(null);
    }
  }, []);

  return { openSkill, open, close };
}
