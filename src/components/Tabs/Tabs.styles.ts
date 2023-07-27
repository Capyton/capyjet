import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  tabs: (tabCount: number) => (theme: Theme) => css`
    display: flex;
    align-items: center;

    .tab {
      width: calc(100% / ${tabCount});

      &:first-of-type {
        border-radius: ${theme.sizing(5, 0, 0, 5)};
      }

      &:last-of-type {
        border-radius: ${theme.sizing(0, 5, 5, 0)};
      }
    }
  `,
};
