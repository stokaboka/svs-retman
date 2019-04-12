const state = {
  title: 'Временные метки',
  suffix: 'cue',
  key: 'id',
  edit: {
    insert: false,
    update: false,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: false },
    { name: 'file', field: 'file', label: 'Файл', sortable: true, visible: false, update: false, insert: false },
    { name: 'pos', field: 'pos', label: 'Смещение', sortable: true, visible: true, update: false, insert: false }
  ],
  filter: 'FilterCues'
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
