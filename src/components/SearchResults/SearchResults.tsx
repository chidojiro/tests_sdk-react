import {
  useFilter,
  useRangeFilter,
  useSearchContext,
  useSorting,
} from "@sajari/react-hooks";
import { Select } from "antd";
import isEqual from "lodash/isEqual";
import React from "react";
import { useScrollToTop } from "hooks";
import Item from "./Item";
import Styled from "./SearchResult.styled";

const sortOptions = [
  { label: "Most relevant", value: "" },
  { label: "Popularity", value: "popularity" },
  { label: "Rating: Low to High", value: "rating" },
  { label: "Rating: High to Low", value: "-rating" },
];

const SearchResults = () => {
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const { totalResults, results, resultsPerPage, page, setPage } =
    useSearchContext();

  const categoryFilter = useFilter("level1");
  const brandFilter = useFilter("brand");
  const priceFilter = useRangeFilter("price");
  const ratingFilter = useFilter("rating");

  useScrollToTop(resultsRef, [page]);

  const sorting = useSorting();

  const isAllPrice = isEqual(priceFilter.range, [
    priceFilter.min,
    priceFilter.max,
  ]);

  const handleMultiFilterTagCloseClick = (
    filter: typeof categoryFilter | typeof brandFilter | typeof ratingFilter,
    value: string
  ) => {
    const remainingFilters = filter.selected.filter((v) => v !== value);

    filter.setSelected(remainingFilters);
  };

  const handleRangeFilterTagCloseClick = () => {
    priceFilter.setRange([priceFilter.min, priceFilter.max]);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0 px-2 py-4 font-semibold border-b border-gray-200 border-solid">
        <div>{totalResults} items</div>
        <Select
          className="w-48"
          options={sortOptions}
          value={sorting.sorting}
          onChange={(v) => sorting.setSorting(v, true)}
        />
      </div>
      <div className="flex mt-2">
        {categoryFilter.selected.map((value) => (
          <Styled.Tag
            key={value}
            closable
            onClose={() =>
              handleMultiFilterTagCloseClick(categoryFilter, value)
            }
          >
            {value}
          </Styled.Tag>
        ))}
        {brandFilter.selected.map((value) => (
          <Styled.Tag
            key={value}
            closable
            onClose={() => handleMultiFilterTagCloseClick(brandFilter, value)}
          >
            {value}
          </Styled.Tag>
        ))}
        {!isAllPrice && (
          <Styled.Tag closable onClose={handleRangeFilterTagCloseClick}>
            {priceFilter.range?.[0]} - {priceFilter.range?.[1]}
          </Styled.Tag>
        )}
        {ratingFilter.selected.map((value) => (
          <Styled.Tag
            key={value}
            closable
            onClose={() => handleMultiFilterTagCloseClick(ratingFilter, value)}
          >
            {value} star(s)
          </Styled.Tag>
        ))}
      </div>
      <div ref={resultsRef} className="flex-1 overflow-auto">
        {results?.map((result) => (
          <Item item={result} key={result.values._id as string} />
        ))}
      </div>
      <Styled.Pagination
        className="flex items-center justify-between px-2 pt-4 pb-2 shadow-2xl"
        total={totalResults}
        pageSize={resultsPerPage}
        current={page}
        onChange={setPage}
        showTotal={(total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
};

export default SearchResults;
