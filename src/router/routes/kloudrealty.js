//router
import dashboard from './dashboard'
import sales from './kloudrealty/sales'
import approvals from './kloudrealty/approvals'
import marketing from './kloudrealty/marketing'
import education from './kloudrealty/education-page'
import organization from './kloudrealty/organization'
import propertyManagement from './kloudrealty/property-management'
import me from './kloudrealty/me'
import settings from './kloudrealty/settings'

import axios from 'axios'

//server
import { $theServer } from '@themeConfig'

//get access

axios.get(`${$theServer.server}/accesses`)

  .then(res => { 
    // console.log('route',res.data.data)
    if(res.data.data) { 
        // console.log($theServer)
        // console.log("success")

        const routeAccess = {}
        const resData = res.data.data
        resData.forEach( item => {
            routeAccess[item.attributes.label] = {}
            item.attributes.children.forEach(page => {
                routeAccess[page.route][page.page] = filterResource(page.Access)
            })
        })
        //console.log(dashboard)
        dashboard.forEach(item => {
            item.meta.resource = routeAccess.dashboard[item.name]
        })
        // console.log(sales)
        sales.forEach(item => {
            item.meta.resource = routeAccess.sales[item.name]
        })
        // console.log(routeAccess.sales)
        approvals.forEach(item => {
            item.meta.resource = routeAccess.approvals[item.name]
        })
        marketing.forEach(item => {
            item.meta.resource = routeAccess.marketing[item.name]
        })
        education.forEach(item => {
            item.meta.resource = routeAccess.education[item.name]
        })
        organization.forEach(item => {
            item.meta.resource = routeAccess.organization[item.name]
        })
        propertyManagement.forEach(item => {
            item.meta.resource = routeAccess.propertyManagement[item.name]
        })
        me.forEach(item => {
            item.meta.resource = routeAccess.me[item.name]
        })
        settings.forEach(item => {
            item.meta.resource = routeAccess.settings[item.name]
        })

        // console.log(routeAccess)
    }
  }).catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
    });

    function filterResource(resource) {
        if(resource.includes('Agent')) return 'Agent'
        if(resource.includes('Franchise')) return 'Franchise'
        if(resource.includes('Owner')) return 'Owner'
    }


export default [
    ...dashboard,
    ...sales,
    ...approvals,
    ...marketing,
    ...education,
    ...organization,
    ...propertyManagement,
    ...me,
    ...settings,
]