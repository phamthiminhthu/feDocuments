(window.webpackJsonp=window.webpackJsonp||[]).push([[35,19],{576:function(t,e,n){var content=n(588);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(18).default)("75f8b861",content,!0,{sourceMap:!1})},587:function(t,e,n){"use strict";n(576)},588:function(t,e,n){var r=n(17)((function(i){return i[1]}));r.push([t.i,".card-search-data .v-toolbar__content{height:15px!important}",""]),r.locals={},t.exports=r},594:function(t,e,n){"use strict";n.r(e);var r=n(271),o=n(266),c=n(8),l=n(264),d=n(202),m=n(256),f=n(164),h=n(258),v=n(25),_=n(262),x=n(563),w=n(565),y=n(571),k=n(569),D=n(360),S=n(92),C=n(265),F=(n(32),n(279),{data:function(){return{menu:!1,searchByTags:"",searchByTypeDocs:"",model:"tab-tags"}},methods:{search:function(){"tab-tags"==this.model?this.$emit("search-by-tags",this.searchByTags):"tab-typeDocs"==this.model&&this.$emit("search-by-type-docs",this.searchByTypeDocs)}}}),U=(n(587),n(27)),component=Object(U.a)(F,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-data"},[e(_.a,{staticClass:"menu-search",attrs:{"close-on-content-click":!1,"nudge-width":300,"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,c=n.attrs;return[e(r.a,t._g(t._b({staticClass:"float-right mr-5",attrs:{color:"indigo",dark:""}},"v-btn",c,!1),o),[e(d.a,[t._v(" mdi-filter-multiple")]),t._v(" "),e("span",[t._v("Search")])],1)]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[t._v(" "),e(o.a,{staticClass:"card-search-data"},[e(m.a,{staticClass:"!p-0"},[e(f.a,[e(v.a,[e(v.c,[t._v("Filter By")])],1),t._v(" "),e(h.a,[e(d.a,{attrs:{large:"",color:"black"},on:{click:function(e){t.menu=!1}}},[t._v("mdi-alpha-x")])],1)],1)],1),t._v(" "),e(l.a),t._v(" "),e(C.a,{staticClass:"!h-[64px]",attrs:{color:"indigo",dark:"",flat:""},scopedSlots:t._u([{key:"extension",fn:function(){return[e(k.a,{attrs:{"slider-color":"yellow"},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[e(w.a,{attrs:{href:"#tab-tags"}},[t._v(" Tags ")]),t._v(" "),e(w.a,{attrs:{href:"#tab-typeDocs"}},[t._v(" Type Document ")])],1)]},proxy:!0}])}),t._v(" "),e(D.a,{model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[e(y.a,{attrs:{value:"tab-tags"}},[e(o.a,{attrs:{flat:""}},[e(c.b,[e(S.a,{staticClass:"mt-3",attrs:{"append-icon":"mdi-magnify",placeholder:"Search by tags",outlined:""},model:{value:t.searchByTags,callback:function(e){t.searchByTags=e},expression:"searchByTags"}})],1)],1)],1),t._v(" "),e(y.a,{attrs:{value:"tab-typeDocs"}},[e(o.a,{attrs:{flat:""}},[e(c.b,[e(S.a,{staticClass:"mt-3",attrs:{"append-icon":"mdi-magnify",placeholder:"Search by type documents",outlined:""},model:{value:t.searchByTypeDocs,callback:function(e){t.searchByTypeDocs=e},expression:"searchByTypeDocs"}})],1)],1)],1)],1),t._v(" "),e(c.a,[e(x.a),t._v(" "),e(r.a,{attrs:{text:""},on:{click:function(e){t.menu=!1}}},[t._v(" Cancel ")]),t._v(" "),e(r.a,{attrs:{color:"primary",text:""},on:{click:t.search}},[t._v(" Search ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},604:function(t,e,n){var content=n(625);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(18).default)("bfc0ee8e",content,!0,{sourceMap:!1})},624:function(t,e,n){"use strict";n(604)},625:function(t,e,n){var r=n(17)((function(i){return i[1]}));r.push([t.i,".tabs-home .v-toolbar__content{height:15px!important}",""]),r.locals={},t.exports=r},683:function(t,e,n){"use strict";n.r(e);var r=n(271),o=n(266),c=n(562),l=n(570),d=n(202),m=n(359),f=n(256),h=n(164),v=n(259),_=n(25),x=n(142),w=n(561),y=n(268),k=n(565),D=n(571),S=n(569),C=n(360),F=n(355),U=n(265),T=n(3),$=(n(40),{layout:"guest",data:function(){return{tab:null,items:["Following","Recommended For You"],itemsTypeSearch:["Tag","Type Document","User","Title Document"],selectedType:null,searchKey:null}},mounted:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.fetchCurrentUser();case 2:t.fetchUserFollowing(),t.getAllDocumentsFollowing(),t.getAllDocumentsSuggested(),t.fetchUsersSuggested();case 6:case"end":return e.stop()}}),e)})))()},computed:{documents:function(){return this.$store.getters["documents/getDocuments"]},suggestedDocs:function(){return this.$store.getters["documents/getSuggestedDocs"]},usersFollowing:function(){return this.$store.getters["user/getFollowing"]},usersSuggested:function(){return this.$store.getters["documents/getSuggestedUserList"]},username:function(){return this.$store.getters["user/getCurrentUserName"]}},methods:{getAllDocumentsFollowing:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("documents/fetchDocumentsFollowing");case 2:case"end":return e.stop()}}),e)})))()},getAllDocumentsSuggested:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("documents/fetchDocumentsSuggested");case 2:case"end":return e.stop()}}),e)})))()},fetchUserFollowing:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t.$cookies.get("currentUserName")){e.next=5;break}return e.next=3,t.$store.dispatch("user/fetchDataUserFollowing",{username:t.$cookies.get("currentUserName")});case 3:e.next=7;break;case 5:return e.next=7,t.$store.dispatch("user/fetchDataUserFollowing",{username:t.username});case 7:case"end":return e.stop()}}),e)})))()},fetchUsersSuggested:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("documents/fetchUsersSuggested");case 2:case"end":return e.stop()}}),e)})))()},fetchCurrentUser:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/fetchCurrentUser");case 2:case"end":return e.stop()}}),e)})))()},handleDocumentUpdated:function(){this.getAllDocumentsFollowing()},handleDocumentUpdatedSuggestedForYou:function(){this.getAllDocumentsSuggested()}}}),R=(n(624),n(27)),component=Object(R.a)($,(function(){var t=this,e=t._self._c;return e(o.a,{staticClass:"tabs-home !shadow-none"},[e(U.a,{staticClass:"!h-[65px] !border-none !fixed top-[65px] w-full z-50 left-0",attrs:{color:"#111827",dark:"",flat:""},scopedSlots:t._u([{key:"extension",fn:function(){return[e(S.a,{attrs:{"align-with-title":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(F.a,{attrs:{color:"yellow"}}),t._v(" "),t._l(t.items,(function(n){return e(k.a,{key:n},[t._v("\n          "+t._s(n)+"\n        ")])}))],2)]},proxy:!0}])}),t._v(" "),e(C.a,{staticClass:"mt-36",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.items,(function(n){return e(D.a,{key:n.title},["Following"===n?e(o.a,{attrs:{flat:""}},[e(l.a,{attrs:{fluid:""}},[e(w.a,[e(c.a,{attrs:{cols:"9"}},[t.documents?e("DocumentShowItems",{attrs:{documents:t.documents},on:{"document-updated":t.handleDocumentUpdated}}):t._e()],1),t._v(" "),e(c.a,{attrs:{cols:"3"}},[e("div",{staticClass:"following-list !fixed"},[e("div",{staticClass:"search-items"},[e("SearchDocument")],1),t._v(" "),null!=t.usersFollowing&&t.usersFollowing.length>0?e(f.a,{staticClass:"mt-8"},[e(y.a,[t._v("Following")]),t._v(" "),t._l(t.usersFollowing,(function(n,o){return e(h.a,{key:n.username+o},[e(v.a,[null!=n.image?e(m.a,{attrs:{alt:"".concat(n.username," avatar"),src:n.image}}):e(d.a,[t._v(" mdi-account-circle ")])],1),t._v(" "),e(_.a,[e("nuxt-link",{staticClass:"!text-black landing-font-18 font-semibold",attrs:{to:"/profile/".concat(n.username)}},[e(_.c,[t._v("\n                          "+t._s(n.username)+"\n                        ")])],1)],1),t._v(" "),e(x.a,[e(r.a,{staticClass:"ma-2",attrs:{outlined:"",color:"indigo",small:""}},[t._v("\n                        Following\n                      ")])],1)],1)}))],2):t._e()],1)])],1)],1)],1):t._e(),t._v(" "),"Recommended For You"===n?e(o.a,{attrs:{flat:""}},[e(l.a,{attrs:{fluid:""}},[e(w.a,[e(c.a,{attrs:{cols:"9"}},[t.suggestedDocs?e("DocumentShowItems",{attrs:{documents:t.suggestedDocs},on:{"document-updated":t.handleDocumentUpdatedSuggestedForYou}}):t._e()],1),t._v(" "),e(c.a,{attrs:{cols:"3"}},[e("div",{staticClass:"following-list !fixed"},[null!=t.usersSuggested&&t.usersSuggested.length>0?e(f.a,[e(y.a,[t._v("Suggestion")]),t._v(" "),t._l(t.usersSuggested,(function(n){return e(h.a,{key:n.username},[e(v.a,[null!=n.image?e(m.a,{attrs:{alt:"".concat(n.username," avatar"),src:n.image}}):e(d.a,[t._v(" mdi-account-circle ")])],1),t._v(" "),e(_.a,[e(_.c,[e("nuxt-link",{staticClass:"!text-black landing-font-18 font-semibold",attrs:{to:"/profile/".concat(n.username)}},[t._v("\n                          "+t._s(n.username)+"\n                        ")])],1)],1),t._v(" "),e(x.a,[e(r.a,{staticClass:"ma-2",attrs:{outlined:"",color:"indigo",small:""}},[t._v("\n                        Follow\n                      ")])],1)],1)}))],2):t._e()],1)])],1)],1)],1):t._e()],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DocumentShowItems:n(614).default,SearchDocument:n(594).default})}}]);