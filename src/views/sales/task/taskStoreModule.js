import axios from '@axios'

const apiUrl ='https://uat.kloudrealty.com/api/api/users/me?populate[tasks][populate]=*'


export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTasks(ctx, payload) {
      return new Promise((resolve, reject) => {
        let  url = apiUrl
        if(payload.q) {
          url = apiUrl+'&populate[tasks][filters][title][$contains]='+payload.q
          axios
          .get(url)
          .then(response => {
            console.log('filters',response.data.tasks)
          })
        }
        axios
          .get('/apps/todo/tasks', { params: payload })
          .then(response => {
            console.log(response)
            resolve(response)
          })
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
  },
}
