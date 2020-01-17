<template>
  <span>
    <span v-if="!profile">
      <div>
        Your are not corrected to kanka.io. 
      </div>
      <div>
        Please copy/paste your 
        <a
          href="https://kanka.io/en/settings/api"
          target="_blank"
        >
          Personal Access Tokens
        </a> here in order to get your campaigns data :</div>
      <input class="input" v-model="authenticationKey">
    </span>
    <button
      v-else
      @click="authenticationKey = ''"
    >Logout</button>
  </span>
</template>

<script>

export default {
  name: 'KankaAuthentication',
  props: {
    value: {
      type: String, 
      default: ''
    },
    profile: {
      type:Object, 
      default: null
    }
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
<style scoped>
  .input {
    width:100%;
  }
</style>