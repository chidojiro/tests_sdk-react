type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Body = (props: Props) => {
  return (
    <div
      {...props}
      className="flex flex-1 w-full h-full mx-auto overflow-hidden bg-white shadow-xl max-w-7xl"
    ></div>
  );
};

export default Body;
