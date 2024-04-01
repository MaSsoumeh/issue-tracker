import dynamic from "next/dynamic";
import {
  Controller,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
interface TextEditorProps<V extends FieldValues> {
  placeholder?: string;
  controller: UseControllerProps<V>;
}
const RHFTextEditor = <V extends FieldValues>(props: TextEditorProps<V>) => {
  const { fieldState } = useController(props.controller);
  const { error } = fieldState;

  return (
    <div>
      <Controller
        render={({ field }) => {
          return <SimpleMDE placeholder={props.placeholder} {...field} />;
        }}
        {...props.controller}
      />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
};

export default RHFTextEditor;
