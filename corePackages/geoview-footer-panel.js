/*! Package:geoview-footer-panel: 0.1.0 - "3444b53a88b0fe04926418c4e78f0d6a978d6c63" - 2023-11-23T18:26:04.105Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[435],{94779:(e,t,n)=>{var a=n(33422),r=n(51423),o=n(94981),i=n(77185),s=n(78807),c=n(51937),u=n(93699),l=n(44760),f=n(89456);const d=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Footer Config Schema","type":"object","version":1,"comments":"Configuration for GeoView footer package.","additionalProperties":true,"properties":{"tabs":{"type":"object","description":"Available tabs","properties":{"defaultTabs":{"type":"array","items":{"type":"string","enum":["legend","layers","details","data-table","time-slider"]},"minItems":0,"default":["legend","layers","details","data-table"],"uniqueItems":true,"description":"Defaut tabs of footer panel to use"},"customTabs":{"type":"array","items":{"type":"object","properties":{"defaultTabs":{"type":"string"},"contentHTML":{"type":"string"}}},"minItems":0,"default":[],"uniqueItems":true,"description":"Custom tabs of footer panel to use"}},"additionalProperties":false},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."},"collapsed":{"type":"boolean","default":true,"description":"State of footer panel when map is loaded"}},"required":["suportedLanguages","tabs"]}'),v=JSON.parse('{"tabs":{"defaultTabs":["legend","layers","details","data-table"],"customTabs":[]},"suportedLanguages":["en","fr"]}');var p=n(68482),E=n(60075),m=n(29541),y=window;function g(e){var t=e.mapId,n=y.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,E.Z)(s,2),u=c[0],f=c[1],d=o([]),v=(0,E.Z)(d,2),g=v[0],A=v[1],L=function(){var e;void 0!==(null===(e=a.maps[t].layer)||void 0===e?void 0:e.layerOrder)&&A((0,p.Z)(a.maps[t].layer.layerOrder).reverse())},T=function(){return L()},b=function(e){(0,l.UKz)(e)&&A((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))},N=function(e){(0,l.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){L(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,T,t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,b,t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,N,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,T),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t,b),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t,N)}}),[]),i((function(){f(a.maps[t].legend.createLegend({layerIds:g,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[g]),(0,m.jsx)("div",{children:u})}var A=n(21828),L=n(44321),T=n.n(L),b=window;function N(e){var t=e.mapId,n=b.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(null),c=(0,E.Z)(s,2),u=c[0],l=c[1],f=function(){var e=(0,A.Z)(T().mark((function e(){var a;return T().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.api.maps[t].dataTable.createDataPanel();case 2:a=e.sent,l(a);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){setTimeout((function(){f()}),1e3)};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,d,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,d)}}),[]),(0,m.jsx)("div",{children:u})}var _=window;function D(e){var t=e.mapId,n=_.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,E.Z)(s,2),u=c[0],f=c[1],d=o([]),v=(0,E.Z)(d,2),y=v[0],g=v[1],A=function(){var e;void 0!==(null===(e=a.maps[t].layer)||void 0===e?void 0:e.layerOrder)&&g((0,p.Z)(a.maps[t].layer.layerOrder).reverse())},L=function(){return A()},T=function(e){(0,l.UKz)(e)&&g((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))},b=function(e){(0,l.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){A(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,L,t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,T,t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,b,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,L),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t,T),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t,b)}}),[]),i((function(){f(a.maps[t].layers.createLayers({layerIds:y,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[y]),(0,m.jsx)("div",{children:u})}var h=window;function R(e){var t=e.mapId,n=h.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(null),c=(0,E.Z)(s,2),u=c[0],l=c[1],f=function(){var e=(0,A.Z)(T().mark((function e(){var a;return T().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.api.maps[t].timeSlider.createTimeSlider();case 2:a=e.sent,l(a);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){setTimeout((function(){f()}),1e3)};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,d,t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t,d)}}),[]),(0,m.jsx)("div",{children:u})}function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var w=window,Z=function(e){(0,i.Z)(n,e);var t=I(n);function n(e,r){var i;return(0,a.Z)(this,n),i=t.call(this,e,r),(0,u.Z)((0,o.Z)(i),"schema",(function(){return d})),(0,u.Z)((0,o.Z)(i),"defaultConfig",(function(){return(0,l.ZQJ)(v)})),(0,u.Z)((0,o.Z)(i),"translations",(0,l.ZQJ)({en:{legend:"Legend",layers:"Layers",details:"Details",dataTable:"DataTable",timeSlider:"Time Slider"},fr:{legend:"Légende",layers:"Couches",details:"Détails",dataTable:"Données",timeSlider:"Curseur Temporel"}})),(0,u.Z)((0,o.Z)(i),"added",(function(){var e=(0,o.Z)(i),t=e.configObj,n=e.pluginProps.mapId,a=w.cgpv;if(a){var r=a.api,s=r.maps[n],c=s.displayLanguage,u=s.footerTabs,d=null==t?void 0:t.tabs.defaultTabs,v=0;if(d.includes("legend")&&(u.createFooterTab({value:v,label:i.translations[c].legend,content:function(){return(0,m.jsx)(g,{mapId:n})},icon:(0,m.jsx)(f.HubOutlinedIcon,{})}),v++),d.includes("layers")&&(u.createFooterTab({value:v,label:i.translations[c].layers,content:function(){return(0,m.jsx)(D,{mapId:n})},icon:(0,m.jsx)(f.LayersOutlinedIcon,{})}),v++),d.includes("details")){var p=v;u.createFooterTab({value:p,label:i.translations[c].details,content:function(){return r.maps[n].details.createDetails(n)},icon:(0,m.jsx)(f.InfoOutlinedIcon,{})}),v++,r.event.on(r.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,l.gNW)(e)){var t=e.eventType,n=e.resultSets;if("click"===t){var a=[];Object.keys(n).forEach((function(e){a=a.concat(n[e])})),a.length>0&&u.selectFooterTab(p)}}}),"".concat(n,"/FeatureInfoLayerSet"))}d.includes("data-table")&&(u.createFooterTab({value:v,label:i.translations[c].dataTable,content:function(){return(0,m.jsx)(N,{mapId:n})},icon:(0,m.jsx)(f.StorageIcon,{})}),v++),d.includes("time-slider")&&(u.createFooterTab({value:v,label:i.translations[c].timeSlider,content:function(){return(0,m.jsx)(R,{mapId:n})}}),v++);for(var E=null==t?void 0:t.tabs.customTabs,y=0;y<E.length;y++){var A=E[y];u.createFooterTab({value:v,label:A.title,content:A.contentHTML}),v++}}})),i.buttonPanel=null,i}return(0,r.Z)(n,[{key:"removed",value:function(){w.cgpv}}]),n}(l.Vw$);w.plugins=w.plugins||{},w.plugins["footer-panel"]=(0,l.RFZ)(Z)}},e=>{var t;t=94779,e(e.s=t)}]);
//# sourceMappingURL=geoview-footer-panel.js.map