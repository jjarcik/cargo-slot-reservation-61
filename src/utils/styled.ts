
import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';

/**
 * A utility function to conditionally apply styles in styled-components
 */
export const applyStyles = (
  styles: ReturnType<typeof css> | string,
  condition: boolean
): ReturnType<typeof css> | string => (condition ? styles : '');

/**
 * A utility function to join classNames conditionally
 * This is a simplified version of the cn function for cases where we still need to use classNames
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};
