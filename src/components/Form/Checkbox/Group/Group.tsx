import React from "react";
import BaseCheckboxGroup, { CheckboxGroupProps } from "../../../CheckboxGroup";
import Field, { FormFieldProps } from "../../Field";

export type Props<T = any> = CheckboxGroupProps<T> & FormFieldProps;

const CheckboxGroup = <T,>(props: Props<T>) => {
  return <Field component={BaseCheckboxGroup} {...props} />;
};

export default CheckboxGroup;
