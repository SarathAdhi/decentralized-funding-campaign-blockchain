import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import clsx from "clsx";
import React from "react";

type Props = {
  label?: string;
} & InputProps;

export const Input: React.FC<Props> = ({ label, name, className, ...rest }) => {
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

      <ChakraInput
        id={name}
        name={name}
        px={5}
        py={6}
        step={rest.type === "number" ? "0.001" : ""}
        autoComplete="off"
        className={clsx(
          "text-white !font-medium !border-1 !border-gray-600 placeholder:!text-gray-500 placeholder:font-medium",
          className
        )}
        {...rest}
      />
    </div>
  );
};
