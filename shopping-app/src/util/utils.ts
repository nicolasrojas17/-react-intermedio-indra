export const generateDiscount = (price: number = 0) => {
  const priceFormat = formatPrice(price);
  const discount = priceFormat[priceFormat.length - 1];
  return discount ? parseInt(discount) * 5 : 0;
};

export const transformPrice = (price: number) => {
  return price * 3936;
};

export const formatPrice = (price: number) => {
  const COP = new Intl.NumberFormat("en-DE");
  return COP.format(price).split(",")[0];
};

export const fileToBase64 = async (file: File, setImageBase64: (file: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImageBase64(reader.result?.toString().replace(/^data:(.*,)?/, "") ?? "");
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};
