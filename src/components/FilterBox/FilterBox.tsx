import Item from "./Item";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const FilterBox = (props: Props) => {
  return <div className="flex-1 px-4 py-2" {...props}></div>;
};

export default FilterBox;

FilterBox.Title = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => <h3 {...props}>{props.children}</h3>;
FilterBox.Item = Item;
