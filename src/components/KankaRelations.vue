<template>
  <div class="main">
    <!-- options -->
    <div class="options">
      <div
        v-if="error"
        class="error"
      >
        {{ error }}
      </div>
      <button
        @click="clearCache"
      >
        Clear local cache of entities
      </button>
      <div>
        <input
          id="character-name"
          v-model="showCharacterNames"
          type="checkbox"
          name="scales"
        >
        <label for="character-name">Show characters names</label>
      </div>
      <div>
        <input
          id="relation-name"
          v-model="showRelationNames"
          type="checkbox"
          name="scales"
        >
        <label for="relation-name">Show relations names</label>
      </div>
    </div>
    <!-- entities & relations -->
    <div class="container">
      <svg
        width="100%"
        :height="radius * 3"
      >
        <template
          v-for="(entity) in entities"
        >
          <kanka-relation-svg 
            v-for="(relation, relationIndex) in entity.relations"
            :key="`${relation.owner_id}_r${relationIndex}`"
            :label="relation.relation"
            :show-label="showRelationNames"
            :from="getPoint(getEntityIndex(relation.owner_id) * step)"
            :to="getPoint(getEntityIndex(relation.target_id) * step)"
            :center="center"
          />
        </template>
        <template
          v-for="(entity, entityIndex) in entities"
        >
          <kanka-character-svg
            :key="`entity_${entity.entity_id}`"
            :entity="entity"
            :point="getPoint(entityIndex * step)"
            :radius="entityRadius"
            :show-label="showCharacterNames"
          />
        </template>
      </svg>
    </div>
  </div>
</template>

<script>
import KankaCharacterSvg from './KankaCharacterSvg.vue'
import KankaRelationSvg from './KankaRelationSvg.vue'
import KankaApiClient from '../mixins/KankaApiClient.js'
export default {
  name: 'KankaRelations',
  components: {
    KankaCharacterSvg,
    KankaRelationSvg
  },
  mixins: [
    KankaApiClient
  ],
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
      entities: [],
      entityRadius: 55,
      showCharacterNames: false,
      showRelationNames: false
    }
  },
  computed: {
    step () {
      return Math.floor(36000 / this.entities.length) / 100
    },
    center () {
      return {
        x: this.radius + this.entityRadius,
        y: this.radius + this.entityRadius
      }
    }
  },
  watch: {
    entities: { 
      handler(val) {
        if (val && val.length > 0) {
          localStorage.entities = JSON.stringify(val)
        }
      }
    },
    campaign () {
      this.clearCache()
    }
  },
  async mounted () {
    if (this.authenticationKey) {
      await this.loadEntities()
    }
  },
  methods: {
    async load () {
      await this.loadEntities()
    },
    async loadEntities (entityType) {
      await Promise.all([
        this.loadEntitiesType('characters'),
        this.loadEntitiesType('locations'),
        this.loadEntitiesType('organisations')
      ])
      localStorage.entitiesLoaded = true
      await this.loadRelations()
    },
    async loadEntitiesType (entityType) {
      if (localStorage.entitiesLoaded === 'true') {
        this.entities = JSON.parse(localStorage.entities)
        console.log('entities loaded from cache')
      } else {
        try {
          this.entities = []
          let nextPage = `${this.kankaApiUrl}/campaigns/${this.campaign}/${entityType}`
          while (nextPage) {
            const response = await this.$http.get(nextPage, this.config)
            this.entities = this.entities.concat(response.body.data.map(character => {
              return {
                ...character,
                relations: [],
                relationLoaded: false
              }
            }))
            nextPage = response.body.links.next
          } 
          console.log(entityType + ' loaded from API')
        } catch (err) {
          this.handleError(err)
        }
      }
    },
    async loadRelations () {
      await Promise.all(this.entities.map(async entity => {
        if(!entity.relationLoaded) {
          try {
            const response = await this.$http.get(`${this.kankaApiUrl}/campaigns/${this.campaign}/entities/${entity.entity_id}/relations`, this.config)
            entity.relations = response.body.data
            entity.relationLoaded = true
            console.log('relations of ' + entity.name + ' loaded from API')
          } catch (err) {
            this.handleError(err)
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
      const x = (this.radius * Math.cos(angle)) + (this.radius + this.entityRadius)
      const y = (this.radius * Math.sin(angle)) + (this.radius + this.entityRadius)
      return { x, y }
    },
    async clearCache () {
      localStorage.entitiesLoaded = false
      localStorage.entities = []
      await this.loadEntities()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    text-align: left;
    display: flex;
    border: dashed 1px grey;
  }
  .options {
    background: grey;
    color: white;
    padding: 2px;
  }
  .container {
    flex-basis: 100%;
  }
</style>
