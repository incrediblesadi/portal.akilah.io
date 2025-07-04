// Middleware for retrieving business information
const fs = require('fs');
const path = require('path');

// Load user configuration to determine customer data folder
const loadUserConfig = () => {
  try {
    const configPath = path.join(__dirname, '../src/context/userconfig.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error loading user config:', error);
    return null;
  }
};

// Retrieve business information from customer data folder
const retrieveBusinessInfo = (businessId) => {
  try {
    const userConfig = loadUserConfig();
    if (!userConfig) {
      throw new Error('User configuration not found');
    }
    
    const customerDataFolder = userConfig.customerDataFolder || 'sampledata';
    const businessDataPath = path.join(
      __dirname, 
      `../customerdata/${customerDataFolder}/businessdata/restaurant-information.json`
    );
    
    if (!fs.existsSync(businessDataPath)) {
      throw new Error('Business data file not found');
    }
    
    const businessData = fs.readFileSync(businessDataPath, 'utf8');
    return JSON.parse(businessData);
  } catch (error) {
    console.error('Error retrieving business info:', error);
    
    // Return default mock data if file doesn't exist
    return {
      businessId: businessId || "business_001",
      businessName: "Sample Restaurant",
      businessType: "restaurant",
      description: "A sample restaurant for demonstration purposes",
      email: "contact@samplerestaurant.com",
      phone: "+1-555-123-4567",
      website: "https://samplerestaurant.com",
      address: {
        street: "123 Main Street",
        city: "Sample City",
        state: "SC",
        zipCode: "12345",
        country: "USA"
      },
      businessHours: {
        monday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        tuesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        wednesday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        thursday: { open: "10:00", close: "22:00", isTwentyFourHours: false },
        friday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
        saturday: { open: "10:00", close: "23:00", isTwentyFourHours: false },
        sunday: { open: "11:00", close: "21:00", isTwentyFourHours: false }
      },
      socialMedia: {
        facebook: "https://facebook.com/samplerestaurant",
        instagram: "https://instagram.com/samplerestaurant",
        twitter: "https://twitter.com/samplerestaurant"
      },
      branding: {
        logo: "assets/business-logo.png",
        primaryColor: "#FF6B35",
        secondaryColor: "#2E3A59",
        fontFamily: "Arial, sans-serif"
      },
      settings: {
        currency: "USD",
        taxRate: 0.0875,
        serviceCharge: 0.00,
        tipSuggestions: [0.15, 0.18, 0.20],
        acceptsCash: true,
        acceptsCards: true,
        acceptsDigitalPayments: true
      },
      features: {
        online_ordering_enabled: true,
        multi_language_enabled: false,
        auto_display_rotation: false,
        allow_specials: true
      },
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z"
    };
  }
};

module.exports = {
  retrieveBusinessInfo,
  loadUserConfig
};