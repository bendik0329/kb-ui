export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views/extensions/acl/AccessControl.vue'),
    meta: {
      resource: 'ACL',
      action: 'read',
    },
  },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'ACL',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
]
