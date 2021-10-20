import React from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";

export type FormFieldProps = {
  rules?: RegisterOptions;
  name: string;
  noErrorMessage?: boolean;
  errorGroup?: string[];
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  defaultValue?: any;
  valueAsChecked?: boolean;
  value?: any;
};

export type Props<T = any> = FormFieldProps & {
  component: React.ComponentType<T>;
} & T;

const Field = <T,>({
  component,
  name,
  rules,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  defaultValue,
  noErrorMessage,
  valueAsChecked,
  value: valueProp,
  errorGroup = [],
  ...restProps
}: Props<T>) => {
  const Component = component;

  const { setValue } = useFormContext();

  const {
    field: { onChange, onBlur, value, ...restField },
  } = useController({ name, rules });

  React.useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e);
    onChangeProp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur();
    onBlurProp?.(e);
  };

  const resolveValue = () => {
    const _value = valueAsChecked ? valueProp : value || defaultValue;

    if (rules?.valueAsNumber) {
      return +_value;
    }

    if (rules?.valueAsDate) {
      return new Date(_value);
    }

    return _value;
  };

  return (
    <Component
      onChange={handleChange}
      onBlur={handleBlur}
      value={resolveValue() || ""}
      checked={valueAsChecked && !!value}
      {...restField}
      {...(restProps as any)}
    />
  );
};

export default Field;
