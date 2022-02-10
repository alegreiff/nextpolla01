import React from "react";
import MenuSuperior from "./MenuSuperior";

export const LayoutDemo = ({ children }) => {
  return (
    <>
      <MenuSuperior />
      {children}
    </>
  );
};
