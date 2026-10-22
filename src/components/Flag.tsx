import type { ReactNode } from 'react';
import type { JurisdictionId } from '../types/skill';

/**
 * Circular jurisdiction marks, drawn as inline SVG.
 *
 * Not flag emoji: those do not render on Windows and degrade into letter
 * pairs. These are simplified for legibility at 14-18px rather than accurate
 * reproductions — at that size a faithful Union Jack is a smudge.
 */
export function JurisdictionFlag({ id, size = 14 }: { id: JurisdictionId; size?: number }) {
  return (
    <span className="flag" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size} height={size}>
        {FLAGS[id]}
      </svg>
    </span>
  );
}

const NAVY = '#012169';
const RED = '#c8102e';

function unionJack(): ReactNode {
  return (
    <>
      <rect width="24" height="24" fill={NAVY} />
      <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4.8" />
      <path d="M0 0l24 24M24 0L0 24" stroke={RED} strokeWidth="1.6" />
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7" />
      <path d="M12 0v24M0 12h24" stroke={RED} strokeWidth="4" />
    </>
  );
}

/** Twelve stars on a ring of radius 7, as on the EU flag. */
const EU_STARS = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6;
  return { x: 12 + 7 * Math.sin(a), y: 12 - 7 * Math.cos(a) };
});

const FLAGS: Record<JurisdictionId, ReactNode> = {
  global: (
    <>
      <rect width="24" height="24" fill="#5f7d95" />
      <g fill="none" stroke="#fff" strokeWidth="1.5">
        <circle cx="12" cy="12" r="7" />
        <ellipse cx="12" cy="12" rx="3" ry="7" />
        <path d="M5 12h14" />
      </g>
    </>
  ),
  us: (
    <>
      <rect width="24" height="24" fill="#fff" />
      <path
        d="M0 0h24v3.43H0zM0 6.86h24v3.43H0zM0 13.71h24v3.43H0zM0 20.57h24V24H0z"
        fill="#b22234"
      />
      <rect width="12.5" height="13.71" fill="#3c3b6e" />
      <g fill="#fff">
        <circle cx="5" cy="5" r="0.9" />
        <circle cx="8.5" cy="5" r="0.9" />
        <circle cx="6.75" cy="7.5" r="0.9" />
        <circle cx="10.25" cy="7.5" r="0.9" />
        <circle cx="5" cy="10" r="0.9" />
        <circle cx="8.5" cy="10" r="0.9" />
      </g>
    </>
  ),
  uk: unionJack(),
  eu: (
    <>
      <rect width="24" height="24" fill="#003399" />
      <g fill="#ffcc00">
        {EU_STARS.map(({ x, y }, i) => (
          <circle key={i} cx={x} cy={y} r="1.15" />
        ))}
      </g>
    </>
  ),
  ca: (
    <>
      <rect width="24" height="24" fill="#fff" />
      <path d="M0 0h5v24H0zM19 0h5v24h-5z" fill="#d52b1e" />
      <path
        d="M12 4.8l1.3 2.6 1.4-.6-.6 3.6 1.9-1.7.6 1.2 1.5-.3-.6 1.9.8.6-2.8 2.5.4 1.3-3.3-.6v3.3h-1.2v-3.3l-3.3.6.4-1.3-2.8-2.5.8-.6-.6-1.9 1.5.3.6-1.2 1.9 1.7-.6-3.6 1.4.6z"
        fill="#d52b1e"
      />
    </>
  ),
  au: (
    <>
      <rect width="24" height="24" fill="#00008b" />
      <g transform="translate(1 1) scale(0.48)">{unionJack()}</g>
      <g fill="#fff">
        <circle cx="7" cy="18" r="1.7" />
        <circle cx="17.5" cy="6.5" r="1" />
        <circle cx="20.5" cy="11" r="1" />
        <circle cx="14.5" cy="12" r="1" />
        <circle cx="17.5" cy="18.5" r="1.1" />
        <circle cx="18.6" cy="13.6" r="0.6" />
      </g>
    </>
  ),
  sg: (
    <>
      <rect width="24" height="24" fill="#fff" />
      <rect width="24" height="12" fill="#ef3340" />
      <circle cx="7.5" cy="6.5" r="3.6" fill="#fff" />
      <circle cx="8.9" cy="6.5" r="3.3" fill="#ef3340" />
      <g fill="#fff">
        <circle cx="11.5" cy="4.6" r="0.65" />
        <circle cx="13.3" cy="5.9" r="0.65" />
        <circle cx="12.6" cy="8" r="0.65" />
        <circle cx="10.4" cy="8" r="0.65" />
        <circle cx="9.7" cy="5.9" r="0.65" />
      </g>
    </>
  ),
  cross: (
    <>
      <rect width="24" height="24" fill="#7d62a8" />
      <g fill="none" stroke="#fff" strokeWidth="1.6">
        <circle cx="9.5" cy="12" r="4.6" />
        <circle cx="14.5" cy="12" r="4.6" />
      </g>
    </>
  ),
};
