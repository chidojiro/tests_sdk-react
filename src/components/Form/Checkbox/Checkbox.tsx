import React from "react";
import { Checkbox as BaseCheckbox, CheckboxProps } from "antd";
import Field, { FormFieldProps } from "../Field";

export type Props = CheckboxProps & FormFieldProps;

const Checkbox = (props: Props) => {
  return <Field component={BaseCheckbox} valueAsChecked {...props} />;
};

export default Checkbox;
