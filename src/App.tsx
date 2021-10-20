import {
  FieldDictionary,
  FilterBuilder,
  Pipeline,
  RangeFilterBuilder,
  SearchProvider,
} from "@sajari/react-hooks";
import { AppLayout, SearchResults } from "./components";

const pipeline = new Pipeline(
  {
    account: "1594153711901724220",
    collection: "bestbuy",
  },
  "query"
);

const fields = new FieldDictionary({
  title: "name",
  subtitle: (data) =>
    data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const brandFilter = new FilterBuilder({
  name: "brand",
  field: "brand",
});

const categoryFilter = new FilterBuilder({
  name: "level1",
  field: "level1",
});

const priceFilter = new RangeFilterBuilder({
  name: "price",
  field: "price",
});

const ratingFilter = new FilterBuilder({
  name: "rating",
  field: "rating",
});

function App() {
  return (
    <SearchProvider
      search={{
        pipeline,
        fields,
        filters: [categoryFilter, priceFilter, ratingFilter, brandFilter],
      }}
      searchOnLoad
    >
      <AppLayout>
        <AppLayout.Header></AppLayout.Header>
        <AppLayout.Body>
          <AppLayout.Sidebar></AppLayout.Sidebar>
          <AppLayout.Content>
            <SearchResults />
          </AppLayout.Content>
        </AppLayout.Body>
      </AppLayout>
    </SearchProvider>
  );
}

export default App;
