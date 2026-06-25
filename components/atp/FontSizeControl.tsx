'use client';

import { useEffect, useState } from 'react';

type FontSize = 'standard' | 'large' | 'senior';

export function ATPFontSizeControl() {
  const [current, setCurrent] = useState<FontSize>('standard');

  useEffect(() => {
    const saved = localStorage.getItem('atp_font_size') as FontSize | null;
    if (saved) {
      setCurrent(saved);
      document.documentElement.setAttribute('data-font-size', saved);
      document.documentElement.setAttribute('data-ui-mode', saved === 'senior' ? 'senior' : 'default');
    }
  }, []);

  const change = (size: FontSize) => {
    setCurrent(size);
    localStorage.setItem('atp_font_size', size);
    document.documentElement.setAttribute('data-font-size', size);
    document.documentElement.setAttribute('data-ui-mode', size === 'senior' ? 'senior' : 'default');
  };

  return (
    <div
      className="flex items-center gap-1 rounded-atp-pill bg-atp-bg-soft px-2 py-1"
      role="group"
      aria-label="字号调节"
    >
      <button
        onClick={() => change('standard')}
        aria-label="标准字号"
        aria-pressed={current === 'standard'}
        className={`min-h-9 rounded-atp-md px-2 text-sm ${
          current === 'standard' ? 'font-medium text-atp-accent' : 'text-atp-text-tertiary'
        }`}
      >
        A
      </button>
      <button
        onClick={() => change('large')}
        aria-label="大字号"
        aria-pressed={current === 'large'}
        className={`min-h-9 rounded-atp-md px-2 text-base ${
          current === 'large' ? 'font-medium text-atp-accent' : 'text-atp-text-tertiary'
        }`}
      >
        A+
      </button>
      <button
        onClick={() => change('senior')}
        aria-label="长辈字号"
        aria-pressed={current === 'senior'}
        className={`min-h-9 rounded-atp-md px-2 text-lg ${
          current === 'senior' ? 'font-medium text-atp-accent' : 'text-atp-text-tertiary'
        }`}
      >
        长辈
      </button>
    </div>
  );
}
