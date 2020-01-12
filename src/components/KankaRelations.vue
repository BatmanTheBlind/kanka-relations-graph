<template>
  <div>
<!-- entities & relations -->
    <h2>Entities</h2>
    <div class="container">
        <svg width="200" height="1200">
          <kanka-character-svg
            :key="entity.id"
            v-for="(entity, index) in entities"
            :entity="entity"
            :point="{
              x: 10,
              y: index * 75
            }"
          />
        </svg>
    </div>
  </div>
</template>

<script>
import KankaCharacterSvg from './KankaCharacterSvg.vue'
export default {
  name: 'KankaRelations',
  components: {
    KankaCharacterSvg
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
