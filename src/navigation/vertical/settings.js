export default [
    {
        title: 'Settings',
        icon: 'SettingsIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Owner',
        children: [
          {
            title: 'Integrations (O)',
            route: 'settings-integrations',
            action: 'read',
            resource: 'Owner',
          },
          {
            title: 'FeatureAccess (O)',
            route: 'settings-feature-access',
            action: 'read',
            resource: 'Owner',
          },
          {
            title: 'PaymentMethods',
            route: 'settings-payment-methods',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Notifications',
            route: 'settings-notifications',
            action: 'read',
            resource: 'Agent',
          },
        ],
      },
]