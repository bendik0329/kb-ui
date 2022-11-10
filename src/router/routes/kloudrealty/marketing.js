export default [
    {
      path: '/marketing/my-campaigns',
      name: 'marketing-my-campaigns',
      component: () => import('@/views/marketing/my-campaigns/MyCampaignsSubpage.vue'),
      meta: {
        resource: 'Agent',
        action: 'read',
        },
    },
    {
        path: '/marketing/templates',
        name: 'marketing-templates',
        component: () => import('@/views/marketing/templates/TemplatesSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/marketing/analytics',
        name: 'marketing-analytics',
        component: () => import('@/views/marketing/analytics/AnalyticsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/marketing/marketing-materials',
        name: 'marketing-materials',
        component: () => import('@/views/marketing/marketing-materials/MarketingMaterialsSubpage.vue'),
        meta: {
          resource: 'Agent',
          action: 'read',
        },
    },
    {
        path: '/marketing/SEO',
        name: 'marketing-SEO',
        component: () => import('@/views/marketing/SEO(O)/SEOSubpage.vue'),
        meta:{
          resource: 'Owner',
          action: 'read',
        }
    },
    {
        path: '/marketing/AI',
        name: 'marketing-AI',
        component: () => import('@/views/marketing/AI(O)/AISubpage.vue'),
        meta:{
          resource: 'Owner',
          action: 'read',
        }
    },
  ]