(this.webpackJsonpmasculinidad=this.webpackJsonpmasculinidad||[]).push([[0],{171:function(e,t,a){e.exports=a(317)},176:function(e,t,a){},215:function(e,t,a){},317:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(147),o=a.n(i),c=(a(176),a(15)),l=a(101),s=a(155),d=a.n(s),u=a(329),f=a(330),h=a(331),m=a(327);function g(e){var t=[];return e.replace(/(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,\s]*(?:\s+[^,\s]+)*))\s*(?:,|$)/g,(function(e,a,n,r){var i="";return void 0!==a?i=a:void 0!==n?i=n:void 0!==r&&(i=r),i=(i=(i=i.replace(/\\'/g,"'")).replace(/\\"/g,'"')).replace(/\\n/g,"\n"),t.push(i),""})),t}function p(e){return e[0].values.map((function(t,a){return e.map((function(e){return e.values[a]})).reduce((function(e,t){return e+t}),0)}))}var v,y=function(e){for(var t=e.split("\n").map(g),a=t.shift()[0],n=t.shift().slice(1),r=t.shift().slice(1),i=0,o=[],c=t.shift();void 0!==c&&"Mujeres"!==c[0];){var l=c.shift(),s=c.map((function(e){var t=Number.parseFloat(e);return Number.isNaN(t)?0:-t})),d=-s.reduce((function(e,t){return Math.min(e,t)}));i=Math.max(i,d),o.push({group:l,values:s}),c=t.shift()}var u=p(o),f=[];for(c=t.shift();void 0!==c&&void 0!==c[0];){var h=c.shift(),m=c.map((function(e){var t=Number.parseFloat(e);return Number.isNaN(t)?0:t})),v=m.reduce((function(e,t){return Math.max(e,t)}));i=Math.max(i,v),f.push({group:h,values:m}),c=t.shift()}for(var y,x=p(f),b=(y=u,x.map((function(e,t){return e-y[t]}))),E=function(e){var t,a,n=Math.floor(Math.log10(e)),r=Math.ceil(e/Math.pow(10,n))*Math.pow(10,n);return n>=9?(t=Math.pow(10,9),a="Miles de millones de personas"):n>=6?(t=Math.pow(10,6),a="Millones de personas"):n>=3?(t=Math.pow(10,3),a="Miles de personas"):(t=1,a="Personas"),{maxValue:r,factor:t,label:a}}(i),w=E.maxValue,k=E.factor,S=E.label,j="",A=0;A<n.length;A+=1)""===n[A]?n[A]=j:j=n[A];return{title:a,sources:n,times:r,left:o,right:f,totals:b,totalsLeft:u,totalsRight:x,maxValue:w,factor:k,label:S}};!function(e){e[e.Ready=0]="Ready",e[e.Loading=1]="Loading",e[e.Error=2]="Error"}(v||(v={}));var x=function(e,t,a,n,i){var o=r.a.useRef(void 0);r.a.useEffect((function(){function r(r){" "===r.key?void 0===o.current?e===v.Ready&&(window.clearInterval(o.current),o.current=window.setInterval((function(){return c()}),1e3/n)):l():"ArrowUp"===r.key?(l(),e===v.Ready&&a((function(e){var a=e-1;return a<0&&(a=t.times.length-1),a}))):"ArrowDown"===r.key?(l(),c(!0)):"ArrowRight"!==r.key&&"ArrowLeft"!==r.key||l()}function c(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e===v.Ready&&a((function(e){var a=e+1;return a>=t.times.length&&(n||i?a=0:(l(),a=e)),a}))}function l(){window.clearInterval(o.current),o.current=void 0}return document.addEventListener("keydown",r),function(){document.removeEventListener("keydown",r)}}),[t,e,a,n,i])},b=a(12),E=(a(215),"'Fira Mono', 'Courier New', Courier, monospace"),w={fontFamily:"'Roboto', 'Helvetica Neue', Helvetica, sans-serif",fontSize:11,letterSpacing:"normal",padding:6,fill:"#fffd38",stroke:"transparent",strokeWidth:0},k=Object(b.a)({textAnchor:"middle"},w),S=Object(b.a)({},w,{fill:"##22466a",fontFamily:E,fontWeight:700,verticalAnchor:"start"}),j={grid:{stroke:function(e){return 0!==e.tick?"transparent":"#9dfecd"}}},A={data:{fill:"#a05fde"}},L={data:{fill:"#f4f754"}},M={fill:"#e2f0fc",stroke:"#9dfecd",strokeWidth:1},O=Object(b.a)({},S,{textAnchor:"start"}),F=Object(b.a)({},S,{textAnchor:"end"}),R=Object(b.a)({},k,{fontSize:14,fontWeight:900,verticalAnchor:"start"}),z=Object(b.a)({},w,{fontSize:7,textAnchor:"start",verticalAnchor:"end"}),W=Object(b.a)({},w,{textAnchor:"end",verticalAnchor:"end",fontSize:14,fontWeight:900}),N=Object(b.a)({},w,{fontFamily:E,textAnchor:"end",verticalAnchor:"end"}),I=Object(b.a)({},N,{textAnchor:"start"});var V=function(e,t,a,n){var r={width:e,height:t,padding:50},i={axis:{fill:"transparent",stroke:"#9dfecd",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},axisLabel:Object(b.a)({},w,{padding:20,fontSize:n+2}),grid:{stroke:"transparent",strokeWidth:0}};return{chart:Object(b.a)({},r),dependentAxis:Object(b.a)({},r,{style:Object(b.a)({},i,{ticks:{size:4,stroke:"#9dfecd",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},tickLabels:Object(b.a)({},w,{fontSize:n,padding:1})})}),independentAxis:Object(b.a)({},r,{style:Object(b.a)({},i,{ticks:{strokeWidth:0},tickLabels:Object(b.a)({},w,{fontSize:a})})}),bar:Object(b.a)({},r,{style:{data:{fill:"#a05fde",stroke:"black",strokeWidth:.2}}})}},C=a(58),P=a.n(C);function X(e){var t=e.width-e.padding.left-e.padding.right,a=e.height-e.padding.top-e.padding.bottom;return r.a.createElement(r.a.Fragment,null,r.a.createElement("rect",{x:e.padding.left,y:e.padding.top,width:t,height:a,style:M}),r.a.createElement("image",{href:P.a,x:e.padding.left+10,y:e.padding.top+10,width:t/2*.5,height:.8*a}),r.a.createElement("image",{href:P.a,x:e.width-e.padding.right-10-t/2*.5,y:e.padding.top+10,width:t/2*.5,height:.8*a}))}function B(e){var t=r.a.useState(v.Loading),a=Object(l.a)(t,2),n=a[0],i=a[1],o=r.a.useState(0),s=Object(l.a)(o,2),g=s[0],p=s[1],b=r.a.useRef(null),E=e.file,w=e.width,k=e.height,S=e.padding,M=e.yearLabelsFontSize,C=e.axisFontSize,P=e.speed,B=e.repeat,D=V(w,k,M,C);return r.a.useEffect((function(){i(v.Loading),d.a.get("".concat("/masculinidad","/data/").concat(E,".csv")).then((function(e){b.current=y(e.data),i(v.Ready)})).catch((function(){return i(v.Error)}))}),[E]),x(n,b.current,p,P,B),n===v.Loading?r.a.createElement(c.f,null,"Cargando..."):n===v.Error?r.a.createElement(c.f,null,"Error..."):r.a.createElement(u.a,{horizontal:!0,singleQuadrantDomainPadding:{x:!0},padding:S,domainPadding:{x:6},domain:{y:[-b.current.maxValue,b.current.maxValue]},theme:D},r.a.createElement(X,{width:w,height:k,padding:S}),r.a.createElement(f.a,{x:w/2,y:0,style:R,text:b.current.title}),r.a.createElement(f.a,{x:S.left,y:k,style:z,text:b.current.sources[g]}),r.a.createElement(f.a,{x:w-S.right,y:S.top-4,style:W,text:"A\xf1o: ".concat(b.current.times[g])}),r.a.createElement(h.a,{dependentAxis:!0,crossAxis:!1,style:j,tickCount:11,tickFormat:function(e){return Math.abs(e/b.current.factor)},label:b.current.label}),r.a.createElement(h.a,{offsetX:S.left}),r.a.createElement(m.a,{data:b.current.left,x:"group",y:function(e){return e.values[g]},style:A,barRatio:1}),r.a.createElement(m.a,{data:b.current.right,x:"group",y:function(e){return e.values[g]},style:L,barRatio:1}),r.a.createElement(f.a,{x:S.left+2,y:S.top+2,style:O,text:[(-b.current.totalsLeft[g]).toLocaleString("es-MX"),"(".concat((100*-b.current.totalsLeft[g]/b.current.totals[g]).toFixed(1),"%)")]}),r.a.createElement(f.a,{x:w-S.right-2,y:S.top+2,style:F,text:[b.current.totalsRight[g].toLocaleString("es-MX"),"(".concat((100*b.current.totalsRight[g]/b.current.totals[g]).toFixed(1),"%)")]}),r.a.createElement(f.a,{x:w/2-2,y:S.top-2,style:N,text:"Total: "}),r.a.createElement(f.a,{x:w/2+2,y:S.top-2,style:I,text:b.current.totals[g].toLocaleString("es-MX")}))}B.defaultProps={width:560,height:300,padding:{top:50,bottom:50,left:70,right:30},yearLabelsFontSize:9,axisFontSize:10,speed:15,repeat:!1};var D=B,J={colors:{primary:"white",secondary:"#fffd38",tertiary:"#22466a"}};var $=function(){return r.a.createElement(c.d,{theme:J},r.a.createElement(c.n,null,r.a.createElement(c.e,null,r.a.createElement(c.g,{src:P.a}),r.a.createElement(c.f,null,"Del machismo ancestral a un nuevo paradigma de la masculinidad")),r.a.createElement(c.r,{textAlign:"center",fontSize:"h3"},"Una alternativa para la reconciliaci\xf3n y la equidad entre hombres y mujeres"),r.a.createElement(c.r,{textAlign:"right"},"Ing. Arturo E. Rosales Jaime")),r.a.createElement(c.n,null,r.a.createElement(c.e,{bg:"grey",width:"60%",height:"100%",alignSelf:"center"},r.a.createElement("svg",{viewBox:"0 0 450 350",style:{background:"#ccdee8",boxSizing:"border-box",display:"inline",padding:0,fontFamily:"'Fira Sans', sans-serif",width:"100%",height:"auto"}},r.a.createElement("rect",{x:"0",y:"0",width:"10",height:"30",fill:"#f01616"})))),r.a.createElement(c.n,null,r.a.createElement(D,{file:"Nacional1910_v2"})),r.a.createElement(c.n,null,r.a.createElement(c.f,null,"Siguiente")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,a){e.exports=a.p+"static/media/lentes.22f42be4.svg"}},[[171,1,2]]]);
//# sourceMappingURL=main.9d1c0d3b.chunk.js.map