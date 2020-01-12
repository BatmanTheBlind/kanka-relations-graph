<template>
    <g>
      <rect 
        :x="point.x"
        :y="point.y"
        style="fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,0)"
        width="150"
        height="60"
        rx="10"
        ry="10"/>
      <text 
        :x="point.x"
        :y="point.y + 20"
        font-family="Verdana" 
        font-size="15">
        {{entity.name}}
      </text>
      <text 
        :x="point.x"
        :y="point.y + 40"
        fill="white"
        font-family="Verdana" 
        font-size="10">
        {{entity.title}}
      </text>
    </g>
</template>

<script>
export default {
  name: 'KankaCharacterSvg',
  props: {
    point: Object,
    entity: Object,
    index: Number
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
