// import { CartItem } from "@/context/ShoppingCartContext";

// export async function mergeAnonymousCartIntoUserCart(userId: string) {
//     const localCartId = cookies().get("localCartId")?.value;

//     const localCart = localCartId
//       ? await prisma.cart.findUnique({
//           where: { id: localCartId },
//           include: { items: true },
//         })
//       : null;

//     if (!localCart) return;

//     const userCart = await prisma.cart.findFirst({
//       where: { userId },
//       include: { items: true },
//     });

//     await prisma.$transaction(async (tx) => {
//       if (userCart) {
//         const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

//         await tx.cartItem.deleteMany({
//           where: { cartId: userCart.id },
//         });

//         await tx.cartItem.createMany({
//           data: mergedCartItems.map((item) => ({
//             cartId: userCart.id,
//             productId: item.productId,
//             quantity: item.quantity,
//           })),
//         });
//       } else {
//         await tx.cart.create({
//           data: {
//             userId,
//             items: {
//               createMany: {
//                 data: localCart.items.map((item) => ({
//                   productId: item.productId,
//                   quantity: item.quantity,
//                 })),
//               },
//             },
//           },
//         });
//       }

//       await tx.cart.delete({
//         where: { id: localCart.id },
//       });
//       // throw Error("Transaction failed");
//       cookies().set("localCartId", "");
//     });
//   }

//   function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
//     return cartItems.reduce((acc, items) => {
//       items.forEach((item) => {
//         const existingItem = acc.find((i) => i.productId === item.productId);
//         if (existingItem) {
//           existingItem.quantity += item.quantity;
//         } else {
//           acc.push(item);
//         }
//       });
//       return acc;
//     }, [] as CartItem[]);
//   }
