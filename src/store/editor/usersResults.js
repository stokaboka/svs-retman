const state = {
  title: 'Результаты тестирования пользователя',
  suffix: 'user/results',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'user', field: 'user', label: 'Пользователь', sortable: true, visible: false, update: false, insert: false },
    { name: 'results', field: 'results', label: 'Лог', sortable: true, visible: false, update: false, insert: false },
    { name: 'testing', field: 'testing', label: 'Результат', sortable: true, visible: false, update: false, insert: false },
    { name: 'rating', field: 'rating', label: 'Баллы', sortable: true, visible: true, false: false, insert: false },
    { name: 'date', field: 'date', label: 'Дата', sortable: true, visible: true, update: false, insert: false, mask: 'DD-MM-YYYY' }
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
