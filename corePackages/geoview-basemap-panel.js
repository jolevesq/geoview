/*! Package:geoview-basemap-panel: 0.1.0 - "388f795f4d1bf6e86b4731d4df5a8324cf938366" - 2024-02-02T16:28:47.557Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[286],{7280:(e,a,t)=>{var n=t(29357),r=t(46147),s=t(94796),o=t(59335),i=t(19371),p=t(44585),l=t(57869),d=t(63325),c=t(86732),m=t(43865),u=t(97309),b=t(25897),f=t(38613),h=t(91662),g=t.n(h),v=t(11995),y=t(29541);function C(e){var a=e.mapId,t=e.config,n=window.cgpv,r=n.api.maps[a],s=n.api,o=n.ui,i=n.react,p=o.elements,l=p.Select,c=p.Card,m=p.Box,h=i.useState,C=i.useEffect,P=function(e){return{basemapCard:{"& .MuiCard-root":{backgroundColor:e.palette.grey.A700,color:e.palette.primary.light,display:"flex",flexDirection:"column",backgroundClip:"padding-box",border:"2px solid rgba(255,255,255,0.25)",borderRadius:"6px",boxShadow:"none",marginBottom:"16px",width:"300px",transition:"all 0.3s ease-in-out","&:last-child":{marginBottom:"0px"},"&:hover":{border:"2px solid #FFFF00"},"&.active":{border:"2px solid #FFFFFF"}},"& .MuiCardHeader-root":{backgroundColor:"".concat(e.palette.grey.A700," !important"),color:e.basemapPanel.header,fontSize:14,fontWeight:400,margin:0,padding:"0 12px",height:60,width:"100%",order:2},"& .MuiCardContent-root":{order:1,height:190,position:"relative",padding:0,"&:last-child":{padding:0},"& .basemapCardThumbnail":{position:"absolute",height:"100%",width:"100%",objectFit:"cover",top:0,left:0},"& .basemapCardThumbnailOverlay":{display:"block",height:"100%",width:"100%",position:"absolute",backgroundColor:e.basemapPanel.overlayDefault,transition:"all 0.3s ease-in-out"}},"&:hover":{cursor:"pointer",borderColor:e.basemapPanel.borderHover,"& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:e.basemapPanel.overlayHover}}},"&.active":{borderColor:e.basemapPanel.borderActive,"& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:e.basemapPanel.overlayActive}},"&:hover":{borderColor:"rgba(255,255,255,0.75)","& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:"rgba(0,0,0,0)"}}}}}}}(o.useTheme()),x=h([]),w=(0,f.Z)(x,2),I=w[0],B=w[1],j=h(""),Z=(0,f.Z)(j,2),k=Z[0],S=Z[1],T=h(t.canSwichProjection),N=(0,f.Z)(T,1)[0],O=t.supportedProjections.map((function(e){return null==e?void 0:e.projectionCode}))||[],A=(0,v.oW)(),L=h(A),F=(0,f.Z)(L,2),M=F[0],W=F[1],q=(0,d.nst)();function R(e,a,t){for(var n=[],s=0;s<e.length;s++){var o,i,p,l,d,c=e[s];if("transport"===c)if(null!==(o=r.basemap.basemapsList[a].transport)&&void 0!==o&&o.url)n.push((null===(i=r.basemap.basemapsList[a].transport)||void 0===i?void 0:i.url).replace("{z}","8").replace("{y}",3978===a?"285":"91").replace("{x}",3978===a?"268":"74"));if("simple"===c)null!==(p=r.basemap.basemapsList[a].simple)&&void 0!==p&&p.url&&n.push(r.basemap.basemapsList[a].simple.url.replace("{z}","8").replace("{y}","285").replace("{x}","268"));if("shaded"===c)null!==(l=r.basemap.basemapsList[a].shaded)&&void 0!==l&&l.url&&n.push(r.basemap.basemapsList[a].shaded.url.replace("{z}","8").replace("{y}","285").replace("{x}","268"));if("label"===c)null!==(d=r.basemap.basemapsList[a].label)&&void 0!==d&&d.url&&n.push(r.basemap.basemapsList[a].label.url.replaceAll("xxxx","en"===t?"CBMT":"CBCT").replace("{z}","8").replace("{y}",3978===a?"285":"91").replace("{x}",3978===a?"268":"74"));"osm"===c&&n.push("https://tile.openstreetmap.org/0/0/0.png")}return n}function U(e){var t="",n="";return e.includes("transport")?(t=(0,d.itW)(a,"basemapPanel.info.transport.name"),n=(0,d.itW)(a,"basemapPanel.info.transport.description")):e.includes("simple")?t=(0,d.itW)(a,"basemapPanel.info.simple.name"):e.includes("shaded")?(t=(0,d.itW)(a,"basemapPanel.info.shaded.name"),n=(0,d.itW)(a,"basemapPanel.info.shaded.description")):e.includes("osm")?t=(0,d.itW)(a,"basemapPanel.info.osm.name"):e.includes("nogeom")&&(t=(0,d.itW)(a,"basemapPanel.info.nogeom.name")),e.includes("label")&&(t="".concat(t," ").concat((0,d.itW)(a,"basemapPanel.info.label.name"))),{name:t,description:n}}var $=function(e){var a=I.find((function(a){return a.basemapId===e}));void 0!==a&&(r.basemap.setBasemap(a),S(e))},E=function(){var e=(0,b.Z)(g().mark((function e(n){var r,o,i,p,l,c;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=(0,d.ZQJ)(t.supportedProjections.find((function(e){return e.projectionCode===n}))),o=!1,B([]),i=g().mark((function e(){var t,i;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=r.customBasemaps[p],(i=s.maps[a].basemap.createCustomBasemap(t,n))&&B((function(e){return[].concat((0,u.Z)(e),[i])})),i&&0===p&&""===k&&($(i.basemapId),o=!0);case 4:case"end":return e.stop()}}),e)})),p=0;case 5:if(!(p<r.customBasemaps.length)){e.next=10;break}return e.delegateYield(i(),"t0",7);case 7:p++,e.next=5;break;case 10:l=g().mark((function e(){var t,i,p,l,d,m;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.coreBasemaps[c],e.next=3,s.maps[a].basemap.createCoreBasemap(t,n);case 3:i=e.sent,p=U(i.type.split("-")),l=p.name,d=p.description,i.thumbnailUrl=R(i.type.split("-"),A,q),i.name=l,i.description=d,i&&B((function(e){return[].concat((0,u.Z)(e),[i])})),m="".concat(t.shaded?"shaded":"").concat(t.id).concat(t.labeled?"label":""),i&&m===k&&!o&&($(k),o=!0);case 11:case"end":return e.stop()}}),e)})),c=0;case 12:if(!(c<r.coreBasemaps.length)){e.next=17;break}return e.delegateYield(l(),"t1",14);case 14:c++,e.next=12;break;case 17:o||$(I[0]);case 18:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return C((function(){E(M)}),[q]),(0,y.jsxs)(m,{sx:P.basemapCard,children:[N&&(0,y.jsx)(l,{fullWidth:!0,labelId:"projection-label",value:M,onChange:function(e){var a=e.target.value;$("nogeom"),W(a),E(a),r.setProjection(a)},label:"Projection",style:{display:t.canSwichProjection?"flex":"none",marginBottom:"8px"},inputLabel:{id:"projection-label"},menuItems:O.map((function(e){return{key:e,item:{value:e,children:"EPSG:".concat(e)}}}))}),I.map((function(e){return(0,y.jsx)(c,{tabIndex:0,className:e.basemapId===k?"active":"",onClick:function(){return $(e.basemapId)},onKeyPress:function(){return $(e.basemapId)},title:e.name,contentCard:(0,y.jsxs)(y.Fragment,{children:["string"==typeof e.thumbnailUrl&&(0,y.jsx)("img",{src:e.thumbnailUrl,alt:e.altText,className:"basemapCardThumbnail"}),Array.isArray(e.thumbnailUrl)&&e.thumbnailUrl.map((function(a,t){return(0,y.jsx)("img",{src:a,alt:e.altText,className:"basemapCardThumbnail"},t)})),(0,y.jsx)("div",{className:e.basemapId!==k?"basemapCardThumbnailOverlay":""})]})},e.basemapId)}))]})}const P=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Basemap Panel Schema","type":"object","version":1,"comments":"Configuration for GeoView basemap panel package.","additionalProperties":false,"definitions":{"basemapNameNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The display name of the layer."},"basemapDescriptionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap description."},"thumbnailUrlNode":{"type":"object","properties":{"en":{"type":"array","uniqueItems":true,"items":{"type":"string"}},"fr":{"type":"array","uniqueItems":true,"items":{"type":"string"}}},"description":"Basemap thumbnail urls."},"basemapLayerUrlNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The service endpoint of the basemap layer."},"basemapAttributionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap attribution text."},"basemapLayersNode":{"type":"object","properties":{"basemapId":{"type":"string","description":"the id of the basmap layer."},"url":{"$ref":"#/definitions/basemapLayerUrlNode"},"opacity":{"type":"number","description":"the opacity of this layer.","default":0}},"additionalItems":false,"required":["basemapId","url"]},"basemap":{"type":"object","properties":{"basemapId":{"type":"string","description":"the basemap id","enum":["transport","simple","shaded","osm","nogeom"]},"shaded":{"type":"boolean","description":"if a shaded layer should be included with this basemap.","default":false},"labeled":{"type":"boolean","description":"if labels should be enabled in this basemap.","default":false}},"additionalProperties":false,"required":["basemapId","shaded","labeled"]},"customBasemap":{"type":"object","properties":{"basemapId":{"type":"string","description":"the basemap id."},"name":{"$ref":"#/definitions/basemapNameNode"},"description":{"$ref":"#/definitions/basemapDescriptionNode"},"thumbnailUrl":{"$ref":"#/definitions/thumbnailUrlNode"},"layers":{"type":"array","description":"a list of basemap layers","items":{"$ref":"#/definitions/basemapLayersNode"},"minItems":1},"attribution":{"$ref":"#/definitions/basemapAttributionNode"},"zoomLevels":{"type":"object","description":"Zoom levels for the basemap","properties":{"min":{"type":"integer","minimum":0,"maximum":24,"default":0},"max":{"type":"integer","minimum":0,"maximum":24,"default":24}},"additionalProperties":false,"required":["min","max"]}},"additionalProperties":false,"required":["basemapId","name","description","layers"]}},"properties":{"isOpen":{"type":"boolean","description":"Specifies whether the basemap panel is initially open or closed","default":false},"canSwichProjection":{"type":"boolean","description":"Allow the user to switch projection from the basemap panel.","default":true},"supportedProjections":{"type":"array","items":{"type":"object","properties":{"projectionCode":{"type":"integer","enum":[3978,3857],"description":"Default projection to load on start."},"customBasemaps":{"type":"array","description":"A list of custom basemaps.","items":{"$ref":"#/definitions/customBasemap"},"minItems":0},"coreBasemaps":{"type":"array","description":"A list of basemaps available in the core to show in the panel.","items":{"$ref":"#/definitions/basemap"},"minItems":1}}},"minItems":1,"required":["coreBasemaps","customBasemaps"]},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}},"required":["canSwichProjection","supportedProjections","suportedLanguages"]}'),x=JSON.parse('{"isOpen":false,"canSwichProjection":false,"supportedProjections":[{"projectionCode":3978,"coreBasemaps":[{"basemapId":"transport","shaded":true,"labeled":true},{"basemapId":"transport","shaded":true,"labeled":false},{"basemapId":"osm","shaded":true,"labeled":false},{"basemapId":"simple","shaded":true,"labeled":false},{"basemapId":"shaded","shaded":true,"labeled":false},{"basemapId":"nogeom","shaded":false,"labeled":false}],"customBasemaps":[]},{"projectionCode":3857,"coreBasemaps":[{"basemapId":"transport","shaded":true,"labeled":true},{"basemapId":"transport","shaded":true,"labeled":false},{"basemapId":"osm","shaded":true,"labeled":false},{"basemapId":"simple","shaded":true,"labeled":false},{"basemapId":"shaded","shaded":true,"labeled":false},{"basemapId":"nogeom","shaded":false,"labeled":false}],"customBasemaps":[]}],"suportedLanguages":["en","fr"]}');function w(e,a,t){return a=(0,o.Z)(a),(0,s.Z)(e,I()?Reflect.construct(a,t||[],(0,o.Z)(e).constructor):a.apply(e,t))}function I(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(I=function(){return!!e})()}var B=function(e){function a(){var e;(0,n.Z)(this,a);for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return e=w(this,a,[].concat(r)),(0,l.Z)((0,i.Z)(e),"schema",(function(){return P})),(0,l.Z)((0,i.Z)(e),"defaultConfig",(function(){return(0,d.ZQJ)(x)})),(0,l.Z)((0,i.Z)(e),"translations",(0,d.ZQJ)({en:{basemapPanel:{title:"Basemaps",info:{transport:{name:"Transport",description:"The Canada Base Map - Transportation (CBMT). This web mapping service provides spatial reference context with an emphasis on transportation networks.\n                          It is designed especially for use as a background map in a web mapping application or geographic information system (GIS)."},simple:{name:"Simple"},shaded:{name:"Shaded relief",description:"The Canada Base Map - Elevation (CBME) web mapping services of the Earth Sciences Sector at Natural Resources Canada,\n                          is intended primarily for online mapping application users and developers"},osm:{name:"Open Street Maps"},nogeom:{name:"No geometry"},label:{name:"with labels"}}}},fr:{basemapPanel:{title:"Fond de carte",info:{transport:{name:"Transport",description:"Carte de base du Canada - Transport (CBCT). Ce service de cartographie Web offre un contexte de référence spatiale axé sur les réseaux de transport.\n                          Il est particulièrement conçu pour être utilisé comme fond de carte dans une application cartographique Web ou un système d'information géographique (SIG)."},simple:{name:"Simple"},shaded:{name:"Relief ombré",description:"Les services de cartographie Web de la carte de base du Canada - élévation (CBCE) du Secteur des sciences de la\n                          Terre de Ressources naturelles Canada sont destinés principalement aux utilisateurs et aux développeurs d'applications de cartographie en ligne."},osm:{name:"Carte - Open Street Maps"},nogeom:{name:"Pas de géométrie"},label:{name:"avec étiquettes"}}}}})),(0,l.Z)((0,i.Z)(e),"onCreateContent",(function(){return(0,y.jsx)(C,{mapId:e.pluginProps.mapId,config:e.configObj||{}})})),e}return(0,p.Z)(a,e),(0,r.Z)(a,[{key:"onCreateButtonProps",value:function(){return{id:"".concat(this.pluginProps.mapId,"-basemapPanelButton"),tooltip:"basemapPanel.title",tooltipPlacement:"right",children:(0,y.jsx)(m.Z,{}),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"basemapPanel.title",icon:(0,y.jsx)(m.Z,{}),width:350,status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onRemoved",value:function(){this.api.maps[this.pluginProps.mapId].basemap.basemaps=[],this.api.maps[this.pluginProps.mapId].basemap.loadDefaultBasemaps()}}]),a}(c.k);window.geoviewPlugins=window.geoviewPlugins||{},window.geoviewPlugins["basemap-panel"]=(0,d.RFZ)(B)},86732:(e,a,t)=>{t.d(a,{k:()=>m});var n=t(29357),r=t(46147),s=t(94796),o=t(59335),i=t(19371),p=t(44585),l=t(57869);function d(e,a,t){return a=(0,o.Z)(a),(0,s.Z)(e,c()?Reflect.construct(a,t||[],(0,o.Z)(e).constructor):a.apply(e,t))}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}var m=function(e){function a(){var e;(0,n.Z)(this,a);for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return e=d(this,a,[].concat(r)),(0,l.Z)((0,i.Z)(e),"buttonPanel",void 0),(0,l.Z)((0,i.Z)(e),"buttonProps",void 0),(0,l.Z)((0,i.Z)(e),"panelProps",void 0),e}return(0,p.Z)(a,e),(0,r.Z)(a,[{key:"onCreateButtonProps",value:function(){var e=window.cgpv.ui.elements.MapIcon;return{id:"somePluginButton",tooltip:"Some tooltip",tooltipPlacement:"right",children:this.react.createElement(e),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"Some title",icon:'<i class="material-icons">map</i>',width:"80vw",status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onCreateContent",value:function(){return this.react.createElement("div",void 0,"Content for AppBar Plugin on map id ".concat(this.pluginProps.mapId," goes here..."))}},{key:"onAdd",value:function(){var e,a;this.buttonProps=this.onCreateButtonProps(),this.panelProps=this.onCreateContentProps(),this.buttonPanel=(null===(e=this.map())||void 0===e?void 0:e.appBarButtons.createAppbarPanel(this.buttonProps,this.panelProps,null))||void 0;var t=this.onCreateContent();null===(a=this.buttonPanel)||void 0===a||null===(a=a.panel)||void 0===a||a.changeContent(t)}},{key:"onRemove",value:function(){var e;this.api&&this.buttonPanel&&(null===(e=this.map())||void 0===e||e.appBarButtons.removeAppbarPanel(this.buttonPanel.buttonPanelId))}}]),a}(t(99200).V)}},e=>{var a;a=7280,e(e.s=a)}]);
//# sourceMappingURL=geoview-basemap-panel.js.map