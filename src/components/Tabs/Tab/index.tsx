import { PropsWithChildren } from 'react';
import { styles } from './Tab.styles';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export const Tab = ({
  children,
  isActive,
  ...props
}: PropsWithChildren<Props>) => (
  <div css={styles.tab(isActive)} {...props} className="tab">
    {children}
  </div>
);
