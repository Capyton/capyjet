import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  container: (theme: Theme) => css`
    height: ${theme.sizing(10)};
    width: 100%;
  `,
  input: (theme: Theme) => css`
    height: ${theme.sizing(10)};
    padding: ${theme.sizing(0, 2)};
    border-radius: ${theme.sizing(2)};
    width: 100%;
    background: ${theme.color.gray};
    outline: none;
    border: none;
  `,
};
