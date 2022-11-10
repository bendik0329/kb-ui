export default [
    {
        title: 'Organization',
        icon: 'UsersIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'Franchise',
            route: 'organization-franchise',
            action: 'read',
            resource: 'Owner',
          },
          {
            title: 'PlansManagement',
            route: 'organization-plans-management',
            action: 'read',
            resource: 'Franchisee',
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
            resource: 'Franchisee',
          },
          {
            title: 'MembershipManagement',
            route: 'organization-membership-management',
            action: 'read',
            resource: 'Franchisee',
          },
          {
            title: 'LicenseManagement',
            route: 'organization-license-management',
            action: 'read',
            resource: 'Franchisee',
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