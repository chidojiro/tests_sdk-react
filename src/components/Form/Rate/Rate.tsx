import React from "react";
import { Rate as BaseRate, RateProps } from "antd";
import Field, { FormFieldProps } from "../Field";

export type Props = RateProps & FormFieldProps;

const Rate = (props: Props) => {
  return <Field component={BaseRate} {...props} />;
};

export default Rate;
