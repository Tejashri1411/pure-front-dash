
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Products endpoints
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Ingredients endpoints
  async getIngredients() {
    return this.request('/ingredients');
  }

  async getIngredient(id: string) {
    return this.request(`/ingredients/${id}`);
  }

  async createIngredient(ingredientData: any) {
    return this.request('/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredientData),
    });
  }

  async updateIngredient(id: string, ingredientData: any) {
    return this.request(`/ingredients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ingredientData),
    });
  }

  async deleteIngredient(id: string) {
    return this.request(`/ingredients/${id}`, {
      method: 'DELETE',
    });
  }

  // Import endpoints
  async importProducts(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/products/import', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async importIngredients(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/ingredients/import', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

export const apiService = new ApiService();
