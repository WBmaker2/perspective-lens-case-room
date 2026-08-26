import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('introduces the case room as a fictional perspective activity', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '관점 렌즈 사건실' })).toBeInTheDocument();
    expect(screen.getByText(/모든 사건과 인물은 가상/)).toBeInTheDocument();
  });
});
