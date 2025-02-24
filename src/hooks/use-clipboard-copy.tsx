"use client";

import { useCallback, useEffect, useState } from "react";

interface UseClipboardCopyProps {
  copiedDuration?: number;
  onCopySuccess?: () => void;
  onCopyError?: (error: Error) => void;
}

export const useClipboardCopy = ({
  copiedDuration = 2000,
  onCopySuccess,
  onCopyError,
}: UseClipboardCopyProps = {}) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (copied || error) {
      timeoutId = setTimeout(() => {
        setCopied(false);
        setError(null);
      }, copiedDuration);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [copied, copiedDuration, error]);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        onCopySuccess?.();
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to copy text");
        setError(error);
        onCopyError?.(error);
        console.error("Failed to copy text:", error);
      }
    },
    [onCopySuccess, onCopyError],
  );

  return {
    copied,
    copyToClipboard,
    error,
  };
};
