import React from "react";
import useSWR from "swr";
import { CartApis } from "../../apis";
import { Cart } from "../../types";

const useCart = () => {
  const swrReturn = useSWR<Cart>("/cart", () => CartApis.get());

  return React.useMemo(
    () => ({ ...swrReturn, data: swrReturn.data || { id: "", items: [] } }),
    [swrReturn]
  );
};

export default useCart;
