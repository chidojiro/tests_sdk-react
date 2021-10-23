import { DeleteOutlined } from "@ant-design/icons";
import { Image, Modal, ModalProps, Table } from "antd";
import React from "react";
import { CartApis } from "apis";
import { CheckboxGroup, CheckboxOption } from "components";
import { useCart } from "hooks";
import { Product } from "types";

type Props = ModalProps;

const CartModal = (props: Props) => {
  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);

  const { data: cart, mutate } = useCart();

  const productCount = cart.items.reduce((acc, cur) => acc + cur.count, 0);

  const handleDeleteClick = async (productId: string) => {
    const newCart = await CartApis.remove(productId);

    mutate(newCart);
  };

  const columns = [
    {
      title: "",
      dataIndex: "select",
      render: (id: string) => <CheckboxOption value={id} />,
      width: 50,
    },
    {
      title: `All (${productCount} items)`,
      dataIndex: "name",
      render: ({ image, name }: Product) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-20 h-20 mr-2">
            <Image
              preview={false}
              src={image}
              className="object-contain w-20 h-20"
            />
          </div>
          <div>{name}</div>
        </div>
      ),
      width: 500,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "count",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "",
      dataIndex: "action",
      render: (id: string) => (
        <DeleteOutlined
          onClick={() => handleDeleteClick(id)}
          className="transform -translate-y-0.5"
        />
      ),
      width: 50,
    },
  ];

  const data = cart.items.map(({ details, count }) => {
    return {
      select: details.id,
      name: details,
      price: details.price,
      count,
      total: details.price * count,
      action: details.id,
    };
  });

  return (
    <Modal
      {...props}
      title="Cart"
      centered
      width={1000}
      okText="Checkout"
      onOk={() => alert("not gonna be developed!")}
    >
      <CheckboxGroup
        value={selectedProducts}
        onChange={(products) => setSelectedProducts(products as Product[])}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </CheckboxGroup>
    </Modal>
  );
};

export default CartModal;
