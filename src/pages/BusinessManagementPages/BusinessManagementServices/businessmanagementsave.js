// Service for saving business management data
import { BusinessInfo } from '../../../types/business';

export const saveBusinessInfo = async (businessInfo: BusinessInfo): Promise<boolean> => {
  try {
    // TODO: Replace with actual API call
    const response = await fetch(`/api/business/${businessInfo.businessId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...businessInfo,
        updated_at: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save business information');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving business info:', error);
    
    // For development, simulate successful save
    console.log('Simulated save of business info:', businessInfo);
    return true;
  }
};

export const createBusinessInfo = async (businessInfo: Partial<BusinessInfo>): Promise<BusinessInfo | null> => {
  try {
    // TODO: Replace with actual API call
    const response = await fetch('/api/business', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...businessInfo,
        businessId: businessInfo.businessId || `business_${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create business information');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating business info:', error);
    
    // For development, simulate successful creation
    const newBusinessInfo: BusinessInfo = {
      businessId: `business_${Date.now()}`,
      businessName: businessInfo.businessName || '',
      businessType: businessInfo.businessType || 'restaurant',
      description: businessInfo.description || '',
      email: businessInfo.email || '',
      phone: businessInfo.phone || '',
      website: businessInfo.website || '',
      address: businessInfo.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      businessHours: businessInfo.businessHours || {
        monday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        tuesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        wednesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        thursday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        friday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
        saturday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
        sunday: { open: "11:00", close: "21:00", isTwentyFourHours: false }
      },
      socialMedia: businessInfo.socialMedia || {
        facebook: '',
        instagram: '',
        twitter: ''
      },
      branding: businessInfo.branding || {
        logo: '',
        primaryColor: '#FF6B35',
        secondaryColor: '#2E3A59',
        fontFamily: 'Arial, sans-serif'
      },
      settings: businessInfo.settings || {
        currency: 'USD',
        taxRate: 0.0875,
        serviceCharge: 0.00,
        tipSuggestions: [0.15, 0.18, 0.20],
        acceptsCash: true,
        acceptsCards: true,
        acceptsDigitalPayments: true
      },
      features: businessInfo.features || {
        online_ordering_enabled: true,
        multi_language_enabled: false,
        auto_display_rotation: false,
        allow_specials: true
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Simulated creation of business info:', newBusinessInfo);
    return newBusinessInfo;
  }
};