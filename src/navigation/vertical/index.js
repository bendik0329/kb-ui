/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import front from './front'
import dashboard from './dashboard'
import sales from './sales'
import marketing from './marketing'
import appsAndPages from './apps-and-pages'
import others from './others'
import chartsAndMaps from './charts-and-maps'
import uiElements from './ui-elements'
import formAndTable from './forms-and-table'
import education from './education'
import approvals from './approvals'
import propertyManagement from './property-mangement'
import organization from './organization'
import me from './me'
import settings from './settings'
import axios from 'axios'

//server
import { $theServer } from '@themeConfig'

axios.get(`${$theServer.server}/accesses`)
  .then(res => { 
    // console.log('nav',res.data.data)
    if(res.data.data) { 
        // console.log("success")

        const routeAccess = {}
        const resData = res.data.data
        // console.log(resData)
        resData.forEach( item => {
            routeAccess[item.attributes.label] = {}
            item.attributes.children.forEach(page => {
                routeAccess[page.route][page.page] = filterResource(page.Access)
            })
        })
        dashboard.forEach(item => {
            item.resource = routeAccess.dashboard[item.route]
        })
        sales[0].children.forEach(item => {
            item.resource = routeAccess.sales[item.route]
        })
        approvals.forEach(item => {
            item.resource = routeAccess.approvals[item.route]
        })
        marketing[0].children.forEach(item => {
            item.resource = routeAccess.marketing[item.route]
        })
        education.forEach(item => {
            item.resource = routeAccess.education[item.route]
        })
        organization[0].children.forEach(item => {
            item.resource = routeAccess.organization[item.route]
        })
        propertyManagement[0].children.forEach(item => {
            item.resource = routeAccess.propertyManagement[item.route]
        })
        me[0].children.forEach(item => {
            item.resource = routeAccess.me[item.route]
        })
        settings[0].children.forEach(item => {
            item.resource = routeAccess.settings[item.route]
        })
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


// Array of sections
export default [
    ...front,
    ...dashboard,
    ...sales,
    ...propertyManagement,
    ...approvals,
    ...marketing,
    ...education,
    ...me,
    ...organization,
    ...settings, 
]
