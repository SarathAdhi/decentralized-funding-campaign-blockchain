import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";
import { Component } from "types/page";

type Props = {
  label?: string;
  size?: HeadingProps["size"];
} & Component;

export const Card: React.FC<Props> = ({
  label,
  size = "2xl",
  className,
  children,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 sm:gap-4">
      {label && (
        <Heading fontSize={size} m={0} mt={-1} p={0} color="gray.100">
          {label}
        </Heading>
      )}

      <div className={className}>{children}</div>
    </div>
  );
};
