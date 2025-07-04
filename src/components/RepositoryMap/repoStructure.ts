// Repository structure data for the tree visualization
export const repoStructure = {
  name: 'Business Management Portal',
  description: 'Root of the Business Management Portal application',
  path: '/',
  children: [
    {
      name: 'Authentication',
      description: 'User authentication and registration',
      children: [
        {
          name: 'SignIn',
          description: 'User sign-in pages',
          path: '/signin',
          children: [
            {
              name: 'SignInPage',
              description: 'Main sign-in page',
              path: '/signin',
            },
            {
              name: 'UserUID',
              description: 'User-specific pages after sign-in',
              children: [
                {
                  name: 'UserContentConfig',
                  description: 'User content configuration',
                  path: '/signin/user/content',
                },
                {
                  name: 'UserStyling',
                  description: 'User styling preferences',
                  path: '/signin/user/styling',
                },
                {
                  name: 'UserProfile',
                  description: 'User profile information',
                  path: '/signin/user/profile',
                },
                {
                  name: 'UserPayment',
                  description: 'User payment information',
                  path: '/signin/user/payment',
                },
              ],
            },
          ],
        },
        {
          name: 'SignUp',
          description: 'User registration pages',
          path: '/signup',
          children: [
            {
              name: 'UserSetup',
              description: 'Initial user setup',
              children: [
                {
                  name: 'RegisterUser',
                  description: 'User registration form',
                  path: '/signup/register',
                },
              ],
            },
            {
              name: 'UserUID',
              description: 'User-specific pages after registration',
              children: [
                {
                  name: 'UserContentConfig',
                  description: 'User content configuration',
                  path: '/signup/user/content',
                },
                {
                  name: 'UserStyling',
                  description: 'User styling preferences',
                  path: '/signup/user/styling',
                },
                {
                  name: 'UserProfile',
                  description: 'User profile information',
                  path: '/signup/user/profile',
                },
                {
                  name: 'UserPayment',
                  description: 'User payment information',
                  path: '/signup/user/payment',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Business Management',
      description: 'Business information management',
      path: '/business',
      children: [
        {
          name: 'SetupBusiness',
          description: 'Business information setup',
          path: '/business/setup',
        },
        {
          name: 'ViewBusinessInfo',
          description: 'View business information',
          path: '/business/view',
        },
        {
          name: 'EditBusinessInfo',
          description: 'Edit business information',
          path: '/business/edit',
        },
      ],
    },
    {
      name: 'Menu Management',
      description: 'Menu and concept management',
      path: '/menu',
      children: [
        {
          name: 'ConceptSetup',
          description: 'Setup restaurant concepts',
          path: '/menu/concept/setup',
          children: [
            {
              name: 'SetupConcept',
              description: 'Create a new concept',
              path: '/menu/concept/setup/new',
            },
          ],
        },
        {
          name: 'ConceptName',
          description: 'Concept-specific management',
          children: [
            {
              name: 'ViewConceptDashboard',
              description: 'Concept dashboard overview',
              path: '/menu/concept/dashboard',
            },
            {
              name: 'ConfigureConceptInfo',
              description: 'Configure concept information',
              path: '/menu/concept/configure',
            },
            {
              name: 'ManageCategories',
              description: 'Manage menu categories',
              path: '/menu/concept/categories',
            },
            {
              name: 'ManageMenuItems',
              description: 'Manage menu items',
              path: '/menu/concept/items',
            },
            {
              name: 'ManageModifiers',
              description: 'Manage item modifiers',
              path: '/menu/concept/modifiers',
            },
            {
              name: 'ConceptAssets',
              description: 'Manage concept assets',
              path: '/menu/concept/assets',
            },
          ],
        },
      ],
    },
    {
      name: 'Display Management',
      description: 'Digital menu display management',
      path: '/display',
      children: [
        {
          name: 'DisplaySetup',
          description: 'Setup digital displays',
          path: '/display/setup',
          children: [
            {
              name: 'CreateDisplay',
              description: 'Create a new display',
              path: '/display/setup/new',
            },
          ],
        },
        {
          name: 'DisplayUID',
          description: 'Display-specific management',
          children: [
            {
              name: 'ViewDisplayDashboard',
              description: 'Display dashboard overview',
              path: '/display/dashboard',
            },
            {
              name: 'DisplayContentConfig',
              description: 'Configure display content',
              path: '/display/content',
            },
            {
              name: 'DisplayStyling',
              description: 'Configure display styling',
              path: '/display/styling',
            },
            {
              name: 'DisplayPreview',
              description: 'Preview display',
              path: '/display/preview',
            },
            {
              name: 'DisplayLiveView',
              description: 'Live view of display',
              path: '/display/live',
            },
          ],
        },
      ],
    },
    {
      name: 'Kiosk Management',
      description: 'Self-service kiosk management',
      path: '/kiosk',
      children: [
        {
          name: 'KioskSetup',
          description: 'Setup kiosks',
          path: '/kiosk/setup',
          children: [
            {
              name: 'RegisterKiosk',
              description: 'Register a new kiosk',
              path: '/kiosk/setup/register',
            },
          ],
        },
        {
          name: 'KioskUID',
          description: 'Kiosk-specific management',
          children: [
            {
              name: 'ViewKioskDashboard',
              description: 'Kiosk dashboard overview',
              path: '/kiosk/dashboard',
            },
            {
              name: 'KioskContentConfig',
              description: 'Configure kiosk content',
              path: '/kiosk/content',
            },
            {
              name: 'KioskStyling',
              description: 'Configure kiosk styling',
              path: '/kiosk/styling',
            },
            {
              name: 'KioskConfigEditor',
              description: 'Edit kiosk configuration',
              path: '/kiosk/config',
            },
            {
              name: 'KioskPreview',
              description: 'Preview kiosk',
              path: '/kiosk/preview',
            },
            {
              name: 'KioskView',
              description: 'Live view of kiosk',
              path: '/kiosk/view',
            },
          ],
        },
      ],
    },
    {
      name: 'KDC Management',
      description: 'Kitchen Display Controller management',
      path: '/kdc',
      children: [
        {
          name: 'KDCSetup',
          description: 'Setup kitchen displays',
          path: '/kdc/setup',
          children: [
            {
              name: 'RegisterKDC',
              description: 'Register a new kitchen display',
              path: '/kdc/setup/register',
            },
          ],
        },
        {
          name: 'KDCUID',
          description: 'KDC-specific management',
          children: [
            {
              name: 'ViewKDCDashboard',
              description: 'KDC dashboard overview',
              path: '/kdc/dashboard',
            },
            {
              name: 'KDCContentRouting',
              description: 'Configure KDC content routing',
              path: '/kdc/routing',
            },
            {
              name: 'KDCStyling',
              description: 'Configure KDC styling',
              path: '/kdc/styling',
            },
            {
              name: 'KDCPermissions',
              description: 'Configure KDC permissions',
              path: '/kdc/permissions',
            },
            {
              name: 'KDCPreview',
              description: 'Preview KDC',
              path: '/kdc/preview',
            },
            {
              name: 'KDCLiveView',
              description: 'Live view of KDC',
              path: '/kdc/live',
            },
          ],
        },
      ],
    },
    {
      name: 'Order Management',
      description: 'Order processing and management',
      path: '/orders',
      children: [
        {
          name: 'OrderDashboard',
          description: 'Order dashboard overview',
          path: '/orders/dashboard',
        },
        {
          name: 'OrderHistory',
          description: 'View order history',
          path: '/orders/history',
        },
        {
          name: 'OrderDetails',
          description: 'View order details',
          path: '/orders/details',
        },
        {
          name: 'OrderSettings',
          description: 'Configure order settings',
          path: '/orders/settings',
        }
      ],
    },
    {
      name: 'Payment Management',
      description: 'Payment processing and management',
      path: '/payments',
      children: [
        {
          name: 'PaymentDashboard',
          description: 'Payment dashboard overview',
          path: '/payments/dashboard',
        },
        {
          name: 'PaymentMethods',
          description: 'Configure payment methods',
          path: '/payments/methods',
        },
        {
          name: 'PaymentHistory',
          description: 'View payment history',
          path: '/payments/history',
        },
        {
          name: 'PaymentSettings',
          description: 'Configure payment settings',
          path: '/payments/settings',
        }
      ],
    },
    {
      name: 'Reports',
      description: 'Business analytics and reporting',
      path: '/reports',
      children: [
        {
          name: 'SalesReports',
          description: 'Sales analytics and reports',
          path: '/reports/sales',
        },
        {
          name: 'InventoryReports',
          description: 'Inventory analytics and reports',
          path: '/reports/inventory',
        },
        {
          name: 'CustomerReports',
          description: 'Customer analytics and reports',
          path: '/reports/customers',
        },
        {
          name: 'EmployeeReports',
          description: 'Employee analytics and reports',
          path: '/reports/employees',
        }
      ],
    },
    {
      name: 'User Management',
      description: 'User and role management',
      path: '/users',
      children: [
        {
          name: 'UserList',
          description: 'View and manage users',
          path: '/users/list',
        },
        {
          name: 'RoleManagement',
          description: 'Manage user roles and permissions',
          path: '/users/roles',
        },
        {
          name: 'UserInvitations',
          description: 'Invite new users',
          path: '/users/invitations',
        }
      ],
    }
  ]
};