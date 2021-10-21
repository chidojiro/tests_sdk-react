import { Spin } from "antd";
import classNames from "classnames";

type Props = {
  show?: boolean;
};

const Loading = ({ show }: Props) => {
  if (!show) return null;

  return (
    <div
      className={classNames(
        "w-screen h-screen bg-black bg-opacity-20",
        "fixed top-0 left-0 z-50",
        "flex items-center justify-center"
      )}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
