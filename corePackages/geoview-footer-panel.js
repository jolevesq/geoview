/*! Package:geoview-footer-panel: 0.1.0 - "93cfafb4f2f017f356f2280aee39365ac03c7275" - 2023-05-25T13:01:53.391Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[435],{5054:(e,t,n)=>{var a=n(11265),r=n(15288),o=n(90187),i=n(57667),s=n(84772),c=n(24518),u=n(18148),l=n(32906);const f=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Footer Config Schema","type":"object","version":1,"comments":"Configuration for GeoView footer package.","additionalProperties":true,"properties":{"tabs":{"type":"object","description":"Available tabs","properties":{"defaultTabs":{"type":"array","items":{"type":"string","enum":["legend","details","data-grid"]},"minItems":0,"default":["legend","details","data-grid"],"uniqueItems":true,"description":"Defaut tabs of footer panel to use"},"customTabs":{"type":"array","items":{"type":"object","properties":{"defaultTabs":{"type":"string"},"contentHTML":{"type":"string"}}},"minItems":0,"default":[],"uniqueItems":true,"description":"Custom tabs of footer panel to use"}},"additionalProperties":false},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."},"collapsed":{"type":"boolean","default":true,"description":"State of footer panel when map is loaded"}},"required":["suportedLanguages","tabs"]}'),d=JSON.parse('{"tabs":{"defaultTabs":["legend","details","data-grid"],"customTabs":[]},"suportedLanguages":["en","fr"]}');var v=n(80656),p=n(46393),m=n(45202),E=window;function g(e){var t=e.mapId,n=E.cgpv.api,a=(0,p.useState)([]),r=(0,v.Z)(a,2),o=r[0],i=r[1],s=(0,p.useState)(),c=(0,v.Z)(s,2),u=c[0],f=c[1],d=(0,p.useState)([]),g=(0,v.Z)(d,2),y=g[0],h=g[1],N=(0,p.useState)(null),b=(0,v.Z)(N,2),L=b[0],_=b[1];return(0,p.useEffect)((function(){return n.event.on(n.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,l.gNW)(e)){var a=e.resultSets,r=[];Object.keys(a).forEach((function(e){var o=(0,l.dIw)(n.map(t).layer.registeredLayers[e].layerName,t),i=a[e];i.length>0&&r.push({layerPath:e,layerName:o,features:i})})),r.length>0?i(r):i([])}else i([])}),"".concat(t,"/$FeatureInfoLayerSet$")),n.event.on(n.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,(function(e){if((0,l.yp4)(e)){var t=e.coordinates;_(e.handlerName),h(t.lnglat),n.event.emit((0,l.usG)(n.eventNames.MARKER_ICON.EVENT_MARKER_ICON_SHOW,e.handlerName,t.lnglat))}else h([])}),t),function(){n.event.off(n.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,t),n.event.off(n.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,t)}}),[]),(0,p.useEffect)((function(){f(n.map(t).details.createDetails(t,o,{mapId:t,location:y,handlerName:L})),setTimeout((function(){n.event.emit((0,l.usG)(n.eventNames.MARKER_ICON.EVENT_MARKER_ICON_SHOW,L,y))}),1800)}),[o,y]),(0,m.jsx)("div",{children:u})}var y=n(53638),h=window;function N(e){var t=e.mapId,n=h.cgpv.api,a=(0,p.useState)(),r=(0,v.Z)(a,2),o=r[0],i=r[1],s=(0,p.useState)([]),c=(0,v.Z)(s,2),u=c[0],f=c[1],d=function(){var e;void 0!==(null===(e=n.map(t).layer)||void 0===e?void 0:e.layerOrder)&&f((0,y.Z)(n.map(t).layer.layerOrder).reverse())};return(0,p.useEffect)((function(){return n.event.on(n.eventNames.MAP.EVENT_MAP_LOADED,(function(){d()}),t),n.event.on(n.eventNames.LAYER.EVENT_REMOVE_LAYER,(function(e){(0,l.UKz)(e)&&f((function(t){return t.filter((function(t){return t!==e.geoviewLayer.geoviewLayerId}))}))}),t),n.event.on(n.eventNames.LAYER.EVENT_ADD_LAYER,(function(e){(0,l.riW)(e)&&n.event.on(n.eventNames.LAYER.EVENT_LAYER_ADDED,(function(){d(),n.event.off(n.eventNames.LAYER.EVENT_LAYER_ADDED,"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),"".concat(t,"/").concat(e.layerConfig.geoviewLayerId))}),t),function(){n.event.off(n.eventNames.MAP.EVENT_MAP_LOADED,t),n.event.off(n.eventNames.LAYER.EVENT_ADD_LAYER,t),n.event.off(n.eventNames.LAYER.EVENT_REMOVE_LAYER,t)}}),[]),(0,p.useEffect)((function(){i(n.map(t).legend.createLegend({layerIds:u,isRemoveable:!1,canSetOpacity:!0,canZoomTo:!0}))}),[u]),(0,m.jsx)("div",{children:o})}var b=window;function L(e){var t=e.mapId,n=b.cgpv,a=n.api,r=n.ui.elements.Tabs,o=(0,p.useState)([]),i=(0,v.Z)(o,2),s=i[0],c=i[1];return(0,p.useEffect)((function(){c(Object.keys(a.map(t).layer.geoviewLayers))}),[a,t]),setTimeout((function(){s.forEach((function(e){var t=document.getElementById("".concat(e,"-groupLayerSelection"));t&&t.addEventListener("change",(function(){var t=this.selectedIndex,n=document.getElementsByClassName("".concat(e,"-layer-datagrid-table"));if(n.length>0)for(var a=0;a<n.length;a++)n[a].setAttribute("style","display:".concat(a!==t?"none":"block"))}))}))}),2e3),(0,m.jsx)(r,{tabsProps:{variant:"scrollable"},tabs:s.map((function(e,n){var r=a.map(t).layer.geoviewLayers[e],o=(0,l.dIw)(r.geoviewLayerName,t);return{value:n,label:void 0!==o?o:"data-".concat(n),content:function(){return a.map(t).dataGrid.createDataGrid({layerId:e})}}}))})}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,c.Z)(e);if(t){var r=(0,c.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var I=window,T=function(e){(0,i.Z)(n,e);var t=_(n);function n(e,r){var i;return(0,a.Z)(this,n),i=t.call(this,e,r),(0,u.Z)((0,o.Z)(i),"schema",(function(){return f})),(0,u.Z)((0,o.Z)(i),"defaultConfig",(function(){return(0,l.ZQJ)(d)})),(0,u.Z)((0,o.Z)(i),"translations",(0,l.ZQJ)({en:{legend:"Legend",details:"Details",dataGrid:"Data"},fr:{legend:"Légende",details:"Détails",dataGrid:"Données"}})),(0,u.Z)((0,o.Z)(i),"added",(function(){var e=(0,o.Z)(i),t=e.configObj,n=e.pluginProps.mapId,a=I.cgpv;if(a){var r=a.api,s=r.map(n),c=s.displayLanguage,u=s.footerTabs,f=s.map.getTargetElement().parentElement;f&&(!1===(null==t?void 0:t.collapsed)?f.style.height="calc( 100% - 300px )":f.style.height="calc( 100% - 55px )");var d=null==t?void 0:t.tabs.defaultTabs,v=0;if(d.includes("legend")&&(u.createFooterTab({value:v,label:i.translations[c].legend,content:function(){return(0,m.jsx)(N,{mapId:n})}}),v++),d.includes("details")){var p=v;u.createFooterTab({value:p,label:i.translations[c].details,content:function(){return(0,m.jsx)(g,{mapId:n})}}),v++,r.event.on(r.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,l.gNW)(e)){var t=e.resultSets,n=[];Object.keys(t).forEach((function(e){n=n.concat(t[e])})),n.length>0&&u.selectFooterTab(p)}}),"".concat(n,"/$FeatureInfoLayerSet$"))}d.includes("data-grid")&&(u.createFooterTab({value:v,label:i.translations[c].dataGrid,content:function(){return(0,m.jsx)(L,{mapId:n})}}),v++);for(var E=null==t?void 0:t.tabs.customTabs,y=0;y<E.length;y++){var h=E[y];u.createFooterTab({value:v,label:h.title,content:h.contentHTML}),v++}}})),i.buttonPanel=null,i}return(0,r.Z)(n,[{key:"removed",value:function(){I.cgpv}}]),n}(l.Vw$);I.plugins=I.plugins||{},I.plugins["footer-panel"]=(0,l.RFZ)(T)}},e=>{var t;t=5054,e(e.s=t)}]);
//# sourceMappingURL=geoview-footer-panel.js.map