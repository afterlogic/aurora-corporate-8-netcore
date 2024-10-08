'use strict'

const _ = require('underscore')
const ko = require('knockout')
const TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js')
const App = require('%PathToCoreWebclientModule%/js/App.js')

const CAbstractHeaderItemView = require('%PathToCoreWebclientModule%/js/views/CHeaderItemView.js')

function CHeaderItemView() {
  CAbstractHeaderItemView.call(this, TextUtils.i18n('%MODULENAME%/ACTION_SHOW_NEW_BUTTON'))

  this.newItems = ko.observableArray([]);

  App.subscribeEvent('RegisterNewItemElement', (oItem) => {
    const newItem = { sText: oItem.item.title, clickEvent: () => {
        if(!oItem.item.hash) return;
        if(window.location.hash !== oItem.item.hash) {
            window.location.hash = oItem.item.hash;
        }
        setTimeout(oItem.item.handler, 300);
    }};
    this.newItems.push(newItem);
  })
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype)

CHeaderItemView.prototype.ViewTemplate = '%ModuleName%_HeaderItemView'

const HeaderItemView = new CHeaderItemView()

module.exports = HeaderItemView
