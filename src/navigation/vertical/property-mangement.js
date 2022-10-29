export default [
    {
        title: 'Property Mgmt',
        icon: 'BriefcaseIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'Properties',
            route: 'property-management-properties',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Tenants',
            route: 'property-management-tenants',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Applications',
            route: 'property-management-applications',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'LeasesAndAttachments',
            route: 'property-management-leases-and-attachment',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Transactions',
            route: 'property-management-transactions',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Maintenance',
            route: 'property-management-maintenance',
            action: 'read',
            resource: 'Agent',
          },
        ],
      },
]