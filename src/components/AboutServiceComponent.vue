<template>
  <div class="row justify-center items-center">

    <div  class="col">
    <p>
    <span class="tls">ТЛС</span> предназначена для автоматизированной оценки способностей тестируемого для изучения иностранного языка в автоматическом режиме.
    </p>
    <p>
    Тестируемый регистрируется в системе и вполняет 6 последовательных тестов:
    </p>
    <ul>
      <li>Мнемонический тест</li>
      <li>Определение языка пробного обучения</li>
      <li>Входной тест знания лексики языка пробного обучения</li>
      <li>Тест влияния аутотренинга на интенсивность обучения</li>
      <li>Пробное обучение</li>
      <li>Выходной тест знания лексики языка пробного обучения</li>
    </ul>
    <p>После выполнения этих тестов, Тестируемый получает автоматическую интерпретацию результатов тестирования.</p>
    </div>

    <div class="col">
      <img src="/statics/assets/icons_1082x972_new_02_small.png" >
    </div>

  </div>
</template>

<script>
export default {
  name: 'AboutServiceComponent',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .tls {
    font-size: 3rem;
    font-weight: bold;
    color: indigo;
  }
</style>
