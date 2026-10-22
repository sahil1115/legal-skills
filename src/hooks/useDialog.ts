import { useEffect, type RefObject } from 'react';

/**
 * Modal behaviour shared by the skill sheet and the filter drawer: Escape
 * closes, Tab is trapped inside the dialog, background scroll is locked, and
 * focus moves in on open and back to where it was on close.
 */
export function useDialog(
  dialogRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
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
  }, [dialogRef, onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    initialFocusRef.current?.focus();
    return () => {
      document.body.classList.remove('no-scroll');
      previouslyFocused?.focus?.();
    };
    // A ref object never changes identity, so this runs once per open.
  }, [initialFocusRef]);
}
