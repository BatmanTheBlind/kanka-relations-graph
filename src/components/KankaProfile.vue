<template>
  <div>
    <template v-if="profile && profile.id">
    <h2>Logged as</h2>
    <div>
      <h4>{{profile.name}}</h4>
      <img :src="`${profile.avatar_thumb}`" >
    </div>
    </template>
    <div v-else>Not logged</div>
  </div>
</template>

<script>
export default {
  name: 'KankaProfile',
  props: {
    authenticationKey: String,
    value: Object
  },
  data () {
    return {
      config: {
        headers: {
          'Authorization': 'Bearer ' + this.authenticationKey,
          'Accept': 'application/json'
        }
      },
      profile: Object
    }
  },
  async mounted () {
    if (this.authenticationKey) {
      await this.loadProfile()
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
  methods: {
    async loadProfile () {
      const response = await this.$http.get(`https://kanka.io/api/1.0/profile`, this.config)
      this.profile = response.body.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
