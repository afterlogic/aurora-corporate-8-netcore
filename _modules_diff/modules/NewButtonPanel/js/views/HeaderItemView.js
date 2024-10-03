'use strict'

const _ = require('underscore')
const ko = require('knockout')
const TextUtils = require('%PathToCoreWebclientModule%/js/utils/Text.js')

const CAbstractHeaderItemView = require('%PathToCoreWebclientModule%/js/views/CHeaderItemView.js')

function CHeaderItemView() {
  CAbstractHeaderItemView.call(this, TextUtils.i18n('%MODULENAME%/ACTION_SHOW_NEW_BUTTON')) // TODO: what to write here

  this.newItems = ko.observableArray([
    { sText: 'Compose an e-mail', clickEvent: () => console.log('test') },
    { sText: 'New note', clickEvent: () => console.log('test') },
    { sText: 'New contact', clickEvent: () => console.log('test') },
    { sText: 'New event', clickEvent: () => console.log('test') },
    { sText: 'New task ', clickEvent: () => console.log('test') },
    { sText: 'Upload a file', clickEvent: () => console.log('test') },
    { sText: 'New document', clickEvent: () => console.log('test') },
    { sText: 'New spreadsheet', clickEvent: () => console.log('test') },
    { sText: 'New presentation', clickEvent: () => console.log('test') },
    { sText: 'Create a folder', clickEvent: () => console.log('test') },
  ])
}

_.extendOwn(CHeaderItemView.prototype, CAbstractHeaderItemView.prototype)

CHeaderItemView.prototype.ViewTemplate = '%ModuleName%_HeaderItemView'

const HeaderItemView = new CHeaderItemView()
// HeaderItemView.allowChangeTitle(true); // do we need this?

module.exports = HeaderItemView
