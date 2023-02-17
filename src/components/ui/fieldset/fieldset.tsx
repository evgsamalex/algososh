import React, {FC, FormEventHandler, PropsWithChildren} from "react";
import css from './fieldset.module.css';

type TFieldSet = {
  onSubmit?: FormEventHandler;
  align?: 'center' | 'end' | 'start';
}

const FieldSet:FC<PropsWithChildren<TFieldSet>> = ({onSubmit, children, align = 'start'}) => {
  return (
    <fieldset style={{alignItems: align}} className={css.fieldset} onSubmit={onSubmit}>
      {children}
    </fieldset>
  );
};

export default FieldSet;
