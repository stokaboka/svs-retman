<template>
  <div>
    <div class="row">
      <div v-for="column in columns" :class="column.class" :key="column.id">
        <span class="text-weight-bold">{{column.header}}</span>
      </div>
    </div>
    <div v-for="level in levels" :key="level.id" class="row row-levels">
      <div v-for="column in columns" :class="column.class" :key="column.id">
        <q-checkbox
          v-if="column.id < 4"
          :val="level.id"
          v-model="checked[column.lang]"
          @input="levelChecked"
          class="q-ml-sm q-mr-sm"
        >
        </q-checkbox>
        <span v-if="column.id === 4">{{level.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfLanguageRating',
  data () {
    return {
      title: 'Самооценка речевых навыков в общенении на английском, немецком и французском языках',
      columns: [
        {id: 1, header: 'Английский', lang: 'EN', level: 0, class: 'col q-pl-sm q-pr-sm row justify-center'},
        {id: 2, header: 'Немецкий', lang: 'DE', level: 0, class: 'col q-pl-sm q-pr-sm row justify-center'},
        {id: 3, header: 'Французский', lang: 'FR', level: 0, class: 'col q-pl-sm q-pr-sm row justify-center'},
        {id: 4, header: 'Уровень', lang: '', level: 1, class: 'col-7 q-pl-sm q-pr-sm row justify-start'}
      ],
      levels: [
        {id: 1, name: 'Полное отсутствие знаний.'},
        {id: 2, name: 'Могу отличить данный язык от другого.'},
        {id: 3, name: 'Понимаю отдельные слова.'},
        {id: 4, name: 'Понимаю смысл отдельных фраз.'},
        {id: 5, name: 'Иностранную речь понимаю, но разговаривать не могу.'},
        {id: 6, name: 'В беседе могу ответить на простые вопросы.'},
        {id: 7, name: 'Могу поддержать диалог на повседневные темы.'},
        {id: 8, name: 'Могу самостоятельно подготовить и сделать сообщение (выступление).'},
        {id: 9, name: 'Могу вести полемику, отстаивать свою точку зрения (участвовать в дискуссии).'},
        {id: 10, name: 'Могу свободно изъясняться на любую тему, общаться с носителями языка.'},
        {id: 11, name: 'Владею иностранным языком как родным'}

      ],
      checked: {
        EN: [],
        DE: [],
        FR: []
      }
    }
  },

  methods: {
    levelChecked () {
      this.$emit('exercies-action', {id: 'changed-self-rating', data: this.checked})
    }
  }
}
</script>

<style>
  .row-levels {
    border-bottom: #d9d9d9 solid 1px;
  }

  .row-levels:hover {
    background-color: deepskyblue;
  }

</style>
