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
