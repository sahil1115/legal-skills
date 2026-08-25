import { useCallback, useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

/**
 * Clipboard write with a transient confirmation state.
 *
 * The async Clipboard API is unavailable on insecure origins and in some
 * embedded webviews, so a textarea + execCommand fallback keeps Copy Prompt
 * working when the app is served over plain HTTP on a LAN address.
 */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      clearTimeout(timer.current);
      let ok = false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          ok = true;
        }
      } catch {
        ok = false;
      }

      if (!ok) ok = legacyCopy(text);

      setStatus(ok ? 'copied' : 'error');
      timer.current = setTimeout(() => setStatus('idle'), resetAfterMs);
      return ok;
    },
    [resetAfterMs],
  );

  return { copy, status };
}

function legacyCopy(text: string): boolean {
  try {
    const el = document.createElement('textarea');
    el.value = text;
    // Keep it off-screen and non-focusable-looking so the page doesn't jump.
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.top = '-1000px';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}
