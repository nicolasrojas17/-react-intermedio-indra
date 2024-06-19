import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../interfaces/Product";
import { getCategories, getProducts } from "../services/productService";

export interface StoreContextValue {
  products: Product[];
  productsFiltered: Product[];
  isLoading: boolean;
  categories: string[];
  category: string;
  search: string;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  handleRemoveCategory: () => void;
  handleRemoveSearch: () => void;
  handleChangeCategory: (event: any) => void;
  handleDeleteProduct: (id: number) => void;
  handleAddProduct: (product: Product) => void;
}

export const StoreContext = createContext<StoreContextValue>(null as any);

const StoreContextProvider = ({ children }: any) => {
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

  const fetchCategories = useCallback(async () => {
    await getCategories(setCategories);
  }, []);

  const handleRemoveCategory = () => setCategory("");

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value as string);
  };

  const handleRemoveSearch = () => {
    setSearch("");
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleAddProduct = useCallback(
    (product: Product) => {
      product = { ...product, id: products.length + 2 };
      const newProducts = [...products, product];
      setProducts(newProducts);
      setProductsFiltered(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
      if (!categories.includes(product.category)) {
        setCategories([...categories, product.category]);
        localStorage.setItem("categories", JSON.stringify([...categories, product.category]));
      }
    },
    [products, categories]
  );

  const handleDeleteProduct = useCallback(
    (id: number) => {
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
      setProductsFiltered(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
    },
    [products]
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => setProductsFiltered(products), [products]);

  useEffect(() => {
    let filtered = products;
    if (category) filtered = filtered.filter((product) => product.category === category);
    if (search) filtered = filtered.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    setProductsFiltered(filtered);
  }, [category, products, search]);

  const objStore = useMemo(
    () => ({
      products,
      productsFiltered,
      isLoading,
      categories,
      category,
      search,
      setCategory,
      setSearch,
      handleRemoveCategory,
      handleRemoveSearch,
      handleChangeCategory,
      handleDeleteProduct,
      handleAddProduct,
    }),
    [
      products,
      productsFiltered,
      isLoading,
      categories,
      category,
      search,
      setCategory,
      setSearch,
      handleDeleteProduct,
      handleAddProduct,
    ]
  );

  return <StoreContext.Provider value={objStore}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
