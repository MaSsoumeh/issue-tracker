import {TextField as RadixTextField,TextFieldInput} from "@radix-ui/themes";
import ErrorMessage from "./ErrorMessage";
import {
  Controller,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";



interface TextFieldProps<V extends FieldValues>{
  placeholder?: string;
  defaultValue?:string
  controller: UseControllerProps<V>;
}
const RHFTextField = <V extends FieldValues>(props: TextFieldProps<V>) => {
  const { fieldState } = useController(props.controller);
  const { error } = fieldState;

  return (
    <div>
      <Controller
        render={({ field }) => {
          return (
            <RadixTextField.Root>
              <RadixTextField.Input {...props} {...field} />
            </RadixTextField.Root>
          );
        }}
        {...props.controller}
      />

      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
};

export default RHFTextField;
