import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../interfaces/Product";
import { getProducts } from "../services/productService";

export interface StoreContextValue {
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
}

export const StoreContext = createContext<StoreContextValue>(null as any) as React.Context<StoreContextValue>;

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

  const handleRemoveCategory = () => setCategory("");

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value as string);
  };

  const handleRemoveSearch = () => {
    setSearch("");
    window.history.pushState({}, "", window.location.pathname);
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

  const objStore = useMemo(
    () => ({
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
    }),
    [productsFiltered, isLoading, categories, category, search, setCategory, setSearch]
  );

  return <StoreContext.Provider value={objStore}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
