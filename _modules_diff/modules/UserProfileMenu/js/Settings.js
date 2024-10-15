'use strict';

const
	_ = require('underscore'),
	
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js')
;

module.exports = {
	ServerModuleName: 'UserProfileMenu',
	
	DisplayUserMenu: true,
	
	/**
	 * Initializes settings from AppData object sections.
	 * 
	 * @param {Object} oAppData Object contained modules settings.
	 */
	init: function (oAppData)
	{
		const oSection = oAppData['%ModuleName%'];

		if (!_.isEmpty(oSection))
		{
			this.DisplayUserMenu = Types.pBool(oSection.DisplayUserMenu, this.DisplayUserMenu);
		}
	},
	
	/**
	 * Updates new settings values after saving on server.
	 * 
	 * @param {object} parameters 
	 */
	update: function (parameters)
	{
		this.DisplayUserMenu = Types.pBool(parameters.DisplayUserMenu, this.DisplayUserMenu);
	},
};
