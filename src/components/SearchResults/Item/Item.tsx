import { Result } from "@sajari/sdk-js";
import { Button, Image, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { item: Result };

const Item = ({
  item: {
    values: { description, price, rating, url, name, categories },
  },
  ...restProps
}: Props) => {
  return (
    <div {...restProps} className="flex items-center px-2 py-6">
      <Image className="w-20 h-20" src={url as string} />
      <div className="px-4">
        <h3>{name}</h3>
        <div>Category: {(categories as string[]).join(", ")}</div>
        <Rate value={+rating} className="my-2" />
        <div className="h-10 overflow-hidden overflow-ellipsis">
          {description}
        </div>
      </div>
      <div>
        <div className="font-semibold text-center">{`$${price}`}</div>
        <Button type="primary" className="w-full">
          <ShoppingCartOutlined />
          Add to card
        </Button>
      </div>
    </div>
  );
};

export default Item;
