/*! Package:geoview-basemap-panel: 0.1.0 - "47938de24c429094c3afb00f52007c36be22dd47" - 2024-04-02T21:54:42.572Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[300],{85340:(e,a,t)=>{var n=t(73676),r=t(92338),i=t(91609),s=t(43703),o=t(79524),p=t(19830),l=t(60996);function d(e,a,t){return a=(0,s.A)(a),(0,i.A)(e,c()?Reflect.construct(a,t||[],(0,s.A)(e).constructor):a.apply(e,t))}function c(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(c=function(){return!!e})()}var u=function(e){function a(){var e;(0,n.A)(this,a);for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return e=d(this,a,[].concat(r)),(0,p.A)(e,"buttonPanel",void 0),(0,p.A)(e,"buttonProps",void 0),(0,p.A)(e,"panelProps",void 0),e}return(0,o.A)(a,e),(0,r.A)(a,[{key:"onCreateButtonProps",value:function(){var e=window.cgpv.ui.elements.MapIcon;return{id:"somePluginButton",tooltip:"Some tooltip",tooltipPlacement:"right",children:this.react.createElement(e),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"Some title",icon:'<i class="material-icons">map</i>',width:"80vw",status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onCreateContent",value:function(){return this.react.createElement("div",void 0,"Content for AppBar Plugin on map id ".concat(this.pluginProps.mapId," goes here..."))}},{key:"onAdd",value:function(){var e;this.buttonProps=this.onCreateButtonProps(),this.panelProps=this.onCreateContentProps(),this.panelProps.content=this.onCreateContent(),this.buttonPanel=(null===(e=this.map())||void 0===e?void 0:e.appBarApi.createAppbarPanel(this.buttonProps,this.panelProps,null))||void 0}},{key:"onRemove",value:function(){var e;this.api&&this.buttonPanel&&(null===(e=this.map())||void 0===e||e.appBarApi.removeAppbarPanel(this.buttonPanel.buttonPanelId))}}])}(t(43238).G),m=t(19816),b=t(75309),h=t(72078),f=t(71901),g=t(7755),y=t.n(g),v=t(22745),C=t(31836),P=t(80678);function w(e){var a=e.mapId,t=e.config,n=window.cgpv,r=n.api.maps[a],i=n.api,s=n.ui,o=n.react,p=s.elements,d=p.Select,c=p.Card,u=p.Box,m=o.useState,g=o.useEffect,w=function(e){return{basemapCard:{"& .MuiCard-root":{backgroundColor:e.palette.grey.A700,color:e.palette.primary.light,display:"flex",flexDirection:"column",backgroundClip:"padding-box",border:"2px solid rgba(255,255,255,0.25)",borderRadius:"6px",boxShadow:"none",marginBottom:"16px",width:"300px",transition:"all 0.3s ease-in-out","&:last-child":{marginBottom:"0px"},"&:hover":{border:"2px solid #FFFF00"},"&.active":{border:"2px solid #FFFFFF"}},"& .MuiCardHeader-root":{backgroundColor:"".concat(e.palette.geoViewColor.grey.dark[900]," !important"),color:e.palette.geoViewColor.grey.light[900],fontSize:14,fontWeight:400,margin:0,padding:"0 12px",height:60,width:"100%",order:2},"& .MuiCardContent-root":{order:1,height:190,position:"relative",padding:0,"&:last-child":{padding:0},"& .basemapCardThumbnail":{position:"absolute",height:"100%",width:"100%",objectFit:"cover",top:0,left:0},"& .basemapCardThumbnailOverlay":{display:"block",height:"100%",width:"100%",position:"absolute",backgroundColor:e.palette.geoViewColor.grey.lighten(.5,.85),transition:"all 0.3s ease-in-out"}},"&:hover":{cursor:"pointer",borderColor:e.palette.geoViewColor.primary.main,"& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:e.palette.geoViewColor.grey.lighten(.5,.55)}}},"&.active":{borderColor:e.palette.geoViewColor.primary.light[200],"& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:"transparent"}},"&:hover":{borderColor:"rgba(255,255,255,0.75)","& .MuiCardContent-root":{"& .basemapCardThumbnailOverlay":{backgroundColor:"rgba(0,0,0,0)"}}}}}}}(s.useTheme()),x=m([]),I=(0,f.A)(x,2),j=I[0],B=I[1],A=m(""),k=(0,f.A)(A,2),S=k[0],T=k[1],L=m(t.canSwichProjection),N=(0,f.A)(L,1)[0],M=t.supportedProjections.map((function(e){return null==e?void 0:e.projectionCode}))||[],O=(0,v.HA)(),z=m(O),F=(0,f.A)(z,2),q=F[0],R=F[1],U=(0,C.t)();function $(e,a,t){for(var n=[],i=0;i<e.length;i++){var s,o,p,l,d,c=e[i];if("transport"===c)if(null!==(s=r.basemap.basemapsList[a].transport)&&void 0!==s&&s.url)n.push((null===(o=r.basemap.basemapsList[a].transport)||void 0===o?void 0:o.url).replace("{z}","8").replace("{y}",3978===a?"285":"91").replace("{x}",3978===a?"268":"74"));if("simple"===c)null!==(p=r.basemap.basemapsList[a].simple)&&void 0!==p&&p.url&&n.push(r.basemap.basemapsList[a].simple.url.replace("{z}","8").replace("{y}","285").replace("{x}","268"));if("shaded"===c)null!==(l=r.basemap.basemapsList[a].shaded)&&void 0!==l&&l.url&&n.push(r.basemap.basemapsList[a].shaded.url.replace("{z}","8").replace("{y}","285").replace("{x}","268"));if("label"===c)null!==(d=r.basemap.basemapsList[a].label)&&void 0!==d&&d.url&&n.push(r.basemap.basemapsList[a].label.url.replaceAll("xxxx","en"===t?"CBMT":"CBCT").replace("{z}","8").replace("{y}",3978===a?"285":"91").replace("{x}",3978===a?"268":"74"));"osm"===c&&n.push("https://tile.openstreetmap.org/0/0/0.png")}return n}function E(e){var a="",t="";return e.includes("transport")?(a=i.utilities.core.getLocalizedMessage("basemapPanel.info.transport.name",U),t=i.utilities.core.getLocalizedMessage("basemapPanel.info.transport.description",U)):e.includes("simple")?a=i.utilities.core.getLocalizedMessage("basemapPanel.info.simple.name",U):e.includes("shaded")?(a=i.utilities.core.getLocalizedMessage("basemapPanel.info.shaded.name",U),t=i.utilities.core.getLocalizedMessage("basemapPanel.info.shaded.description",U)):e.includes("osm")?a=i.utilities.core.getLocalizedMessage("basemapPanel.info.osm.name",U):e.includes("nogeom")&&(a=i.utilities.core.getLocalizedMessage("basemapPanel.info.nogeom.name",U)),e.includes("label")&&(a="".concat(a," ").concat(i.utilities.core.getLocalizedMessage("basemapPanel.info.label.name",U))),{name:a,description:t}}var V=function(e){var a=j.find((function(a){return a.basemapId===e}));void 0!==a&&(r.basemap.setBasemap(a),T(e))},G=function(){var e=(0,h.A)(y().mark((function e(n){var r,s,o,p,d,c;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=(0,l.NK)(t.supportedProjections.find((function(e){return e.projectionCode===n}))),s=!1,B([]),o=y().mark((function e(){var t,o;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=r.customBasemaps[p],(o=i.maps[a].basemap.createCustomBasemap(t,n))&&B((function(e){return[].concat((0,b.A)(e),[o])})),o&&0===p&&""===S&&(V(o.basemapId),s=!0);case 4:case"end":return e.stop()}}),e)})),p=0;case 5:if(!(p<r.customBasemaps.length)){e.next=10;break}return e.delegateYield(o(),"t0",7);case 7:p++,e.next=5;break;case 10:d=y().mark((function e(){var t,o,p,l,d,u;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.coreBasemaps[c],e.next=3,i.maps[a].basemap.createCoreBasemap(t,n);case 3:(o=e.sent)&&(p=E(o.type.split("-")),l=p.name,d=p.description,o.thumbnailUrl=$(o.type.split("-"),O,U),o.name=l,o.description=d,B((function(e){return[].concat((0,b.A)(e),[o])}))),u="".concat(t.shaded?"shaded":"").concat(t.id).concat(t.labeled?"label":""),o&&u===S&&!s&&(V(S),s=!0);case 7:case"end":return e.stop()}}),e)})),c=0;case 12:if(!(c<r.coreBasemaps.length)){e.next=17;break}return e.delegateYield(d(),"t1",14);case 14:c++,e.next=12;break;case 17:s||V(j[0]);case 18:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return g((function(){G(q)}),[U]),(0,P.jsxs)(u,{sx:w.basemapCard,children:[N&&(0,P.jsx)(d,{fullWidth:!0,labelId:"projection-label",value:q,onChange:function(e){var a=e.target.value;V("nogeom"),R(a),G(a),r.setProjection(a)},label:"Projection",style:{display:t.canSwichProjection?"flex":"none",marginBottom:"8px"},inputLabel:{id:"projection-label"},menuItems:M.map((function(e){return{key:e,item:{value:e,children:"EPSG:".concat(e)}}})),variant:"standard"}),j.map((function(e){return(0,P.jsx)(c,{tabIndex:0,className:e.basemapId===S?"active":"",onClick:function(){return V(e.basemapId)},onKeyPress:function(){return V(e.basemapId)},title:e.name,contentCard:(0,P.jsxs)(P.Fragment,{children:["string"==typeof e.thumbnailUrl&&(0,P.jsx)("img",{src:e.thumbnailUrl,alt:e.altText,className:"basemapCardThumbnail"}),Array.isArray(e.thumbnailUrl)&&e.thumbnailUrl.map((function(a,t){return(0,P.jsx)("img",{src:a,alt:e.altText,className:"basemapCardThumbnail"},t)})),(0,P.jsx)("div",{className:e.basemapId!==S?"basemapCardThumbnailOverlay":""})]})},e.basemapId)}))]})}const x=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Basemap Panel Schema","type":"object","version":1,"comments":"Configuration for GeoView basemap panel package.","additionalProperties":false,"definitions":{"basemapNameNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The display name of the layer."},"basemapDescriptionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap description."},"thumbnailUrlNode":{"type":"object","properties":{"en":{"type":"array","uniqueItems":true,"items":{"type":"string"}},"fr":{"type":"array","uniqueItems":true,"items":{"type":"string"}}},"description":"Basemap thumbnail urls."},"basemapLayerUrlNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The service endpoint of the basemap layer."},"basemapAttributionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap attribution text."},"basemapLayersNode":{"type":"object","properties":{"basemapId":{"type":"string","description":"the id of the basmap layer."},"url":{"$ref":"#/definitions/basemapLayerUrlNode"},"opacity":{"type":"number","description":"the opacity of this layer.","default":0}},"additionalItems":false,"required":["basemapId","url"]},"basemap":{"type":"object","properties":{"basemapId":{"type":"string","description":"the basemap id","enum":["transport","simple","shaded","osm","nogeom"]},"shaded":{"type":"boolean","description":"if a shaded layer should be included with this basemap.","default":false},"labeled":{"type":"boolean","description":"if labels should be enabled in this basemap.","default":false}},"additionalProperties":false,"required":["basemapId","shaded","labeled"]},"customBasemap":{"type":"object","properties":{"basemapId":{"type":"string","description":"the basemap id."},"name":{"$ref":"#/definitions/basemapNameNode"},"description":{"$ref":"#/definitions/basemapDescriptionNode"},"thumbnailUrl":{"$ref":"#/definitions/thumbnailUrlNode"},"layers":{"type":"array","description":"a list of basemap layers","items":{"$ref":"#/definitions/basemapLayersNode"},"minItems":1},"attribution":{"$ref":"#/definitions/basemapAttributionNode"},"zoomLevels":{"type":"object","description":"Zoom levels for the basemap","properties":{"min":{"type":"integer","minimum":0,"maximum":24,"default":0},"max":{"type":"integer","minimum":0,"maximum":24,"default":24}},"additionalProperties":false,"required":["min","max"]}},"additionalProperties":false,"required":["basemapId","name","description","layers"]}},"properties":{"isOpen":{"type":"boolean","description":"Specifies whether the basemap panel is initially open or closed","default":false},"canSwichProjection":{"type":"boolean","description":"Allow the user to switch projection from the basemap panel.","default":true},"supportedProjections":{"type":"array","items":{"type":"object","properties":{"projectionCode":{"type":"integer","enum":[3978,3857],"description":"Default projection to load on start."},"customBasemaps":{"type":"array","description":"A list of custom basemaps.","items":{"$ref":"#/definitions/customBasemap"},"minItems":0},"coreBasemaps":{"type":"array","description":"A list of basemaps available in the core to show in the panel.","items":{"$ref":"#/definitions/basemap"},"minItems":1}}},"minItems":1,"required":["coreBasemaps","customBasemaps"]},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}},"required":["canSwichProjection","supportedProjections","suportedLanguages"]}'),I=JSON.parse('{"isOpen":false,"canSwichProjection":false,"supportedProjections":[{"projectionCode":3978,"coreBasemaps":[{"basemapId":"transport","shaded":true,"labeled":true},{"basemapId":"transport","shaded":true,"labeled":false},{"basemapId":"osm","shaded":true,"labeled":false},{"basemapId":"simple","shaded":true,"labeled":false},{"basemapId":"shaded","shaded":true,"labeled":false},{"basemapId":"nogeom","shaded":false,"labeled":false}],"customBasemaps":[]},{"projectionCode":3857,"coreBasemaps":[{"basemapId":"transport","shaded":true,"labeled":true},{"basemapId":"transport","shaded":true,"labeled":false},{"basemapId":"osm","shaded":true,"labeled":false},{"basemapId":"simple","shaded":true,"labeled":false},{"basemapId":"shaded","shaded":true,"labeled":false},{"basemapId":"nogeom","shaded":false,"labeled":false}],"customBasemaps":[]}],"suportedLanguages":["en","fr"]}');function j(e,a,t){return a=(0,s.A)(a),(0,i.A)(e,B()?Reflect.construct(a,t||[],(0,s.A)(e).constructor):a.apply(e,t))}function B(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(B=function(){return!!e})()}var A=function(e){function a(){var e;(0,n.A)(this,a);for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];return e=j(this,a,[].concat(r)),(0,p.A)(e,"schema",(function(){return x})),(0,p.A)(e,"defaultConfig",(function(){return(0,l.NK)(I)})),(0,p.A)(e,"translations",(0,l.NK)({en:{basemapPanel:{title:"Basemaps",info:{transport:{name:"Transport",description:"The Canada Base Map - Transportation (CBMT). This web mapping service provides spatial reference context with an emphasis on transportation networks.\n                          It is designed especially for use as a background map in a web mapping application or geographic information system (GIS)."},simple:{name:"Simple"},shaded:{name:"Shaded relief",description:"The Canada Base Map - Elevation (CBME) web mapping services of the Earth Sciences Sector at Natural Resources Canada,\n                          is intended primarily for online mapping application users and developers"},osm:{name:"Open Street Maps"},nogeom:{name:"No geometry"},label:{name:"with labels"}}}},fr:{basemapPanel:{title:"Fond de carte",info:{transport:{name:"Transport",description:"Carte de base du Canada - Transport (CBCT). Ce service de cartographie Web offre un contexte de référence spatiale axé sur les réseaux de transport.\n                          Il est particulièrement conçu pour être utilisé comme fond de carte dans une application cartographique Web ou un système d'information géographique (SIG)."},simple:{name:"Simple"},shaded:{name:"Relief ombré",description:"Les services de cartographie Web de la carte de base du Canada - élévation (CBCE) du Secteur des sciences de la\n                          Terre de Ressources naturelles Canada sont destinés principalement aux utilisateurs et aux développeurs d'applications de cartographie en ligne."},osm:{name:"Carte - Open Street Maps"},nogeom:{name:"Pas de géométrie"},label:{name:"avec étiquettes"}}}}})),(0,p.A)(e,"onCreateContent",(function(){return(0,P.jsx)(w,{mapId:e.pluginProps.mapId,config:e.configObj||{}})})),e}return(0,o.A)(a,e),(0,r.A)(a,[{key:"onCreateButtonProps",value:function(){return{id:"".concat(this.pluginProps.mapId,"-basemapPanelButton"),tooltip:"basemapPanel.title",tooltipPlacement:"right",children:(0,P.jsx)(m.A,{}),visible:!0}}},{key:"onCreateContentProps",value:function(){var e;return{title:"basemapPanel.title",icon:(0,P.jsx)(m.A,{}),width:350,status:null===(e=this.configObj)||void 0===e?void 0:e.isOpen}}},{key:"onRemoved",value:function(){this.api.maps[this.pluginProps.mapId].basemap.basemaps=[],this.api.maps[this.pluginProps.mapId].basemap.loadDefaultBasemaps()}}])}(u);window.geoviewPlugins=window.geoviewPlugins||{},window.geoviewPlugins["basemap-panel"]=(0,l.KX)(A)}},e=>{var a;a=85340,e(e.s=a)}]);
//# sourceMappingURL=geoview-basemap-panel.js.map