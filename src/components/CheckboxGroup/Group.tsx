import React from "react";
import { noop } from "lodash";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useControllable } from "hooks";

type OwnProps<T = any> = {
  onChange?: (value: T[]) => void;
  value?: T[];
  name?: string;
  defaultValue?: T[];
};

export type Props<T = any> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref" | keyof OwnProps<T>
> &
  OwnProps<T>;

export type GroupProvider<T> = {
  groupProps?: Props<T>;
  value: T[];
  handleChange: (e: CheckboxChangeEvent) => void;
};

export const GroupContext = React.createContext<GroupProvider<any>>({
  groupProps: undefined,
  value: [],
  handleChange: noop,
});

const Group = React.forwardRef(
  <T extends any>(
    props: Props<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {
      onChange: onChangeProp,
      defaultValue = [],
      value: valueProp,
      name,
      children,
      ...restProps
    } = props;

    const [value, setValue] = useControllable({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const handleChange = React.useCallback(
      (e: CheckboxChangeEvent) => {
        const eventValue = e.target.value as any;
        const isChecked = e.target.checked;

        setValue((prevValue: any[]) => {
          let newValue;
          if (isChecked) {
            newValue = [...prevValue, eventValue];
          } else {
            newValue = prevValue.filter((value) => value !== eventValue);
          }

          onChangeProp?.(newValue);
          return newValue;
        });
      },
      [onChangeProp, setValue]
    );

    const providerValue = React.useMemo(
      () => ({ handleChange, value, groupProps: props }),
      [handleChange, props, value]
    );

    return (
      <GroupContext.Provider value={providerValue}>
        <div {...restProps}>
          <input ref={ref} name={name} className="minimized" />
          {children}
        </div>
      </GroupContext.Provider>
    );
  }
);

export default Group;
