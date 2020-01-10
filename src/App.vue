<template>
  <div id="app">
    <input v-model="authenticationKey" />
    <kanka-relations :authenticationKey="authenticationKey" :campaign="17724" />
  </div>
</template>

<script>
import KankaRelations from './components/KankaRelations.vue'

export default {
  name: 'app',
  components: {
    KankaRelations
  },
  data () {
    return { 
      authenticationKey: ''
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
</style>
