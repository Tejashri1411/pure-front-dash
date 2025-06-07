
export interface Product {
  id: string;
  name: string;
  brand?: string;
  type?: string;
  vintage?: string;
  sugarContent?: string;
  netVolume?: string;
  alcohol?: string;
  country?: string;
  sku?: string;
  ean?: string;
  appellation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  eNumber?: string;
  allergen?: string;
  allergens?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
