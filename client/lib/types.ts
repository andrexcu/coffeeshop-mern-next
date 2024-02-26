export interface UserType {
  _id?: string;
  email?: string;
  username?: string;
  isAdmin?: boolean;
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
}
