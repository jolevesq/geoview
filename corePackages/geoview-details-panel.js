/*! Package:geoview-details-panel: 0.1.0 - "93cfafb4f2f017f356f2280aee39365ac03c7275" - 2023-05-25T13:34:49.528Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[138],{28954:e=>{
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,o){for(var u,a,i=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var l in u=Object(arguments[c]))r.call(u,l)&&(i[l]=u[l]);if(t){a=t(u);for(var f=0;f<a.length;f++)n.call(u,a[f])&&(i[a[f]]=u[a[f]])}}return i}},80881:(e,t,r)=>{
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
r(28954);var n=r(46393),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var u=Symbol.for;o=u("react.element"),t.Fragment=u("react.fragment")}var a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var n,u={},l=null,f=null;for(n in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(f=t.ref),t)i.call(t,n)&&!c.hasOwnProperty(n)&&(u[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===u[n]&&(u[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:f,props:u,_owner:a.current}}t.jsx=l,t.jsxs=l},86956:(e,t,r)=>{
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var n=r(28954),o=60103,u=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var a=60109,i=60110,c=60112;t.Suspense=60113;var l=60115,f=60116;if("function"==typeof Symbol&&Symbol.for){var s=Symbol.for;o=s("react.element"),u=s("react.portal"),t.Fragment=s("react.fragment"),t.StrictMode=s("react.strict_mode"),t.Profiler=s("react.profiler"),a=s("react.provider"),i=s("react.context"),c=s("react.forward_ref"),t.Suspense=s("react.suspense"),l=s("react.memo"),f=s("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v={};function m(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||d}function h(){}function b(e,t,r){this.props=e,this.context=t,this.refs=v,this.updater=r||d}m.prototype.isReactComponent={},m.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},m.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=m.prototype;var g=b.prototype=new h;g.constructor=b,n(g,m.prototype),g.isPureReactComponent=!0;var _={current:null},w=Object.prototype.hasOwnProperty,O={key:!0,ref:!0,__self:!0,__source:!0};function S(e,t,r){var n,u={},a=null,i=null;if(null!=t)for(n in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(a=""+t.key),t)w.call(t,n)&&!O.hasOwnProperty(n)&&(u[n]=t[n]);var c=arguments.length-2;if(1===c)u.children=r;else if(1<c){for(var l=Array(c),f=0;f<c;f++)l[f]=arguments[f+2];u.children=l}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===u[n]&&(u[n]=c[n]);return{$$typeof:o,type:e,key:a,ref:i,props:u,_owner:_.current}}function E(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var j=/\/+/g;function P(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function Z(e,t,r,n,a){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var c=!1;if(null===e)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case o:case u:c=!0}}if(c)return a=a(c=e),e=""===n?"."+P(c,0):n,Array.isArray(a)?(r="",null!=e&&(r=e.replace(j,"$&/")+"/"),Z(a,t,r,"",(function(e){return e}))):null!=a&&(E(a)&&(a=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,r+(!a.key||c&&c.key===a.key?"":(""+a.key).replace(j,"$&/")+"/")+e)),t.push(a)),1;if(c=0,n=""===n?".":n+":",Array.isArray(e))for(var l=0;l<e.length;l++){var f=n+P(i=e[l],l);c+=Z(i,t,r,f,a)}else if(f=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof f)for(e=f.call(e),l=0;!(i=e.next()).done;)c+=Z(i=i.value,t,r,f=n+P(i,l++),a);else if("object"===i)throw t=""+e,Error(y(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return c}function k(e,t,r){if(null==e)return e;var n=[],o=0;return Z(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function C(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var R={current:null};function I(){var e=R.current;if(null===e)throw Error(y(321));return e}var N={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:_,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:k,forEach:function(e,t,r){k(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return k(e,(function(){t++})),t},toArray:function(e){return k(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error(y(143));return e}},t.Component=m,t.PureComponent=b,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N,t.cloneElement=function(e,t,r){if(null==e)throw Error(y(267,e));var u=n({},e.props),a=e.key,i=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,c=_.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(f in t)w.call(t,f)&&!O.hasOwnProperty(f)&&(u[f]=void 0===t[f]&&void 0!==l?l[f]:t[f])}var f=arguments.length-2;if(1===f)u.children=r;else if(1<f){l=Array(f);for(var s=0;s<f;s++)l[s]=arguments[s+2];u.children=l}return{$$typeof:o,type:e.type,key:a,ref:i,props:u,_owner:c}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:i,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=S,t.createFactory=function(e){var t=S.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:C}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return I().useCallback(e,t)},t.useContext=function(e,t){return I().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return I().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return I().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return I().useLayoutEffect(e,t)},t.useMemo=function(e,t){return I().useMemo(e,t)},t.useReducer=function(e,t,r){return I().useReducer(e,t,r)},t.useRef=function(e){return I().useRef(e)},t.useState=function(e){return I().useState(e)},t.version="17.0.2"},46393:(e,t,r)=>{e.exports=r(86956)},45202:(e,t,r)=>{e.exports=r(80881)},24406:(e,t,r)=>{var n=r(11265),o=r(15288),u=r(90187),a=r(57667),i=r(84772),c=r(24518),l=r(18148),f=r(36696),s=r(14588),p=r(46393),y=r(45202),d=window;function v(e){var t,r=e.mapId,n=e.buttonId,o=d.cgpv.api,u=(0,p.useState)([]),a=(0,s.Z)(u,2),i=a[0],c=a[1],l=(0,p.useState)(),v=(0,s.Z)(l,2),m=v[0],h=v[1],b=(0,p.useState)([]),g=(0,s.Z)(b,2),_=g[0],w=g[1],O=(0,p.useState)(null),S=(0,s.Z)(O,2),E=S[0],j=S[1],P=null===(t=o.map(r).appBarButtons.getAppBarButtonPanelById(void 0===n?"":n))||void 0===t?void 0:t.panel;return(0,p.useEffect)((function(){return o.event.on(o.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,f.gNW)(e)){var t=e.resultSets,n=[];Object.keys(t).forEach((function(e){var u=(0,f.dIw)(o.map(r).layer.registeredLayers[e].layerName,r),a=t[e];a.length>0&&n.push({layerPath:e,layerName:u,features:a})})),n.length>0?(c(n),null==P||P.open()):c([])}else c([])}),"".concat(r,"/$FeatureInfoLayerSet$")),o.event.on(o.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,(function(e){if((0,f.yp4)(e)){var t=e.coordinates;j(e.handlerName),w(t.lnglat)}else w([])}),r),function(){o.event.off(o.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,r),o.event.off(o.eventNames.MAP.EVENT_MAP_SINGLE_CLICK,r)}}),[]),(0,p.useEffect)((function(){h(o.map(r).details.createDetails(r,i,{mapId:r,location:_,backgroundStyle:"dark",singleColumn:!0,handlerName:E})),setTimeout((function(){o.event.emit((0,f.usG)(o.eventNames.MARKER_ICON.EVENT_MARKER_ICON_SHOW,E,_))}),800)}),[i,_]),(0,y.jsx)("div",{children:m})}const m=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Details Panel/Legend Config Schema","type":"object","version":1,"comments":"Configuration for GeoView layers package.","additionalProperties":false,"properties":{"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}},"required":["suportedLanguages"]}'),h=JSON.parse('{"suportedLanguages":["en","fr"]}');function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=(0,c.Z)(e);if(t){var o=(0,c.Z)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return(0,i.Z)(this,r)}}var g=window,_=function(e){(0,a.Z)(r,e);var t=b(r);function r(e,o){var a;return(0,n.Z)(this,r),a=t.call(this,e,o),(0,l.Z)((0,u.Z)(a),"schema",(function(){return m})),(0,l.Z)((0,u.Z)(a),"defaultConfig",(function(){return(0,f.ZQJ)(h)})),(0,l.Z)((0,u.Z)(a),"translations",(0,f.ZQJ)({en:{detailsPanel:"Details",nothing_found:"Nothing found",click_map:"Choose a point on the map to start",action_back:"Back"},fr:{detailsPanel:"Détails",nothing_found:"Aucun résultat",click_map:"Choisissez un point sur la carte pour commencer",action_back:"Retour"}})),(0,l.Z)((0,u.Z)(a),"added",(function(){var e,t,r=a.pluginProps.mapId,n=g.cgpv,o=n.api,u=n.ui.elements.DetailsIcon,i=o.map(r).displayLanguage,c={id:"detailsPanelButton",tooltip:a.translations[i].detailsPanel,tooltipPlacement:"right",children:(0,y.jsx)(u,{}),visible:!0},l={title:a.translations[i].detailsPanel,icon:'<i class="material-icons">details</i>',width:350};a.buttonPanel=o.map(r).appBarButtons.createAppbarPanel(c,l,null),null===(e=a.buttonPanel)||void 0===e||null===(t=e.panel)||void 0===t||t.changeContent((0,y.jsx)(v,{mapId:r,buttonId:c.id}))})),a.buttonPanel=null,a}return(0,o.Z)(r,[{key:"removed",value:function(){var e=this.pluginProps.mapId,t=g.cgpv.api;this.buttonPanel&&t.map(e).appBarButtons.removeAppbarPanel(this.buttonPanel.buttonPanelId)}}]),r}(f.Vw$);g.plugins=g.plugins||{},g.plugins["details-panel"]=(0,f.RFZ)(_)},84164:(e,t,r)=>{function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,{Z:()=>n})},90187:(e,t,r)=>{function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}r.d(t,{Z:()=>n})},11265:(e,t,r)=>{function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}r.d(t,{Z:()=>n})},15288:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(41207);function o(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(0,n.Z)(o.key),o)}}function u(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}},18148:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(41207);function o(e,t,r){return(t=(0,n.Z)(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},24518:(e,t,r)=>{function n(e){return n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}r.d(t,{Z:()=>n})},57667:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(74133);function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&(0,n.Z)(e,t)}},84772:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(48679),o=r(90187);function u(e,t){if(t&&("object"===(0,n.Z)(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return(0,o.Z)(e)}},74133:(e,t,r)=>{function n(e,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},n(e,t)}r.d(t,{Z:()=>n})},14588:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(77143);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,a,i=[],c=!0,l=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=u.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||(0,n.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},41207:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(48679);function o(e){var t=function(e,t){if("object"!==(0,n.Z)(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==(0,n.Z)(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===(0,n.Z)(t)?t:String(t)}},48679:(e,t,r)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}r.d(t,{Z:()=>n})},77143:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(84164);function o(e,t){if(e){if("string"==typeof e)return(0,n.Z)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?(0,n.Z)(e,t):void 0}}}},e=>{var t;t=24406,e(e.s=t)}]);
//# sourceMappingURL=geoview-details-panel.js.map