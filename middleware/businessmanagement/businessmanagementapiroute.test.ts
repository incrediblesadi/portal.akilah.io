import { retrieveBusinessInfo } from './retrievebusinessinfo';
import { saveBusinessInfo } from './savebusinessinfo';
import fs from 'fs';
import path from 'path';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');

describe('Business Management API Routes', () => {
  let req: any;
  let res: any;
  
  beforeEach(() => {
    // Mock request and response objects
    req = {
      user: { sub: 'user123', email: 'test@example.com' },
      body: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Mock fs functions
    (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath.includes('userconfig.json')) {
        return JSON.stringify({ customerFolder: 'testCustomer' });
      }
      if (filePath.includes('restaurant-information.json')) {
        return JSON.stringify({
          business_uid: 'biz_001',
          business_name: 'Test Business',
          restaurant_name: 'Test Restaurant'
        });
      }
      return '';
    });
    
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    
    // Mock path functions
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });
  
  describe('retrieveBusinessInfo', () => {
    it('should return 401 if user is not authenticated', async () => {
      req.user = null;
      await retrieveBusinessInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
    
    it('should return 404 if business information file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      await retrieveBusinessInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business information not found' });
    });
    
    it('should return business information if file exists', async () => {
      await retrieveBusinessInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        business_uid: 'biz_001',
        business_name: 'Test Business',
        restaurant_name: 'Test Restaurant'
      });
    });
  });
  
  describe('saveBusinessInfo', () => {
    it('should return 401 if user is not authenticated', async () => {
      req.user = null;
      await saveBusinessInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
    
    it('should return 400 if business information is not provided', async () => {
      req.body = null;
      await saveBusinessInfo(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Business information is required' });
    });
    
    it('should save business information and return updated data', async () => {
      req.body = {
        business_uid: 'biz_001',
        business_name: 'Updated Business',
        restaurant_name: 'Updated Restaurant'
      };
      
      await saveBusinessInfo(req, res);
      
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        business_uid: 'biz_001',
        business_name: 'Updated Business',
        restaurant_name: 'Updated Restaurant',
        updated_at: expect.any(String)
      }));
    });
  });
});