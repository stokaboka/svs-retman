const state = {
  title: 'Словарь',
  suffix: 'words',
  key: 'id',
  edit: {
    insert: false,
    update: true,
    delete: false
  },
  columns: [
    { name: 'id', field: 'id', label: 'id', sortable: true, visible: false, update: false, insert: true },
    { name: 'word1', field: 'word1', label: 'Слово/фраза 1', align: 'left', sortable: true, visible: true, update: false, insert: false },
    { name: 'word2', field: 'word2', label: 'Слово/фраза 2', align: 'left', sortable: true, visible: true, update: false, insert: true },
    { name: 'lang1', field: 'lang1', label: 'Язык родной', align: 'left', sortable: true, visible: false, update: false, insert: true },
    { name: 'lang2', field: 'lang2', label: 'Язык обучения', align: 'left', sortable: true, visible: false, update: false, insert: true },
    { name: 'scope', field: 'scope', label: 'Тест', sortable: true, visible: false, update: false, insert: true }
  ],
  filter: 'FilterDictionary'
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
