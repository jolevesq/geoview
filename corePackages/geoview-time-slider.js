/*! Package:geoview-time-slider: 0.1.0 - "7b4f1c770b992acbb1a68a22da161dc281c64e75" - 2024-04-09T17:36:31.526Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[405],{63253:(e,t,i)=>{i.d(t,{b:()=>f});var r=i(73676),n=i(92338),o=i(91609),l=i(43703),a=i(79524),s=i(19830),c=i(43238),u=i(53327);function d(e,t,i){return t=(0,l.A)(t),(0,o.A)(e,p()?Reflect.construct(t,i||[],(0,l.A)(e).constructor):t.apply(e,i))}function p(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(p=function(){return!!e})()}var f=function(e){function t(){var e;(0,r.A)(this,t);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return e=d(this,t,[].concat(n)),(0,s.A)(e,"value",void 0),(0,s.A)(e,"footerProps",void 0),e}return(0,a.A)(t,e),(0,n.A)(t,[{key:"onCreateContentProps",value:function(){return{id:"some-id",value:this.value,label:"Some label",content:"<div>Content for Footer plugin on map id ".concat(this.pluginProps.mapId," goes here...</div>")}}},{key:"onAdd",value:function(){var e,t;this.value=null===(e=this.map())||void 0===e?void 0:e.footerBarApi.tabs.length,this.footerProps=this.onCreateContentProps(),null===(t=this.map())||void 0===t||t.footerBarApi.createTab(this.footerProps)}},{key:"onRemove",value:function(){var e;this.value&&(null===(e=this.map())||void 0===e||e.footerBarApi.removeTab(this.footerProps.id))}},{key:"onSelected",value:function(){u.vF.logTraceCore("FOOTER-PLUGIN - onSelected")}}])}(c.G)},492:(e,t,i)=>{var r=i(92338),n=i(73676),o=i(91609),l=i(43703),a=i(79524),s=i(19830),c=i(60996),u=i(13461),d=i(57695),p=i(63253),f=i(71901),m=i(67058),g=i(62519),h=i(21838),v=i(22745),y=i(31836),x=i(53327),S=i(15528),w=i(30450),b=i(12115),j=i(49290),A=i(26166),D=i(20027),P=i(13149),L=i(48960),T=i(29993),I=i(61923),k=i(88113),O=i(82078),C=i(85366),E=i(50716),F=i(80678);const R=["className","children","classes","IconComponent","input","inputProps","variant"],M=["root"],V=(0,F.jsx)(O.A,{}),z=A.forwardRef((function(e,t){const i=(0,C.A)({name:"MuiNativeSelect",props:e}),{className:r,children:n,classes:o={},IconComponent:l=k.A,input:a=V,inputProps:s}=i,c=(0,j.A)(i,R),u=(0,I.A)(),d=(0,T.A)({props:i,muiFormControl:u,states:["variant"]}),p=(e=>{const{classes:t}=e;return(0,P.A)({root:["root"]},E.w,t)})((0,b.A)({},i,{classes:o})),f=(0,j.A)(o,M);return(0,F.jsx)(A.Fragment,{children:A.cloneElement(a,(0,b.A)({inputComponent:L.Ay,inputProps:(0,b.A)({children:n,classes:f,IconComponent:l,variant:d.variant,type:void 0},s,a?a.props.inputProps:{}),ref:t},c,{className:(0,D.A)(p.root,a.props.className,r)}))})}));z.muiName="Select";const N=z;var B=i(3807),H=function(e){return{panelHeaders:{fontSize:e.palette.geoViewFontSize.lg,fontWeight:"600",marginBottom:"20px"},rightPanelContainer:{border:"2px solid ".concat(e.palette.primary.main),borderRadius:"5px",backgroundColor:e.palette.common.white},rightPanelBtnHolder:{marginTop:"20px",marginBottom:"9px",boxShadow:"0px 12px 9px -13px #E0E0E0"},timeSliderInstructionsTitle:{fontSize:e.palette.geoViewFontSize.lg,fontWeight:"600",lineHeight:"1.5em"},timeSliderInstructionsBody:{fontSize:"1rem"}}};function U(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function G(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?U(Object(i),!0).forEach((function(t){(0,s.A)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):U(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function Q(e){x.vF.logTraceRender("geoview-time-slider/time-slider",e);var t=window.cgpv,i=e.config,r=e.layerPath,n=e.mapId,o=t.api,l=t.react,a=t.ui,s=l.useState,c=l.useRef,u=l.useEffect,d=l.useCallback,p=a.elements,g=p.Grid,v=p.Slider,b=p.Typography,j=p.Checkbox,A=p.Tooltip,D=p.IconButton,P=p.LockIcon,L=p.LockOpenIcon,T=p.ArrowLeftIcon,I=p.PlayArrowIcon,k=p.PauseIcon,O=p.ArrowRightIcon,C=p.SwitchRightIcon,E=p.SwitchLeftIcon,R=(0,m.A)(),M=H(R),V=s(!1),z=(0,f.A)(V,2),U=z[0],Q=z[1],q=c(),J=c(),K=c(),Y=(0,h.Gg)(),W=Y.setTitle,_=Y.setDefaultValue,X=Y.setDescription,$=Y.setValues,Z=Y.setLocked,ee=Y.setReversed,te=Y.setDelay,ie=Y.setFiltering,re=(0,y.t)(),ne=(0,h.ky)()[r],oe=ne.title,le=ne.description,ae=ne.name,se=ne.defaultValue,ce=ne.discreteValues,ue=ne.range,de=ne.minAndMax,pe=ne.field,fe=ne.fieldAlias,me=ne.filtering,ge=ne.singleHandle,he=ne.values,ve=ne.delay,ye=ne.locked,xe=ne.reversed;u((function(){var e;x.vF.logTraceUseEffect("TIME-SLIDER - mount");var t=null==i||null===(e=i.sliders)||void 0===e?void 0:e.find((function(e){return e.layerPaths.includes(r)}));void 0===oe&&W(r,(0,B.getLocalizedValue)(null==t?void 0:t.title,re)||""),void 0===le&&X(r,(0,B.getLocalizedValue)(null==t?void 0:t.description,re)||""),void 0===ye&&Z(r,void 0!==(null==t?void 0:t.locked)&&(null==t?void 0:t.locked)),void 0===xe&&ee(r,void 0!==(null==t?void 0:t.reversed)&&(null==t?void 0:t.reversed)),void 0===se&&_(r,(null==t?void 0:t.defaultValue)||"")}),[]),u((function(){var e;x.vF.logTraceUseEffect("TIME-SLIDER - config layerPath",i,r);var t=null==i||null===(e=i.sliders)||void 0===e?void 0:e.find((function(e){return e.layerPaths.includes(r)}));null!=t&&t.defaultValue&&(Array.isArray(null==t?void 0:t.defaultValue)?$(r,[new Date(null==t?void 0:t.defaultValue[0]).getTime(),new Date(null==t?void 0:t.defaultValue[1]).getTime()]):ue.includes(null==t?void 0:t.defaultValue)?$(r,[new Date(null==t?void 0:t.defaultValue).getTime()]):$(r,[new Date(ue[0]).getTime()]))}),[i,r,ue,ie,$]);var Se,we=ue.map((function(e){return new Date(e).getTime()})),be=de[1]-de[0],je=new Date(de[1]).getDate()-new Date(de[0]).getDate(),Ae=new Date(de[1]).getFullYear()-new Date(de[0]).getFullYear();0===je&&be<864e5?Se="day":0===Ae&&(Se="year");var De=[];if(ue.length<4&&ce){var Pe=(new Date(ue[ue.length-1]).getTime()-new Date(ue[0]).getTime())/4;De=[de[0],de[0]+Pe,de[0]+2*Pe,de[0]+3*Pe,de[1]]}else De=ue.length<6||ge?we:[de[0],new Date(ue[Math.round(ue.length/4)]).getTime(),new Date(ue[Math.round(ue.length/2)]).getTime(),new Date(ue[Math.round(3*ue.length/4)]).getTime(),de[1]];for(var Le=[],Te=0;Te<De.length;Te++)Le.push({value:De[Te],label:Se?"".concat("day"===Se?new Date(De[Te]).toTimeString().split(" ")[0]:new Date(De[Te]).toISOString().slice(5,10)):new Date(De[Te]).toISOString().slice(0,10)});function Ie(){if(ge&&!ce){var e,t=we.indexOf(he[0]);e=we[t]===de[0]?we.length-1:t-1,$(r,[we[e]])}else if(ge){var i=(de[1]-de[0])/20,n=he[0]-i<de[0]?de[1]:he[0]-i;$(r,[n])}else{var o=(0,f.A)(he,2),l=o[0],a=o[1];if(!K.current){if(a-l>(de[1]-de[0])/5)return K.current=(de[1]-de[0])/5,void $(r,[a-K.current,a]);K.current=a-l}if(ye&&xe){if(l===de[0]&&(l=a),(l-=K.current)<de[0])l=(0,f.A)(de,1)[0]}else if(ye){if((a-=K.current)<l&&(a=l),a===l)a=(0,f.A)(de,2)[1]}else{if(a>J.current&&l===J.current?a=J.current:a-=K.current,a<=de[0])a=(0,f.A)(de,2)[1];if((l=a-K.current)<de[0])l=(0,f.A)(de,1)[0];l<J.current&&a>J.current&&(l=J.current)}$(r,[l,a])}}function ke(){if(ge&&!ce){var e,t=we.indexOf(he[0]);e=we[t]===de[1]?0:t+1,$(r,[we[e]])}else if(ge){var i=(de[1]-de[0])/20,n=he[0]+i>de[1]?de[0]:he[0]+i;$(r,[n])}else{var o=(0,f.A)(he,2),l=o[0],a=o[1];if(!K.current){if(a-l>(de[1]-de[0])/5)return K.current=(de[1]-de[0])/5,void $(r,[l,l+K.current]);K.current=a-l}if(ye&&xe){if((l+=K.current)>=a)l=(0,f.A)(de,1)[0]}else if(ye){if(a===de[1]&&(a=l),(a+=K.current)>de[1])a=(0,f.A)(de,2)[1]}else{if(l<J.current&&a===J.current?l=J.current:l+=K.current,l>=de[1])l=(0,f.A)(de,1)[0];if((a=l+K.current)>de[1])a=(0,f.A)(de,2)[1];a>J.current&&l<J.current&&(a=J.current)}$(r,[l,a])}}function Oe(){return xe?ye?o.utilities.core.getLocalizedMessage("timeSlider.slider.unlockRight",re):o.utilities.core.getLocalizedMessage("timeSlider.slider.lockRight",re):ye?o.utilities.core.getLocalizedMessage("timeSlider.slider.unlockLeft",re):o.utilities.core.getLocalizedMessage("timeSlider.slider.lockLeft",re)}u((function(){x.vF.logTraceUseEffect("TIME-SLIDER - values filtering",he,me),U&&(q.current=xe?window.setTimeout((function(){return Ie()}),ve):window.setTimeout((function(){return ke()}),ve))}),[he,me,xe,ye]),u((function(){x.vF.logTraceUseEffect("TIME-SLIDER - isPlaying",U),U&&(xe?Ie():ke())}),[U]);var Ce=d((function(e){x.vF.logTraceUseCallback("TIME-SLIDER - handleSliderChange",r),clearTimeout(q.current),Q(!1),K.current=void 0,$(r,e)}),[r,$]),Ee=d((function(e){return x.vF.logTraceUseCallback("TIME-SLIDER - handleLabelFormat",Se),"day"===Se?new Date(e).toTimeString().split(" ")[0].replace(/^0/,""):"year"===Se?new Date(e).toISOString().slice(5,10):new Date(e).toISOString().slice(0,10)}),[Se]);return(0,F.jsx)(g,{children:(0,F.jsxs)("div",{style:M.rightPanelContainer,children:[(0,F.jsxs)(g,{container:!0,sx:M.rightPanelBtnHolder,children:[(0,F.jsx)(g,{item:!0,xs:9,children:(0,F.jsxs)(b,{component:"div",sx:G(G({},M.panelHeaders),{},{paddingLeft:"20px",paddingTop:"10px"}),children:["".concat(oe||ae),void 0!==Se&&" (".concat("day"===Se?new Date(se).toLocaleDateString():new Date(se).getFullYear(),")")]})}),(0,F.jsx)(g,{item:!0,xs:3,children:(0,F.jsx)("div",{style:{textAlign:"right",marginRight:"25px"},children:(0,F.jsx)(A,{title:me?o.utilities.core.getLocalizedMessage("timeSlider.slider.disableFilter",re):o.utilities.core.getLocalizedMessage("timeSlider.slider.enableFilter",re),placement:"top",enterDelay:1e3,children:(0,F.jsx)(j,{checked:me,onChange:function(e,t){return ie(r,i=t),void(i||(clearInterval(q.current),Q(!1)));var i}})})})})]}),(0,F.jsx)(g,{item:!0,xs:12,children:(0,F.jsx)("div",{style:{textAlign:"center",paddingTop:"20px"},children:(0,F.jsx)(v,{sliderId:r,mapId:n,style:{width:"80%",color:"primary"},min:de[0],max:de[1],value:he,marks:Le,step:ce?.1:null,onChangeCommitted:Ce,onValueDisplay:Ee},he[1]?he[1]+he[0]:he[0])})}),(0,F.jsx)(g,{item:!0,xs:12,children:(0,F.jsxs)("div",{style:{textAlign:"center",paddingTop:"20px"},children:[!ge&&(0,F.jsx)(D,{className:"style1","aria-label":Oe(),tooltip:Oe(),tooltipPlacement:"top",onClick:function(){return clearTimeout(q.current),void Z(r,!ye)},children:ye?(0,F.jsx)(P,{}):(0,F.jsx)(L,{})}),(0,F.jsx)(D,{className:"style1","aria-label":o.utilities.core.getLocalizedMessage("timeSlider.slider.back",re),tooltip:"timeSlider.slider.back",tooltipPlacement:"top",disabled:U||!me,onClick:function(){return J.current=xe?he[1]:he[0],void Ie()},children:(0,F.jsx)(T,{})}),(0,F.jsx)(D,{className:"style1","aria-label":U?o.utilities.core.getLocalizedMessage("timeSlider.slider.pauseAnimation",re):o.utilities.core.getLocalizedMessage("timeSlider.slider.playAnimation",re),tooltip:U?"timeSlider.slider.pauseAnimation":"timeSlider.slider.playAnimation",tooltipPlacement:"top",disabled:!me,onClick:function(){return clearTimeout(q.current),J.current=xe?he[1]:he[0],void Q(!U)},children:U?(0,F.jsx)(k,{}):(0,F.jsx)(I,{})}),(0,F.jsx)(D,{className:"style1","aria-label":o.utilities.core.getLocalizedMessage("timeSlider.slider.forward",re),tooltip:"timeSlider.slider.forward",tooltipPlacement:"top",disabled:U||!me,onClick:function(){return e=(0,f.A)(he,1),J.current=e[0],void ke();var e},children:(0,F.jsx)(O,{})}),(0,F.jsx)(D,{className:"style1","aria-label":o.utilities.core.getLocalizedMessage("timeSlider.slider.changeDirection",re),tooltip:"timeSlider.slider.changeDirection",tooltipPlacement:"top",onClick:function(){return clearTimeout(q.current),ee(r,!xe),void(U&&(xe?Ie():ke()))},children:xe?(0,F.jsx)(C,{}):(0,F.jsx)(E,{})}),(0,F.jsxs)(S.A,{sx:{width:"150px"},children:[(0,F.jsx)(w.A,{variant:"standard",children:o.utilities.core.getLocalizedMessage("timeSlider.slider.timeDelay",re)}),(0,F.jsxs)(N,{defaultValue:ve,inputProps:{name:"timeDelay",onChange:function(e){return function(e){te(r,e.target.value)}(e)}},children:[(0,F.jsx)("option",{value:500,children:"0.5s"}),(0,F.jsx)("option",{value:750,children:"0.75s"}),(0,F.jsx)("option",{value:1e3,children:"1.0s"}),(0,F.jsx)("option",{value:1500,children:"1.5s"}),(0,F.jsx)("option",{value:2e3,children:"2.0s"}),(0,F.jsx)("option",{value:3e3,children:"3.0s"}),(0,F.jsx)("option",{value:5e3,children:"5.0s"})]})]})]})}),le&&(0,F.jsx)(g,{item:!0,xs:12,children:(0,F.jsx)(b,{component:"div",sx:{px:"20px",py:"5px"},children:le})}),fe&&(0,F.jsx)(g,{item:!0,xs:12,children:(0,F.jsx)(b,{component:"div",sx:{px:"20px",py:"5px"},children:"".concat(fe," (").concat(pe,")")})})]})})}function q(e){var t=e.mapId,i=e.configObj,r=window.cgpv,n=r.api,o=r.react,l=o.useState,a=o.useCallback,s=o.useMemo,c=o.useEffect,u=(0,m.A)(),p=H(u),S=l(),w=(0,f.A)(S,2),b=w[0],j=w[1],A=(0,v.wE)(),D=(0,h.ky)(),P=(0,y.t)(),L=a((function(e){x.vF.logTraceUseCallback("TIME-SLIDER-PANEL - handleLayerList"),j(e.layerPath)}),[]),T=function(e){return e.filtering?1===e.values.length?new Date(e.values[0]).toISOString().slice(0,19):"".concat(new Date(e.values[0]).toISOString().slice(0,19)," - ").concat(new Date(e.values[1]).toISOString().slice(0,19)):null},I=s((function(){x.vF.logTraceUseMemo("TIME-SLIDER-PANEL - memoLayersList",D);return A.map((function(e){return{layerPath:e,timeSliderLayerInfo:D[e]}})).filter((function(e){return e&&e.timeSliderLayerInfo})).map((function(e){return{layerName:e.timeSliderLayerInfo.name,layerPath:e.layerPath,layerFeatures:T(e.timeSliderLayerInfo),tooltip:(t=e.timeSliderLayerInfo,(0,F.jsxs)(d.Box,{sx:{display:"flex",alignContent:"center","& svg ":{width:"0.75em",height:"0.75em"}},children:[t.name,t.filtering&&": ".concat(T(t))]})),layerStatus:"loaded",queryStatus:"processed"};var t}))}),[D,A]);return c((function(){x.vF.logTraceUseEffect("TIME-SLIDER-PANEL - memoLayersList",I,b),b&&!I.map((function(e){return e.layerPath})).includes(b)&&j("")}),[I,b]),(0,F.jsxs)(g.PE,{selectedLayerPath:b,onLayerListClicked:L,layerList:I,children:[b&&(0,F.jsx)(Q,{mapId:t,config:i,layerPath:b},b),!b&&(0,F.jsxs)(d.Paper,{sx:{padding:"2rem"},children:[(0,F.jsx)(d.Typography,{variant:"h3",gutterBottom:!0,sx:p.timeSliderInstructionsTitle,children:n.utilities.core.getLocalizedMessage("timeSlider.instructions",P)}),(0,F.jsx)(d.Typography,{component:"p",sx:p.timeSliderInstructionsBody,children:n.utilities.core.getLocalizedMessage("timeSlider.instructions",P)})]})]})}const J=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Time Slider Config Schema","type":"object","version":1,"comments":"Configuration for GeoView time slider package.","additionalProperties":false,"properties":{"sliders":{"type":"array","items":{"type":"object","properties":{"title":{"type":"object","properties":{"en":{"type":"string","default":"Time slider title","description":"The English version of the string."},"fr":{"type":"string","default":"Titre du curseur temporel","description":"The French version of the string. "}}},"description":{"type":"object","properties":{"en":{"type":"string","default":"Time slider description","description":"The English version of the string."},"fr":{"type":"string","default":"Description du curseur temporel","description":"The French version of the string. "}}},"locked":{"type":"boolean","default":false,"description":"Lock handle"},"reversed":{"type":"boolean","default":false,"description":"Reverse direction of the slider animation"},"defaultValue":{"type":"string","default":false,"description":"Initial value on slider"}}}},"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1}},"required":["sliders","suportedLanguages"]}'),K=JSON.parse('{"suportedLanguages":["en","fr"],"sliders":[]}');function Y(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function W(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(i),!0).forEach((function(t){(0,s.A)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Y(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function _(e,t,i){return t=(0,l.A)(t),(0,o.A)(e,X()?Reflect.construct(t,i||[],(0,l.A)(e).constructor):t.apply(e,i))}function X(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(X=function(){return!!e})()}var $=function(e){function t(){var e;(0,n.A)(this,t);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return e=_(this,t,[].concat(r)),(0,s.A)(e,"schema",(function(){return J})),(0,s.A)(e,"defaultConfig",(function(){return(0,c.NK)(K)})),(0,s.A)(e,"translations",(0,c.NK)({en:{timeSlider:{title:"Time Slider",panel:{noLayers:"No layers with temporal data"},slider:{unlockRight:"Unlock right handle",unlockLeft:"Unlock left handle",lockRight:"Lock right handle",lockLeft:"Lock left handle",disableFilter:"Disable Filtering",enableFilter:"Enable Filtering",pauseAnimation:"Pause animation",playAnimation:"Play animation",back:"Back",forward:"Forward",changeDirection:"Change animation direction",timeDelay:"Animation time delay"},instructions:"Time Slider Instructions"}},fr:{timeSlider:{title:"Curseur Temporel",panel:{noLayers:"Pas de couches avec des données temporelles"},slider:{unlockRight:"Déverrouiller la poignée droite",unlockLeft:"Déverrouiller la poignée gauche",lockRight:"Verrouiller la poignée droite",lockLeft:"Verrouiller la poignée gauche",disableFilter:"Désactiver le filtrage",enableFilter:"Activer le filtrage",pauseAnimation:"Pause de l'animation",playAnimation:"Jouer l'animation",back:"Retour",forward:"En avant",changeDirection:"Changer la direction de l'animation",timeDelay:"Délai d'animation"},instructions:"Instructions Curseur Temporel"}}})),(0,s.A)(e,"onCreateContentProps",(function(){return e.configObj.sliders.forEach((function(t){if(t.temporalDimension){var i={field:t.temporalDimension.field,default:t.temporalDimension.default,unitSymbol:t.temporalDimension.unitSymbol,nearestValues:t.temporalDimension.nearestValues,range:u.FHQ.utilities.date.createRangeOGC(t.temporalDimension.range),singleHandle:t.temporalDimension.singleHandle};u.FHQ.maps[e.pluginProps.mapId].layer.geoviewLayer(t.layerPaths[0]).setTemporalDimension(t.layerPaths[0],i)}if(t.defaultValue){var r=t.layerPaths[0],n=u.FHQ.maps[e.pluginProps.mapId].layer.geoviewLayer(r).layerTemporalDimension[r];u.FHQ.maps[e.pluginProps.mapId].layer.geoviewLayer(r).setTemporalDimension(r,W(W({},n),{},{default:t.defaultValue}))}})),{id:"time-slider",value:e.value,label:"timeSlider.title",icon:(0,F.jsx)(d.TimeSliderIcon,{}),content:(0,F.jsx)(q,{mapId:e.pluginProps.mapId,configObj:e.configObj})}})),e}return(0,a.A)(t,e),(0,r.A)(t)}(p.b);window.geoviewPlugins=window.geoviewPlugins||{},window.geoviewPlugins["time-slider"]=(0,c.KX)($)}},e=>{var t;t=492,e(e.s=t)}]);
//# sourceMappingURL=geoview-time-slider.js.map