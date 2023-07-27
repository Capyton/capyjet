import { css } from '@emotion/react';
import { Theme } from 'types';

export const styles = {
  tab: (isActive: boolean) => (theme: Theme) => css`
    font-weight: 700;
    text-align: center;
    padding: ${theme.sizing(2, 4)};
    position: relative;
    cursor: pointer;
    width: ${theme.sizing(25)};

    ${isActive &&
    css`
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 2px;
        background: ${theme.color.primary};
      }
    `}
  `,
};
