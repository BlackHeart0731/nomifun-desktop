/**
 * @license
 * Copyright 2025-2026 NomiFun (nomifun.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, test } from 'bun:test';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  SYSTEM_LANGUAGE,
  normalizeLanguageCode,
  resolveLanguagePreference,
} from './i18n';

describe('i18n language support', () => {
  test('exposes simplified Chinese, English and Japanese as supported app languages', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['zh-CN', 'en-US', 'ja-JP']);
    expect(DEFAULT_LANGUAGE).toBe('en-US');
  });

  test('normalizes language codes', () => {
    expect(normalizeLanguageCode('ja')).toBe('ja-JP');
    expect(normalizeLanguageCode('ja-JP')).toBe('ja-JP');
    expect(normalizeLanguageCode('ja_JP')).toBe('ja-JP');
    expect(normalizeLanguageCode('zh-TW')).toBe('zh-CN');
    expect(normalizeLanguageCode('ko-KR')).toBe(DEFAULT_LANGUAGE);
    expect(normalizeLanguageCode('tr-TR')).toBe(DEFAULT_LANGUAGE);
    expect(normalizeLanguageCode('ru-RU')).toBe(DEFAULT_LANGUAGE);
    expect(normalizeLanguageCode('uk-UA')).toBe(DEFAULT_LANGUAGE);
  });

  test('resolves the system preference from the detected operating system language', () => {
    expect(resolveLanguagePreference(SYSTEM_LANGUAGE, 'zh-CN')).toBe('zh-CN');
    expect(resolveLanguagePreference(SYSTEM_LANGUAGE, 'zh-TW')).toBe('zh-CN');
    expect(resolveLanguagePreference(SYSTEM_LANGUAGE, 'ja')).toBe('ja-JP');
    expect(resolveLanguagePreference(SYSTEM_LANGUAGE, 'ja-JP')).toBe('ja-JP');
    expect(resolveLanguagePreference(SYSTEM_LANGUAGE, 'fr-FR')).toBe(DEFAULT_LANGUAGE);
  });

  test('keeps an explicitly selected language independent from the system language', () => {
    expect(resolveLanguagePreference('en-US', 'zh-CN')).toBe('en-US');
    expect(resolveLanguagePreference('zh-CN', 'en-US')).toBe('zh-CN');
    expect(resolveLanguagePreference('ja-JP', 'en-US')).toBe('ja-JP');
  });
});
