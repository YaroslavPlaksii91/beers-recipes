import { FC } from "react";

import { ContainerProps } from "./types";

import s from "./Container.module.css";

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};
