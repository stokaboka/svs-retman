const testWordReducer = (acc, val) => {
  if (val.word2 && val.word2 === val.hide) {
    return acc + 1
  }
  return acc
}

const testLevelReducer = (acc, val) => {
  return acc + val
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

const reduce = (arr, reducer, value) => {
  let out = value
  for (let elem of arr) {
    out = reducer(out, elem)
  }
  return out
}

export {
  testWordReducer,
  testLevelReducer,
  minKeysValues,
  reduce
}
