// Middleware for saving business information
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

// Save business information to customer data folder
const saveBusinessInfo = (businessInfo) => {
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
    
    // Ensure directory exists
    const businessDataDir = path.dirname(businessDataPath);
    if (!fs.existsSync(businessDataDir)) {
      fs.mkdirSync(businessDataDir, { recursive: true });
    }
    
    // Add updated timestamp
    const businessDataToSave = {
      ...businessInfo,
      updated_at: new Date().toISOString()
    };
    
    // Write to file
    fs.writeFileSync(businessDataPath, JSON.stringify(businessDataToSave, null, 2));
    
    console.log('Business information saved successfully to:', businessDataPath);
    return true;
  } catch (error) {
    console.error('Error saving business info:', error);
    throw error;
  }
};

// Create new business information
const createBusinessInfo = (businessInfo) => {
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
    
    // Ensure directory exists
    const businessDataDir = path.dirname(businessDataPath);
    if (!fs.existsSync(businessDataDir)) {
      fs.mkdirSync(businessDataDir, { recursive: true });
    }
    
    // Add created and updated timestamps
    const businessDataToCreate = {
      ...businessInfo,
      businessId: businessInfo.businessId || `business_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Write to file
    fs.writeFileSync(businessDataPath, JSON.stringify(businessDataToCreate, null, 2));
    
    console.log('Business information created successfully at:', businessDataPath);
    return businessDataToCreate;
  } catch (error) {
    console.error('Error creating business info:', error);
    throw error;
  }
};

// Backup business information
const backupBusinessInfo = (businessInfo) => {
  try {
    const userConfig = loadUserConfig();
    if (!userConfig) {
      throw new Error('User configuration not found');
    }
    
    const customerDataFolder = userConfig.customerDataFolder || 'sampledata';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(
      __dirname, 
      `../customerdata/${customerDataFolder}/businessdata/backups/restaurant-information-${timestamp}.json`
    );
    
    // Ensure backup directory exists
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Write backup
    fs.writeFileSync(backupPath, JSON.stringify(businessInfo, null, 2));
    
    console.log('Business information backed up to:', backupPath);
    return backupPath;
  } catch (error) {
    console.error('Error backing up business info:', error);
    throw error;
  }
};

module.exports = {
  saveBusinessInfo,
  createBusinessInfo,
  backupBusinessInfo,
  loadUserConfig
};