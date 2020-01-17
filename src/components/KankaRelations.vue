<template>
  <div>
    <!-- entities & relations -->
    <h2>Entities</h2>
    <button
      @click="clearCache"
    >
      Clear local cache of entities
    </button>
    <div class="container">
      <svg
        :width="radius * 3"
        :height="radius * 3"
      >
        <template
          v-for="(entity, entityIndex) in entities"
        >
          <kanka-relation-svg 
            v-for="(relation, relationIndex) in entity.relations"
            :key="`${relation.owner_id}_r${relationIndex}`"
            :label="relation.relation"
            :from="getPoint(entityIndex * step)"
            :to="getPoint(getEntityIndex(relation.target_id) * step)"
          />
        </template>
        <template
          v-for="(entity, entityIndex) in entities"
        >
          <kanka-character-svg
            :key="`entity_${entity.entity_id}`"
            :entity="entity"
            :point="getPoint(entityIndex * step)"
            :radius="60"
          />
        </template>
      </svg>
    </div>
  </div>
</template>

<script>
import KankaCharacterSvg from './KankaCharacterSvg.vue'
import KankaRelationSvg from './KankaRelationSvg.vue'
export default {
  name: 'KankaRelations',
  components: {
    KankaCharacterSvg,
    KankaRelationSvg
  },
  props: {
    campaign: {
      type:Number,
      default: null
    },
    authenticationKey: {
      type: String,
      default: null
    },
    radius: {
      type: Number,
      default: 200
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
      entities: []
    }
  },
  computed: {
    step () {
      return Math.floor(36000 / this.entities.length) / 100
    }
  },
  watch: {
    async authenticationKey () {
      this.config.headers['Authorization'] = `Bearer ${this.authenticationKey}`
      await this.loadEntities()
    },
    entities: { 
      handler(val) {
        if (val && val.length > 0) {
          localStorage.entities = JSON.stringify(val)
        }
      }
    }
  },
  async mounted () {
    if (this.authenticationKey) {
      await this.loadEntities()
    }
  },
  methods: {
    async loadEntities () {
      if (localStorage.entities) {
        this.entities = JSON.parse(localStorage.entities)
        console.log('entities loaded from cache')
      } else {
        const response = await this.$http.get(`https://kanka.io/api/1.0/campaigns/${this.campaign}/characters`, this.config)
        this.entities = response.body.data
        console.log('entities loaded from API')
      }
      this.loadRelations()
    },
    async loadRelations () {
      await Promise.all(this.entities.map(async entity => {
        if(!entity.relations) {
          try {
            const response = await this.$http.get(`https://kanka.io/api/1.0/campaigns/${this.campaign}/entities/${entity.entity_id}/relations`, this.config)
            entity.relations = response.body.data
            console.log('relations of ' + entity.name + ' loaded from API')
          } catch (err) {
            console.log(err)
          }
        } else {
          console.log('relations of ' + entity.name + ' already in cache')
        }
      }))

      localStorage.entities = JSON.stringify(this.entities)
    },
    getEntityIndex (entityId) {
      return this.entities.findIndex(e => e.entity_id == entityId)
    },
    getPoint (i) {
      const angle = i * Math.PI / 180
      const x = (this.radius * Math.cos(angle)) + (this.radius * 1.5)
      const y = (this.radius * Math.sin(angle)) + (this.radius * 1.5)
      return { x, y }
    },
    async clearCache () {
      localStorage.entities = []
      await this.loadEntities()
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
