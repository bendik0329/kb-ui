export default [
    {
      path: '/sales/leads',
      name: 'sales-leads',
      component: () => import('@/views/sales/leads/LeadsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Leads',
        breadcrumb: [
          {
            text: 'Sales',
          },
          {
            text: 'Leads',
            active: true,
          },
        ],
      },
    },
    {
      path: '/sales/contacts',
      name: 'sales-contacts',
      component: () => import('@/views/sales/contacts/ContactsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Contact',
          breadcrumb: [
            {
              text: 'Sales',
            },
            {
              text: 'Contact',
              active: true,
            },
          ],
      },
    },
    {
      path: '/sales/properties',
      name: 'sales-properties',
      component: () => import('@/views/sales/properties/PropertiesSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Properties',
          breadcrumb: [
            {
              text: 'Sales',
            },
            {
              text: 'Properties',
              active: true,
            },
          ],
      },
    },
    {
      path: '/sales/opportunities',
      name: 'sales-opportunities',
      component: () => import('@/views/sales/opportunities/OpportunitiesSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Opportunities',
          breadcrumb: [
            {
              text: 'Sales',
            },
            {
              text: 'Opportunities',
              active: true,
            },
          ],
      },
    },
    {
      path: '/sales/transactions',
      name: 'sales-transactions',
      component: () => import('@/views/sales/transactions/TransactionsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        pageTitle: 'Transactions',
          breadcrumb: [
            {
              text: 'Sales',
            },
            {
              text: 'Transactions',
              active: true,
            },
          ],
      },
    },
    {
      path: '/sales/forms',
      name: 'sales-forms',
      component: () => import('@/views/sales/forms/FormsList.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
        resource: 'Agent',
        action: 'read',
      },
    },
    {
      path: '/sales/forms/:filter',
      name: 'sales-forms-filter',
      component: () => import('@/views/sales/forms/FormsList.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
        navActiveLink: 'sales-forms',
        resource: 'Agent',
        action: 'read',
      },
      beforeEnter(to, _, next) {
        if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
        else next({ name: 'error-404' })
      },
    },
    {
      path: '/sales/task',
      name: 'sales-task',
      component: () => import('@/views/sales/task/TaskList.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
        resource: 'Agent',
        action: 'read',
      },
    },
  ]
  