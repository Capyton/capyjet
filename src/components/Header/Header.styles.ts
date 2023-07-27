import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  header: (theme: Theme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.sizing(2, 4)};
    box-shadow: -2px 0 8px 2px #e0e0e0;

    img {
      height: ${theme.sizing(10)};
      width: auto;
    }
  `,
};
