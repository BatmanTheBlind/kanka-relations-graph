<template>
  <div id="app">
    <div class="header">
      <div class="header-part">
        <kanka-profile
          v-model="profile" 
          :authentication-key="authenticationKey"
        />
      </div>
      <div class="header-part">
        <kanka-authentication
          v-model="authenticationKey"
          :profile="profile"
        />
      </div>
    </div>
    <div class="main-content">
      <kanka-relations 
        :radius="400"
        :authentication-key="authenticationKey" 
        :campaign="17724"
      />
    </div>
  </div>
</template>

<script>
import KankaRelations from './components/KankaRelations.vue'
import KankaProfile from './components/KankaProfile.vue'
import KankaAuthentication from './components/KankaAuthentication.vue'

export default {
  name: 'App',
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
}
.header {
  background: darkslategrey;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.main-content {
  padding-top: 5px;
}
</style>
