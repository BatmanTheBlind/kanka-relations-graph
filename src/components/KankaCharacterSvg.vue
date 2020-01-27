<template>
  <g :transform="`translate(${point.x},${point.y})`">
    <!-- pattern -->
    <defs>
      <pattern
        :id="`image${entity.entity_id}`"
        x="0%"
        y="0%"
        height="100%"
        width="100%"
      >
        <image
          x="0%"
          y="0%"
          :width="diameter"
          :height="diameter"
          :xlink:href="entity.image_full"
        />
      </pattern>
    </defs>
 
    <circle 
      :cx="0"
      :cy="0"
      :fill="`white`"
      :stroke="`black`"
      :r="radius"
      shape-rendering="geometricPrecision"
    />
    <circle 
      v-if="entity.image"
      :cx="0"
      :cy="0"
      :fill="`url(#image${entity.entity_id})`"
      shape-rendering="geometricPrecision"
      :r="radius"
    />
    <text 
      v-if="showLabel || !entity.image"
      :x="textPosition.x"
      :y="textPosition.y"
      text-anchor="middle"
      font-family="Verdana" 
      font-size="15"
    >
      <tspan
        v-for="(partName, namePartIndex) in entity.name.split(' ')"
        :key="entity.entity_id + 'name' + namePartIndex"
        x="0"
        dy="1.2em"
        fill="grey"
      >
        {{ partName }}
      </tspan>
      <template v-if="entity.title">
        <tspan
          v-for="(partName, titlePartIndex) in entity.title.split(' ')"
          :key="entity.entity_id + 'title' + titlePartIndex"
          x="0"
          dy="1.2em"
          fill="white"
          text-anchor="middle"
          font-family="Verdana" 
          font-size="10"
        >
          {{ partName }}
        </tspan>
      </template>
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
    point: {
      type: Object,
      default() {
        return { x: 0, y: 0 }
      }
    },
    entity: {
      type: Object,
      default: null
    },
    radius: {
      type: Number,
      default: 60
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    diameter () { return this.radius * 2.0 },
    textPosition () {
      return {
        x: 0,
        y: this.entity.title ? this.radius * -0.9 : this.radius * -0.5
      }
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
