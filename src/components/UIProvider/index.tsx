import { PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { Theme } from 'types';
import { styles } from './UIProvider.styles';

const staticTheme: Omit<Theme, 'sizing'> = {
  color: {
    primary: '#31a6f5',
    black: '#000000',
    white: '#ffffff',
    gray: '#ebedf0',
  },
  font: "'Inter', sans-serif",
  unit: 4,
};

const getTheme = (): Theme => {
  const { unit, ...rest } = staticTheme;

  return {
    ...rest,
    unit,
    sizing: (...sizes) => {
      return sizes.reduce<string>((accumulator, size) => {
        if (size !== undefined) {
          return `${accumulator}${
            typeof size === 'string' ? size : `${size * unit}px`
          } `;
        }

        return accumulator;
      }, '');
    },
  };
};

export const UIProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={getTheme()}>
    {children}
    <Global styles={styles.global(getTheme())} />
  </ThemeProvider>
);
