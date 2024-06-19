import { Product } from "../interfaces/Product";
import { generateDiscount, transformPrice } from "../util/utils";

export const getProducts = async (setProducts: (products: any) => void, setIsLoading: (val: boolean) => void) => {
  if (localStorage.getItem("products")) {
    const products = JSON.parse(localStorage.getItem("products") ?? "");
    setProducts(products);
    setIsLoading(false);
    return;
  }

  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((json) =>
      json.map((product: any) => {
        const priceCol = transformPrice(product.price);
        const discount = generateDiscount(priceCol);
        const priceWithDiscount = discount > 0 ? priceCol - (priceCol * (discount / 100)) : priceCol;
        return { ...product, discount, price: priceCol, priceDiscount: priceWithDiscount };
      })
    )
    .then((json) => {
      localStorage.setItem("products", JSON.stringify(json));
      setProducts(json);
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
};

export const getCategories = async (setCategories: (categories: string[]) => void) => {
  if (localStorage.getItem("categories")) {
    const categories = JSON.parse(localStorage.getItem("categories") ?? "");
    setCategories(categories);
    return;
  }
  fetch(`https://fakestoreapi.com/products/categories`)
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem("categories", JSON.stringify(json));
      setCategories(json);
    })
    .catch((error) => console.error(error));
};

export const getProductById = async (
  productId: string,
  setProduct: (product: Product) => void,
  setProductsByCategory: (products: Product[]) => void,
  setIsLoading: (val: boolean) => void
) => {
  if (localStorage.getItem("products")) {
    const products = JSON.parse(localStorage.getItem("products") ?? "");
    const product = products.find((product: any) => product.id === parseInt(productId));
    setProduct(product);
    getProductByCategory(product.category).then((json) => setProductsByCategory(json));
    setIsLoading(false);
  }
};

export const getProductByCategory = async (category: string) => {
  const products = JSON.parse(localStorage.getItem("products") ?? "");
  return products.filter((product: any) => product.category === category);
};
