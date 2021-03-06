import { isNumber } from "@sajari/react-sdk-utils";
import * as React from "react";

import { useContext } from "../ContextProvider";
import { UseResultsPerPageResult } from "./types";

function useResultsPerPage(): UseResultsPerPageResult {
  const {
    search: {
      search,
      config: { resultsPerPageParam },
      variables,
    },
  } = useContext();

  const setResultsPerPage = React.useCallback(
    (size: number) => {
      variables.set({ [resultsPerPageParam]: size });
      console.log(resultsPerPageParam);
      search();
    },
    [variables, search]
  );

  const resultsPerPage = parseInt(variables.get()[resultsPerPageParam], 10);

  return {
    resultsPerPage: isNumber(resultsPerPage) ? resultsPerPage : 15,
    setResultsPerPage,
  };
}

export default useResultsPerPage;
export * from "./types";
