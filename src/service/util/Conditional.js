import React from "react";

export const IFELSE = ({ children, condition }) => {
    let Childrens = React.Children.toArray(children);

    return condition ? Childrens[0] : Childrens[2]
}

export const IF = ({ children, condition }) => {
    return condition ? children : null
}