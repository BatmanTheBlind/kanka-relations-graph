<template>
  <g>
    <path
      v-if="center"
      :d="`M ${from.x} ${from.y} C ${center.x} ${center.y}, ${center.x} ${center.y},  ${to.x} ${to.y}`"
      style="stroke:rgb(0,0,0);stroke-width:2"
      fill="transparent"
      shape-rendering="geometricPrecision"
    />
    <path
      v-else
      :d="`M ${from.x} ${from.y} L ${to.x} ${to.y}`"
      style="stroke:rgb(255,0,0);stroke-width:2"
    />
    <text 
      v-if="showLabel"
      :x="from.x"
      :y="from.y"
      text-anchor="start"
      font-family="Verdana" 
      font-size="15"
    >
      {{ label }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'KankaRelationSvg',
  props: {
    label: {
      type:String,
      default: ''
    },
    from: {
      type: Object,
      default: null
    },
    to: {
      type: Object,
      default: null
    },
    center: {
      type: Object,
      default: null
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
