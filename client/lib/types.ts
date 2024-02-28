export interface UserType {
  _id?: string;
  email?: string;
  username?: string;
  isAdmin?: boolean;
}
export enum ProductTypeEnum {
  Classic = "classic",
  Choco = "choco",
  Mocha = "mocha",
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  popular?: boolean;
  onMenu?: boolean;
  special?: boolean;
  type?: ProductTypeEnum;
  description?: string;
  details?: string;
}
