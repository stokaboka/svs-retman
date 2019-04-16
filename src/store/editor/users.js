const state = {
  title: 'Пользователи',
  suffix: 'userss',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'login', field: 'login', label: 'Логин', sortable: true, visible: true, update: false, insert: false },
    { name: 'firstName', field: 'firstName', label: 'Имя', sortable: true, visible: true, update: false, insert: false },
    { name: 'secondName', field: 'secondName', label: 'Отчество', sortable: true, visible: true, update: false, insert: false },
    { name: 'lastName', field: 'lastName', label: 'Фамилия', sortable: true, visible: true, update: false, insert: false },
    { name: 'birthday', field: 'birthday', label: 'Дата рождения', sortable: true, visible: true, update: false, insert: false },
    { name: 'role', field: 'role', label: 'Группа', sortable: true, visible: true, update: false, insert: false }
  ],
  filter: ''
}

const getters = {
  model (state) {
    const {title, suffix, key, edit, columns} = state
    return {title, suffix, key, edit, columns}
  },
  filter (state) {
    return state.filter
  }
}

const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
