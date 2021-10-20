import React from "react";
import BaseRadioGroup, { RadioGroupProps } from "../../../RadioGroup";
import Field, { FormFieldProps } from "../../Field";

export type Props<T = any> = RadioGroupProps<T> & FormFieldProps;

const RadioGroup = <T,>(props: Props<T>) => {
  return <Field component={BaseRadioGroup} {...props} />;
};

export default RadioGroup;
