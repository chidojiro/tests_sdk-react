import { Result } from "@sajari/sdk-js";
import { Button, Image, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../../hooks";
import { CartApis } from "../../../apis";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { item: Result };

const Item = ({ item: { values }, ...restProps }: Props) => {
  const { description, price, rating, image, name, categories } = values;
  const { mutate } = useCart();

  const handleAddToCartClick = async () => {
    const cart = await CartApis.add(values as any);

    mutate(cart);
  };

  return (
    <div {...restProps} className="flex items-center px-2 py-6">
      <div className="flex-shrink-0 w-32 h-32">
        <Image
          preview={false}
          className="object-contain w-32 h-32"
          src={image as string}
        />
      </div>
      <div className="px-4">
        <h3>{name}</h3>
        <div>Category: {(categories as string[]).join(", ")}</div>

        <div className="h-10 overflow-hidden overflow-ellipsis">
          {description}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Rate value={+rating} className="text-sm pointer-events-none" />
        <div className="my-2 text-xl font-semibold text-center">{`$${price}`}</div>
        <Button
          type="primary"
          className="w-full"
          onClick={handleAddToCartClick}
        >
          <ShoppingCartOutlined className="transform -translate-y-1" />
          Add to card
        </Button>
      </div>
    </div>
  );
};

export default Item;
