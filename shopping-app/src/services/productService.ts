import { Product } from "../interfaces/Product";
import { generateDiscount, transformPrice } from "../util/utils";

export const getProducts = async (setProducts: (products: any) => void, setIsLoading: (val: boolean) => void) => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) =>
      json.map((product: any) => {
        const priceCol = transformPrice(product.price);
        const discount = generateDiscount(priceCol);
        const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
        return { ...product, discount, price: priceCol, priceDiscount: priceWithDiscount };
      })
    )
    .then((json) => setProducts(json))
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
};

export const getCategories = async (setCategories: (categories: string[]) => void) => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => setCategories(json))
    .catch((error) => console.error(error));
};

export const getProductByCategory = async (
  category: string,
  setProducts: (products: any) => void,
  setIsLoading: (val: boolean) => void
) => {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) =>
      json.map((product: any) => {
        const priceCol = transformPrice(product.price);
        const discount = generateDiscount(priceCol);
        const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
        return { ...product, discount, price: priceCol, priceDiscount: priceWithDiscount };
      })
    )
    .then((json) => setProducts(json))
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
};

export const getProductById = async (
  productId: string,
  setProduct: (product: Product) => void,
  setProductsByCategory: (products: Product[]) => void,
  setIsLoading: (val: boolean) => void
) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => {
      const priceCol = transformPrice(json.price);
      const discount = generateDiscount(priceCol);
      const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
      setProduct({ ...json, discount, price: priceCol, priceDiscount: priceWithDiscount });
      return getProductByCategory(json.category, setProductsByCategory, setIsLoading);
    })
    .then((json: any) =>
      json?.map((product: any) => {
        const priceCol = transformPrice(product.price);
        const discount = generateDiscount(priceCol);
        const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
        return { ...product, discount, price: priceCol, priceDiscount: priceWithDiscount };
      })
    )
    .then((json) => setProductsByCategory(json))
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
};
