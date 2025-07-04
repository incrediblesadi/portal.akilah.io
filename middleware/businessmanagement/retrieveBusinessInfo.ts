// Business Management API Middleware
// This middleware handles business information retrieval and updates

import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

// Interface for business information
interface BusinessInfo {
  id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

// Interface for user configuration
interface UserConfig {
  userId: string;
  businessId: string;
  customerDataFolder: string;
  settings: {
    timezone: string;
    currency: string;
    language: string;
  };
}

class BusinessManagementMiddleware {
  private userConfigPath = path.join(process.cwd(), 'src', 'pages', 'context', 'userconfig.json');
  private customerDataPath = path.join(process.cwd(), 'customerdata');

  /**
   * Retrieve business information
   */
  async retrieveBusinessInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId || req.body.businessId;
      
      // Read user configuration to determine customer data folder
      const userConfig = await this.getUserConfig();
      const customerFolder = userConfig.customerDataFolder;
      
      // Construct path to business data
      const businessDataPath = path.join(
        this.customerDataPath,
        customerFolder,
        'businessdata',
        'restaurant-information.json'
      );
      
      // Read business data
      const businessData = await fs.readFile(businessDataPath, 'utf8');
      const businessInfo: BusinessInfo = JSON.parse(businessData);
      
      res.json({
        success: true,
        data: businessInfo,
        message: 'Business information retrieved successfully'
      });
    } catch (error) {
      console.error('Error retrieving business info:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve business information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Save business information
   */
  async saveBusinessInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const businessInfo: BusinessInfo = req.body;
      
      // Read user configuration to determine customer data folder
      const userConfig = await this.getUserConfig();
      const customerFolder = userConfig.customerDataFolder;
      
      // Construct path to business data
      const businessDataPath = path.join(
        this.customerDataPath,
        customerFolder,
        'businessdata',
        'restaurant-information.json'
      );
      
      // Ensure directory exists
      const businessDataDir = path.dirname(businessDataPath);
      await fs.mkdir(businessDataDir, { recursive: true });
      
      // Add timestamps
      const now = new Date();
      const dataToSave = {
        ...businessInfo,
        updatedAt: now,
        createdAt: businessInfo.createdAt || now
      };
      
      // Save business data
      await fs.writeFile(businessDataPath, JSON.stringify(dataToSave, null, 2));
      
      res.json({
        success: true,
        data: dataToSave,
        message: 'Business information saved successfully'
      });
    } catch (error) {
      console.error('Error saving business info:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save business information',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get user configuration
   */
  private async getUserConfig(): Promise<UserConfig> {
    try {
      const configData = await fs.readFile(this.userConfigPath, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      // Return default config if file doesn't exist
      return {
        userId: 'default',
        businessId: 'default',
        customerDataFolder: 'defaultBPdata',
        settings: {
          timezone: 'UTC',
          currency: 'USD',
          language: 'en'
        }
      };
    }
  }

  /**
   * Update user configuration
   */
  async updateUserConfig(req: Request, res: Response, next: NextFunction) {
    try {
      const userConfig: UserConfig = req.body;
      
      // Ensure directory exists
      const configDir = path.dirname(this.userConfigPath);
      await fs.mkdir(configDir, { recursive: true });
      
      // Save user config
      await fs.writeFile(this.userConfigPath, JSON.stringify(userConfig, null, 2));
      
      res.json({
        success: true,
        data: userConfig,
        message: 'User configuration updated successfully'
      });
    } catch (error) {
      console.error('Error updating user config:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update user configuration',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get business hours
   */
  async getBusinessHours(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;
      
      // Read user configuration to determine customer data folder
      const userConfig = await this.getUserConfig();
      const customerFolder = userConfig.customerDataFolder;
      
      // Construct path to business hours data
      const businessHoursPath = path.join(
        this.customerDataPath,
        customerFolder,
        'businessdata',
        'business-hours.json'
      );
      
      // Read business hours data
      const hoursData = await fs.readFile(businessHoursPath, 'utf8');
      const businessHours = JSON.parse(hoursData);
      
      res.json({
        success: true,
        data: businessHours,
        message: 'Business hours retrieved successfully'
      });
    } catch (error) {
      console.error('Error retrieving business hours:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve business hours',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Update business hours
   */
  async updateBusinessHours(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;
      const businessHours = req.body;
      
      // Read user configuration to determine customer data folder
      const userConfig = await this.getUserConfig();
      const customerFolder = userConfig.customerDataFolder;
      
      // Construct path to business hours data
      const businessHoursPath = path.join(
        this.customerDataPath,
        customerFolder,
        'businessdata',
        'business-hours.json'
      );
      
      // Ensure directory exists
      const businessDataDir = path.dirname(businessHoursPath);
      await fs.mkdir(businessDataDir, { recursive: true });
      
      // Save business hours data
      await fs.writeFile(businessHoursPath, JSON.stringify(businessHours, null, 2));
      
      res.json({
        success: true,
        data: businessHours,
        message: 'Business hours updated successfully'
      });
    } catch (error) {
      console.error('Error updating business hours:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update business hours',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default new BusinessManagementMiddleware();