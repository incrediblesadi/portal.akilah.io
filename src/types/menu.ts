// Type definitions for menu management
export interface ConceptInfo {
  concept_uid: string;
  concept_name: string;
  description: string;
  email: string;
  phone: string;
  status: {
    active: boolean;
    open_now: boolean;
    last_updated_by: string;
    last_updated_at: string;
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
  tags: string[];
  styling: {
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CategoryInfo {
  uid: string;
  name: string;
  description: string;
  image: string;
  sort_order: number;
  status: 'active' | 'inactive' | 'deleted';
  visibility: {
    digital_menu: boolean;
    kiosk: boolean;
    online: boolean;
  };
  schedule: {
    days: string[];
    time_windows: {
      start: string;
      end: string;
    }[];
  };
  created_at: string;
  updated_at: string;
}

export interface MenuItemInfo {
  uid: string;
  name: string;
  description: string;
  category_uid: string;
  image: string;
  sort_order: number;
  pricing: {
    base_price: number;
    currency: string;
  };
  nutritional_info: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    allergens: string[];
  };
  status: 'active' | 'inactive' | 'deleted';
  visibility: {
    digital_menu: boolean;
    kiosk: boolean;
    online: boolean;
  };
  schedule: {
    days: string[];
    time_windows: {
      start: string;
      end: string;
    }[];
  };
  modifiers: string[];
  created_at: string;
  updated_at: string;
}

export interface ModifierInfo {
  uid: string;
  name: string;
  description: string;
  type: 'single' | 'multiple';
  min_selections: number;
  max_selections: number;
  required: boolean;
  enabled: boolean;
  visibility: {
    digital_menu: boolean;
    kiosk: boolean;
    web: boolean;
    online: boolean;
    third_party: boolean;
  };
  options: ModifierOption[];
  allow_user_note: boolean;
  created_at: string;
  updated_at: string;
}

export interface ModifierOption {
  type: 'add' | 'remove' | 'standard' | 'double';
  label: string;
  price: number;
  allow_option_note: boolean;
}