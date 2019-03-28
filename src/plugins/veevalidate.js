import ru from 'vee-validate/dist/locale/ru'
import VeeValidate, { Validator } from 'vee-validate'

export default ({ app, router, Vue }) => {
  const config = {
    locale: 'ru',
    errorBagName: 'veeerrors', // change if property conflicts
    events: 'input|blur',
    fieldsBagName: 'veefields'
  }
  Vue.use(VeeValidate, config)
  Validator.localize('ru', ru)
}
