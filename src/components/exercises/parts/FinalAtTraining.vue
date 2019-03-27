<template>
  <div class="final-container">
    <section class="final-section">
      <div class="final-row">
        <span class="final-num-label">Перед аутотренингом:</span>
        <span class="final-num-value">{{result.before.label}}</span>
      </div>

      <div class="final-row">
        <span class="final-num-label">После аутотренинга:</span>
        <span class="final-num-value">{{result.after.label}}</span>
      </div>

      <div class="final-row">
        <span class="final-num-label">Рекомендация:</span>
        <span class="final-num-value" v-html="result.recomendation"></span>
      </div>

    </section>
  </div>
</template>

<script>

/*
{
          'before': {
            'level': 3,
            'label': 'Ниже среднего'
          },
          'after': {
            'level': 5,
            'label': 'Отличное'
          },
          'recomendation': '<p>Ваше самочувствие до проведения аутотренинга:<br> <strong>Ниже среднего</strong>, после аутотренинга: <strong>Отличное</strong>. <br><strong>Аутотренинг улучшил Ваше настроение и самочувствие, Вы можете перейти к следующему уроку.</strong></p>'
        },
 */
export default {
  name: 'FinalAtTraining',
  props: {
    result: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
