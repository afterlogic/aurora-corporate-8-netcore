'use strict'

module.exports = function (oAppData) {
  const App = require('%PathToCoreWebclientModule%/js/App.js')

  if (App.isUserNormalOrTenant()) {
    return {
      getHeaderItem: function () {
        const headerItem = require('modules/%ModuleName%/js/views/HeaderItemView.js')

        return {
          item: headerItem,
          name: 'new_button_panel', // do we need this??
        }
      },
    }
  }

  return null
}
