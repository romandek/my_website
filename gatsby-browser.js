import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Footnotes from "./src/components/Footnotes";

const components = {
  wrapper: ({ children, ...props }) => {
    const updatedChildren = children.map(child => {
      if (child.props.className === "footnotes") {
        // Since we only have one element that will ever match this
        // the key doesn't matter, but react will yell without a key.
        return <Footnotes key={1} data = {child} />;
      }
      return child;
    });
    console.log(children)
    return <>{updatedChildren}</>;
  }
};
export const wrapPageElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};