export interface IReqCreateProduct {
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: number;
  price: number;
  image: string;
}

export interface IReqUpdateProduct {
  price: number
}


export interface IResProduct {
  id: number;
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: number;
  price: number;
  user_id: number;
  image: string;
  active: number;
  created_at: string;
  updated_at: null;
}

export interface IResProductCategories {
  value: number
  label: string
}
