import '../defaultImports'
import jiraWebUI from '../jira-webui'
import { executeSafely, executeSafelyAsync, openInBrowser } from '../util'
import { isAuthorized, getBearerToken, getJiraHost } from '../auth'
import JIRA from '../jira'
import Connect from './connect'

export default function (context) {
  executeSafelyAsync(context, async function () {
    if (!isAuthorized()) {
      return Connect(context)
    }
    const webUI = jiraWebUI(context, {
      name: 'issues',
      background: MSImmutableColor.colorWithSVGString('#e7e7e7').NSColorWithColorSpace(null),
      height: 320,
      width: 450,
      handlers: {
        openInBrowser (url) {
          executeSafely(context, function () {
            openInBrowser(url)
          })
        },
        viewIssue (key) {
          executeSafely(context, function () {
            var app = NSApp.delegate()
            app.refreshCurrentDocument()
            webUI.panel.close()
            context.document.showMessage(`Viewing issue '${key}'`)
          })
        },
        exportAssets (key) {
          executeSafely(context, function () {
            var app = NSApp.delegate()
            app.refreshCurrentDocument()
            webUI.panel.close()
            context.document.showMessage(`Exported assets to '${key}'`)
          })
        }
      }
    })
    const jiraHost = getJiraHost()
    const token = await getBearerToken()
    const jira = new JIRA(jiraHost, token)
    const recentIssues = await jira.getRecentIssues()
    webUI.eval(`window.issues=${JSON.stringify(recentIssues.issues)}`)
    webUI.eval('window.ready=true')
  })
}