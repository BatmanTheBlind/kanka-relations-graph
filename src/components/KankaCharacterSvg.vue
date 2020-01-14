<template>
    <g :transform="`translate(${point.x},${point.y})`" >
      <!-- pattern -->
      <defs>
        <pattern :id="`image${entity.id}`" x="0%" y="0%" height="100%" width="100%"
                viewBox="0 0 512 512">
          <image x="0%" y="0%" width="512" height="512" :xlink:href="entity.image_full"></image>
        </pattern>
      </defs>
 
      <circle 
        :cx="0"
        :cy="0"
        :fill="`url(#image${entity.id})`"
        :r="radius"/>
      <text 
        :x="0"
        :y="-radius * 0.9"
        text-anchor="middle"
        font-family="Verdana" 
        font-size="15">
        <tspan
          :key="index"
          v-for="(partName, index) in entity.name.split(' ')"
          x="0"
          dy="1.2em"
        >
          {{partName}}
        </tspan>
        <tspan
          :key="index"
          v-for="(partName, index) in entity.title.split(' ')"
          x="0"
          dy="1.2em"
          fill="white"
          text-anchor="middle"
          font-family="Verdana" 
          font-size="10"
        >
          {{partName}}
        </tspan>
      </text>
      <!-- <text 
        :x="0"
        :y="10"
        fill="white"
        text-anchor="middle"
        font-family="Verdana" 
        font-size="10">
        <tspan
          :key="index"
          v-for="(partName, index) in entity.title.split(' ')"
          x="0"
          dy="1.2em"
        >
          {{partName}}
        </tspan>
      </text> -->
    </g>
</template>

<script>
export default {
  name: 'KankaCharacterSvg',
  props: {
    point: Object,
    entity: Object,
    index: Number,
    radius: Number
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
