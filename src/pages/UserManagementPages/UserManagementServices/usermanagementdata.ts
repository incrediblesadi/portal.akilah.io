import { getCurrentUser } from 'aws-amplify/auth';

interface UserConfig {
  customerFolder: string;
  userId: string;
  userConfig: {
    theme: string;
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  lastUpdated: string;
}

interface UserSettings {
  user_id: string;
  personal_info: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_picture: string;
  };
  security_settings: {
    two_factor_enabled: boolean;
    password_last_changed: string;
    security_questions: any[];
  };
  notification_preferences: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    marketing_emails: boolean;
  };
  ui_preferences: {
    theme: string;
    language: string;
    timezone: string;
    date_format: string;
    currency: string;
  };
  permissions: {
    role: string;
    can_edit_business: boolean;
    can_manage_users: boolean;
    can_view_reports: boolean;
    can_manage_payments: boolean;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Creates a unique customer folder for the user if it doesn't exist
 */
export const createUserFolder = async (): Promise<string> => {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser.userId || currentUser.username;
    
    // Generate a unique customer folder name
    const customerFolder = `customer_${userId}_${Date.now()}`;
    
    // In a real implementation, this would create the folder structure in the backend
    // For now, we'll simulate this
    console.log(`Creating customer folder: ${customerFolder}`);
    
    return customerFolder;
  } catch (error) {
    console.error('Error creating user folder:', error);
    throw new Error('Failed to create user folder');
  }
};

/**
 * Saves user configuration data
 */
export const saveUserConfig = async (configData: any): Promise<void> => {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser.userId || currentUser.username;
    
    // Create or get customer folder
    const customerFolder = await createUserFolder();
    
    // Prepare user configuration
    const userConfig: UserConfig = {
      customerFolder,
      userId,
      userConfig: {
        theme: configData.theme || 'light',
        language: configData.language || 'en',
        timezone: configData.timezone || 'UTC',
        notifications: {
          email: configData.emailNotifications || true,
          sms: configData.smsNotifications || false,
          push: configData.pushNotifications || true
        }
      },
      lastUpdated: new Date().toISOString()
    };
    
    // Prepare user settings
    const userSettings: UserSettings = {
      user_id: userId,
      personal_info: {
        first_name: configData.firstName || '',
        last_name: configData.lastName || '',
        email: configData.email || '',
        phone: configData.phone || '',
        profile_picture: ''
      },
      security_settings: {
        two_factor_enabled: configData.twoFactorEnabled || false,
        password_last_changed: new Date().toISOString(),
        security_questions: []
      },
      notification_preferences: {
        email_notifications: configData.emailNotifications || true,
        sms_notifications: configData.smsNotifications || false,
        push_notifications: configData.pushNotifications || true,
        marketing_emails: configData.marketingEmails || false
      },
      ui_preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        date_format: 'MM/DD/YYYY',
        currency: 'USD'
      },
      permissions: {
        role: configData.businessRole || 'owner',
        can_edit_business: true,
        can_manage_users: true,
        can_view_reports: true,
        can_manage_payments: true
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // In a real implementation, this would save to the backend
    // For now, we'll simulate successful save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('User configuration saved:', { userConfig, userSettings });
    
    // Update the local user config file (in a real app, this would be done server-side)
    // This is a simulation of updating the userconfig.json file
    localStorage.setItem('userConfig', JSON.stringify(userConfig));
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    
  } catch (error) {
    console.error('Error saving user configuration:', error);
    throw new Error('Failed to save user configuration');
  }
};

/**
 * Loads user configuration data
 */
export const loadUserConfig = async (): Promise<{ userConfig: UserConfig; userSettings: UserSettings } | null> => {
  try {
    // In a real implementation, this would load from the backend
    // For now, we'll check localStorage and return mock data if not found
    
    const storedUserConfig = localStorage.getItem('userConfig');
    const storedUserSettings = localStorage.getItem('userSettings');
    
    if (storedUserConfig && storedUserSettings) {
      return {
        userConfig: JSON.parse(storedUserConfig),
        userSettings: JSON.parse(storedUserSettings)
      };
    }
    
    // Return null if no configuration found
    return null;
    
  } catch (error) {
    console.error('Error loading user configuration:', error);
    throw new Error('Failed to load user configuration');
  }
};

/**
 * Updates user settings
 */
export const updateUserSettings = async (updatedSettings: Partial<UserSettings>): Promise<UserSettings> => {
  try {
    const currentConfig = await loadUserConfig();
    
    if (!currentConfig) {
      throw new Error('User configuration not found');
    }
    
    const updatedUserSettings: UserSettings = {
      ...currentConfig.userSettings,
      ...updatedSettings,
      updated_at: new Date().toISOString()
    };
    
    // In a real implementation, this would update the backend
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update localStorage
    localStorage.setItem('userSettings', JSON.stringify(updatedUserSettings));
    
    console.log('User settings updated:', updatedUserSettings);
    
    return updatedUserSettings;
    
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw new Error('Failed to update user settings');
  }
};

/**
 * Gets the current user's customer folder name
 */
export const getUserCustomerFolder = async (): Promise<string> => {
  try {
    const config = await loadUserConfig();
    
    if (config && config.userConfig.customerFolder) {
      return config.userConfig.customerFolder;
    }
    
    // If no config found, create a new one
    return await createUserFolder();
    
  } catch (error) {
    console.error('Error getting user customer folder:', error);
    throw new Error('Failed to get user customer folder');
  }
};

export default {
  createUserFolder,
  saveUserConfig,
  loadUserConfig,
  updateUserSettings,
  getUserCustomerFolder
};