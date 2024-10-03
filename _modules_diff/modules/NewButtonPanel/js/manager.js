'use strict'

module.exports = function (oAppData) {
  const _ = require('underscore')
  const ko = require('knockout')
  const App = require('%PathToCoreWebclientModule%/js/App.js')

  if (App.isUserNormalOrTenant()) {
    return {
      getHeaderItem: function () {
        const headerItem = require('modules/%ModuleName%/js/views/HeaderItemView.js')

        return {
          item: headerItem,
          name: 'new_button_panel',
        }
      },
    }
  }

  return null
}
