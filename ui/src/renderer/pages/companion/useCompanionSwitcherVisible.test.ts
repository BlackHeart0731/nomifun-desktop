import { afterEach, expect, test } from 'bun:test';
import { act, cleanup, renderHook } from '@testing-library/react';
import { configService } from '@/common/config/configService';
import { isCompanionSwitcherVisible, useCompanionSwitcherVisible } from './useCompanionSwitcherVisible';

afterEach(() => {
  cleanup();
  configService.reset();
});

test('the switcher is visible unless the preference is explicitly false', () => {
  expect(isCompanionSwitcherVisible(undefined)).toBe(true);
  expect(isCompanionSwitcherVisible(true)).toBe(true);
  expect(isCompanionSwitcherVisible(false)).toBe(false);
});

test('the hook defaults to visible and follows the preference', () => {
  const { result } = renderHook(() => useCompanionSwitcherVisible());
  expect(result.current).toBe(true);
  act(() => configService.setLocal('companion.showSwitcher', false));
  expect(result.current).toBe(false);
  act(() => configService.setLocal('companion.showSwitcher', true));
  expect(result.current).toBe(true);
});
