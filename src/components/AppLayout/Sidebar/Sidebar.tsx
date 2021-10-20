import {
  useFilter,
  useRangeFilter,
  useSearchContext,
} from "@sajari/react-hooks";
import { Rate } from "antd";
import { CheckboxOption, FilterBox, Form } from "../..";

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
      className="h-full px-4 py-2 overflow-auto border-r border-gray-100 border-solid w-72"
    >
      <Form.CheckboxGroup name="category">
        <FilterBox>
          <FilterBox.Title>Category</FilterBox.Title>
          {!!searched &&
            categoryFilter.options
              .slice(0, 10)
              .map(({ count, label, value }) => (
                <FilterBox.Item
                  item={{
                    control: (
                      <>
                        <CheckboxOption
                          name="category"
                          className="mr-2"
                          value={value}
                        />
                        <div>{label}</div>
                      </>
                    ),
                    count,
                  }}
                />
              ))}
        </FilterBox>
      </Form.CheckboxGroup>

      <Form.CheckboxGroup name="brand">
        <FilterBox>
          <FilterBox.Title>Brand</FilterBox.Title>
          {!!searched &&
            brandFilter.options.slice(0, 10).map(({ count, label, value }) => (
              <FilterBox.Item
                item={{
                  control: (
                    <>
                      <CheckboxOption
                        name="brand"
                        className="mr-2"
                        value={value}
                      />
                      <div>{label}</div>
                    </>
                  ),
                  count,
                }}
              />
            ))}
        </FilterBox>
      </Form.CheckboxGroup>

      <Form.CheckboxGroup name="price">
        <FilterBox>
          <FilterBox.Title>Price</FilterBox.Title>
          {!!searched && !!priceFilter.max && !!priceFilter.min && (
            <div>
              <div className="flex justify-between">
                <div>{priceFilter.min}</div>
                <div>{priceFilter.max}</div>
              </div>
              <Form.Slider
                name="price"
                defaultValue={[0, 5000]}
                range
                max={priceFilter.max}
                min={priceFilter.min}
              />
            </div>
          )}
        </FilterBox>
      </Form.CheckboxGroup>

      <Form.CheckboxGroup name="rating">
        <FilterBox>
          <FilterBox.Title>Rating</FilterBox.Title>
          {!!searched &&
            ratingFilter.options.map(({ count, label, value }) => (
              <FilterBox.Item
                item={{
                  control: (
                    <>
                      <CheckboxOption
                        name="rating"
                        className="mr-2"
                        value={value}
                      />
                      <Rate className="pointer-events-none" value={+label} />
                    </>
                  ),
                  count,
                }}
              />
            ))}
        </FilterBox>
      </Form.CheckboxGroup>
    </div>
  );
};

export default Sidebar;
