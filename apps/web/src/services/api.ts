const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  public removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return {} as T;
    }

    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = null;
    }

    if (!response.ok) {
      // Handle standard NestJS validation/exception formats
      const errorMessage = result?.message
        ? Array.isArray(result.message)
          ? result.message.join(', ')
          : result.message
        : 'Ocorreu um erro inesperado';
      throw new Error(errorMessage);
    }

    return result as T;
  }

  // Auth Endpoints
  public async login(email: string, password: string) {
    const res = await this.request<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(res.access_token);
    return res;
  }

  public async register(email: string, password: string) {
    return this.request<{ id: number; email: string; role: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  public async getProfile() {
    return this.request<{ id: number; email: string; role: string }>('/auth/perfil');
  }

  // Trips Endpoints
  public async getTrips(destination?: string, page = 1) {
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    params.append('page', page.toString());
    
    // Response wrapped by TransformInterceptor
    const res = await this.request<{ success: boolean; data: any[] }>(`/trips?${params.toString()}`);
    return res.data;
  }

  public async getTrip(id: number) {
    const res = await this.request<{ success: boolean; data: any }>(`/trips/${id}`);
    return res.data;
  }

  public async createTrip(title: string, destination: string, startDate: string, endDate: string) {
    const res = await this.request<{ success: boolean; data: any }>('/trips', {
      method: 'POST',
      body: JSON.stringify({ title, destination, startDate, endDate }),
    });
    return res.data;
  }

  public async updateTrip(id: number, data: { title?: string; destination?: string; startDate?: string; endDate?: string }) {
    const res = await this.request<{ success: boolean; data: any }>(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data;
  }

  public async deleteTrip(id: number) {
    return this.request<void>(`/trips/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
