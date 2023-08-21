import { HTMLProps, PropsWithChildren } from 'react';
import { styles } from './Button.styles';

type Props = HTMLProps<HTMLButtonElement>;

export const Button = ({ children, ...props }: PropsWithChildren<Props>) => (
  <button css={styles.button} {...props} type="button">
    {children}
  </button>
);
