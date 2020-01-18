<template>
  <div class="identity">
    <template v-if="profile && profile.id">
      <div>Logged as {{ profile.name }}</div>
      <img :src="`${profile.avatar_thumb}`">
    </template>
    <div
      v-else
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
import KankaApiClient from '../mixins/KankaApiClient.js'
export default {
  name: 'KankaProfile',
  mixins: [
    KankaApiClient
  ],
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      profile: null,
      error: null
    }
  },
  watch: {
    value (val) {
      if (this.value !== this.profile) {
        this.profile = val
      }
    },
    profile (val) {
      if (this.value !== this.profile) {
        this.$emit('input', val)
      }
    }
  },
  async mounted () {
    if (this.authenticationKey) {
      await this.loadProfile()
    }
  },
  methods: {
    async load () {
      this.loadProfile()
    },
    async loadProfile () {
      try {
        const response = await this.$http.get(`${this.kankaApiUrl}/profile`, this.config)
        this.profile = response.body.data
      } catch (err) {
        this.error = 'Failed to login. Wait 1 or 2 minutes and try again. If it keep failing, check your access token or try to create a new one.'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .identity {
    text-align: left;
    font-weight: bold;
  }
  .error {
    color:lightcoral;
  }
</style>
