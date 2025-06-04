const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Index-DBZUAnVK.js","assets/Footer-Dc-JZ2Eb.js","assets/react-vendor-BU_GpymC.js","assets/x-CqEfdwBo.js","assets/createLucideIcon-BUt5drnH.js","assets/menu-B6j3oIxV.js","assets/notifications-GebQcT5-.js","assets/dateTime-DjR-Qffo.js","assets/BdEvents-BBnVd-WG.js","assets/EventBenefit-BCymUFVa.js","assets/mail-DzLLfD35.js","assets/map-pin-Chj_tTAp.js","assets/AuEvents-BBnVd-WG.js","assets/LoginPage-o_pMkk7I.js","assets/session-DbMe381v.js","assets/EventDashboard-UzvfZzSp.js","assets/trash-2-CZWBVrde.js","assets/users-RtvS6NlL.js","assets/search-DSs--sQl.js","assets/filter-CkEJxoLf.js","assets/EventForm--_8QZGKF.js","assets/CommunicationLayout-DEMaSKIq.js","assets/arrow-left-BrZexQs1.js","assets/file-text-OhPbrBYv.js","assets/LeadsPage-BWyQyuJG.js","assets/LeadsPage-BQYzB5pJ.css","assets/EmailTemplatesPage-Bg9hY2YS.js","assets/EmailSignaturesPage-DnjdrQk-.js","assets/ContactFormBuilder-DKtaeRcw.js"])))=>i.map(i=>d[i]);
import{r as e,a as t,R as r,B as s,b as o,c as a}from"./react-vendor-BU_GpymC.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var i={exports:{}},n={},l=e,c=Symbol.for("react.element"),d=Symbol.for("react.fragment"),p=Object.prototype.hasOwnProperty,m=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function f(e,t,r){var s,o={},a=null,i=null;for(s in void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),void 0!==t.ref&&(i=t.ref),t)p.call(t,s)&&!u.hasOwnProperty(s)&&(o[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===o[s]&&(o[s]=t[s]);return{$$typeof:c,type:e,key:a,ref:i,props:o,_owner:m.current}}n.Fragment=d,n.jsx=f,n.jsxs=f,i.exports=n;var h,g=i.exports,y=t;h=y.createRoot,y.hydrateRoot;const x={},b=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),r=e?.nonce||e?.getAttribute("nonce");s=Promise.allSettled(t.map((e=>{if((e=function(e){return"/events-react-app/"+e}(e))in x)return;x[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script"),o.crossOrigin="",o.href=e,r&&o.setAttribute("nonce",r),document.head.appendChild(o),t?new Promise(((t,r)=>{o.addEventListener("load",t),o.addEventListener("error",(()=>r(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}function o(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return s.then((t=>{for(const e of t||[])"rejected"===e.status&&o(e.reason);return e().catch(o)}))};let v,E,_,j={data:""},w=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||j,L=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,k=/\/\*[^]*?\*\/|  +/g,O=/\n+/g,P=(e,t)=>{let r="",s="",o="";for(let a in e){let i=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+i+";":s+="f"==a[1]?P(i,a):a+"{"+P(i,"k"==a[1]?"":t)+"}":"object"==typeof i?s+=P(i,t?t.replace(/([^,])+/g,(e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):a):null!=i&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=P.p?P.p(a,i):a+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+s},D={},N=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+N(e[r]);return t}return e},$=(e,t,r,s,o)=>{let a=N(e),i=D[a]||(D[a]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(a));if(!D[i]){let t=a!==e?e:(e=>{let t,r,s=[{}];for(;t=L.exec(e.replace(k,""));)t[4]?s.shift():t[3]?(r=t[3].replace(O," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(O," ").trim();return s[0]})(e);D[i]=P(o?{["@keyframes "+i]:t}:t,r?"":"."+i)}let n=r&&D.g?D.g:null;return r&&(D.g=D[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(D[i],t,s,n),i};function I(e){let t=this||{},r=e.call?e(t.p):e;return $(r.unshift?r.raw?((e,t,r)=>e.reduce(((e,s,o)=>{let a=t[o];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":P(e,""):!1===e?"":e}return e+s+(null==a?"":a)}),""))(r,[].slice.call(arguments,1),t.p):r.reduce(((e,r)=>Object.assign(e,r&&r.call?r(t.p):r)),{}):r,w(t.target),t.g,t.o,t.k)}I.bind({g:1});let A=I.bind({k:1});function z(e,t){let r=this||{};return function(){let t=arguments;return function s(o,a){let i=Object.assign({},o),n=i.className||s.className;r.p=Object.assign({theme:E&&E()},i),r.o=/ *go\d+/.test(n),i.className=I.apply(r,t)+(n?" "+n:"");let l=e;return e[0]&&(l=i.as||e,delete i.as),_&&l[0]&&_(i),v(l,i)}}}var S=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,T=(()=>{let e=0;return()=>(++e).toString()})(),C=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),R=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:r}=t;return R(e,{type:e.toasts.find((e=>e.id===r.id))?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map((e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+o})))}}},M=[],V={toasts:[],pausedAt:void 0},F=e=>{V=R(V,e),M.forEach((e=>{e(V)}))},B={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},H=e=>(t,r)=>{let s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||T()}))(t,e,r);return F({type:2,toast:s}),s.id},U=(e,t)=>H("blank")(e,t);U.error=H("error"),U.success=H("success"),U.loading=H("loading"),U.custom=H("custom"),U.dismiss=e=>{F({type:3,toastId:e})},U.remove=e=>F({type:4,toastId:e}),U.promise=(e,t,r)=>{let s=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then((e=>{let o=t.success?S(t.success,e):void 0;return o?U.success(o,{id:s,...r,...null==r?void 0:r.success}):U.dismiss(s),e})).catch((e=>{let o=t.error?S(t.error,e):void 0;o?U.error(o,{id:s,...r,...null==r?void 0:r.error}):U.dismiss(s)})),e};var q=(e,t)=>{F({type:1,toast:{id:e,height:t}})},W=()=>{F({type:5,time:Date.now()})},Y=new Map,K=t=>{let{toasts:r,pausedAt:s}=((t={})=>{let[r,s]=e.useState(V),o=e.useRef(V);e.useEffect((()=>(o.current!==V&&s(V),M.push(s),()=>{let e=M.indexOf(s);e>-1&&M.splice(e,1)})),[]);let a=r.toasts.map((e=>{var r,s,o;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(r=t[e.type])?void 0:r.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(s=t[e.type])?void 0:s.duration)||(null==t?void 0:t.duration)||B[e.type],style:{...t.style,...null==(o=t[e.type])?void 0:o.style,...e.style}}}));return{...r,toasts:a}})(t);e.useEffect((()=>{if(s)return;let e=Date.now(),t=r.map((t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(r<0))return setTimeout((()=>U.dismiss(t.id)),r);t.visible&&U.dismiss(t.id)}));return()=>{t.forEach((e=>e&&clearTimeout(e)))}}),[r,s]);let o=e.useCallback((()=>{s&&F({type:6,time:Date.now()})}),[s]),a=e.useCallback(((e,t)=>{let{reverseOrder:s=!1,gutter:o=8,defaultPosition:a}=t||{},i=r.filter((t=>(t.position||a)===(e.position||a)&&t.height)),n=i.findIndex((t=>t.id===e.id)),l=i.filter(((e,t)=>t<n&&e.visible)).length;return i.filter((e=>e.visible)).slice(...s?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+o),0)}),[r]);return e.useEffect((()=>{r.forEach((e=>{if(e.dismissed)((e,t=1e3)=>{if(Y.has(e))return;let r=setTimeout((()=>{Y.delete(e),F({type:4,toastId:e})}),t);Y.set(e,r)})(e.id,e.removeDelay);else{let t=Y.get(e.id);t&&(clearTimeout(t),Y.delete(e.id))}}))}),[r]),{toasts:r,handlers:{updateHeight:q,startPause:W,endPause:o,calculateOffset:a}}},Z=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,G=A`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=A`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Q=z("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${G} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,X=A`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ee=z("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${X} 1s linear infinite;
`,te=A`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,re=A`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,se=z("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${re} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,oe=z("div")`
  position: absolute;
`,ae=z("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ie=A`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ne=z("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ie} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,le=({toast:t})=>{let{icon:r,type:s,iconTheme:o}=t;return void 0!==r?"string"==typeof r?e.createElement(ne,null,r):r:"blank"===s?null:e.createElement(ae,null,e.createElement(ee,{...o}),"loading"!==s&&e.createElement(oe,null,"error"===s?e.createElement(Q,{...o}):e.createElement(se,{...o})))},ce=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,de=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,pe=z("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,me=z("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ue=e.memo((({toast:t,position:r,style:s,children:o})=>{let a=t.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,o]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ce(r),de(r)];return{animation:t?`${A(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${A(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||r||"top-center",t.visible):{opacity:0},i=e.createElement(le,{toast:t}),n=e.createElement(me,{...t.ariaProps},S(t.message,t));return e.createElement(pe,{className:t.className,style:{...a,...s,...t.style}},"function"==typeof o?o({icon:i,message:n}):e.createElement(e.Fragment,null,i,n))}));!function(e,t,r,s){P.p=t,v=e,E=r,_=s}(e.createElement);var fe=({id:t,className:r,style:s,onHeightUpdate:o,children:a})=>{let i=e.useCallback((e=>{if(e){let r=()=>{let r=e.getBoundingClientRect().height;o(t,r)};r(),new MutationObserver(r).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,o]);return e.createElement("div",{ref:i,className:r,style:s},a)},he=I`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ge=({reverseOrder:t,position:r="top-center",toastOptions:s,gutter:o,children:a,containerStyle:i,containerClassName:n})=>{let{toasts:l,handlers:c}=K(s);return e.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((s=>{let i=s.position||r,n=((e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...o}})(i,c.calculateOffset(s,{reverseOrder:t,gutter:o,defaultPosition:r}));return e.createElement(fe,{id:s.id,key:s.id,onHeightUpdate:c.updateHeight,className:s.visible?he:"",style:n},"custom"===s.type?S(s.message,s):a?a(s):e.createElement(ue,{toast:s,position:i}))})))},ye=U;class xe{static instance;logs=[];maxLogs=1e3;isDevelopment=!1;constructor(){}static getInstance(){return xe.instance||(xe.instance=new xe),xe.instance}formatMessage(e,t,r){return{timestamp:(new Date).toISOString(),level:e,message:t,data:r}}addLog(e){if(this.logs.push(e),this.logs.length>this.maxLogs&&this.logs.shift(),this.isDevelopment){(console[e.level]||console.log)(`[${e.timestamp}] ${e.level.toUpperCase()}: ${e.message}`,e.data||"")}}debug(e,t){this.isDevelopment&&this.addLog(this.formatMessage("debug",e,t))}info(e,t){this.addLog(this.formatMessage("info",e,t))}warn(e,t){this.addLog(this.formatMessage("warn",e,t))}error(e,t){const r=t instanceof Error?{name:t.name,message:t.message,stack:t.stack}:t;this.addLog(this.formatMessage("error",e,r))}getLogs(e){return e?this.logs.filter((t=>t.level===e)):this.logs}clearLogs(){this.logs=[]}}const be=xe.getInstance();class ve extends r.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){be.error("Error caught by boundary:",{error:{message:e.message,stack:e.stack,name:e.name},componentStack:t.componentStack})}render(){return this.state.hasError?this.props.fallback?this.props.fallback:g.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-r from-[#9b1f62] via-[#682161] to-[#3e3764] text-white p-4",children:g.jsxs("div",{className:"max-w-md w-full bg-white/10 rounded-lg shadow-lg p-6 text-center",children:[g.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Something went wrong"}),g.jsx("p",{className:"mb-4 text-gray-200",children:"We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists."}),!1,g.jsx("button",{onClick:()=>window.location.reload(),className:"mt-4 px-4 py-2 bg-white text-[#9b1f62] rounded hover:bg-gray-100 transition-colors",children:"Refresh Page"})]})}):this.props.children}}function Ee({size:e="md",color:t="currentColor",className:r=""}){return g.jsxs("div",{className:`inline-block ${r}`,role:"status","aria-label":"Loading",children:[g.jsxs("svg",{className:`animate-spin ${{sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"}[e]}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[g.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:t,strokeWidth:"4"}),g.jsx("path",{className:"opacity-75",fill:t,d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),g.jsx("span",{className:"sr-only",children:"Loading..."})]})}const _e=r.lazy((()=>b((()=>import("./Index-DBZUAnVK.js")),__vite__mapDeps([0,1,2,3,4,5,6,7])))),je=r.lazy((()=>b((()=>import("./BdEvents-BBnVd-WG.js")),__vite__mapDeps([8,1,2,3,4,5,9,10,11])))),we=r.lazy((()=>b((()=>import("./AuEvents-BBnVd-WG.js")),__vite__mapDeps([12,1,2,3,4,5,9,10,11])))),Le=r.lazy((()=>b((()=>import("./LoginPage-o_pMkk7I.js")),__vite__mapDeps([13,2,6,14])))),ke=r.lazy((()=>b((()=>import("./EventDashboard-UzvfZzSp.js")),__vite__mapDeps([15,2,6,16,4,17,18,19,3,7,11,14])))),Oe=r.lazy((()=>b((()=>import("./EventForm--_8QZGKF.js")),__vite__mapDeps([20,2,6])))),Pe=r.lazy((()=>b((()=>import("./CommunicationLayout-DEMaSKIq.js")),__vite__mapDeps([21,2,3,4,5,22,17,10,23])))),De=r.lazy((()=>b((()=>import("./LeadsPage-BWyQyuJG.js")),__vite__mapDeps([24,2,6,3,4,19,23,18,10,25])))),Ne=r.lazy((()=>b((()=>import("./EmailTemplatesPage-Bg9hY2YS.js")),__vite__mapDeps([26,2,6,22,4,16,18])))),$e=r.lazy((()=>b((()=>import("./EmailSignaturesPage-DnjdrQk-.js")),__vite__mapDeps([27,2,6])))),Ie=r.lazy((()=>b((()=>import("./ContactFormBuilder-DKtaeRcw.js")),__vite__mapDeps([28,2,6])))),Ae=()=>g.jsxs(ve,{children:[g.jsx(ge,{position:"top-right",toastOptions:{duration:4e3,style:{background:"#363636",color:"#fff"},success:{duration:3e3,iconTheme:{primary:"#22c55e",secondary:"#fff"}},error:{duration:5e3,iconTheme:{primary:"#ef4444",secondary:"#fff"}}}}),g.jsx(s,{basename:"/events-react-app",children:g.jsx(e.Suspense,{fallback:g.jsx(Ee,{}),children:g.jsxs(o,{children:[g.jsx(a,{path:"/",element:g.jsx(_e,{})}),g.jsx(a,{path:"/BdEvents",element:g.jsx(je,{})}),g.jsx(a,{path:"/AuEvents",element:g.jsx(we,{})}),g.jsx(a,{path:"/LoginPage",element:g.jsx(Le,{})}),g.jsx(a,{path:"/EventDashboard",element:g.jsx(ke,{})}),g.jsx(a,{path:"/admin/events/:mode/:id?",element:g.jsx(Oe,{})}),g.jsxs(a,{path:"/communication",element:g.jsx(Pe,{}),children:[g.jsx(a,{path:"leads",element:g.jsx(De,{})}),g.jsx(a,{path:"templates",element:g.jsx(Ne,{})}),g.jsx(a,{path:"signatures",element:g.jsx($e,{})}),g.jsx(a,{path:"forms",element:g.jsx(Ie,{})})]})]})})})]});h(document.getElementById("root")).render(g.jsx(e.StrictMode,{children:g.jsx(Ae,{})}));export{Ee as L,ye as V,b as _,g as j,be as l};
