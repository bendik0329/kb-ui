
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

axios.get(`${$theServer.server}/setting/route-access`)

  .then(res => { 
    if(res.data.success) { 
        console.log($theServer)
        console.log("success")
        const routeAccess = res.data.routeData
        dashboard.forEach(item => {
            item.meta.resource = routeAccess.dashboard[item.name]
        })
        sales.forEach(item => {
            item.meta.resource = routeAccess.sales[item.name]
        })
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
    }

  }).catch(err => {
    console.log(err)
  })




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