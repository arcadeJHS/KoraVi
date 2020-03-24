<template>
  <q-page class="q-pa-md">

    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <h4 class="text-bold text-center">{{ $t('disclaimer.title') }}</h4>
        <div class="text-justify">
          <p>The following content is a <span class="text-weight-bold">playful simulation</span> about the effects of COVID-19 spread under various possible scenarios.</p>
          <p class="text-center">A <span class="text-weight-bold">PLAYFUL SIMULATION</span>, full stop.</p>
          <p>Its one and only purpose is to show why it is so important following the recomendation of <span class="text-weight-bold">SOCIAL DISTANCING</span> emitted by governments.</p>
          <p class="text-center"><span class="text-weight-bold">STAY AT HOME</span>!</p>
        </div>

        <div class="text-center">
          <q-btn dense class="sketched q-mt-xl" @click="go">continue</q-btn>
        </div>

        <div class="text-justify credits">
          <span>
            <label class="text-weight-bold">Credits:</label>
            this work has been mainly inspired by this article:
          </span>
          <span class="q-py-sm"><a href="https://www.washingtonpost.com/graphics/2020/world/corona-simulator/" target="_BLANK">Why outbreaks like coronavirus spread exponentially, and how to 'flatten the curve'</a></span>
          <span>All credits to <label class="text-weight-bold"> The Washington Post</label>.</span>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'About',
  methods: {
    go() {
      this.$router.push('options');
    }
  }
}
</script>

<style lang="scss">
.credits {
  margin-top: 4rem;

  span {
    display: block;
  }
}
</style>
