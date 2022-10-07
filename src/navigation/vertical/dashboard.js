export default [
  {
    header: 'Dashboard',
  },
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    tagVariant: 'light-warning',
    action: 'read',
    resource: 'Agent',
    children: [
      {
        title: 'eCommerce',
        route: 'dashboard-ecommerce',
        action: 'read',
        resource: 'Agent',
      },
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
        action: 'read',
        resource: 'Agent',
      },
    ],
  },
]
