export default [
    {
      path: '/approvals',
      name: 'approvals',
      component: () => import('@/views/approvals/ApprovalsPage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
  ]