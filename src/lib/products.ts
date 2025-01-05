export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    image: "/box.png"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/box.png"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/box.png"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 29.99,
    image: "/box.png"
  }
];

