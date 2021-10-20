import React from "react";
import { Input as BaseInput, InputProps } from "antd";
import Field, { FormFieldProps } from "../Field";

export type Props = InputProps & FormFieldProps;

const Input = (props: Props) => {
  return <Field component={BaseInput} {...props} />;
};

export default Input;
