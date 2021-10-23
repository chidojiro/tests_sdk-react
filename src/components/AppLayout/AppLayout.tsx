import Content from "./Content";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import { useSearchContext } from "@sajari/react-hooks";
import { Loading } from "components";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const AppLayout = (props: Props) => {
  const { searched } = useSearchContext();

  return (
    <div>
      <Loading show={!searched} />
      <div
        {...props}
        className="flex flex-col w-screen h-screen overflow-hidden bg-gray-100"
      ></div>
    </div>
  );
};

export default AppLayout;

AppLayout.Content = Content;
AppLayout.Sidebar = Sidebar;
AppLayout.Header = Header;
AppLayout.Body = Body;
