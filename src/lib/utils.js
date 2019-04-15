const RESULTS_INFO = {
  mnemicWords: 50,
  mnemicCancel: 5
}

const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)))

const toDDMMYYYY = (dt) => (dt ? dt.toString().substr(0, 10).split('-').reverse().join('/') : '')

const testWordReducer = (acc, val) => {
  if (val.word2 && val.word2 === val.hide) {
    return acc + 1
  }
  return acc
}

const testLevelReducer = (acc, val, prop = null) => {
  if (prop) {
    return acc + val[prop]
  } else {
    return acc + val
  }
}

const minKeysValues = (keys, values) => {
  let outKey = keys[0]
  let min = values[outKey]
  for (let key of keys) {
    if (min > values[key]) {
      outKey = key
      min = values[outKey]
    }
  }
  return {lang: outKey, value: min}
}

const reduce = (arr, reducer, value, prop = null) => {
  let out = value
  for (let elem of arr) {
    out = reducer(out, elem, prop)
  }
  return out
}

const findWW = (list, obj) => {
  let out = list.findIndex((elem) => {
    return (elem.word1 === obj.word1 && elem.word2 === obj.word2)
  })
  return out >= 0
}

const lexicalResult = (checkedWordsPairs, rememberedWordsPairs) => {
  const out = {
    checked: checkedWordsPairs.length,
    checkedWordsPairs: checkedWordsPairs.map(e => { return {word1: e.word1, word2: e.word2, hide: e.hide ? e.hide : ''} }),
    rememberedWordsPairs: rememberedWordsPairs.filter(e => e.word2),
    remembered: 0,
    percent: 0,
    cancel: false
  }

  for (const checkedWordPair of checkedWordsPairs) {
    out.remembered += findWW(rememberedWordsPairs, checkedWordPair) ? 1 : 0
  }

  out.percent = Math.ceil(100 * out.remembered / RESULTS_INFO.mnemicWords)
  out.cancel = out.remembered < RESULTS_INFO.mnemicCancel

  return out
}

export {
  testWordReducer,
  testLevelReducer,
  minKeysValues,
  reduce,
  lexicalResult,
  sleep,
  toDDMMYYYY
}
