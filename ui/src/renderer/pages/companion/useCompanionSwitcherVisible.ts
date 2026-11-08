/**
 * @license
 * Copyright 2025-2026 NomiFun (nomifun.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { configService } from '@/common/config/configService';
import { useConfig } from '@/renderer/hooks/config/useConfig';

/** Minimum gap between cross-window preference refreshes. */
const REFRESH_INTERVAL_MS = 5000;

/**
 * Whether the companion window shows its companion switcher button.
 * Defaults to visible; only an explicit `false` hides it.
 */
export const isCompanionSwitcherVisible = (value: boolean | undefined): boolean => value !== false;

/**
 * Reads the `companion.showSwitcher` UI preference. The companion runs in its
 * own window, where configService notifications do not cross windows, so the
 * preference is re-read (throttled) when the window is focused or hovered.
 */
export const useCompanionSwitcherVisible = (): boolean => {
  const [value] = useConfig('companion.showSwitcher');

  useEffect(() => {
    let lastRefresh = Date.now();
    const refresh = () => {
      const now = Date.now();
      if (now - lastRefresh < REFRESH_INTERVAL_MS) return;
      lastRefresh = now;
      void configService.reload().catch(() => {});
    };
    window.addEventListener('focus', refresh);
    document.addEventListener('pointerenter', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('pointerenter', refresh);
    };
  }, []);

  return isCompanionSwitcherVisible(value);
};
