import React, {useState} from "react";

export interface FormState {
  [key: string]: string | number | {} | any;
}

type CustomChange = {
  target: {
    name: string,
    value: string | number | {}
  }
}

export type FormChange = React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | CustomChange

export interface UseForm<T> {
  form: T,
  onChange: (e: FormChange) => void
}

export const useForm = <T extends FormState>(initialState: T): UseForm<T> => {
  const [form, setForm] = useState<T>(initialState);

  const onChange = (e: FormChange) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, onChange };
};
