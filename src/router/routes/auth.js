export default [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/auth.vue'),
      meta: {
        layout: 'full',
        resource: 'ACL',
        action: 'read',
      },
    },
  ]