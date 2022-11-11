import axios from '@axios'

import { $theServer } from '@themeConfig'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    //old
    fetchTasks(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/todo/tasks', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addTask(ctx, taskData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/todo/tasks', { task: taskData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateTask(ctx, { task }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/apps/todo/tasks/${task.id}`, { task })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeTask(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/apps/todo/tasks/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },


    //new
    fetchFranchise(ctx, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        let url = `${$theServer.server}/users/me?[populate]=*`
        axios
          .get(url, { params: payload })
          .then(response => {
            // console.log(response.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },


    fetchForms(ctx, payload) {
      return new Promise((resolve, reject) => {
        let url = `${$theServer.server}/users/me?populate[forms][populate]=*`
        axios
          .get(url, { params: payload })
          .then(response => {
            console.log(response.data)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addForm(ctx, form) {
      return new Promise((resolve, reject) => {
        let url = `${$theServer.server}/forms`
        delete form.id
        console.log(form)
        axios
          .post(url, { data: form })
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    updateForm(ctx, { form }) {
      return new Promise((resolve, reject) => {
        let url = `${$theServer.server}/forms/${form.id}`
        console.log(url)
        axios
          .put(url, { data:form })
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    removeForm(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${$theServer.server}/forms/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}
