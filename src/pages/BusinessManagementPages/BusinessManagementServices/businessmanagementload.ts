import { getCurrentUser } from 'aws-amplify/auth';

// Define the business information interface
export interface BusinessInfo {
  business_uid: string;
  business_name: string;
  restaurant_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email: string;
  website: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    google?: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      isTwentyFourHours: boolean;
    };
  };
  logo: string;
  about: string;
  features: {
    online_ordering_enabled: boolean;
    multi_language_enabled: boolean;
    auto_display_rotation: boolean;
    allow_specials: boolean;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Loads business information from the backend
 * @param businessId Optional business ID. If not provided, loads the current user's business
 * @returns Promise resolving to the business information
 */
export const loadBusinessInfo = async (businessId?: string): Promise<BusinessInfo> => {
  try {
    // Get the current authenticated user
    await getCurrentUser();
    
    // In a real implementation, this would make an API call to the backend
    // For now, we'll return mock data
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock business info
    const businessInfo: BusinessInfo = {
      business_uid: businessId || 'biz_001',
      business_name: 'Sample Restaurant Group',
      restaurant_name: 'Sample Restaurant',
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      phone: '+1-555-123-4567',
      email: 'info@samplerestaurant.com',
      website: 'https://samplerestaurant.com',
      social_links: {
        instagram: 'https://instagram.com/samplerestaurant',
        facebook: 'https://facebook.com/samplerestaurant',
        google: 'https://g.page/samplerestaurant'
      },
      hours: {
        monday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
        tuesday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
        wednesday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
        thursday: { open: '10:00', close: '22:00', isTwentyFourHours: false },
        friday: { open: '10:00', close: '23:00', isTwentyFourHours: false },
        saturday: { open: '10:00', close: '23:00', isTwentyFourHours: false },
        sunday: { open: '11:00', close: '21:00', isTwentyFourHours: false }
      },
      logo: 'assets/logo.png',
      about: 'A sample restaurant serving delicious food since 2020.',
      features: {
        online_ordering_enabled: true,
        multi_language_enabled: false,
        auto_display_rotation: false,
        allow_specials: true
      },
      created_at: '2023-01-01T12:00:00Z',
      updated_at: '2023-05-15T15:30:00Z'
    };
    
    return businessInfo;
  } catch (error) {
    console.error('Error loading business info:', error);
    throw new Error('Failed to load business information');
  }
};

/**
 * Loads business hours from the backend
 * @param businessId Optional business ID
 * @returns Promise resolving to the business hours
 */
export const loadBusinessHours = async (businessId?: string) => {
  try {
    const businessInfo = await loadBusinessInfo(businessId);
    return businessInfo.hours;
  } catch (error) {
    console.error('Error loading business hours:', error);
    throw new Error('Failed to load business hours');
  }
};

/**
 * Loads business features from the backend
 * @param businessId Optional business ID
 * @returns Promise resolving to the business features
 */
export const loadBusinessFeatures = async (businessId?: string) => {
  try {
    const businessInfo = await loadBusinessInfo(businessId);
    return businessInfo.features;
  } catch (error) {
    console.error('Error loading business features:', error);
    throw new Error('Failed to load business features');
  }
};

export default {
  loadBusinessInfo,
  loadBusinessHours,
  loadBusinessFeatures
};