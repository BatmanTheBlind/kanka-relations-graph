<template>
  <div>
<!-- entities & relations -->
    <h2>Entities</h2>
    <div class="container">
        <svg :width="this.radius * 3" :height="this.radius * 3">
          <kanka-character-svg
            :key="entity.id"
            v-for="(entity, index) in entities"
            :entity="entity"
            :index = index
            :point="getPoint(index * step)"
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
    authenticationKey: String,
    radius: Number
  },
  data () {
    return {
      config: {
        headers: {
          'Authorization': 'Bearer ' + this.authenticationKey,
          'Accept': 'application/json'
        }
      },
      entities: []
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
  computed: {
    step () {
      return Math.floor(360 / this.entities.length)
    }
  },
  methods: {
    async loadEntities () {
      const response = await this.$http.get(`https://kanka.io/api/1.0/campaigns/${this.campaign}/characters`, this.config)
      this.entities = response.body.data
    },
    async loadRelations () {
      this.entities.map(async entity => {
        const response = await this.$http.get(`https://kanka.io/api/1.0/campaigns/${this.campaign}/entities/${entity.id}/relations`, this.config)
        entity.relations = response.body.data
      })
    },
    getPoint (i) {
      const angle = i * Math.PI / 180
      const x = (this.radius * Math.cos(angle)) + this.radius
      const y = (this.radius * Math.sin(angle)) + this.radius
      return { x, y }
      
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
