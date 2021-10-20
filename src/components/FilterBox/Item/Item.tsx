import React from "react";

export type FilterItem = { control: React.ReactNode; count: number };

type Props = { item: FilterItem };

const Item = ({ item: { control, count } }: Props) => {
  return (
    <div className="flex items-center justify-between mb-1 text-xs">
      <label className="flex items-center cursor-pointer">{control}</label>
      <div>({count})</div>
    </div>
  );
};

export default Item;
