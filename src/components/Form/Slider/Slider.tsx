import React from "react";
import { Slider as BaseSlider, SliderSingleProps } from "antd";
import Field, { FormFieldProps } from "../Field";
import { SliderRangeProps } from "antd/lib/slider";

export type Props = (SliderSingleProps | SliderRangeProps) & FormFieldProps;

const Slider = (props: Props) => {
  return <Field component={BaseSlider} {...(props as any)} />;
};

export default Slider;
