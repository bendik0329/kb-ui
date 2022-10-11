// Theme Colors

import { BIconArrowUpRightSquareFill } from 'bootstrap-vue'

// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
export const $themeColors = {}

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {}

// APP CONFIG
export const $themeConfig = {
  app: {
    appName: 'Kloud Realty', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/logo/square-logo.png'), // Will update logo in navigation menu (Branding)
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'zoom-fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: '', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: true,
    enableScrollToTop: true,
  },
}

//serve 167.99.0.93
const  mode ='uat' //'local','uat','prod'

const  uat = 'https://uat.kloudrealty.com/api/api' //  localhost or https://uatkloudrealty.com
const  prod = 'https://kloudrealty.com/api/api'

function ApiUrl(mode) {
  if(mode == 'uat') {
    return uat
  }
  if(mode =='prod') {
    return prod
  }
}

export const $theServer ={
  server: ApiUrl(mode)
} 
