const state = {
  title: 'Уроки и проходы',
  suffix: 'ls',
  key: 'id',
  edit: {
    insert: false,
    update: true,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'lang', field: 'lang', label: 'Язык', sortable: true, visible: true, update: false, insert: false },
    { name: 'title', field: 'title', label: 'Заголовок', sortable: true, visible: true, update: false, insert: false },
    { name: 'step', field: 'step', label: 'Шаг', sortable: true, visible: true, update: false, insert: false },
    { name: 'lesson', field: 'lesson', label: 'Урок', sortable: true, visible: true, update: false, insert: false },
    { name: 'stage', field: 'stage', label: 'Проход', sortable: true, visible: true, update: false, insert: false },
    { name: 'pages', field: 'pages', label: 'Страниц', sortable: true, visible: true, update: false, insert: false },
    { name: 'scope', field: 'scope', label: 'Фильтр', sortable: true, visible: true, update: false, insert: false },
    { name: 'sound', field: 'sound', label: 'Звук', sortable: true, visible: true, update: false, insert: false },
    { name: 'time', field: 'time', label: 'Время', sortable: true, visible: true, update: false, insert: false }
  ],
  filter: 'FilterStages'
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
