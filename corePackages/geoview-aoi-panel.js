/*! Package:geoview-aoi-panel: 1.0.0 - "9b38f7a3eedbaae1b1beaf846403ff7e17debcaa" - 2024-07-10T19:00:51.286Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[206],{52185:(e,t,n)=>{var i=n(59682),o=n(41108),r=n(95947),a=n(89153),s=n(79778),u=n(74780),l=n(49278),c=n(67814),p=n(56290),m=n(97282);function f(){return(0,m.jsx)("div",{})}const h=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Area of Interest Panel Schema","type":"object","version":"1.0","comments":"Configuration for GeoView Area of interest package.","additionalProperties":false,"properties":{"isOpen":{"description":"Specifies whether the area of interest panel is initially open or closed","type":"boolean","default":false},"aoiList":{"description":"Area of Interest list from which we can select.","type":"array","items":{"type":"object","additionalProperties":false,"properties":{"imageUrl":{"type":"string"},"aoiTitle":{"type":"string"},"extent":{"type":"array","items":[{"type":"number","minimum":-180,"maximum":180},{"type":"number","minimum":-90,"maximum":90},{"type":"number","minimum":-180,"maximum":180},{"type":"number","minimum":-90,"maximum":90}]}},"required":["aoiTitle","extent"]}},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}}}'),v=JSON.parse('{"isOpen":false,"aoiList":[],"version":"1.0"}');function d(e,t,n){return t=(0,a.A)(t),(0,r.A)(e,P()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function P(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(P=function(){return!!e})()}var A=function(e){function t(){var e;(0,i.A)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return e=d(this,t,[].concat(o)),(0,u.A)(e,"translations",(0,l.NK)({en:{AoiPanel:{title:"Area of Interest"}},fr:{AoiPanel:{title:"Région d'intérêt"}}})),(0,u.A)(e,"onCreateContent",(function(){return(0,m.jsx)(f,{})})),e}return(0,s.A)(t,e),(0,o.A)(t,[{key:"schema",value:function(){return h}},{key:"defaultConfig",value:function(){return(0,l.NK)(v)}},{key:"onCreateButtonProps",value:function(){return{id:"aoi-panel",tooltip:"AoiPanel.title",tooltipPlacement:"right",children:(0,m.jsx)(p.A,{}),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"AoiPanel.title",icon:(0,m.jsx)(p.A,{}),width:350,status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onRemoved",value:function(){}}])}(c.i);window.geoviewPlugins=window.geoviewPlugins||{},window.geoviewPlugins["aoi-panel"]=(0,l.KX)(A)},67814:(e,t,n)=>{n.d(t,{i:()=>p});var i=n(59682),o=n(41108),r=n(95947),a=n(89153),s=n(79778),u=n(74780);function l(e,t,n){return t=(0,a.A)(t),(0,r.A)(e,c()?Reflect.construct(t,n||[],(0,a.A)(e).constructor):t.apply(e,n))}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}var p=function(e){function t(){var e;(0,i.A)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return e=l(this,t,[].concat(o)),(0,u.A)(e,"buttonPanel",void 0),(0,u.A)(e,"buttonProps",void 0),(0,u.A)(e,"panelProps",void 0),e}return(0,s.A)(t,e),(0,o.A)(t,[{key:"onCreateButtonProps",value:function(){var e=window.cgpv.ui.elements.MapIcon;return{id:"somePluginButton",tooltip:"Some tooltip",tooltipPlacement:"right",children:this.react.createElement(e),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"Some title",icon:'<i class="material-icons">map</i>',width:"80vw",status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onCreateContent",value:function(){return this.react.createElement("div",void 0,"Content for AppBar Plugin on map id ".concat(this.pluginProps.mapId," goes here..."))}},{key:"onAdd",value:function(){this.buttonProps=this.onCreateButtonProps(),this.panelProps=this.onCreateContentProps(),this.panelProps.content=this.onCreateContent(),this.buttonPanel=this.mapViewer().appBarApi.createAppbarPanel(this.buttonProps,this.panelProps,this.buttonProps.id)||void 0}},{key:"onRemove",value:function(){this.api&&this.buttonPanel&&this.mapViewer().appBarApi.removeAppbarPanel(this.buttonPanel.buttonPanelId,this.buttonProps.id)}}])}(n(79724).G)}},e=>{var t;t=52185,e(e.s=t)}]);
//# sourceMappingURL=geoview-aoi-panel.js.map