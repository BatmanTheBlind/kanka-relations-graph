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
      kankaApiUrl: 'https://kanka.io/api/1.0',
      error: ''
    }
  },
  watch: {
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
      this.error = ''
      throw new Error('`load()` method must be overriden by all component implementing the `KankaApiClient` mixin.')
    },
    handleError (error) {
      switch (error.status) {
        case 429:
          this.error = 'You have reached the limitation of request per minutes. Try to refresh in one minute or two.'
          break
        case 401:
          this.error = 'Failed to authenticate, check your authentication token.'
          break
        default:
          this.error = this.body.message
      }
    }
  }
}