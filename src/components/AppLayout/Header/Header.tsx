import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  useAutocomplete,
  useSearch,
  useSearchContext,
} from "@sajari/react-hooks";
import { AutoComplete, Badge } from "antd";
import debounce from "lodash/debounce";
import React from "react";
import { useCart } from "../../../hooks";
import CartModal from "./CartModal";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const SEARCH_DEBOUNCE_TIMEOUT = 500;

const Header = (props: Props) => {
  const { search } = useSearch();
  const { resetFilters } = useSearchContext();
  const { suggestions, search: searchInstant } = useAutocomplete();

  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);

  const debouncedSearchRef = React.useRef(
    debounce((v: string) => {
      search(v);
      searchInstant(v);
      resetFilters();
    }, SEARCH_DEBOUNCE_TIMEOUT)
  );

  const handleQueryChange = debouncedSearchRef.current;

  const { data: cart } = useCart();

  const productCount = cart.items.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <div
      {...props}
      className="flex items-center flex-shrink-0 w-full bg-green-300 shadow-2xl h-14"
    >
      <CartModal
        visible={isCartModalOpen}
        onOk={() => setIsCartModalOpen(false)}
        onCancel={() => setIsCartModalOpen(false)}
      />
      <div className="flex items-center w-full px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-center bg-white rounded-full cursor-pointer w-11 h-11">
          <img src="/logo192.png" alt="" className="w-8 h-8" />
        </div>
        <div className="flex justify-center flex-1">
          <AutoComplete
            className="w-80"
            onChange={handleQueryChange}
            options={suggestions.map((value) => ({ label: value, value }))}
            onSelect={(value) => {
              search(value);
            }}
            placeholder="keywords"
          ></AutoComplete>
        </div>
        <Badge count={productCount} className="transform translate-y-1">
          <ShoppingCartOutlined
            className="text-2xl text-white transform -translate-x-1 -translate-y-2 cursor-pointer w-7 h-7"
            onClick={() => setIsCartModalOpen(true)}
          />
        </Badge>
      </div>
    </div>
  );
};

export default Header;
