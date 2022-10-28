export default [
    {
        title: 'Sales',
        icon: 'ShoppingCartIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'Leads',
            route: 'sales-leads',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Contacts',
            route: 'sales-contacts',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Properties',
            route: 'sales-properties',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Opportunities',
            route: 'sales-opportunities',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Transactions',
            route: 'sales-transactions',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Forms',
            route: 'sales-forms',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Task',
            route: 'sales-task',
            action: 'read',
            resource: 'Agent',
          },
        ],
      },
]