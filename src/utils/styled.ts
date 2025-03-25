
import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * A utility function to conditionally apply styles in styled-components
 */
export const applyStyles = (
  styles: FlattenSimpleInterpolation | string,
  condition: boolean
): FlattenSimpleInterpolation | string => (condition ? styles : '');

/**
 * A utility function to join classNames conditionally
 * This is a simplified version of the cn function for cases where we still need to use classNames
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};
