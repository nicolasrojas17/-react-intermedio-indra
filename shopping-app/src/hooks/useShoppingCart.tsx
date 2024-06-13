import { useCallback, useEffect, useState } from "react";
import { ProductCart } from "../components/App";
import { Product } from "../interfaces/Product";
import { getProducts } from "../services/productService";

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const [category, setCategory] = useState<string>("");

  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const fetchProducts = useCallback(async () => {
    await getProducts(setProducts, setIsLoading);
  }, []);

  const handleRemoveCategory = () => setCategory("");
  const handleRemoveSearch = () => {
    setSearch("");
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleRemoveAllItemsCart = (productId: number) => {
    setShoppingCart(shoppingCart.filter((item) => item.product.id !== productId));
    return;
  };

  const handleAddProductToCart = (product: Product, amount: number) => {
    const productFind = shoppingCart.find((item) => item.product.id === product.id);
    if (!productFind) {
      setShoppingCart([...shoppingCart, { product, amount }]);
      return;
    }
    setShoppingCart(
      shoppingCart.map((item) => {
        return item.product.id === product.id
          ? { ...item, amount: productFind.amount ? productFind.amount + amount : amount }
          : item;
      })
    );
  };

  const handleRemoveProductFromCart = (productId: number) => {
    const productFind = shoppingCart.find((item) => item.product.id === productId);
    if (!productFind) {
      return;
    }
    if (productFind.amount === 1) {
      setShoppingCart(shoppingCart.filter((item) => item.product.id !== productId));
      return;
    }
    setShoppingCart(
      shoppingCart.map((item) => {
        return item.product.id === productId ? { ...item, amount: productFind.amount ? productFind.amount - 1 : 0 } : item;
      })
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => setProductsFiltered(products), [products]);

  useEffect(() => {
    const categoriesSearch = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categoriesSearch)];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let filtered = products;
    if (category) filtered = filtered.filter((product) => product.category === category);
    if (search) filtered = filtered.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    setProductsFiltered(filtered);
  }, [category, products, search]);

  return [
    shoppingCart,
    isLoading,
    categories,
    productsFiltered,
    category,
    search,
    setShoppingCart,
    setSearch,
    setCategory,
    handleRemoveCategory,
    handleRemoveSearch,
    handleRemoveAllItemsCart,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  ] as const;
};

export default useShoppingCart;
