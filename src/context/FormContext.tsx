import { createContext, useState, type ReactNode, useContext } from 'react';
import type { ProductProps } from '../interface/ProductProps';
import type { ProducerDataProps } from '../interface/ProducerDataProps';
import type { FormContextProps } from '../interface/FormContextProps';
import type { FormStateProps } from '../interface/FormStateProps';

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormStateProps>({
    producerData: { ciudad: "", fecha: "", productor: "", otros: "" },
    products: [],
  });

  const setProducerData = (producerData: ProducerDataProps) => {
    setData(prev => ({ ...prev, producerData }));
  };

  const addProduct = (product: ProductProps) => {
    setData(prev => ({ ...prev, products: [...prev.products, product] }));
  };

  const updateProduct = (index: number, product: ProductProps) => {
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
