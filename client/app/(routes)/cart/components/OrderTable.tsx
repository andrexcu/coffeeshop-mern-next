import { ProductType, UserType } from "@/lib/types";
import React from "react";
import CartItem from "./CartItem";

type OrderTableType = {
  productsInCart: ProductType[] | undefined;
  totalItems: number
  totalPrice: number | undefined
};

const OrderTable = ({ productsInCart, totalItems, totalPrice }: OrderTableType) => {
  return (
    <table className="w-full my-8 table-fixed">
      <thead className="bg-[#cda45e]">
        <tr className="">
          <th className="text-start p-4 w-1/2">Product</th>
          <th className="text-start w-1/6">Quantity</th>
          <th className="text-start w-1/6">Price</th>
          <th className="text-start w-1/4"></th>
        </tr>
      </thead>
      <tbody className="">
        <>
          {productsInCart?.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </>
      </tbody>
      <tfoot className="">
        <tr>
          <td className="text-end p-4  col-span-4 bg-zinc-950" colSpan={3}></td>
          <td className="bg-[#cda45e] p-2">
            <div className="flex items-center justify-between">
              <p>Items: </p> <p>{totalItems}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Order Total:</p> <p>${totalPrice}</p>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default OrderTable;
