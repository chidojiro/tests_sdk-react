type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Content = (props: Props) => {
  return <div {...props} className="flex-1 px-4 py-2"></div>;
};

export default Content;
