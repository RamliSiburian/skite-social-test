import React, { forwardRef, ReactNode } from 'react';

interface CustomComponentProps {
  children: ReactNode;
}

const IgnoreStricMode = forwardRef<HTMLDivElement, CustomComponentProps>(
  (props, ref) => (
    <div ref={ref}>{props.children}</div>
  )
);

export default IgnoreStricMode;
