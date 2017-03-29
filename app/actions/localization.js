// *** Action Types ***
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

// *** Action Creators ***
export function switchLocale(locale) {
  return {
    type: SWITCH_LOCALE,
    locale,
  };
}
