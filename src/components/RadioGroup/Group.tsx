import classNames from "classnames";
import { noop } from "lodash";
import React from "react";
import { useControllable } from "hooks";

export type Props<T = any> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & {
  onChange?: (value: T) => void;
  value?: T;
  label?: string;
  name?: string;
  defaultValue?: T;
};

export type GroupProvider<T> = {
  groupProps?: Props<T>;
  value: T;
  handleChange: (value: T) => void;
};

export const GroupContext = React.createContext<GroupProvider<any>>({
  groupProps: undefined,
  value: undefined,
  handleChange: noop,
});

const Group = React.forwardRef(
  <T,>(props: Props<T>, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      value: valueProp,
      onChange: onChangeProp,
      className,
      name,
      defaultValue,
      children,
      ...restProps
    } = props;
    const [value, setValue] = useControllable({
      value: valueProp,
      onChange: onChangeProp,
      defaultValue,
    });

    const handleChange = React.useCallback(
      (value: T) => {
        setValue?.(value);
        onChangeProp?.(value);
      },
      [onChangeProp, setValue]
    );

    const providerValue = React.useMemo(
      () => ({ handleChange, value, groupProps: props }),
      [handleChange, props, value]
    );

    return (
      <GroupContext.Provider value={providerValue}>
        <div
          className={classNames("flex items-center", className)}
          {...restProps}
        >
          <input className="minimized" type="text" ref={ref} name={name} />
          {children}
        </div>
      </GroupContext.Provider>
    );
  }
);

export default Group;
