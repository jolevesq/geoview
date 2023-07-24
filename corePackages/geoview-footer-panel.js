/*! Package:geoview-footer-panel: 0.1.0 - "f902bfafc59ba9f1a23024899a918c744896768a" - 2023-07-24T19:58:04.293Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[435],{68415:(e,t,n)=>{var a=n(18211),r=n(65151),o=n(35533),i=n(51487),s=n(7393),c=n(19316),l=n(41124),u=n(79712);const d=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Footer Config Schema","type":"object","version":1,"comments":"Configuration for GeoView footer package.","additionalProperties":true,"properties":{"tabs":{"type":"object","description":"Available tabs","properties":{"defaultTabs":{"type":"array","items":{"type":"string","enum":["legend","details","data-grid"]},"minItems":0,"default":["legend","details","data-grid"],"uniqueItems":true,"description":"Defaut tabs of footer panel to use"},"customTabs":{"type":"array","items":{"type":"object","properties":{"defaultTabs":{"type":"string"},"contentHTML":{"type":"string"}}},"minItems":0,"default":[],"uniqueItems":true,"description":"Custom tabs of footer panel to use"}},"additionalProperties":false},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."},"collapsed":{"type":"boolean","default":true,"description":"State of footer panel when map is loaded"}},"required":["suportedLanguages","tabs"]}'),f=JSON.parse('{"tabs":{"defaultTabs":["legend","details","data-grid"],"customTabs":[]},"suportedLanguages":["en","fr"]}');var v=n(20703),p=n(29541),m=window;function g(e){var t=e.mapId,n=m.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o([]),c=(0,v.Z)(s,2),l=c[0],d=c[1],f=o(),g=(0,v.Z)(f,2),E=g[0],y=g[1],h=o([]),b=(0,v.Z)(h,2),L=b[0],N=b[1],T=o(null),I=(0,v.Z)(T,2),_=I[0],A=I[1];return i((function(){return a.event.on(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,u.gNW)(e)){var n=e.resultSets,r=[];Object.keys(n).forEach((function(e){var o=(0,u.dIw)(a.map(t).layer.registeredLayers[e].layerName,t),i=n[e];i.length>0&&r.push({layerPath:e,layerName:o,features:i})})),r.length>0?d(r):d([])}else d([])}),"".concat(t,"/$FeatureInfoLayerSet$")),a.event.on(a.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,(function(e){if((0,u.gux)(e)){var t=e.coordinates;A(e.handlerName),N(t.lnglat)}else N([])}),t),function(){a.event.off(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,t),a.event.off(a.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,t)}}),[]),i((function(){y(a.map(t).details.createDetails(t,l,{mapId:t,location:L,handlerName:_}))}),[l,L]),(0,p.jsx)("div",{children:E})}var E=n(26200),y=window;function h(e){var t=e.mapId,n=y.cgpv,a=n.api,r=n.react,o=r.useState,i=r.useEffect,s=o(),c=(0,v.Z)(s,2),l=c[0],d=c[1],f=o([]),m=(0,v.Z)(f,2),g=m[0],h=m[1],b=function(){var e;void 0!==(null===(e=a.map(t).layer)||void 0===e?void 0:e.layerOrder)&&h((0,E.Z)(a.map(t).layer.layerOrder).reverse())};return i((function(){return a.event.on(a.eventNames.MAP.EVENT_MAP_LOADED,(function(){b()}),t),a.event.on(a.eventNames.LAYER.EVENT_REMOVE_LAYER,(function(e){(0,u.UKz)(e)&&h((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))}),t),a.event.on(a.eventNames.LAYER.EVENT_ADD_LAYER,(function(e){(0,u.riW)(e)&&a.event.on(a.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){b(),a.event.off(a.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),t),function(){a.event.off(a.eventNames.MAP.EVENT_MAP_LOADED,t),a.event.off(a.eventNames.LAYER.EVENT_ADD_LAYER,t),a.event.off(a.eventNames.LAYER.EVENT_REMOVE_LAYER,t)}}),[]),i((function(){d(a.map(t).legend.createLegend({layerIds:g,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[g]),(0,p.jsx)("div",{children:l})}var b=window;function L(e){var t=e.mapId,n=b.cgpv,a=n.api,r=n.ui,o=n.react,i=r.elements.Tabs,s=o.useState,c=o.useEffect,l=s([]),d=(0,v.Z)(l,2),f=d[0],m=d[1];return c((function(){m(Object.keys(a.map(t).layer.geoviewLayers))}),[a,t]),setTimeout((function(){f.forEach((function(e){var t=document.getElementById("".concat(e,"-groupLayerSelection"));t&&t.addEventListener("change",(function(){var t=this.selectedIndex,n=document.getElementsByClassName("".concat(e,"-layer-datagrid-table"));if(n.length>0)for(var a=0;a<n.length;a++)n[a].setAttribute("style","display:".concat(a!==t?"none":"block"))}))}))}),2e3),(0,p.jsx)(i,{tabsProps:{variant:"scrollable"},tabs:f.map((function(e,n){var r=a.map(t).layer.geoviewLayers[e],o=(0,u.dIw)(r.geoviewLayerName,t);return{value:n,label:void 0!==o?o:"data-".concat(n),content:function(){return a.map(t).dataGrid.createDataGrid({layerId:e})}}}))})}function N(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var T=window,I=function(e){(0,i.Z)(n,e);var t=N(n);function n(e,r){var i;return(0,a.Z)(this,n),i=t.call(this,e,r),(0,l.Z)((0,o.Z)(i),"schema",(function(){return d})),(0,l.Z)((0,o.Z)(i),"defaultConfig",(function(){return(0,u.ZQJ)(f)})),(0,l.Z)((0,o.Z)(i),"translations",(0,u.ZQJ)({en:{legend:"Legend",details:"Details",dataGrid:"Data"},fr:{legend:"Légende",details:"Détails",dataGrid:"Données"}})),(0,l.Z)((0,o.Z)(i),"added",(function(){var e=(0,o.Z)(i),t=e.configObj,n=e.pluginProps.mapId,a=T.cgpv;if(a){var r=a.api,s=r.map(n),c=s.displayLanguage,l=s.footerTabs,d=s.map.getTargetElement().parentElement;d&&(!1===(null==t?void 0:t.collapsed)?d.style.height="calc( 100% - 300px )":d.style.height="calc( 100% - 55px )");var f=null==t?void 0:t.tabs.defaultTabs,v=0;if(f.includes("legend")&&(l.createFooterTab({value:v,label:i.translations[c].legend,content:function(){return(0,p.jsx)(h,{mapId:n})}}),v++),f.includes("details")){var m=v;l.createFooterTab({value:m,label:i.translations[c].details,content:function(){return(0,p.jsx)(g,{mapId:n})}}),v++,r.event.on(r.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,u.gNW)(e)){var t=e.resultSets,n=[];Object.keys(t).forEach((function(e){n=n.concat(t[e])})),n.length>0&&l.selectFooterTab(m)}}),"".concat(n,"/$FeatureInfoLayerSet$"))}f.includes("data-grid")&&(l.createFooterTab({value:v,label:i.translations[c].dataGrid,content:function(){return(0,p.jsx)(L,{mapId:n})}}),v++);for(var E=null==t?void 0:t.tabs.customTabs,y=0;y<E.length;y++){var b=E[y];l.createFooterTab({value:v,label:b.title,content:b.contentHTML}),v++}}})),i.buttonPanel=null,i}return(0,r.Z)(n,[{key:"removed",value:function(){T.cgpv}}]),n}(u.Vw$);T.plugins=T.plugins||{},T.plugins["footer-panel"]=(0,u.RFZ)(I)}},e=>{var t;t=68415,e(e.s=t)}]);
//# sourceMappingURL=geoview-footer-panel.js.map