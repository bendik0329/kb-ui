


export default [
    {
      path: '/organization/franchise',
      name: 'organization-franchise',
      component: () => import('@/views/organization/franchise(O)/FranchiseSubpage.vue'),
      meta: {
        resource: 'owner',
        action: 'read',
        pageTitle: 'Franchise',
        breadcrumb: [
          {
            text: 'Organization',
          },
          {
            text: 'Franchise',
            active: true,
          },
        ],
      }
    },
    {
      path: '/organization/plans-management',
      name: 'organization-plans-management',
      component: () => import('@/views/organization/plans-management/PlansManagementSubpage.vue'),
      meta: {
        resource: 'Franchise',
        action: 'read',
      },
    },
    {
      path: '/organization/teams',
      name: 'organization-teams',
      component: () => import('@/views/organization/teams/TeamsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Teams',
        breadcrumb: [
          {
            text: 'Organization',
          },
          {
            text: 'Teams',
            active: true,
          },
        ],
      },
    },
    {
      path: '/organization/users',
      name: 'organization-users',
      component: () => import('@/views/organization/users/UsersSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/organization/tax-management',
      name: 'organization-tax-management',
      component: () => import('@/views/organization/tax-management/TaxManagementSubpage.vue'),
      meta: {
        resource: 'Franchise',
        action: 'read',
      },
    },
    {
      path: '/organization/membership-management',
      name: 'organization-membership-management',
      component: () => import('@/views/organization/membership-management/MembershipManagementSubpage.vue'),
      meta: {
        resource: 'Franchise',
        action: 'read',
      },
    },
    {
      path: '/organization/license-management',
      name: 'organization-license-management',
      component: () => import('@/views/organization/license-management/LicenseManagementSubpage.vue'),
      meta: {
        resource: 'Franchise',
        action: 'read',
      },
    },
    {
      path: '/organization/cases',
      name: 'organization-cases',
      component: () => import('@/views/organization/cases/CasesSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/organization/my-support',
      name: 'organization-my-support',
      component: () => import('@/views/organization/my-support/MySupportSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
  ]

