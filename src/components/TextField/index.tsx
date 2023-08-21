import { HTMLProps } from 'react';
import { styles } from './TextField.styles';

type Props = HTMLProps<HTMLInputElement>;

export const TextField = (props: Props) => (
  <div css={styles.container}>
    <input css={styles.input} type="text" {...props} />
  </div>
);
