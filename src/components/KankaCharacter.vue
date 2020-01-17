<template>
  <div class="character">
    <h4>{{ entity.name }}</h4>
    <h5 v-if="entity.title">
      {{ entity.title }}
    </h5>
    <img
      class="thumbs"
      :src="`${entity.image_thumb}`"
    >
  </div>
</template>

<script>
export default {
  name: 'KankaCharacter',
  props: {
    entity: Object
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .character {
    height: 200px;
    width: 150px;
    border: solid 1px grey;
  }
  .thumbs {
    height: 40px;
  }
</style>
