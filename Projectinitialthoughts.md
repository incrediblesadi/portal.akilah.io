✅ Project Overview

🎯 Project Goal

To build a web-based Business Management Portal that:
	•	Lets restaurants enter, edit, and manage their business information (hours, address, concepts, menu items, pricing, etc.)
	•	Serves as the central system of record for all restaurant data
	•	Supports multi-concept operations under one business
	•	Connects with hardware payment devices (like credit card readers) and online payment providers (like Stripe)
	•	Powers digital displays, kiosks, and kitchen systems by reading from centralized data
	•	Acts as the single platform for generating reports and analytics in the future
	•	Is designed to be modular so new tools and features can be added later

⸻

✅ Project Objective
	•	Build the portal entirely web-based
	•	Store data in organized, reusable JSON structures
	•	Keep data customer-specific (each business has its own data folder)
	•	Allow integration with:
	•	Stripe for online payments
	•	Hardware credit card readers for in-store transactions
	•	Ensure the portal can:
	•	Feed real-time data to kiosks and kitchen displays
	•	Manage orders, payments, and reporting from a single place
	•	Lay the foundation for adding more operational tools later (e.g. marketing tools, loyalty, advanced reporting)

⸻

✅ System Parts (High-Level)

Portal
- For business owners
- The main dashboard where everything is managed

Business Management
- Set up business info (name, address, hours, logos, etc.)
- Edit or view business profile

Menu Management
- Configure concepts
- Add/edit categories
- Add/edit menu items
- Set pricing
- Manage modifiers

Display Management
- Create and edit digital menu screens
- Configure styling and layout for displays

Kiosk Management
- Register kiosks
- Configure which menus/concepts they show
- Style and layout for kiosk interfaces

KDC Management (Kitchen Display Controller)
- Define kitchen screens
- Assign stations (e.g. grill, fryer)
- Configure how orders appear in the kitchen

Order Management
- View and track orders
- Manage order statuses (active, completed, refunded)

Payment Management
- Connect payment providers (like Stripe)
- Manage hardware payment terminals
- View transactions and settlements

Reports Management
- Generate reports for:
    - Sales
    - Item performance
    - Kitchen timing
    - Modifier usage

Integration
- All these parts integrate with a central, user-specific data system.
- Each business’s data is separate and unique to them.




