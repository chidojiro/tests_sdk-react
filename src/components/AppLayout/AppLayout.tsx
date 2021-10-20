import Content from "./Content";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Body from "./Body";
import { Form } from "../../components";
import { useForm } from "react-hook-form";
import { useSearchContext } from "@sajari/react-hooks";
import Loading from "../Loading";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const AppLayout = (props: Props) => {
  const methods = useForm();
  const { searched } = useSearchContext();

  return (
    <Form methods={methods}>
      <Loading show={!searched} />
      <div
        {...props}
        className="flex flex-col w-screen h-screen overflow-hidden bg-gray-100"
      ></div>
    </Form>
  );
};

export default AppLayout;

AppLayout.Content = Content;
AppLayout.Sidebar = Sidebar;
AppLayout.Header = Header;
AppLayout.Body = Body;
