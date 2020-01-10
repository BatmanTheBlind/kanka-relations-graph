<template>
  <div>
    <h2>Entities</h2>
    <template v-for="entity in entities">
      <div :key="entity.id" >
        <h4>{{entity.name}}</h4>
        <img :src="`${entity.image_thumb}`" >
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'KankaRelations',
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

</style>
