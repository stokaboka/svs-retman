const state = {
  title: 'Фазы теста',
  suffix: 'ph',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },

  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: true },
    { name: 'step', field: 'step', label: 'Шаг', sortable: true, visible: true, update: false, insert: true },
    { name: 'phase', field: 'phase', label: 'Фаза', sortable: true, visible: true, update: false, insert: true },
    { name: 'num', field: 'num', label: '#', sortable: true, visible: true, update: false, insert: true },
    { name: 'action', field: 'action', label: 'Действие', sortable: true, visible: true, update: false, insert: true },
    { name: 'result', field: 'result', label: 'Результат', sortable: true, visible: true, update: false, insert: true },
    { name: 'title', field: 'title', label: 'Заголовок', sortable: true, visible: true, update: false, insert: true },
    { name: 'scope', field: 'scope', label: 'Фильтр', sortable: true, visible: true, update: false, insert: true },
    { name: 'text', field: 'text', label: 'Текст', sortable: true, visible: true, update: false, insert: true },
    { name: 'sounds', field: 'sounds', label: 'Звук', sortable: true, visible: true, update: false, insert: true },
    { name: 'soundVolume', field: 'soundVolume', label: 'Уровень звука', sortable: true, visible: true, update: false, insert: true },
    { name: 'mode', field: 'mode', label: 'Цикл звука', sortable: true, visible: true, update: false, insert: true },
    { name: 'time', field: 'time', label: 'Время', sortable: true, visible: true, update: false, insert: true },
    { name: 'next', field: 'next', label: 'Продолжить', sortable: true, visible: true, update: false, insert: true },
    { name: 'stages', field: 'stages', label: 'Шагов', sortable: true, visible: true, update: false, insert: true },
    { name: 'pages', field: 'pages', label: 'Страниц', sortable: true, visible: true, update: false, insert: true },
    { name: 'component', field: 'component', label: 'Компонент', sortable: true, visible: true, update: false, insert: true }
  ],
  filter: 'FilterPhases'
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
