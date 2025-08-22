export type GeneralInfo = {
    lugar: string;
    fecha: string;
    receptor: string;
    otros?: string;
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
    clearAll: () => void;
    setSort: (column: string, direction: 'asc' | 'desc') => void;
};
