<template>
  <select v-model="selectedCampaign">
    <option
      disabled
      value=""
    >
      Choose your campains
    </option>
    <option
      v-for="campaign in campaigns"
      :key="campaign.id"
      :value="campaign.id"
    >
      {{ campaign.name }}
    </option>
  </select>
</template>

<script>
import KankaApiClient from '../mixins/KankaApiClient.js'
export default {
  name: 'KankaCampaignSelector',
  mixins: [
    KankaApiClient
  ],
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedCampaign: null,
      campaigns: []
    }
  },
  watch: {
     value (val) {
      if (this.value !== this.selectedCampaign) {
        this.selectedCampaign = val
      }
    },
    selectedCampaign (val) {
      if (this.value !== this.selectedCampaign) {
        localStorage.selectedCampaign = val
        this.$emit('input', parseInt(val))
      }
    },
    campaigns (val) {
      if (val) {
        localStorage.campaigns = JSON.stringify(val)
      }
    }
  },
  mounted () {
    this.loadCampaigns()
  },
  methods: {
    async load () {
      await this.loadCampaigns()
    },
    async loadCampaigns () {
      if (localStorage.campaigns) {
        this.campaigns = JSON.parse(localStorage.campaigns)
        console.log('campaigns loaded from cache')
      } else {
        const response = await this.$http.get(`${this.kankaApiUrl}/campaigns`, this.config)
        this.campaigns = response.body.data
        console.log('campaigns loaded from API')
      }
      if(localStorage.selectedCampaign > 0)
      {
        this.selectedCampaign = localStorage.selectedCampaign
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
