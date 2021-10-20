import React from "react";
import { Radio, RadioChangeEvent, RadioProps } from "antd";
import { GroupContext, GroupProvider } from "../Group";

export type Props = RadioProps;

const Option = <T,>({ value: valueProp, onChange, ...restProps }: Props) => {
  const { value, handleChange: _handleChange } =
    React.useContext<GroupProvider<T>>(GroupContext);

  const handleChange = (e: RadioChangeEvent) => {
    onChange?.(e);

    _handleChange(e.target.value as any);
  };

  return (
    <Radio
      value={valueProp}
      onChange={handleChange}
      checked={value === valueProp}
      {...restProps}
    />
  );
};

export default Option;
