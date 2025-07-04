import { Auth } from 'aws-amplify';
import fs from 'fs';
import path from 'path';

/**
 * Middleware function to save business information
 * @param req The request object
 * @param res The response object
 */
export const saveBusinessInfo = async (req: any, res: any) => {
  try {
    // Verify authentication
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get the business information from the request body
    const businessInfo = req.body;
    if (!businessInfo) {
      return res.status(400).json({ error: 'Business information is required' });
    }
    
    // Get user config to determine which customer's folder to use
    const userConfigPath = path.join(process.cwd(), 'src', 'pages', 'context', 'userconfig.json');
    const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
    
    // Get the customer folder name from user config
    const customerFolder = userConfig.customerFolder || 'defaultCustomer';
    
    // Create the customer folder if it doesn't exist
    const customerFolderPath = path.join(process.cwd(), 'customerdata', customerFolder);
    if (!fs.existsSync(customerFolderPath)) {
      fs.mkdirSync(customerFolderPath, { recursive: true });
    }
    
    // Create the business data folder if it doesn't exist
    const businessDataPath = path.join(customerFolderPath, 'businessdata');
    if (!fs.existsSync(businessDataPath)) {
      fs.mkdirSync(businessDataPath, { recursive: true });
    }
    
    // Update the business information with current timestamp
    const updatedBusinessInfo = {
      ...businessInfo,
      updated_at: new Date().toISOString()
    };
    
    // Write the business information to the file
    const businessInfoPath = path.join(businessDataPath, 'restaurant-information.json');
    fs.writeFileSync(businessInfoPath, JSON.stringify(updatedBusinessInfo, null, 2));
    
    // Return the updated business information
    return res.status(200).json(updatedBusinessInfo);
  } catch (error) {
    console.error('Error saving business info:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default saveBusinessInfo;