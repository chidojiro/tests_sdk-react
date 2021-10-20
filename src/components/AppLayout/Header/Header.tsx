import { useAutocomplete, useSearch } from "@sajari/react-hooks";
import { AutoComplete } from "antd";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Header = (props: Props) => {
  const [query, setQuery] = React.useState("");
  const { search } = useSearch();
  const { suggestions, search: searchInstant } = useAutocomplete();

  const handleQueryChange = (v: string) => {
    setQuery(v);
    searchInstant(v);
  };

  return (
    <div
      {...props}
      className="flex items-center flex-shrink-0 w-full bg-green-300 h-14"
    >
      <div className="flex items-center w-full px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-center bg-white rounded-full cursor-pointer w-11 h-11">
          <img src="/logo192.png" alt="" className="w-8 h-8" />
        </div>
        <div className="flex justify-center flex-1">
          <AutoComplete
            className="w-80"
            value={query}
            onChange={handleQueryChange}
            options={suggestions.map((value) => ({ label: value, value }))}
            onSelect={(value) => {
              search(value);
            }}
            placeholder="keywords"
          ></AutoComplete>
        </div>
      </div>
    </div>
  );
};

export default Header;
