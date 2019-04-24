<template>
  <q-page class="container page-container">

    <q-page-sticky v-if="showTimerPlayPauseBtn" class="play-pause_btns" position="right" :offset="[18, 18]">
      <q-btn round dense color="secondary" size="xl" @click="onPlayPause" :icon="playPauseIcon" />
    </q-page-sticky>

    <q-page-sticky v-if="showAudioPlayPauseBtn" class="play-pause_btns" position="right" :offset="[18, 18]">
      <q-btn round dense color="secondary" size="xl" @click="onPlayPause" :icon="playPauseIcon" />
    </q-page-sticky>

    <div v-show="stepperFullScreenVisible" class="stepper-container">
      <step-stepper-component :brief="showBrief" ></step-stepper-component>
    </div>

    <section v-if="phase" class="phase-section">
      <div v-if="briefVisible && phase.text" class="phase-text-container">
        <q-icon :name="phaseIcon" size="3rem" color="positive"/>
        <div v-html="phase.text" class="phase-text-container__text"></div>
      </div>

      <time-progress
        v-show="timer.active && progressVisible"
        class="section-time-progress"
        :timer="timer">
      </time-progress>

      <component
        v-if="phase.component"
        class="component-container"
        :style="styleTestComponent"
        :is="phase.component"
        :dictionary="dictionary"
        :lessons="lessons"
        :cue="cue"
        :lang1="learningLang"
        :video="video"
        :audio="audio"
        :timer="timer"
        :results="results"
        :testing="testing"
        ref="phaseComponent"
        @exercies-action="onExerciesAction"
      ></component>

    </section>

    <div class="page-footer">
      <q-btn
        class="button__next-phase"
        v-if="showNextBtn && allowResume"
        label="Продолжить"
        color="primary"
        @click="doNextAction">
      </q-btn>
      <q-btn
        class="button__next-phase"
        v-if="showCancelBtn || allowCancel"
        label="ЗАВЕРШИТЬ РАБОТУ"
        color="red"
        @click="doCancel">
      </q-btn>
    </div>

    <div v-if="phase.video" class="column justify-center items-center shadow-2">
      <span>Пример выполнения теста:</span>
      <video height="320" autoplay controls loop muted>
        <source
          :src="videoHEVC"
          type="video/mp4; codecs=hevc,mp4a.40.2"
        />
        <source
          :src="videoAV1"
          type="video/mp4; codecs=av01.0.05M.08,opus"
        />
        <source
          :src="videoH264"
          type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
        />
      </video>
    </div>

  </q-page>
</template>

<script>
// <span>{{phase.title}}</span>
// <span v-else>{{step.title}}</span>
// import {createNamespacedHelpers} from 'vuex'
import StepStepperComponent from '../../components/StepStepperComponent'
import SoundTest from '../../components/exercises/SoundTest'

import SelfLanguageRating from '../../components/exercises/SelfLanguageRating'
import ControlLanguageRating from '../../components/exercises/ControlLanguageRating'
import SelfLexicalLearningLang from '../../components/exercises/SelfLexicalLearningLang'
import TwoColumnWordsWithCheckBox from '../../components/exercises/TwoColumnWordsWithCheckBox'
import TwoColumnWordsWithMoveWords from '../../components/exercises/TwoColumnWordsWithMoveWords'

import SANTest from '../../components/exercises/SANTest'
import SANExpressTest from '../../components/exercises/SANExpressTest'
import SANExpressResult from '../../components/exercises/SANExpressResult'
import AT0Test from '../../components/exercises/AT0Test'

import AutoTrainingSelfTest from '../../components/exercises/AutoTrainingSelfTest'
import AutoTraining from '../../components/exercises/AutoTraining'

import BeginnerFinalResult from '../../components/exercises/BeginnerFinalResult'

import Lesson from '../../components/exercises/Lesson'

import exerciesBase from './exercies_base'
import resultMetods from './result_metods'
import exerciesMethods from './exercies_methods'

import TimeProgress from '../../components/TimeProgress'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'BeginnersPage',
  mixins: [
    exerciesBase,
    resultMetods,
    exerciesMethods
  ],
  components: {
    TimeProgress,
    SoundTest,
    TwoColumnWordsWithCheckBox,
    TwoColumnWordsWithMoveWords,
    StepStepperComponent,
    SelfLanguageRating,
    ControlLanguageRating,
    SelfLexicalLearningLang,
    SANTest,
    SANExpressTest,
    SANExpressResult,
    AT0Test,
    AutoTrainingSelfTest,
    AutoTraining,
    Lesson,
    BeginnerFinalResult
  },

  computed: {
    ...mapGetters('app', ['api', 'allowResume', 'allowCancel']),
    ...mapGetters('auth', ['isLogged', 'user']),
    ...mapGetters('beginners', [
      'steps',
      'step',
      'restartStep',
      'isLastStep',
      'phases',
      'phase',
      'dictionary',
      'lessons',
      'soundTestResult',
      'stepperVisible',
      'learningLang',
      'learningLangNames',
      'mnemonicRecommendations',
      'results',
      'testing',
      'learningTime',
      'atLevels',
      'cue',
      'soundTheme'
    ]),
    ...mapState('beginners', [ 'sound', 'error' ])
  },

  methods: {
    ...mapMutations('app', {setAllowResume: 'SET_ALLOW_RESUME', setAllowCancel: 'SET_ALLOW_CANCEL'}),
    ...mapMutations('beginners', [
      'setPhraseText',
      'setStepperVisible',
      'setLearningLang',
      'setResults',
      'setDictionary',
      'setRestartStep'
    ]),
    ...mapActions('beginners', [
      'getSteps',
      'resetSteps',
      'nextStep',
      'nextPhase',
      'fixStep',
      'fixPhase',
      'getPhasesByStep',
      'gotoStep',
      'getDictionary',
      'getLessons',
      'getCue',
      'getMnemonicRecommendation',
      'saveResult',
      'loadResult'
    ]),
    ...mapActions('app', ['setLockResume'])
  },

  watch: {
    '$q.fullscreen.isActive' (val) {
      // console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
      this.progressVisible = !val
      this.briefVisible = !val
      this.stepperFullScreenVisible = !val
    }
  }

}
</script>

<style>

  .phase-text-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: flex-start;

    margin: 1rem;
    border: lightgray 1px solid;
    overflow: hidden;

    background-color: white;
    box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, .2);

    padding: 2rem;

    max-width: 75vw;

  }

  .phase-text-container__text {
    max-width: 50vw;
    margin-left: 1rem;
  }

  .button__next-phase {
    margin: 1rem 2rem;
    width: 120px;
  }

  .page-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }

  .page-footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    width: 100%;
  }

  .stepper-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 1rem;
  }

  .phase-section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .section-time-progress {
    width: 100%;
  }

  .component-container {
    width: 100%;
    transition: opacity 0.5s;
  }

  .play-pause_btns {
    z-index: 999;
  }
</style>
