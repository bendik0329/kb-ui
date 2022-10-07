export default [
    {
      path: '/settings/integrations',
      name: 'settings-integrations',
      component: () => import('@/views/settings/integrations(O)/IntegrationsSubpage.vue'),
      meta:{
        resource: 'owner',
        action: 'read',
      }
    },
    {
        path: '/settings/feature-access',
        name: 'settings-feature-access',
        component: () => import('@/views/settings/feature-access(O)/FeatureAccessSubpage.vue'),
        meta:{
          resource: 'owner',
          action: 'read',
          pageTitle: 'Feature Access',
          breadcrumb: [
            {
              text: 'Settings',
            },
            {
              text: 'feature-access',
              active: true,
            },
          ],
        }
    },
    {
        path: '/settings/payment-methods',
        name: 'settings-payment-methods',
        component: () => import('@/views/settings/payment-methods/PaymentMethodsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/settings/notifications',
        name: 'settings-notifications',
        component: () => import('@/views/settings/notifications/NotificationsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
  ]