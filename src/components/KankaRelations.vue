<template>
  <div>
    <h2>Entities</h2>
    <div class="container">
      <template v-for="entity in entities">
        <kanka-character :key="entity.id" :entity="entity" />
      </template>
    </div>
  </div>
</template>

<script>
import KankaCharacter from './KankaCharacter.vue'
export default {
  name: 'KankaRelations',
  components: {
    KankaCharacter
  },
  props: {
    campaign: Number,
    relations: Array,
    entities: Array,
    authenticationKey: String
  },
  data () {
    return {
      config: {
        headers: {
          'Authorization': 'Bearer ' + this.authenticationKey,
          'Accept': 'application/json'
        }
      }
    }
  },
  async mounted () {
    if (this.authenticationKey) {
      await this.loadEntities()
    }
  },
  watch: {
    async authenticationKey () {
      this.config.headers['Authorization'] = `Bearer ${this.authenticationKey}`
      await this.loadEntities()
    }
  },
  methods: {
    async loadEntities () {
      const response = await this.$http.get(`https://kanka.io/api/1.0/campaigns/${this.campaign}/characters`, this.config)
      this.entities = response.body.data
    },
    async loadRelations () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
