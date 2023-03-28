import React, {FC, PropsWithChildren, ReactNode} from 'react';
import css from  './Container.module.css';

type Container = {
  control: ReactNode
}

const Container:FC<PropsWithChildren<Container>> = ({control, children}) => {
  return (
    <div className={css.container}>
      {control}
      <div className={css.content}>
        {children}
      </div>
    </div>
  );
};

export default Container;
