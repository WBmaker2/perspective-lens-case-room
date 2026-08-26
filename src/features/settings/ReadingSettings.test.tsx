import { cleanup, render, screen, within } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_READING_PREFERENCES, type ReadingPreferences } from '../../model/ui';
import { ReadingSettings } from './ReadingSettings';

afterEach(cleanup);

describe('ReadingSettings', () => {
  it('exposes exact labelled choices and reports a complete preference object', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(preferences: ReadingPreferences) => void>();
    function Harness() {
      const [preferences, setPreferences] = useState(DEFAULT_READING_PREFERENCES);
      return <ReadingSettings preferences={preferences} onChange={(next) => { onChange(next); setPreferences(next); }} />;
    }
    render(<Harness />);

    expect(screen.getByRole('group', { name: '글자 크기' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio', { name: /18px|20px|22px/ })).toHaveLength(3);
    expect(within(screen.getByRole('group', { name: '줄 간격' })).getAllByRole('radio')).toHaveLength(3);
    expect(within(screen.getByRole('group', { name: '읽기 폭' })).getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByRole('radio', { name: '20px' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '1.8' })).toBeChecked();
    expect(screen.getByRole('radio', { name: '표준 읽기 폭' })).toBeChecked();

    await user.click(screen.getByRole('radio', { name: '22px' }));
    await user.click(screen.getByRole('radio', { name: '2' }));
    await user.click(screen.getByRole('radio', { name: '좁은 읽기 폭' }));
    expect(onChange).toHaveBeenLastCalledWith({ fontSize: 22, lineHeight: 2, readingWidth: 'narrow' });
  });
});
