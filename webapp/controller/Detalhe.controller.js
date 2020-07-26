sap.ui.define([
	"sap/ui/core/mvc/Controller"
	], function (Controller) {
	"use strict";
	return Controller.extend("ovly.fiori_16.cadastro_de_alunos.controller.Detalhe", {

		onInit: function () {
			
			var oRouter = this.getOwnerComponent().getRouter();
			var oDetailRoute = oRouter.getRoute("RouteDetalhe");
			oDetailRoute.attachPatternMatched( this.onPatternMatched, this );
			
		},
		
		onPatternMatched: function (oEvent) {
			
			// debugger;
			var oArguments = oEvent.getParameters().arguments;
			var oDataModel = this.getView().getModel();
			var sPath = oDataModel.createKey("Students", {
				Id: oArguments.codigo
			});
			this.getView().bindElement("/" + sPath);
			
		},

		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		},

		onBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("RouteView1");
		},
		
		toUpper: function (sName){
		   if(sName){
		   	return sName.toUpperCase(); 
		   }
		}
	});
});