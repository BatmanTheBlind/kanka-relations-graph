<template>
  <div id="app">
    <div class="header" >
      <kanka-authentication v-model="authenticationKey" :profile="profile" />
      <kanka-profile
        :authenticationKey="authenticationKey" 
        v-model="profile" />
    </div>
    <div>
      <kanka-relations 
        :radius="240"
        :authenticationKey="authenticationKey" 
        :campaign="17724" />
    </div>
  </div>
</template>

<script>
import KankaRelations from './components/KankaRelations.vue'
import KankaProfile from './components/KankaProfile.vue'
import KankaAuthentication from './components/KankaAuthentication.vue'

export default {
  name: 'app',
  components: {
    KankaProfile,
    KankaAuthentication,
    KankaRelations
  },
  data () {
    return { 
      authenticationKey: '',
      profile: null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  display: flex;
}
</style>
