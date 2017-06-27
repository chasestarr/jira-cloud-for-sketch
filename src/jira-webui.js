import WebUI from 'sketch-module-web-view'
import { assign } from 'lodash'

export default function (context, options) {
  options = assign({
    identifier: `jira-sketch-plugin.${options.name}`,
    page: `${options.name}.html`,
    onlyShowCloseButton: true,
    hideTitleBar: false,
    title: ' ',
    styleMask: (NSTitledWindowMask | NSClosableWindowMask)
  }, options)
  return new WebUI(context, options.page, options)
}
