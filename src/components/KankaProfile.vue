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
export default {
  name: 'KankaProfile',
  props: {
    authenticationKey: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      config: {
        headers: {
          'Authorization': 'Bearer ' + this.authenticationKey,
          'Accept': 'application/json'
        }
      },
      profile: null,
      error: null
    }
  },
  watch: {
    async authenticationKey () {
      if (this.authenticationKey) {
        this.config.headers['Authorization'] = `Bearer ${this.authenticationKey}`
        await this.loadProfile()
      } else {
        this.profile = null
      }
    },
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
    async loadProfile () {
      try {
        const response = await this.$http.get(`https://kanka.io/api/1.0/profile`, this.config)
        this.profile = response.body.data
      } catch (err) {
        this.error = 'Failed to login. Check your access token or try to create a new one.'
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
