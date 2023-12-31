export default { // 路由分为两种模式
  props: {
    to: { type: String, required: true },
    tag: { type: String, default: 'a' }
  },
  methods: {
    handler () {
      this.$router.push(this.to)
    }
  },
  render () {
    const tag = this.tag
    return <tag style={ { cursor: 'pointer' } } onClick={this.handler}>{this.$slots.default}</tag>
  }
}
