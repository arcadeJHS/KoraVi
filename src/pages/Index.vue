<template>
  <q-page class="flex flex-center q-pa-md">

    <div class="language">
      <label v-if="!localeIsEnglish" @click="switchLanguage('en-us')">English Version</label>
      <label v-if="localeIsEnglish" @click="switchLanguage('it')">Versione Italiana</label>
    </div>

    <div class="row items-center fit">
      <div class="col-12 col-md-6">
        <img
          :class="[$q.screen.gt.sm ? 'float-right' : 'small']"
          alt="Quasar logo"
          src="~assets/app-logo.png">
      </div>
      <div class="col-12 col-md-6 relative-position">
        <div :class="['text-center', $q.screen.gt.sm ? 'absolute-left' : '']">
          <h4 class="q-ma-none" v-html="$t('index.spreadSimulator')"></h4>
          <q-btn dense class="sketched q-mt-lg" @click="go">start</q-btn>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Index',
  computed: {
    localeIsEnglish() {
      return this.$i18n.locale == 'en-us';
    }
  },
  methods: {
    go() {
      this.$router.push('disclaimer');
    },
    switchLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>

<style lang="scss" scoped>
.language {
  label {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
  label + label {
    margin-left: 2rem;
  }
}
img {
  max-height: 100vh;
  max-width: 100%;
  margin: auto;

  &.small {
    max-height: 50vh;
    max-width: 60%;
    margin: 0 20%;
    margin-bottom: 1rem;
  }
}
</style>
