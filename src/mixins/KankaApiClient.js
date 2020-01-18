export default {
  props: {
    authenticationKey: {
      type: String,
      default: ''
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
      kankaApiUrl: 'https://kanka.io/api/1.0'
    }
  },
  watch : {
    async authenticationKey () {
      if (this.authenticationKey) {
        this.config.headers['Authorization'] = `Bearer ${this.authenticationKey}`
        await this.load()
      } else {
        this.profile = null
      }
    }
  },
  methods: {
    async load () {
      throw new Error('`load()` method must be overriden by all component implementing the `KankaApiClient` mixin.')
    }
  }
}