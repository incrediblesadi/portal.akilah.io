// Type definitions for business management
export interface BusinessInfo {
  businessId: string;
  businessName: string;
  businessType: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      isTwentyFourHours: boolean;
    };
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  settings: {
    currency: string;
    taxRate: number;
    serviceCharge: number;
    tipSuggestions: number[];
    acceptsCash: boolean;
    acceptsCards: boolean;
    acceptsDigitalPayments: boolean;
  };
  features: {
    online_ordering_enabled: boolean;
    multi_language_enabled: boolean;
    auto_display_rotation: boolean;
    allow_specials: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface BusinessHours {
  open: string;
  close: string;
  isTwentyFourHours: boolean;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BusinessSocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface BusinessBranding {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface BusinessSettings {
  currency: string;
  taxRate: number;
  serviceCharge: number;
  tipSuggestions: number[];
  acceptsCash: boolean;
  acceptsCards: boolean;
  acceptsDigitalPayments: boolean;
}

export interface BusinessFeatures {
  online_ordering_enabled: boolean;
  multi_language_enabled: boolean;
  auto_display_rotation: boolean;
  allow_specials: boolean;
}