import React, {FC, FormEventHandler, PropsWithChildren} from 'react';

type TForm = {
  onSubmit?: FormEventHandler;
}

const Form:FC<PropsWithChildren<TForm>> = ({onSubmit, children}) => {
  return (
    <form style={{display: "flex", gap: '12px'}} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {

};

export default Form;
