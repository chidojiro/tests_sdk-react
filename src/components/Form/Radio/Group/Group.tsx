import React from "react";
import { RadioGroup as BaseRadioGroup, RadioGroupProps } from "components";
import Field, { FormFieldProps } from "../../Field";

export type Props<T = any> = RadioGroupProps<T> & FormFieldProps;

const RadioGroup = <T,>(props: Props<T>) => {
  return <Field component={BaseRadioGroup} {...props} />;
};

export default RadioGroup;
