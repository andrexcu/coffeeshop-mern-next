"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import getAllProducts from "@/actions/get-all-products";
import { ProductType } from "@/lib/types";

const page = () => {
  const { cartItems } = useShoppingCart();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, []);

  //   const items = products?.find((product) => product._id === cartItems.map(cart => cart.id));

  const getProductsInCart = () => {
    if (!products || !cartItems) {
      return [];
    }

    const productIdsInCart = cartItems.map((cartItem) => cartItem.id);
    const productsInCart = products.filter((product) =>
      productIdsInCart.includes(product._id)
    );
    return productsInCart;
  };

  const productsInCart = getProductsInCart();

  const totalPrice = productsInCart.reduce((total, product) => {
    const cartItem = cartItems.find((item) => item.id === product._id);
    if (cartItem) {
      return total + cartItem.quantity * product.price;
    }
    return total;
  }, 0);

  useEffect(() => {
    const calculateTotalItems = () => {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems();
  }, [cartItems]);

  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
      <div className="flex flex-col mt-32 w-full max-w-7xl mx-auto px-4 py-4 ">
        <div className="flex flex-col gap-2 w-full  text-white">
          {/* <CartItem product={prod}  /> */}

          <table className="w-full my-8 ">
            <thead className=" bg-[#cda45e]">
              <tr className="">
                <th className="text-start p-4">Product</th>
                <th className="text-start">Quantity</th>
                <th className="text-start ">Price</th>
                <th className="text-start "></th>
              </tr>
            </thead>
            <tbody className="">
              {productsInCart.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </tbody>
            <tfoot className="">
              <tr>
                <td
                  className="text-end p-4  col-span-4 bg-zinc-950"
                  colSpan={3}
                ></td>
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
        </div>
      </div>
    </div>
  );
};

export default page;
