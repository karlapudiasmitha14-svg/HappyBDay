import { useEffect, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function useKonamiCode(onSuccess: () => void) {
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_SEQUENCE[inputIndex];

      if (key === expectedKey || key === expectedKey.toLowerCase()) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          onSuccess();
          setInputIndex(0);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        setInputIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, onSuccess]);

  const handleVirtualPress = (buttonKey: string) => {
    const expectedKey = KONAMI_SEQUENCE[inputIndex];
    if (buttonKey === expectedKey || buttonKey.toLowerCase() === expectedKey.toLowerCase()) {
      const nextIndex = inputIndex + 1;
      if (nextIndex === KONAMI_SEQUENCE.length) {
        onSuccess();
        setInputIndex(0);
      } else {
        setInputIndex(nextIndex);
      }
    } else {
      setInputIndex(0);
    }
  };

  return {
    progress: (inputIndex / KONAMI_SEQUENCE.length) * 100,
    handleVirtualPress
  };
}
