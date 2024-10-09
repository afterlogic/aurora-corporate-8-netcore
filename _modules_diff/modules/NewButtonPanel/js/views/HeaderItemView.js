'use strict'

const _ = require('underscore')
const ko = require('knockout')
const TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js')
const App = require('%PathToCoreWebclientModule%/js/App.js')

const CAbstractHeaderItemView = require('%PathToCoreWebclientModule%/js/views/CHeaderItemView.js')

function CHeaderItemView() {
  CAbstractHeaderItemView.call(this, TextUtils.i18n('%MODULENAME%/ACTION_SHOW_NEW_BUTTON'))

  this.newItemsColumn1 = ko.observableArray([])
  this.newItemsColumn2 = ko.observableArray([])

  App.subscribeEvent('RegisterNewItemElement', (oItem) => {
    const { item, order, column } = oItem
    const { title, hash, handler } = item

    const newItem = {
      sText: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
      clickEvent: () => {
        if (!hash) return
        if (window.location.hash !== hash) {
          window.location.hash = hash
        }
        setTimeout(handler, 300)
      },
      hash,
      order,
      column
    }

    if (newItem.column === 1) {
      this.newItemsColumn1.push(newItem)
      this.newItemsColumn1.sort((a, b) => a.order - b.order)
    } else if (newItem.column === 2) {
      this.newItemsColumn2.push(newItem)
      this.newItemsColumn2.sort((a, b) => a.order - b.order)
    }
  })
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype)

CHeaderItemView.prototype.ViewTemplate = '%ModuleName%_HeaderItemView'

const HeaderItemView = new CHeaderItemView()

module.exports = HeaderItemView
