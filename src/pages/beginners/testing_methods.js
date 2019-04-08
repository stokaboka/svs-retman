const at0 = result => {
  return 0
}

const selftext = result => {
  return 0
}

const mnemic = result => {
  return result.mnemic.remembered
}

const ratingWords = result => {
  return result.selfrating.ControlRating.reduced.EN + result.selfrating.ControlRating.reduced.DE + result.selfrating.ControlRating.reduced.FR
}

const ratingSelf = result => {
  return result.selfrating.SelfRating.reduced.EN + result.selfrating.SelfRating.reduced.DE + result.selfrating.SelfRating.reduced.FR
}

const delta = result => {
  return result.endlexical.remembered - result.lexical.remembered
}

const talking = result => {
  return 0
}

export default {
  methods: {
    at0,
    selftext,
    mnemic,
    ratingWords,
    ratingSelf,
    delta,
    talking
  }
}
