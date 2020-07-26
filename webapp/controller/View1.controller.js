sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("ovly.fiori_16.cadastro_de_alunos.controller.View1", {
		onInit: function () {

		},
		
		onSearch: function (oEvt) {
			var oSearchField = oEvt.getSource(); 
			var sValue = oSearchField.getValue();
			
			// MessageToast.show(sValue);
		},
		
		onAdd: function () {
			MessageToast.show("apertou");
		},
		
		onItemPress: function (oEvt) {
			
			var oItemContext = oEvt.getParameters().listItem.getBindingContext(); 
			var oAluno       = oItemContext.getObject(); 
			
			// var sId = oEvt.getParameters().listItem.getBindingContext().getObject().Id; 
			var sId = oAluno.Id; 
			
			this.getOwnerComponent().getRouter().navTo("RouteDetalhe", { codigo: sId } );
		}
		
	});
});