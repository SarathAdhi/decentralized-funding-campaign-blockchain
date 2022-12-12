import { Textarea as ChakraTextarea, TextareaProps } from "@chakra-ui/react";
import clsx from "clsx";
import React from "react";

type Props = {
  label?: string;
} & TextareaProps;

export const TextArea: React.FC<Props> = ({
  label,
  name,
  className,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-base font-semibold text-gray-300"
        >
          {label} {rest.isRequired && "*"}
        </label>
      )}

      <ChakraTextarea
        id={name}
        name={name}
        rows={5}
        p={3}
        className={clsx(
          "text-white !font-medium !border-1 !border-gray-600 placeholder:!text-gray-500 placeholder:font-medium",
          className
        )}
        {...rest}
      />
    </div>
  );
};