portal/
└── src/
    └── pages/
        ── SignupPages/
            ├── UserSetup/
            │   └── RegisterUser.jsx
            └── [UserUID]/
                ├── UserContentConfig.jsx
                ├── UserStyling.jsx
                ├── UserProfile.jsx
                ├── UserPayment.jsx
                
        ── SignInPages/
            ├── SignInPage/
            │   └── authenticate.js
            └── [UserUID]/
                ├── UserContentConfig.jsx
                ├── UserStyling.jsx
                ├── UserProfile.jsx
                ├── UserPayment.jsx

        ├── BusinessManagementPages/
        │   ├── SetupBusiness.jsx                 # Business info setup Tempalte bilt into JSON
        │   ├── ViewBusinessInfo.jsx              # View business info
        │   └── EditBusinessInfo.jsx              # Edit business info
        │   └── BusinessManagementServices/
        |   └── BusinessManagementPageservices/
        |      ├── businessmanagementload.js         # Load business info from JSON
        |      └── businessmanagementsave.js         # Save business info to JSON
        ├── MenuManagementPages/  
        │   ├── ConceptSetup/
        │   │   └── SetupConcept.jsx
        │   └── [ConceptName]/
        │       ├── ViewConceptDashboard.jsx
        │       ├── ConfigureConceptInfo.jsx
        │       ├── ManageCategories.jsx
        │       ├── ManageMenuItems.jsx
        │       ├── ManageModifiers.jsx
        │       └── ConceptAssets.jsx
        |___ uploads folder

        ├── DisplayManagementPages/
        │   ├── DisplaySetup/
        │   │   └── CreateDisplay.jsx
        │   └── [DisplayUID]/
        │       ├── ViewDisplayDashboard.jsx
        │       ├── DisplayContentConfig.jsx
        │       ├── DisplayStyling.jsx
        │       ├── DisplayPreview.jsx
        │       └── DisplayLiveView.jsx
        |___ uploads folder/

        └── KioskManagementPages/
            ├── KioskSetup/
            │   └── RegisterKiosk.jsx
            └── [KioskUID]/                          # Kiosk instance folder
                ├── ViewKioskDashboard.jsx           # Summary view of this kiosk
                ├── KioskContentConfig.jsx           # Choose categories/items to show
                ├── KioskStyling.jsx                 # Colors, fonts, layout
                ├── KioskConfigEditor.jsx            # JSON editor (optional)
                ├── KioskPreview.jsx                 # Simulate full kiosk flow
                ├── KioskSessionManager.jsx          # Handle inactivity timeout/reset
                ├── KioskErrorScreen.jsx             # Fallback view if data fails
                ├── KioskView.jsx                    # Actual live kiosk UI
                └── components/                      # Kiosk-specific UI components
                    ├── AddToCartButton.jsx
                    ├── ModifierToggleButton.jsx
                    ├── QuantityButton.jsx
                    ├── CartItem.jsx
                    ├── CategoryCard.jsx
                    ├── MenuItem.jsx
                    └── PlaceOrderButton.jsx
        |___ uploads folder/

        ├── KDCManagementPages/
        │   ├── KDCSetup/
        │   │   └── RegisterKDC.jsx                 # Setup screen for creating a KDC device
        │   └── [KDCUID]/                           # Scoped folder per kitchen station
        │       ├── ViewKDCDashboard.jsx           # Admin view: shows incoming orders, filters by concept/location
        │       ├── KDCContentRouting.jsx          # Assign concepts, categories, or kitchen roles (e.g., Grill, Fry)
        │       ├── KDCStyling.jsx                 # Theme config: background, layout, sounds
        │       ├── KDCPermissions.jsx             # Toggle interactive vs display-only behavior
        │       ├── KDCPreview.jsx                 # Simulated real-time view for dev/testing
        │       ├── KDCLiveView.jsx                # The actual display screen used in the kitchen
        │       └── components/                    # Scoped components for this KDC instance
        │           ├── OrderTicket.jsx            # Ticket UI with modifiers, notes, time stamps
        │           ├── BumpButton.jsx             # “Done” / “Bump” interaction
        │           ├── TimerBar.jsx               # Visual indicator of prep time (optional)
        │           ├── KitchenOrderHeader.jsx     # Header with order #, source (kiosk/tablet)
        │           └── KitchenSoundAlert.jsx      # Optional sound cue for new order
        |___ uploads folder/

        ├── OrderManagementPages/
        │   ├── ViewOrders.jsx                # Full list of orders (active + completed)
        │   ├── ViewOrderDetails.jsx          # Drilldown of individual order
        │   ├── ManageOrderStatus.jsx         # Update status: completed, bumped, refunded
        │   └── OrderAuditLog.jsx             # Optional timeline of status changes
        |___ uploads folder/

        ├── ReportsManagementPages/
        │   ├── SalesReport.jsx               # Revenue by concept/kiosk
        │   ├── ItemPerformanceReport.jsx     # PMIX-style item breakdown
        │   ├── ModifierUsageReport.jsx       # Frequency + impact of modifiers
        │   ├── KitchenTimingReport.jsx       # Avg prep times per concept/station
        │   └── ExportReports.jsx             # Download to CSV or PDF
        |___ uploads folder/

        ├── PaymentManagementPages/
        │   ├── ViewTransactions.jsx          # Chronological list of all payments
        │   ├── ConnectPaymentTerminal.jsx    # Pair hardware (Stripe, Square, etc.)
        │   ├── PaymentSettings.jsx           # Set provider keys, test mode, toggles
        │   └── SettlementHistory.jsx         # Payouts and batch settlements
        |___ uploads folder/

        └── UserManagementPages/
            ├── UserSetup/
            │   └── RegisterUser.jsx
            └── [UserUID]/
                ├── ViewUserDashboard.jsx
                ├── UserContentConfig.jsx
                ├── UserStyling.jsx
                ├── UserProfile.jsx
                ├── UserPayment.jsx
                ├── UserReports.jsx
                ├── UserOrders.jsx
                └── UserAssets.jsx


1. User navigates to a Page
   e.g. /business/setup

2. React Page Component loads
   - Located under:
     /src/pages/BusinessManagementPages/SetupBusiness.jsx

3. React Component calls a Service
   - e.g. businessmanagementload.js
   - Each page has its own load service under:
     /src/pages/BusinessManagementPageservices/

