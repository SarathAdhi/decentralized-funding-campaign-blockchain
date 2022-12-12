import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { Component } from "types/page";

type Props = {
  title?: string;
} & UseDisclosureReturn &
  Component;

export const SlideDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  className,
  children,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {title && <DrawerHeader>{title}</DrawerHeader>}

        <DrawerBody className={className}>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
