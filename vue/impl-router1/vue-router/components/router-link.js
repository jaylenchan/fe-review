export default {
  name: 'router-link',
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String
    }
  },
  render(h, context) {
    const tag = context.props.tag || 'a'
    function handler() {
      context.parent.$router.push(context.props.to)
    }
    return h(
      tag,
      {
        on: {
          click: handler
        }
      },
      context.$slots().default
    )
  }
}
