export interface Product {
  _id?: string;
  name: String;
  shortDescription: String;
  Description: String;
  Price: Number;
  discount: Number;
  Images: String[];
  CategoryId: String;
  brandId: String;
  facheredproduct:boolean;
  isnewproduct:boolean;
}
