import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  button: (theme: Theme) => css`
    width: 100%;
    cursor: pointer;
    height: ${theme.sizing(10)};
    border-radius: ${theme.sizing(2)};
    background: ${theme.color.primary};
    color: ${theme.color.white};
    font-weight: 700;
    border: none;
    outline: none;
  `,
};
