import classNames from "classnames";
import React from "react";
import { noop } from "lodash";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export type Props<T = any> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  onChange?: (value: T[]) => void;
  value?: T[];
  className?: string;
  name?: string;
  defaultValue?: T[];
};

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
  <T,>(props: Props<T>, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      onChange: onChangeProp,
      className,
      defaultValue,
      value: valueProp,
      name,
      children,
      ...restProps
    } = props;

    const [value, setValue] = React.useState(defaultValue || valueProp || []);

    React.useEffect(() => {
      if (!valueProp) return;

      setValue(valueProp || []);
    }, [valueProp]);

    const handleChange = React.useCallback(
      (e: CheckboxChangeEvent) => {
        const eventValue = e.target.value as any;
        const isChecked = e.target.checked;

        setValue((prevValue) => {
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
      [onChangeProp]
    );

    const providerValue = React.useMemo(
      () => ({ handleChange, value, groupProps: props }),
      [handleChange, props, value]
    );

    return (
      <GroupContext.Provider value={providerValue}>
        <div className={classNames("flex flex-wrap", className)} {...restProps}>
          <input ref={ref} name={name} className="minimized" />
          {children}
        </div>
      </GroupContext.Provider>
    );
  }
);

export default Group;
