import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { SAVED_MEMO_KEY } from '../../domain/sessionPersistence';
import type { StorageAdapter } from '../../model/session';
import { MemoPad } from './MemoPad';

afterEach(cleanup);

class MemoryStorage implements StorageAdapter {
  data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
}

describe('MemoPad', () => {
  it('keeps typing in memory until explicit save, then reloads and deletes the saved memo', async () => {
    const user = userEvent.setup();
    const storage = new MemoryStorage();
    const messages: string[] = [];
    const view = () => <MemoPad caseId="club-notice-poster" storage={storage} onPersistenceMessage={(message) => messages.push(message)} />;
    const { unmount } = render(view());
    const text = '표찰을 보지 못한 점을 근거로 쓰기';
    const textarea = screen.getByRole('textbox', { name: '개인 메모' });
    await user.type(textarea, text);
    expect(storage.data.has(SAVED_MEMO_KEY)).toBe(false);
    expect(screen.getByText(/저장하지 않은 메모는 이 탭을 닫으면 사라집니다/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '이 기기에 메모 저장' }));
    expect(storage.data.get(SAVED_MEMO_KEY)).toBe(text);
    expect(messages.at(-1)).toMatch(/저장/);
    unmount();
    render(view());
    expect(screen.getByRole('textbox', { name: '개인 메모' })).toHaveValue(text);

    await user.click(screen.getByRole('button', { name: '저장된 메모 삭제' }));
    expect(storage.data.has(SAVED_MEMO_KEY)).toBe(false);
    expect(screen.getByRole('textbox', { name: '개인 메모' })).toHaveValue('');
  });

  it('keeps the memo and learning controls usable when saving hits quota', async () => {
    const user = userEvent.setup();
    const storage: StorageAdapter = {
      getItem: () => null,
      setItem: () => { throw new DOMException('quota exceeded', 'QuotaExceededError'); },
      removeItem: () => undefined,
    };
    const messages: string[] = [];
    render(<MemoPad caseId="club-notice-poster" storage={storage} onPersistenceMessage={(message) => messages.push(message)} />);
    const textarea = screen.getByRole('textbox', { name: '개인 메모' });
    await user.type(textarea, '학습을 계속할 수 있는 개인 메모');
    await user.click(screen.getByRole('button', { name: '이 기기에 메모 저장' }));

    expect(textarea).toHaveValue('학습을 계속할 수 있는 개인 메모');
    expect(screen.getByRole('status')).toHaveTextContent(/저장 공간|저장하지 못/);
    expect(messages.at(-1)).toMatch(/저장/);
    expect(screen.getByRole('button', { name: '이 기기에 메모 저장' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '저장된 메모 삭제' })).toBeEnabled();
  });
});
