/*! Package:geoview-footer-panel: 0.1.0 - "2e807b2abec61cf7c3329191951e73bccd291f6c" - 2023-07-12T19:47:53.607Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[435],{46439:(e,t,n)=>{var a=n(18211),r=n(65151),o=n(35533),i=n(51487),s=n(7393),c=n(19316),l=n(41124),u=n(12367);const f=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Footer Config Schema","type":"object","version":1,"comments":"Configuration for GeoView footer package.","additionalProperties":true,"properties":{"tabs":{"type":"object","description":"Available tabs","properties":{"defaultTabs":{"type":"array","items":{"type":"string","enum":["legend","details","data-grid"]},"minItems":0,"default":["legend","details","data-grid"],"uniqueItems":true,"description":"Defaut tabs of footer panel to use"},"customTabs":{"type":"array","items":{"type":"object","properties":{"defaultTabs":{"type":"string"},"contentHTML":{"type":"string"}}},"minItems":0,"default":[],"uniqueItems":true,"description":"Custom tabs of footer panel to use"}},"additionalProperties":false},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."},"collapsed":{"type":"boolean","default":true,"description":"State of footer panel when map is loaded"}},"required":["suportedLanguages","tabs"]}'),d=JSON.parse('{"tabs":{"defaultTabs":["legend","details","data-grid"],"customTabs":[]},"suportedLanguages":["en","fr"]}');var v=n(20703),p=n(45202),g=window;function m(e){var t=e.mapId,n=g.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o([]),c=(0,v.Z)(s,2),l=c[0],f=c[1],d=o(),m=(0,v.Z)(d,2),y=m[0],E=m[1],h=o([]),L=(0,v.Z)(h,2),b=L[0],N=L[1],I=o(null),T=(0,v.Z)(I,2),_=T[0],A=T[1];return i((function(){return a.event.on(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,u.gNW)(e)){var n=e.resultSets,r=[];Object.keys(n).forEach((function(e){var o=(0,u.dIw)(a.map(t).layer.registeredLayers[e].layerName,t),i=n[e];i.length>0&&r.push({layerPath:e,layerName:o,features:i})})),r.length>0?f(r):f([])}else f([])}),"".concat(t,"/$FeatureInfoLayerSet$")),a.event.on(a.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,(function(e){if((0,u.gux)(e)){var t=e.coordinates;A(e.handlerName),N(t.lnglat)}else N([])}),t),function(){a.event.off(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,t),a.event.off(a.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,t)}}),[]),i((function(){E(a.map(t).details.createDetails(t,l,{mapId:t,location:b,handlerName:_}))}),[l,b]),(0,p.jsx)("div",{children:y})}var y=n(26200),E=window;function h(e){var t=e.mapId,n=E.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,v.Z)(s,2),l=c[0],f=c[1],d=o([]),g=(0,v.Z)(d,2),m=g[0],h=g[1],L=function(){var e;void 0!==(null===(e=a.map(t).layer)||void 0===e?void 0:e.layerOrder)&&h((0,y.Z)(a.map(t).layer.layerOrder).reverse())};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,(function(){L()}),t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,(function(e){(0,u.UKz)(e)&&h((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))}),t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,(function(e){(0,u.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){L(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t)}}),[]),i((function(){f(a.map(t).legend.createLegend({layerIds:m,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[m]),(0,p.jsx)("div",{children:l})}var L=window;function b(e){var t=e.mapId,n=L.cgpv,a=n.api,r=n.ui,o=n.react,i=r.elements.Tabs,s=a.utilities.isVectorLayer,c=o.useState,l=o.useEffect,f=c([]),d=(0,v.Z)(f,2),g=d[0],m=d[1];l((function(){m(Object.keys(a.map(t).layer.geoviewLayers))}),[a,t]),setTimeout((function(){g.forEach((function(e){var t=document.getElementById("".concat(e,"-groupLayerSelection"));t&&t.addEventListener("change",(function(){var t=this.selectedIndex,n=document.getElementsByClassName("".concat(e,"-layer-datagrid-table"));if(n.length>0)for(var a=0;a<n.length;a++)n[a].setAttribute("style","display:".concat(a!==t?"none":"block"))}))}))}),2e3);return(0,p.jsx)(i,{tabsProps:{variant:"scrollable"},tabs:g.map((function(e,n){var r=a.map(t).layer.geoviewLayers[e],o=(0,u.dIw)(r.geoviewLayerName,t);!function(e,t){var n=[];e.listOfLayerEntryConfig.length>0&&void 0!==e.getAllFeatureInfo&&function e(t,a){t.forEach((function(t){"group"===t.entryType&&void 0!==t.listOfLayerEntryConfig&&t.listOfLayerEntryConfig.length>1?e(t.listOfLayerEntryConfig,"".concat(a,"/").concat(t.layerId)):"group"!==t.entryType&&n.push("".concat(a,"/").concat(t.layerId))}))}(e.listOfLayerEntryConfig,t);s(e)}(r,e);return{value:n,label:void 0!==o?o:"data-".concat(n),content:function(){return a.map(t).dataGrid.createDataGrid({layerId:e})}}}))})}function N(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var I=window,T=function(e){(0,i.Z)(n,e);var t=N(n);function n(e,r){var i;return(0,a.Z)(this,n),i=t.call(this,e,r),(0,l.Z)((0,o.Z)(i),"schema",(function(){return f})),(0,l.Z)((0,o.Z)(i),"defaultConfig",(function(){return(0,u.ZQJ)(d)})),(0,l.Z)((0,o.Z)(i),"translations",(0,u.ZQJ)({en:{legend:"Legend",details:"Details",dataGrid:"Data"},fr:{legend:"Légende",details:"Détails",dataGrid:"Données"}})),(0,l.Z)((0,o.Z)(i),"added",(function(){var e=(0,o.Z)(i),t=e.configObj,n=e.pluginProps.mapId,a=I.cgpv;if(a){var r=a.api,s=r.map(n),c=s.displayLanguage,l=s.footerTabs,f=s.map.getTargetElement().parentElement;f&&(!1===(null==t?void 0:t.collapsed)?f.style.height="calc( 100% - 300px )":f.style.height="calc( 100% - 55px )");var d=null==t?void 0:t.tabs.defaultTabs,v=0;if(d.includes("legend")&&(l.createFooterTab({value:v,label:i.translations[c].legend,content:function(){return(0,p.jsx)(h,{mapId:n})}}),v++),d.includes("details")){var g=v;l.createFooterTab({value:g,label:i.translations[c].details,content:function(){return(0,p.jsx)(m,{mapId:n})}}),v++,r.event.on(r.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,u.gNW)(e)){var t=e.resultSets,n=[];Object.keys(t).forEach((function(e){n=n.concat(t[e])})),n.length>0&&l.selectFooterTab(g)}}),"".concat(n,"/$FeatureInfoLayerSet$"))}d.includes("data-grid")&&(l.createFooterTab({value:v,label:i.translations[c].dataGrid,content:function(){return(0,p.jsx)(b,{mapId:n})}}),v++);for(var y=null==t?void 0:t.tabs.customTabs,E=0;E<y.length;E++){var L=y[E];l.createFooterTab({value:v,label:L.title,content:L.contentHTML}),v++}}})),i.buttonPanel=null,i}return(0,r.Z)(n,[{key:"removed",value:function(){I.cgpv}}]),n}(u.Vw$);I.plugins=I.plugins||{},I.plugins["footer-panel"]=(0,u.RFZ)(T)}},e=>{var t;t=46439,e(e.s=t)}]);
//# sourceMappingURL=geoview-footer-panel.js.map