4. Service calls the API Route (middleware)
   - e.g. retrievebusinessinfo.js
   - Located under:
     /middleware/businessmanagement/

5. Middleware reads user config
   - From:
     /src/pages/context/userconfig.json
   - Determines:
     → which customer’s folder to read
     → e.g. naveedBPdata/

6. Middleware loads the JSON file
   - e.g. reads:
     naveedBPdata/businessdata/restaurant-information.json

7. Middleware returns the data back to Service

8. Service sends the data to the React Page

9. React Page displays the business info
   - e.g. business name, hours, social links, etc.



portal/
└── src/
    └── pages/
        ├── BusinessManagementPages/
        │   ├── SetupBusiness.jsx
        │   ├── ViewBusinessInfo.jsx
        │   └── EditBusinessInfo.jsx
        |   └── BusinessManagementPageservices/
        |      ├── businessmanagementload.js
        |      └── businessmanagementsave.js
        ├── context/
        │   ├── userconfig.json
            ├── usertools.json

│
├── middleware/
        ├── businessmanagement/
            ├── retrievebusinessinfio.js
        │   ├── savebusinessinfio.js
        │   ├── businessmanagementapiroute.test.js


customerdata/
  ├── <customerdatafolder>/
  │   ├── businessdata/
      │   └── restaurant-information.json

      │   └── restaurant-information.json
          ├── business-logo.png
                ├── businessbrandconfig.json
                ├── businessfeatures.json


      zamzamdata/
├── businessdata/
│   └── restaurant-information.json
│   └── template/
        ├── businesstemplate.json
        ├── usersettingstemplate.json
        ├── userpaymenttemplate.json
...

### businesstemplate.json

