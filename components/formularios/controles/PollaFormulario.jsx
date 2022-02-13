import React from "react";

export const PollaFormulario = (props) => {
  const { children, ...other } = props;
  return (
    <>
      <h2>Form</h2>
      <form autoComplete="off" {...other}>
        {children}
      </form>
    </>
  );
};

/* 

export const Form = (props) => {
  
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
};
*/
