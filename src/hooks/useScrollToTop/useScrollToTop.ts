import React from "react";
import { AssertUtils } from "utils";

const useScrollToTop = (
  refOrEle: React.RefObject<Element> | Element,
  deps: any[]
) => {
  React.useLayoutEffect(() => {
    const target = AssertUtils.isRef(refOrEle) ? refOrEle.current : refOrEle;

    target?.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useScrollToTop;
