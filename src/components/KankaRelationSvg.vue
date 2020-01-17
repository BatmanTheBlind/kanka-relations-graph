<template>
  <g>
    <line
      :x1="from.x"
      :y1="from.y"
      :x2="to.x"
      :y2="to.y"
      style="stroke:rgb(255,0,0);stroke-width:2"
    />
    <text 
      :x="(from.x + to.x) / 2"
      :y="(from.y + to.y) / 2"
      text-anchor="middle"
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
