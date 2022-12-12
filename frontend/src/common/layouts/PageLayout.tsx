import { Sidebar } from "@components/navbar/Sidebar";
import { Topbar } from "@components/navbar/TopBar";
import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { Component } from "types/page";

type Props = {
  title: string;
} & Component;

export const PageLayout: React.FC<Props> = ({ title, className, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-full bg-[#101318] min-h-screen flex justify-center">
        <Sidebar />

        <div className="w-full flex flex-col items-center">
          <Topbar />

          <div
            className={clsx(
              "w-full flex-1 max-w-[1280px] px-2 py-3 md:px-5 2xl:px-0",
              className
            )}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
};
