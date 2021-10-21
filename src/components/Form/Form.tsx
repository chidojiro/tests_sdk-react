import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

import Input from "./Input";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./Checkbox/Group";
import RadioGroup from "./Radio/Group";
import Select from "./Select";
import Rate from "./Rate";
import Slider from "./Slider";

type Props<T = any> = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  "onSubmit"
> & {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  methods: UseFormReturn<T>;
};

const FormForceRerendererContext = React.createContext(() => null);

const Form = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...props
}: Props<TFieldValues>) => {
  const [, setState] = React.useState(false);

  const value = React.useCallback(() => setState((p) => !p), []);

  return (
    <FormForceRerendererContext.Provider value={value as any}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)} {...props}>
          {children}
        </form>
      </FormProvider>
    </FormForceRerendererContext.Provider>
  );
};
Form.Input = Input;
Form.Checkbox = Checkbox;
Form.CheckboxGroup = CheckboxGroup;
Form.RadioGroup = RadioGroup;
Form.Select = Select;
Form.Rate = Rate;
Form.Slider = Slider;

export default Form;

export const useFormForceRerenderer = () =>
  React.useContext(FormForceRerendererContext);
