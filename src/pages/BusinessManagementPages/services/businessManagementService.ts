// Business Management Page Services
// This file provides client-side services for business management operations

export interface BusinessInfo {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  description: string;
  logo?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class BusinessManagementService {
  private baseUrl = '/api/business';

  /**
   * Load business information
   */
  async loadBusinessInfo(businessId?: string): Promise<ApiResponse<BusinessInfo>> {
    try {
      const url = businessId ? `${this.baseUrl}/${businessId}` : this.baseUrl;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error loading business info:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Save business information
   */
  async saveBusinessInfo(businessInfo: BusinessInfo): Promise<ApiResponse<BusinessInfo>> {
    try {
      const url = businessInfo.id ? `${this.baseUrl}/${businessInfo.id}` : this.baseUrl;
      const method = businessInfo.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error saving business info:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Delete business information
   */
  async deleteBusinessInfo(businessId: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${businessId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error deleting business info:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Upload business logo
   */
  async uploadLogo(file: File): Promise<ApiResponse<string>> {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch(`${this.baseUrl}/logo`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data.url,
      };
    } catch (error) {
      console.error('Error uploading logo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get business hours
   */
  async getBusinessHours(businessId: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/${businessId}/hours`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error loading business hours:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Update business hours
   */
  async updateBusinessHours(businessId: string, hours: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/${businessId}/hours`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hours),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error updating business hours:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Export singleton instance
export const businessManagementService = new BusinessManagementService();
export default businessManagementService;