import { createContext, useState, type ReactNode, useContext } from "react";
interface ProducerData {
  ciudad: string;
  fecha: string;
  productor: string;
  otros: string;
}
interface Product {
  detalle: string;
  cantidad: number;
  precioCosto: number;
  precioVenta: number;
}
interface FormState {
  producerData: ProducerData;
  products: Product[];
}
interface FormContextProps {
  data: FormState;
  setProducerData: (data: ProducerData) => void;
  addProduct: (product: Product) => void;
  updateProduct: (index: number, product: Product) => void;
  removeProduct: (index: number) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormState>({
    producerData: { ciudad: "", fecha: "", productor: "", otros: "" },
    products: [],
  });

  const setProducerData = (producerData: ProducerData) => {
    setData(prev => ({ ...prev, producerData }));
  };

  const addProduct = (product: Product) => {
    setData(prev => ({ ...prev, products: [...prev.products, product] }));
  };

  const updateProduct = (index: number, product: Product) => {
    setData(prev => {
      const newProducts = [...prev.products];
      newProducts[index] = product;
      return { ...prev, products: newProducts };
    });
  };

  const removeProduct = (index: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  return (
    <FormContext.Provider value={{ data, setProducerData, addProduct, updateProduct, removeProduct }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be inside FormProvider");
  return ctx;
};
