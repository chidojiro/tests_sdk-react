import React from "react";
import noop from "lodash/noop";

type UseControllableProps<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (e: any) => void;
};

const useControllable = <T>({
  value: valueProp,
  onChange,
  defaultValue,
}: UseControllableProps<T>): any => {
  const isControlled = valueProp !== undefined && valueProp !== null;

  const [value, setValue] = React.useState(defaultValue);

  const _setValue = React.useCallback(
    (event: T | React.ChangeEvent<any>) => {
      const value = (event as React.ChangeEvent<any>).target?.value ?? event;

      setValue(value);
      onChange?.(event);
    },
    [onChange]
  );

  if (isControlled) return [valueProp || defaultValue, onChange || noop];

  return [value, _setValue];
};

export default useControllable;
