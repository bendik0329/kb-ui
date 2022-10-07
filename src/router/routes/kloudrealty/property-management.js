export default [
    {
      path: '/property-management/properties',
      name: 'property-management-properties',
      component: () => import('@/views/property-management/properties/PropertiesSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/property-management/tenants',
      name: 'property-management-tenants',
      component: () => import('@/views/property-management/tenants/TenantsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/property-management/applications',
      name: 'property-management-applications',
      component: () => import('@/views/property-management/applications/ApplicationsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/property-management/leases-and-attachment',
      name: 'property-management-leases-and-attachment',
      component: () => import('@/views/property-management/leases-and-attachments/LeasesAndAttachmentsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/property-management/transactions',
      name: 'property-management-transactions',
      component: () => import('@/views/property-management/transactions/TransactionsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/property-management/maintenance',
      name: 'property-management-maintenance',
      component: () => import('@/views/property-management/maintenance/MaintenanceSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
  ]