{
  "business_uid": "biz_001",
  "business_name": "Naveed Pleasantdale Group",
  "restaurant_name": "Naveed's Grill & More",

  "address": {
    "street": "123 Pleasantdale Rd",
    "city": "Atlanta",
    "state": "GA",
    "zip": "30345"
  },

  "city": "Atlanta",
  "state": "GA",

  "phone": "+1-404-555-1234",
  "email": "info@naveedsgrill.com",
  "website": "https://naveedsgrill.com",

  "social_links": {
    "instagram": "https://instagram.com/naveedsgrill",
    "facebook": "https://facebook.com/naveedsgrill",
    "google": "https://g.page/naveedsgrill"
  },

  "hours": {
    "monday":    { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "tuesday":   { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "wednesday": { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "thursday":  { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "friday":    { "open": "10:00", "close": "23:00", "isTwentyFourHours": false },
    "saturday":  { "open": "10:00", "close": "23:00", "isTwentyFourHours": false },
    "sunday":    { "open": "11:00", "close": "21:00", "isTwentyFourHours": false }
  },

  "logo": "assets/logo.png",                   // Relative path to branding image
  "about": "Family-owned restaurant group serving grilled favorites and more since 2005.",

  "features": {
    "online_ordering_enabled": true,
    "multi_language_enabled": false,
    "auto_display_rotation": false,
    "allow_specials": true
  },

  "created_at": "2025-07-06T12:00:00Z",
  "updated_at": "2025-07-06T15:45:00Z"
}



### Concepttempalte.json

{
  "concept_uid": "grill",
  "concept_name": "Naveed Grill",
  "description": "Flame-grilled burgers and kebabs",
  "email": "grill@naveedsgrill.com",
  "phone": "+1-404-555-0001",

  "status": {
    "active": true,
    "open_now": true,
    "last_updated_by": "admin_user_01",
    "last_updated_at": "2025-07-06T14:45:00Z"
  },

  "hours": {
    "monday":    { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "tuesday":   { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "wednesday": { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "thursday":  { "open": "10:00", "close": "22:00", "isTwentyFourHours": false },
    "friday":    { "open": "10:00", "close": "23:00", "isTwentyFourHours": false },
    "saturday":  { "open": "10:00", "close": "23:00", "isTwentyFourHours": false },
    "sunday":    { "open": "11:00", "close": "21:00", "isTwentyFourHours": false }
  },

  "logo": "assets/grill-logo.png",
  "about": "Our classic flame-kissed menu.",
  "tags": [ "burgers", "halal", "kebabs" ]
}

### categoriestemplate.json

[
  {
    "uid": "cat_burgers",
    "name": "Burgers",
    "description": "Fresh grilled patties",
    "image": "assets/cat-burgers.jpg",

    "status": "active", // Options: active, paused, deleted

    "visibility": {
      "digital_menu": true,
      "kiosk": true,
      "online": true
    },

    "schedule": {
      "days": ["monday", "tuesday", "wednesday", "thursday", "friday"],
      "time_windows": [
        { "start": "10:00", "end": "14:00" },
        { "start": "17:00", "end": "21:00" }
      ]
    }
  }
]

### itemstemplate.JSON

{
  "uid": "item_lamb_burger",
  "name": "Lamb Burger",
  "description": "Juicy lamb patty with herbs and garlic aioli.",
  "category_uid": "cat_burgers",
  "allergens": ["gluten", "dairy"],
  "image": "assets/items/lamb-burger.jpg",

  "status": "active",

  "unit_type": "quantity",  // Options: quantity, pound, piece, size, combo

  "combo": {
    "enabled": false,
    "combo_uid": null
  },

  "size_options": [
    {
      "label": "Regular",
      "price_modifier": 0
    },
    {
      "label": "Large",
      "price_modifier": 2.00
    }
  ],

  "availability": {
    "days": ["monday", "tuesday", "friday"],
    "time_windows": [
      { "start": "10:00", "end": "14:00" },
      { "start": "17:00", "end": "21:00" }
    ]
  },

  "visibility": {
    "digital_menu": true,
    "kiosk": true,
    "online": true,
    "third_party": true
  },

  "recipe": {
    "ingredients": [
      { "name": "Ground lamb", "quantity": "150", "unit": "grams" },
      { "name": "Bun", "quantity": "1", "unit": "piece" }
    ],
    "notes": "Grill 6 minutes per side. Serve hot.",

    "cost_price": 4.25,
    "base_price": 9.99,
    "margin": 5.74,

    "pricing": {
      "kiosk": {
        "enabled": true,
        "price": 9.49,
        "is_special": false
      },
      "web": {
        "enabled": true,
        "price": 10.49,
        "is_special": true,
        "special_price": 8.99
      },
      "mobile": {
        "enabled": true,
        "price": 9.99
      },
      "third_party": {
        "ubereats": {
          "enabled": true,
          "price": 12.99
        },
        "doordash": {
          "enabled": true,
          "price": 13.50
        },
        "grubhub": {
          "enabled": false,
          "price": 0
        },
        "custom": [
          {
            "label": "ToastTab",
            "enabled": true,
            "price": 12.00
          }
        ]
      },
      "catering": {
        "enabled": true,
        "price": 49.99,
        "unit": "tray",
        "serves": 8
      }
    }
  },

  "modifiers": [
    {
      "modifier_uid": "mod_cheese",
      "options": [
        { "type": "default", "label": "Regular", "price": 0.50 },
        { "type": "double",  "label": "Double Cheese", "price": 1.00 },
        { "type": "remove",  "label": "No Cheese", "price": 0.00 }
      ],
      "allow_user_note": true,
      "required": false,
      "enabled": true
    }
  ]
}

### modifiertemplate.json

[
  {
    "modifier_uid": "mod_cheese",
    "name": "Cheese",
    "description": "Add cheese to your item.",
    "visibility": {
      "kiosk": true,
      "web": true,
      "online": true,
      "third_party": true
    },
    "options": [
      {
        "type": "add",
        "label": "Regular Cheese",
        "price": 0.50,
        "allow_option_note": false
      },
      {
        "type": "add",
        "label": "Double Cheese",
        "price": 1.00,
        "allow_option_note": false
      },
      {
        "type": "remove",
        "label": "No Cheese",
        "price": 0.00,
        "allow_option_note": false
      }
    ],
    "required": false,
    "allow_user_note": true,
    "enabled": true
  },

  {
    "modifier_uid": "mod_bacon",
    "name": "Bacon",
    "description": "Add or remove bacon as desired.",
    "visibility": {
      "kiosk": true,
      "web": true,
      "online": true,
      "third_party": false
    },
    "options": [
      {
        "type": "add",
        "label": "Add Bacon",
        "price": 1.25,
        "allow_option_note": true
      },
      {
        "type": "remove",
        "label": "No Bacon",
        "price": 0.00,
        "allow_option_note": false
      }
    ],
    "required": false,
    "allow_user_note": true,
    "enabled": true
  }
]

