'use strict'

module.exports = function () {
  const App = require('%PathToCoreWebclientModule%/js/App.js')
  const ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js')

  if (!ModulesManager.isModuleAvailable('SettingsWebclient')) {
    return null
  }

  if (App.isUserNormalOrTenant()) {
    return {
      getHeaderItem: function () {
        require('modules/%ModuleName%/js/HeaderItemEvents.js')
        return {
          item: require('modules/%ModuleName%/js/views/HeaderItemView.js'),
          name: 'usermenu',
        }
      },
    }
  }
  return null
}
