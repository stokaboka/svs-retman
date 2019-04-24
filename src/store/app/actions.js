export function checkLockResume ({ commit, getters }) {
  const lockDate = localStorage.getItem('LOCK_RESUME_DATE')
  const now = new Date()

  console.log('lockDate', lockDate)
  let lock = false
  if (lockDate) {
    const ld = new Date(lockDate)
    lock = ld.getDate() === now.getDate() && ld.getMonth() === now.getMonth() && ld.getFullYear() === now.getFullYear()
  }
  commit('SET_LOCK_RESUME', lock)
  commit('SET_ALLOW_RESUME', !lock)
}

export function setLockResume ({ commit, getters }) {
  commit('SET_LOCK_RESUME', true)
  localStorage.setItem('LOCK_RESUME_DATE', new Date())
}
