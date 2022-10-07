export default [
    {
        title: 'Marketing',
        icon: 'DollarSignIcon',
        tagVariant: 'light-warning',
        action: 'read',
        resource: 'Agent',
        children: [
          {
            title: 'MyCampaigns',
            route: 'marketing-my-campaigns',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Templates',
            route: 'marketing-templates',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'Analytics',
            route: 'marketing-analytics',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'MarketingMaterials',
            route: 'marketing-materials',
            action: 'read',
            resource: 'Agent',
          },
          {
            title: 'SEO (O)',
            route: 'marketing-SEO',
            action: 'read',
            resource: 'owner',
          },
          {
            title: 'AI (O)',
            route: 'marketing-AI',
            action: 'read',
            resource: 'owner',
          },
        ],
      },
]