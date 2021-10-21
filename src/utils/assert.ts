import React from "react";

const isRef = (target: any): target is React.RefObject<any> =>
  !!target?.current;

const AssertUtils = { isRef };

export default AssertUtils;
