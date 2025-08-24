export type GeneralInfo = {
    lugar: string;
    fecha: string;
    receptor: string;
    otros?: string;
};

export type ProducerInfo = {
    first_name: string;
    last_name: string;
    id_number?: string;
    phone?: string;
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

export type AppState = {
    general: GeneralInfo | null;
    producer: ProducerInfo | null;
    products: Product[];
    sortColumn: string | null;
    sortDirection: 'asc' | 'desc';
    setGeneral: (g: GeneralInfo) => void;
    setProducer: (p: ProducerInfo) => void;
    addProduct: (p: Omit<Product, 'id'>) => void;
    removeProduct: (id: string) => void;
    updateProduct: (updated: Product) => void;
    clearAll: () => void;
    setSort: (column: string, direction: 'asc' | 'desc') => void;
};

export type ProductForm = Omit<Product, 'id'> & { 
    usePercentage: boolean;
    percentage: number
};

export type EditProductModalProps = {
  product: Product;
  onConfirm: (updated: Product) => void;
  onCancel: () => void;
};
