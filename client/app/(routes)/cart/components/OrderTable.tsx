import { ProductType, UserType } from "@/lib/types";
import React from "react";
import CartItem from "./CartItem";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"


type OrderTableType = {
  productsInCart: ProductType[] | undefined;
  totalItems: number;
  totalPrice: number;
};

const OrderTable = ({
  productsInCart,
  totalItems,
  totalPrice,
}: OrderTableType) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[700px] w-full">
        <thead className="bg-[#cda45e]">
          <tr className="">
            <th className="text-start p-4 w-1/2 flex-1">Product</th>
            <th className="text-start flex-1">Quantity</th>
            <th className="text-start flex-1">Price</th>
            <th className="text-start flex-1"></th>
          </tr>
        </thead>
        <TableBody className="">
          <>
            {productsInCart?.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </>
        </TableBody>
        <TableFooter className="">
          <TableRow>
             <TableCell colSpan={3} className="bg-[#cda45e]">Total</TableCell>
             <TableCell className="text-right bg-[#cda45e]">${totalPrice}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrderTable;
