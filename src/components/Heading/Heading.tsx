import { FC, ElementType } from "react";

import { HeadingProps } from "./types";

import s from "./Heading.module.css";

export const Heading: FC<HeadingProps> = ({ children, level }) => {
  const Tag: ElementType = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={s.title}>{children}</Tag>;
};
