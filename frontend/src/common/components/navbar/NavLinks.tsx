import { Tooltip } from "@chakra-ui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { pages } from "./page";

type Props = {
  className?: string;
  iconClassName?: string;
  showName?: boolean;
  showTooltip?: boolean;
  activeClassName?: string;
};

export const NavLinks: React.FC<Props> = ({
  className,
  iconClassName,
  showName = false,
  showTooltip = false,
  activeClassName,
}) => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <>
      {pages.map(({ name, href, Icon }) => (
        <Tooltip
          key={name}
          label={showTooltip && name}
          placement="right"
          ml={2}
        >
          <Link
            href={href}
            className={clsx(
              "p-2 text-gray-400",
              currentPath === href && activeClassName,
              showName && "flex items-center justify-center gap-2",
              className
            )}
          >
            <Icon className={iconClassName} />
            {showName && (
              <span className="text-base font-semibold">{name}</span>
            )}
          </Link>
        </Tooltip>
      ))}
    </>
  );
};
