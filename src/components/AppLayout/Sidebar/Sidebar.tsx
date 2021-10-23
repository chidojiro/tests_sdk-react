import {
  useFilter,
  useRangeFilter,
  useSearchContext,
} from "@sajari/react-hooks";
import { Rate, Slider } from "antd";
import React from "react";
import { CheckboxGroup, CheckboxOption, FilterBox } from "components";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Sidebar = (props: Props) => {
  const { searched } = useSearchContext();

  const categoryFilter = useFilter("level1");
  const brandFilter = useFilter("brand");
  const priceFilter = useRangeFilter("price");
  const ratingFilter = useFilter("rating");

  return (
    <div
      {...props}
      className="flex-shrink-0 h-full px-4 py-2 overflow-auto border-r border-gray-100 border-solid w-72"
    >
      <FilterBox>
        <FilterBox.Title>Category</FilterBox.Title>
        <CheckboxGroup
          value={categoryFilter.selected}
          onChange={(value) => categoryFilter.setSelected(value as string[])}
        >
          {!!searched &&
            categoryFilter.options.slice(0, 10).map(({ count, label }) => (
              <FilterBox.Item
                key={label}
                item={{
                  control: (
                    <>
                      <CheckboxOption
                        name="category"
                        className="mr-2"
                        value={label}
                      />
                      <div>{label}</div>
                    </>
                  ),
                  count,
                }}
              />
            ))}
        </CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <FilterBox.Title>Brand</FilterBox.Title>
        <CheckboxGroup
          value={brandFilter.selected}
          onChange={(value) => brandFilter.setSelected(value as string[])}
        >
          {!!searched &&
            brandFilter.options.slice(0, 10).map(({ count, label }) => (
              <FilterBox.Item
                key={label}
                item={{
                  control: (
                    <>
                      <CheckboxOption
                        name="brand"
                        className="mr-2"
                        value={label}
                      />
                      <div>{label}</div>
                    </>
                  ),
                  count,
                }}
              />
            ))}
        </CheckboxGroup>
      </FilterBox>

      <FilterBox>
        <FilterBox.Title>Price</FilterBox.Title>
        {!!searched && !!priceFilter.max && !!priceFilter.min && (
          <div>
            <div className="flex justify-between text-xs">
              <div>{priceFilter.min}</div>
              <div>{priceFilter.max}</div>
            </div>
            <Slider
              value={priceFilter.range || [priceFilter.min, priceFilter.max]}
              onChange={(value) => priceFilter.setRange(value)}
              range
              max={priceFilter.max}
              min={priceFilter.min}
            />
          </div>
        )}
      </FilterBox>

      <FilterBox>
        <FilterBox.Title>Rating</FilterBox.Title>
        <CheckboxGroup
          value={ratingFilter.selected}
          onChange={(value) => ratingFilter.setSelected(value as string[])}
        >
          {!!searched &&
            ratingFilter.options.map(({ count, label }) => (
              <FilterBox.Item
                key={label}
                item={{
                  control: (
                    <>
                      <CheckboxOption
                        name="rating"
                        className="mr-2"
                        value={label}
                      />
                      <Rate className="pointer-events-none" value={+label} />
                    </>
                  ),
                  count,
                }}
              />
            ))}
        </CheckboxGroup>
      </FilterBox>
    </div>
  );
};

export default Sidebar;
