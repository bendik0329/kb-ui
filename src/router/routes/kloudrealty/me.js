export default [
    {
      path: '/me-page/profile',
      name: 'me-page-profile',
      component: () => import('@/views/me-page/me-page.vue'),
      meta: {
          resource: 'Agent',
          action: 'read',
          pageTitle: 'My Profile',
          breadcrumb: [
            {
              text: 'Me',
            },
            {
              text: 'Profile',
              active: true,
            },
          ],
        },
    },
    {
        path: '/me-page/teams',
        name: 'me-page-teams',
        component: () => import('@/views/me-page/my-teams/MyTeamsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/me-page/license',
        name: 'me-page-license',
        component: () => import('@/views/me-page/my-license/MyLicenseSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/me-page/membership',
        name: 'me-page-membership',
        component: () => import('@/views/me-page/my-membership/MyMembershipSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/me-page/reports',
        name: 'me-page-reports',
        component: () => import('@/views/me-page/my-reports/MyReportsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/me-page/expenses',
        name: 'me-page-expenses',
        component: () => import('@/views/me-page/my-expenses/MyExpensesPage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/me-page/tax',
        name: 'me-page-tax',
        component: () => import('@/views/me-page/my-tax/MyTaxSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
  ]