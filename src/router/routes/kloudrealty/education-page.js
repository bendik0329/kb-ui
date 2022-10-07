export default [
    {
      path: '/education',
      name: 'education',
      component: () => import('@/views/education/EducationPage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
      },
    },
  ]