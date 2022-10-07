export default [
    {
        title: 'Me',
        icon: 'UserIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'MyProfile',
            route: 'me-page-profile',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyTeams',
            route: 'me-page-teams',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyLicense',
            route: 'me-page-license',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyMembership',
            route: 'me-page-membership',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyReports',
            route: 'me-page-reports',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyExpenses',
            route: 'me-page-expenses',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MyTax',
            route: 'me-page-tax',
            action: 'read',
            resource: 'Agent',
          },
        ],
      },
]