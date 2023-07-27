import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  container: (theme: Theme) => css`
    height: ${theme.sizing(10)};
    width: 100%;
  `,
};
