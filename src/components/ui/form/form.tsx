import React, {FC, FormEventHandler, PropsWithChildren} from 'react';
import css from './form.module.css';

type TForm = {
  onSubmit?: FormEventHandler;
  align?: 'center' | 'end' | 'start';
}

const Form:FC<PropsWithChildren<TForm>> = ({onSubmit, children, align = 'start'}) => {
  return (
    <form style={{alignItems: align}} className={css.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
