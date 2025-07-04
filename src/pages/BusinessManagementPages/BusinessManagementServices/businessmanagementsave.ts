import { Auth } from 'aws-amplify';
import { BusinessInfo } from './businessmanagementload';

/**
 * Saves business information to the backend
 * @param businessInfo The business information to save
 * @returns Promise resolving to the saved business information
 */
export const saveBusinessInfo = async (businessInfo: Partial<BusinessInfo>): Promise<BusinessInfo> => {
  try {
    // Get the current authenticated user
    const currentUser = await Auth.currentAuthenticatedUser();
    const token = currentUser.signInUserSession.idToken.jwtToken;
    
    // In a real implementation, this would make an API call to the backend
    // For now, we'll simulate a successful save
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response with updated timestamp
    const updatedBusinessInfo: BusinessInfo = {
      ...(businessInfo as BusinessInfo),
      updated_at: new Date().toISOString()
    };
    
    console.log('Business info saved:', updatedBusinessInfo);
    
    return updatedBusinessInfo;
  } catch (error) {
    console.error('Error saving business info:', error);
    throw new Error('Failed to save business information');
  }
};

/**
 * Updates business hours
 * @param businessId The business ID
 * @param hours The updated hours
 * @returns Promise resolving to the updated business information
 */
export const updateBusinessHours = async (
  businessId: string,
  hours: {
    [key: string]: {
      open: string;
      close: string;
      isTwentyFourHours: boolean;
    };
  }
): Promise<BusinessInfo> => {
  try {
    // In a real implementation, this would make an API call to update just the hours
    // For now, we'll simulate by updating the entire business info
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response
    const updatedBusinessInfo: BusinessInfo = {
      business_uid: businessId,
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
      hours: hours,
      logo: 'assets/logo.png',
      about: 'A sample restaurant serving delicious food since 2020.',
      features: {
        online_ordering_enabled: true,
        multi_language_enabled: false,
        auto_display_rotation: false,
        allow_specials: true
      },
      created_at: '2023-01-01T12:00:00Z',
      updated_at: new Date().toISOString()
    };
    
    return updatedBusinessInfo;
  } catch (error) {
    console.error('Error updating business hours:', error);
    throw new Error('Failed to update business hours');
  }
};

/**
 * Updates business features
 * @param businessId The business ID
 * @param features The updated features
 * @returns Promise resolving to the updated business information
 */
export const updateBusinessFeatures = async (
  businessId: string,
  features: {
    online_ordering_enabled: boolean;
    multi_language_enabled: boolean;
    auto_display_rotation: boolean;
    allow_specials: boolean;
  }
): Promise<BusinessInfo> => {
  try {
    // In a real implementation, this would make an API call to update just the features
    // For now, we'll simulate by updating the entire business info
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response
    const updatedBusinessInfo: BusinessInfo = {
      business_uid: businessId,
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
      features: features,
      created_at: '2023-01-01T12:00:00Z',
      updated_at: new Date().toISOString()
    };
    
    return updatedBusinessInfo;
  } catch (error) {
    console.error('Error updating business features:', error);
    throw new Error('Failed to update business features');
  }
};

export default {
  saveBusinessInfo,
  updateBusinessHours,
  updateBusinessFeatures
};