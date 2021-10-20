import { CheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";
import { GroupContext, GroupProvider } from "../Group";
import Styled from "./Option.styled";

export type Props = CheckboxProps;

const Option = <T,>({ value: valueProp, onChange, ...restProps }: Props) => {
  const { value, handleChange: _handleChange } =
    React.useContext<GroupProvider<T>>(GroupContext);

  const handleChange = (e: CheckboxChangeEvent) => {
    onChange?.(e);

    _handleChange(e);
  };

  return (
    <Styled.Checkbox
      value={valueProp}
      onChange={handleChange}
      checked={value.includes(valueProp)}
      {...restProps}
    />
  );
};

export default Option;
