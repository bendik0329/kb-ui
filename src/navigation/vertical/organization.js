export default [
    {
        title: 'Organization',
        icon: 'UsersIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'Franchise (O)',
            route: 'organization-franchise',
            action: 'read',
            resource: 'owner',
          },
          {
            title: 'PlansManagement',
            route: 'organization-plans-management',
            action: 'read',
            resource: 'franchisee',
          },
          {
            title: 'Teams',
            route: 'organization-teams',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Users',
            route: 'organization-users',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'TaxManagement',
            route: 'organization-tax-management',
            action: 'read',
            resource: 'franchisee',
          },
          {
            title: 'MembershipManagement',
            route: 'organization-membership-management',
            action: 'read',
            resource: 'franchisee',
          },
          {
            title: 'LicenseManagement',
            route: 'organization-license-management',
            action: 'read',
            resource: 'franchisee',
          },
          {
            title: 'Cases',
            route: 'organization-cases',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MySupport',
            route: 'organization-my-support',
            action: 'read',
            resource: 'Agent',
          },
        ],
      },
]