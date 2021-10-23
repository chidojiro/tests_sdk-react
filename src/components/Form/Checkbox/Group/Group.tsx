import React from "react";
import {
  CheckboxGroup as BaseCheckboxGroup,
  CheckboxGroupProps,
} from "components";
import Field, { FormFieldProps } from "../../Field";

export type Props<T = any> = CheckboxGroupProps<T> & FormFieldProps;

const CheckboxGroup = <T,>(props: Props<T>) => {
  return <Field component={BaseCheckboxGroup} {...props} />;
};

export default CheckboxGroup;
