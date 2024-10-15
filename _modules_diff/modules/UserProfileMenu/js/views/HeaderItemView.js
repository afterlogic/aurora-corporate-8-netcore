'use strict'

const _ = require('underscore')
const TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js')
const App = require('%PathToCoreWebclientModule%/js/App.js')
const Settings = require('modules/SettingsWebclient/js/Settings.js')

const ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js')

const CAbstractHeaderItemView = require('%PathToCoreWebclientModule%/js/views/CHeaderItemView.js')

const accountList = ModulesManager.run('MailWebclient', 'getAccountList')

const getInitials = () => {
  try {
    const currentAccount = accountList.getCurrent()
    const friendlyName = currentAccount.friendlyName()

    if (friendlyName) {
      const words = friendlyName.split(' ')

      if (words.length >= 2) {
        return words[0].charAt(0) + words[1].charAt(0)
      } else if (words.length === 1) {
        return words[0].slice(0, 2)
      }
    }

    return currentAccount.email().slice(0, 2)
  } catch (error) {
    return ''
  }
}

function CHeaderItemView() {
  CAbstractHeaderItemView.call(this, TextUtils.i18n('COREWEBCLIENT/LABEL_USER_MENU'))

  accountList.currentId.subscribe(() => {
    this.linkText(getInitials())
  })

  this.linkText(getInitials())

  this.items = [
    {
        title: TextUtils.i18n('COREWEBCLIENT/HEADING_SETTINGS_TABNAME'),
        className: 'dropdown_item-settings',
        clickEvent: () => {
            window.location.hash = Settings.HashModuleName
        }
    },
    {
        title: TextUtils.i18n('COREWEBCLIENT/ACTION_LOGOUT'),
        className: 'dropdown_item-logout',
        clickEvent: App.logout.bind(App)
    }
  ]
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype)

CHeaderItemView.prototype.ViewTemplate = '%ModuleName%_HeaderItemView'

module.exports = new CHeaderItemView()
