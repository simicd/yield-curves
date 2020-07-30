import React, { FC } from "react";

/**
 * Layout wrapper
 * @param LayoutProps Children
 */
export const Layout: FC = ({ children }) => {
  return (
    <main className="bg-white">
      {children}
    </main>
  );
};