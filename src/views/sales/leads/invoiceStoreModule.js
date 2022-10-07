import axios from '@axios'

import { $theServer } from '@themeConfig'

const url =`${$theServer.server}/sales/lead`

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchInvoices(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/invoice/invoices', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // getLeads(ctx, queryParams) {
    //   return new Promise(() => {
    //     axios
    //       .get(url)
    //       .then(response => {
    //         console.log(response)
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //   })
    // },
    fetchInvoice(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/invoice/invoices/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchClients() {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/invoice/clients')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // addUser(ctx, userData) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post('/apps/user/users', { user: userData })
    //       .then(response => resolve(response))
    //       .catch(error => reject(error))
    //   })
    // },
  },
}
