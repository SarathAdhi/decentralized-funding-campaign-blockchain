import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Dashboard } from "@styled-icons/material-twotone/Dashboard";
import { CalendarCancel } from "@styled-icons/fluentui-system-filled/CalendarCancel";
import { CalendarCheckFill } from "@styled-icons/bootstrap/CalendarCheckFill";
import { NotificationsActive } from "@styled-icons/material-rounded/NotificationsActive";

const menuItems = [
  { name: "All", Icon: Dashboard },
  { name: "Active", Icon: NotificationsActive },
  { name: "Completed", Icon: CalendarCheckFill },
  { name: "Cancelled", Icon: CalendarCancel },
];

type Props = {
  currentSelectedTab: string;
  setCurrentSelectedTab: (value: string) => void;
};

export const FilterMenuList: React.FC<Props> = ({
  currentSelectedTab,
  setCurrentSelectedTab,
}) => (
  <Menu>
    <MenuButton
      as={Button}
      size={{ base: "sm", md: "md" }}
      bgColor="gray.700"
      color="white"
      _hover={{ bgColor: "" }}
      _active={{ bgColor: "gray.600" }}
      rightIcon={<ChevronDown className="w-5 h-5" />}
    >
      {currentSelectedTab}
    </MenuButton>

    <MenuList bg="gray.800">
      {menuItems.map(({ name, Icon }) => (
        <MenuItem
          bgColor="gray.800"
          color="white"
          _hover={{ bgColor: "gray.700" }}
          key={name}
          icon={<Icon className="w-5 h-5 text-white" />}
          onClick={() => setCurrentSelectedTab(name)}
        >
          {name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
