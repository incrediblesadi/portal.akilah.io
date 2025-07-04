import { Auth } from 'aws-amplify';
import fs from 'fs';
import path from 'path';

/**
 * Middleware function to retrieve business information
 * @param req The request object
 * @param res The response object
 */
export const retrieveBusinessInfo = async (req: any, res: any) => {
  try {
    // Verify authentication
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get user config to determine which customer's folder to read
    const userConfigPath = path.join(process.cwd(), 'src', 'pages', 'context', 'userconfig.json');
    const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
    
    // Get the customer folder name from user config
    const customerFolder = userConfig.customerFolder || 'defaultCustomer';
    
    // Read the business information file
    const businessInfoPath = path.join(
      process.cwd(),
      'customerdata',
      customerFolder,
      'businessdata',
      'restaurant-information.json'
    );
    
    // Check if file exists
    if (!fs.existsSync(businessInfoPath)) {
      return res.status(404).json({ error: 'Business information not found' });
    }
    
    // Read and parse the file
    const businessInfo = JSON.parse(fs.readFileSync(businessInfoPath, 'utf8'));
    
    // Return the business information
    return res.status(200).json(businessInfo);
  } catch (error) {
    console.error('Error retrieving business info:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default retrieveBusinessInfo;