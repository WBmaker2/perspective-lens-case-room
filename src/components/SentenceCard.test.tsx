import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { NarrativeSentence } from '../model/case';
import { SentenceCard } from './SentenceCard';

const mixedSentence: NarrativeSentence = {
  id: 'sentence-1',
  number: 1,
  text: '해솔은 줄넘이를 살폈다.',
  kind: 'mixed',
  segments: [
    { id: 'sentence-1-a', text: '해솔은 줄넘이를 ', category: 'observation' },
    { id: 'sentence-1-b', text: '살폈다.', category: 'evaluation' },
  ],
  acceptedCategorySets: [['observation', 'evaluation']],
  feedback: { supported: '잘 뒷받침해요.', 'partially-supported': '일부만 뒷받침해요.', revise: '다시 살펴봐요.' },
};

describe('SentenceCard', () => {
  it('exposes a numbered sentence, pressed state, and ordered mixed checkboxes', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const view = () => (
      <SentenceCard sentence={mixedSentence} mode="classify-evidence" pressed={false} onToggle={onToggle}>
        <div>
          <label>
            <input type="checkbox" value="sentence-1-a" />
            해솔은 줄넘이를
          </label>
          <label>
            <input type="checkbox" value="sentence-1-b" />
            살폈다.
          </label>
        </div>
      </SentenceCard>
    );
    const { rerender } = render(view());

    expect(screen.getByRole('group', { name: '문장 1' })).toBeInTheDocument();
    const select = screen.getByRole('button', { name: /문장 1/ });
    expect(select).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);

    await user.keyboard('{Tab}{Enter}');
    expect(onToggle).toHaveBeenCalledWith('sentence-1');

    rerender(
      <SentenceCard sentence={mixedSentence} mode="classify-evidence" pressed onToggle={onToggle}>
        <div>
          <label>
            <input type="checkbox" value="sentence-1-a" />
            해솔은 줄넘이를
          </label>
          <label>
            <input type="checkbox" value="sentence-1-b" />
            살폈다.
          </label>
        </div>
      </SentenceCard>,
    );
    expect(select).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('checkbox').map((input) => (input as HTMLInputElement).value)).toEqual([
      'sentence-1-a',
      'sentence-1-b',
    ]);
  });

  it('keeps the important marker keyboard-operable in lens mode', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<SentenceCard sentence={mixedSentence} mode="mark-important" pressed={false} onToggle={onToggle} />);

    const marker = screen.getByRole('button', { name: '중요 문장 표시' });
    expect(marker).toHaveAttribute('aria-pressed', 'false');
    marker.focus();
    await user.keyboard('{Enter}');
    expect(onToggle).toHaveBeenCalledWith('sentence-1');
  });
});
