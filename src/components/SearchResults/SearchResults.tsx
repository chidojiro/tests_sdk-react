import { useSearchContext } from "@sajari/react-hooks";
import { Form } from "../../components";
import Item from "./Item";

const sortOptions = [
  { label: "Most relevant", value: "" },
  { label: "Popularity", value: "popularity" },
  { label: "Rating: Low to High", value: "rating" },
  { label: "Rating: High to Low", value: "-rating" },
];

const SearchResults = () => {
  const { totalResults, results } = useSearchContext();

  console.log(results);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0 px-2 py-2 font-semibold border-b border-gray-200 border-solid ">
        <div>{totalResults} items</div>
        <Form.Select name="sortBy" className="w-48" options={sortOptions} />
      </div>
      <div className="flex-1 overflow-auto">
        {results?.map((result) => (
          <Item item={result} key={result.values._id as string} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
