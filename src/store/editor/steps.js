const state = {
  title: 'Шаги',
  suffix: 's',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'title', field: 'title', label: 'Заголовок', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'lessons', field: 'lessons', label: 'Урок', sortable: true, visible: true, update: false, insert: false },
    { name: 'brief', field: 'brief', label: 'Описание', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'test', field: 'test', label: 'Тест', sortable: true, visible: true, update: false, insert: false },
    { name: 'learning', field: 'learning', label: 'Обучение', sortable: true, visible: true, update: false, insert: false },
    { name: 'briefText', field: 'briefText', label: 'Комментарий', align: 'left', sortable: true, visible: true, update: false, insert: false }
  ],
  filter: 'FilterSteps'
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
