(window.webpackJsonp=window.webpackJsonp||[]).push([[31,22],{589:function(e,t,n){var content=n(598);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(18).default)("7c5beb75",content,!0,{sourceMap:!1})},597:function(e,t,n){"use strict";n(589)},598:function(e,t,n){var o=n(17)((function(i){return i[1]}));o.push([e.i,"#webviewer{height:100vh;width:100%}",""]),o.locals={},e.exports=o},609:function(e,t,n){var content=n(647);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(18).default)("39c42492",content,!0,{sourceMap:!1})},619:function(e,t,n){"use strict";n.r(t);var o=n(562),r=n(570),c=n(267),l=n(561),d=n(3),f=(n(40),n(4),n(48),n(53),n(593),n(362),n(610)),m=n.n(f),v={props:{path:String,documentKey:String},data:function(){return{loading:!1}},mounted:function(){this.loadPDF()},methods:{loadPDF:function(){var e=this;return Object(d.a)(regeneratorRuntime.mark((function t(){var n,o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,e.$axios.get("/management/document/display/".concat(e.documentKey),{responseType:"arraybuffer"});case 4:(n=t.sent)&&(console.log(n),o=new Blob([n.data],{type:"application/pdf"}),r=URL.createObjectURL(o),m()({path:"../public",enableAnnotations:!0,enableOfficeEditing:!0,initialDoc:r},e.$refs.viewer).then((function(e){e.UI.setLanguage("en"),e.UI.enableFeatures([e.UI.Feature.MultiTab]);var t=e.Core,n=e.UI;t.documentViewer.addEventListener("documentLoaded",(function(){console.log("document loaded")})),t.documentViewer.addEventListener("pageNumberUpdated",(function(e){console.log("Page number is: ".concat(e))})),n.setHeaderItems((function(header){header.push({type:"actionButton",img:"https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg",onClick:function(){var e=t.documentViewer.getCurrentPage();e===t.documentViewer.getPageCount()?t.documentViewer.setCurrentPage(1):t.documentViewer.setCurrentPage(e+1)}})}))}))),e.loading=!1,t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.log(t.t0);case 12:e.loading=!1;case 13:case"end":return t.stop()}}),t,null,[[1,9]])})))()}}},h=(n(597),n(27)),component=Object(h.a)(v,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"text-center"},[e.loading?t(r.a,{staticStyle:{height:"400px"}},[t(l.a,{staticClass:"fill-height",attrs:{"align-content":"center",justify:"center"}},[t(o.a,{staticClass:"text-subtitle-1 text-center",attrs:{cols:"12"}},[e._v("\n          Getting your files\n        ")]),e._v(" "),t(o.a,{attrs:{cols:"6"}},[t(c.a,{attrs:{color:"deep-purple accent-4",indeterminate:"",rounded:"",height:"10"}})],1)],1)],1):e._e(),e._v(" "),t("div",{ref:"viewer",attrs:{id:"webviewer"}})],1)])}),[],!1,null,null,null);t.default=component.exports},646:function(e,t,n){"use strict";n(609)},647:function(e,t,n){var o=n(17)((function(i){return i[1]}));o.push([e.i,"#pdf-viewer{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#2c3e50;font-family:Avenir,Helvetica,Arial,sans-serif;margin:0 auto;text-align:center;width:100%}#pdf-viewer,#webviewer{height:100vh}",""]),o.locals={},e.exports=o},693:function(e,t,n){"use strict";n.r(t);var o={name:"PdfViewer",data:function(){return{documentKey:""}},mounted:function(){this.documentKey=this.$route.params.id}},r=(n(646),n(27)),component=Object(r.a)(o,(function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"pdf-viewer"}},[e.documentKey?t("WebViewer",{attrs:{documentKey:e.documentKey}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{WebViewer:n(619).default})}}]);