import { createContext, useContext, useMemo, useState, type ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type GeneralInfo = {
  lugar: string;
  fecha: string; // yyyy-mm-dd
  receptor: string;
  otros?: string | undefined;
};

export type ProducerInfo = {
  nombre: string;
  apellido: string;
  documento?: string;
  telefono?: string;
  email?: string;
};

export type Product = {
  id: string;
  code?: string;
  detail: string;
  amount: number;
  cost_price: number;
  sale_price: number;
};

type AppState = {
  general: GeneralInfo | null;
  producer: ProducerInfo | null;
  products: Product[];
  setGeneral: (g: GeneralInfo) => void;
  setProducer: (p: ProducerInfo) => void;
  addProduct: (p: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  clearAll: () => void;
};

const Ctx = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [general, setGeneralState] = useState<GeneralInfo | null>(() => {
    const s = localStorage.getItem('pt_general');
    return s ? JSON.parse(s) : null;
  });
  const [producer, setProducerState] = useState<ProducerInfo | null>(() => {
    const s = localStorage.getItem('pt_producer');
    return s ? JSON.parse(s) : null;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const s = localStorage.getItem('pt_products');
    return s ? JSON.parse(s) : [];
  });

  useEffect(() => { localStorage.setItem('pt_general', JSON.stringify(general)); }, [general]);
  useEffect(() => { localStorage.setItem('pt_producer', JSON.stringify(producer)); }, [producer]);
  useEffect(() => { localStorage.setItem('pt_products', JSON.stringify(products)); }, [products]);

  const setGeneral = (g: GeneralInfo) => setGeneralState(g);
  const setProducer = (p: ProducerInfo) => setProducerState(p);
  const addProduct = (p: Omit<Product, 'id'>) => setProducts(prev => [...prev, { ...p, id: uuidv4() }]);
  const removeProduct = (id: string) => setProducts(prev => prev.filter(x => x.id !== id));
  const clearAll = () => {
    setGeneralState(null);
    setProducerState(null);
    setProducts([]);
    localStorage.removeItem('pt_general');
    localStorage.removeItem('pt_producer');
    localStorage.removeItem('pt_products');
  };

  const value = useMemo(
    () => ({ general, producer, products, setGeneral, setProducer, addProduct, removeProduct, clearAll }),
    [general, producer, products]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
