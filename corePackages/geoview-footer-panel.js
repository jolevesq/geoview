/*! Package:geoview-footer-panel: 0.1.0 - "c2ce486e35238f4acd288d515282916b42a10309" - 2023-12-15T13:15:11.712Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[435],{84144:(e,t,n)=>{var a=n(25912),r=n(74146),o=n(1358),i=n(30830),s=n(86022),c=n(82217),u=n(81028),l=n(87663),f=n(48202);const d=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Footer Config Schema","type":"object","version":1,"comments":"Configuration for GeoView footer package.","additionalProperties":true,"properties":{"tabs":{"type":"object","description":"Available tabs","properties":{"defaultTabs":{"type":"array","items":{"type":"string","enum":["legend","layers","details","data-table","time-slider","geoChart"]},"minItems":0,"default":["legend","layers","details","data-table"],"uniqueItems":true,"description":"Defaut tabs of footer panel to use"},"customTabs":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"defaultTabs":{"type":"string"},"contentHTML":{"type":"string"}}},"minItems":0,"default":[],"uniqueItems":true,"description":"Custom tabs of footer panel to use"}},"additionalProperties":false},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."},"collapsed":{"type":"boolean","default":true,"description":"State of footer panel when map is loaded"}},"required":["suportedLanguages","tabs"]}'),v=JSON.parse('{"tabs":{"defaultTabs":["legend","layers","details","data-table"],"customTabs":[]},"suportedLanguages":["en","fr"]}');var p=n(59618),m=n(12919),E=n(29541),g=window;function y(e){var t=e.mapId,n=g.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,m.Z)(s,2),u=c[0],f=c[1],d=o([]),v=(0,m.Z)(d,2),y=v[0],A=v[1],b=function(){var e;void 0!==(null===(e=a.maps[t].layer)||void 0===e?void 0:e.layerOrder)&&A((0,p.Z)(a.maps[t].layer.layerOrder).reverse())},L=function(){return b()},h=function(e){(0,l.UKz)(e)&&A((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))},T=function(e){(0,l.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){b(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,L,t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,h,t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,T,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,L),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t,h),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t,T)}}),[]),i((function(){f(a.maps[t].legend.createLegend({layerIds:y,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[y]),(0,E.jsx)("div",{children:u})}var A=n(64238),b=n(14843),L=n.n(b),h=window;function T(e){var t=e.mapId,n=h.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(null),c=(0,m.Z)(s,2),u=c[0],l=c[1],f=function(){var e=(0,A.Z)(L().mark((function e(){var a;return L().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.api.maps[t].dataTable.createDataPanel();case 2:a=e.sent,l(a);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){setTimeout((function(){f()}),1e3)};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,d,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,d)}}),[]),(0,E.jsx)("div",{children:u})}var D=window;function N(e){var t=e.mapId,n=D.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,m.Z)(s,2),u=c[0],f=c[1],d=o([]),v=(0,m.Z)(d,2),g=v[0],y=v[1],A=function(){var e;void 0!==(null===(e=a.maps[t].layer)||void 0===e?void 0:e.layerOrder)&&y((0,p.Z)(a.maps[t].layer.layerOrder).reverse())},b=function(){return A()},L=function(e){(0,l.UKz)(e)&&y((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))},h=function(e){(0,l.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){A(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,b,t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,L,t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,h,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,b),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t,L),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t,h)}}),[]),i((function(){f(a.maps[t].layers.createLayers({layerIds:g,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[g]),(0,E.jsx)("div",{children:u})}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var R=window,Z=function(e){(0,i.Z)(n,e);var t=_(n);function n(e,r){var i;return(0,a.Z)(this,n),i=t.call(this,e,r),(0,u.Z)((0,o.Z)(i),"schema",(function(){return d})),(0,u.Z)((0,o.Z)(i),"defaultConfig",(function(){return(0,l.ZQJ)(v)})),(0,u.Z)((0,o.Z)(i),"translations",(0,l.ZQJ)({en:{footerPanel:{legend:"Legend",layers:"Layers",details:"Details",dataTable:"DataTable",timeSlider:"Time Slider",geochart:"Chart"}},fr:{footerPanel:{legend:"Légende",layers:"Couches",details:"Détails",dataTable:"Données",timeSlider:"Curseur Temporel",geochart:"Graphique"}}})),(0,u.Z)((0,o.Z)(i),"added",(function(){var e=(0,o.Z)(i),t=e.configObj,n=e.pluginProps.mapId,a=R.cgpv;if(a){var r=a.api,s=r.maps[n].footerTabs,c=null==t?void 0:t.tabs.defaultTabs,u=0;if(c.includes("legend")&&(s.createFooterTab({id:"legend",value:u,label:"footerPanel.legend",content:function(){return(0,E.jsx)(y,{mapId:n})},icon:(0,E.jsx)(f.HubOutlinedIcon,{})}),u++),c.includes("layers")&&(s.createFooterTab({id:"layers",value:u,label:"footerPanel.layers",content:function(){return(0,E.jsx)(N,{mapId:n})},icon:(0,E.jsx)(f.LayersOutlinedIcon,{})}),u++),c.includes("details")){var d=u;s.createFooterTab({id:"details",value:d,label:"footerPanel.details",content:function(){return r.maps[n].details.createDetails(n)},icon:(0,E.jsx)(f.InfoOutlinedIcon,{})}),u++}c.includes("data-table")&&(s.createFooterTab({id:"data-table",value:u,label:"footerPanel.dataTable",content:function(){return(0,E.jsx)(T,{mapId:n})},icon:(0,E.jsx)(f.StorageIcon,{})}),u++),c.includes("time-slider")&&r.plugin.loadScript("time-slider").then((function(e){r.plugin.addPlugin("time-slider",n,e,(0,l.ZQJ)({mapId:n}))})),c.includes("geoChart")&&r.plugin.loadScript("geochart").then((function(e){r.plugin.addPlugin("geochart",n,e,(0,l.ZQJ)({mapId:n}))}));for(var v=null==t?void 0:t.tabs.customTabs,p=0;p<v.length;p++){var m=v[p];s.createFooterTab({id:m.id,value:u,label:m.title,content:m.contentHTML}),u++}}})),i.buttonPanel=null,i}return(0,r.Z)(n,[{key:"removed",value:function(){R.cgpv}}]),n}(l.Vw$);R.plugins=R.plugins||{},R.plugins["footer-panel"]=(0,l.RFZ)(Z)}},e=>{var t;t=84144,e(e.s=t)}]);
//# sourceMappingURL=geoview-footer-panel.js.map