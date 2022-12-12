import { Home } from "@styled-icons/fluentui-system-filled/Home";
import { User } from "@styled-icons/boxicons-solid/User";
import { Create } from "@styled-icons/ionicons-solid/Create";
import { Campaign } from "@styled-icons/material-rounded/Campaign";

export const pages = [
  {
    name: "Home",
    href: "/",
    Icon: Home,
  },
  {
    name: "Campaigns",
    href: "/campaign",
    Icon: Campaign,
  },
  {
    name: "Create Campaign",
    href: "/campaign/create",
    Icon: Create,
  },
  {
    name: "Profile",
    href: "/profile",
    Icon: User,
  },
];
