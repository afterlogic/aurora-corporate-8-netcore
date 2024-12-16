'use strict'

const _ = require('underscore')
const ko = require('knockout')
const TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js')
const App = require('%PathToCoreWebclientModule%/js/App.js')
const Settings = require('modules/SettingsWebclient/js/Settings.js')

const ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js')

const CAbstractHeaderItemView = require('%PathToCoreWebclientModule%/js/views/CHeaderItemView.js')

const accountList = ModulesManager.run('MailWebclient', 'getAccountList')

const getInitials = (email, name) => {
  let initials = ''
  try {
    const words = name ? name.split(' ') : email.split('.')
    
    if (words.length >= 2) {
      initials = words[0].charAt(0) + words[1].charAt(0)
    } else if (words.length === 1) {
      initials = words[0].slice(0, 2)
    }
  } catch (error) {}

  return initials
}

function CHeaderItemView() {
  CAbstractHeaderItemView.call(this, TextUtils.i18n('COREWEBCLIENT/LABEL_USER_MENU'))

  // accountList.currentId.subscribe(() => {
  //   this.linkText()
  // })

  // this.linkText(getInitials())

  this.userName = ko.observable('')
  this.userEmail = ko.observable('')

  this.items = [
    {
        title: TextUtils.i18n('COREWEBCLIENT/HEADING_SETTINGS_TABNAME'),
        className: 'item-settings',
        clickEvent: () => {
            window.location.hash = Settings.HashModuleName
        }
    },
    {
        title: TextUtils.i18n('COREWEBCLIENT/ACTION_LOGOUT'),
        className: 'item-logout',
        clickEvent: App.logout.bind(App)
    }
  ]

  ko.computed(function () {
    const currentAccount = accountList.getCurrent()
    const initials = getInitials(currentAccount.email(), currentAccount.friendlyName())
    this.linkText(initials)
    this.userName(currentAccount.friendlyName())
    this.userEmail(currentAccount.email())
  }, this)
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype)

CHeaderItemView.prototype.ViewTemplate = '%ModuleName%_HeaderItemView'

module.exports = new CHeaderItemView()
