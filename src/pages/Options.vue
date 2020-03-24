<template>
  <q-page class="q-pa-md">

    <div class="row">
      <div class="col-12 col-md-4 offset-md-4">
        <h4 class="text-bold text-center">{{ $t('options.title') }}</h4>

        <q-form>
        <span class="text-justify">Select the scenario</span>
          <q-select
            class="sketched-input-field q-mt-sm q-mb-xl"
            emit-value
            map-options
            borderless
            v-model="scenario"
            :options="[{label: 'no social distancing', value: 'NO_DISTANCING'}, {label: 'forced quarantine', value: 'FORCED_QUARANTINE'}, {label: 'SOCIAL_DISTANCING', value: 'SOCIAL_DISTANCING'}]"
            label="Scenario" />

          <span class="text-justify">Select the percentage of population which will respect the quarantine</span>
          <q-select
            class="sketched-input-field q-mt-sm q-mb-xl"
            emit-value
            map-options
            borderless
            v-model="isolated"
            :options="[{label: '25%', value: 25}, {label: '50%', value: 50}, {label: '80%', value: 80}]"
            label="Isolation Percentage" />

          <q-checkbox dense size="4rem" v-model="hero" label="I am an immortal super hero, cannot get sick" />

          <div class="text-center q-pt-md">
            <q-btn dense class="sketched q-mt-xl" @click="go">simulate</q-btn>
          </div>
        </q-form>
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Options',
  data() {
    return {
      scenario: null,
      isolated: null,
      hero: false
    };
  },
  methods: {
    go() {
      this.$router.push('simulation');
    }
  }
}
</script>
