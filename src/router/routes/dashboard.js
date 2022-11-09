
export default [
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
    meta: {
      resource: 'Agent',
      action: 'read',
    },
  },
  {
    path: '/dashboard/owner',
    name: 'dashboard-owner',
    component: () => import('@/views/dashboard/owner/OwnerPage.vue'),
    meta: {
      resource: 'owner',
      action: 'read',
    },
  },
  {
    path: '/dashboard/franchise',
    name: 'dashboard-franchise',
    component: () => import('@/views/dashboard/franchise/FranchisePage.vue'),
    meta: {
      resource: 'Franchise',
      action: 'read',
    },
  },
  {
    path: '/dashboard/agent',
    name: 'dashboard-agent',
    component: () => import('@/views/dashboard/agent/AgentPage.vue'),
    meta: {
      resource: 'Agent',
      action: 'read',
    },
  },
  
]

