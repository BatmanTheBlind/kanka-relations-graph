<template>
  <span>
    <span v-if="!profile">
      <span>Please copy/paste your <a href="https://kanka.io/en/settings/api" target="_blank">Personal Access Tokens</a></span>
      <input v-model="authenticationKey" />
    </span>
    <button @click="authenticationKey = null" v-else>Logout</button>
  </span>
</template>

<script>

export default {
  name: 'KankaAuthentication',
  props: {
    value: String,
    profile: Object
  },
  data () {
    return { 
      authenticationKey: ''
    }
  },
  watch: {
    value (val) {
      if (this.value !== this.authenticationKey) {
        this.authenticationKey = val
      }
    },
    authenticationKey (val) {
      if (this.value !== this.authenticationKey) {
        localStorage.authenticationKey = val
        this.$emit('input', val)
      }
    }
  },
  mounted () {
    if (localStorage.authenticationKey) {
      this.authenticationKey = localStorage.authenticationKey
    }
  }
}
</script>
