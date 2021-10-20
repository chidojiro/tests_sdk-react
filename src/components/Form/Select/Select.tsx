import React from "react";
import { Select as BaseSelect, SelectProps } from "antd";
import Field, { FormFieldProps } from "../Field";

export type Props<T = any> = SelectProps<T> & FormFieldProps;

const Select = <T,>(props: Props<T>) => {
  return <Field component={BaseSelect} {...(props as any)} />;
};

export default Select;
