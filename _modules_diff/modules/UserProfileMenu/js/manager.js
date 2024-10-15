'use strict'

module.exports = function () {
  const App = require('%PathToCoreWebclientModule%/js/App.js')
  const Settings = require('modules/%ModuleName%/js/Settings.js')

  if (App.isUserNormalOrTenant() && Settings.DisplayUserMenu) {
    return {
      getHeaderItem: function () {
        return {
          item: require('modules/%ModuleName%/js/views/HeaderItemView.js'),
          name: 'usermenu',
        }
      },
    }
  }
  return null
}
