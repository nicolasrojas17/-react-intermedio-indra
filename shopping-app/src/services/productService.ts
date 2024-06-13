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

export const getProductById = async (
  productId: string,
  setProduct: (product: any) => void,
  setIsLoading: (val: boolean) => void
) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => {
      const priceCol = transformPrice(json.price);
      const discount = generateDiscount(priceCol);
      const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
      setProduct({ ...json, discount, price: priceCol, priceDiscount: priceWithDiscount });
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
};
