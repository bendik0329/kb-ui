
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
]

