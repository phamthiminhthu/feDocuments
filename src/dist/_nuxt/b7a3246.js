(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{596:function(e,t,r){e.exports=r.p+"img/bg-login.5495913.png"},685:function(e,t,r){"use strict";r.r(t);var n=r(266),o=r(8),l=r(568),c=r(564),d=r(92),m=(r(28),[function(){var e=this._self._c;return e("div",{staticClass:"logo w-full h-screen md:block hidden"},[e("img",{staticClass:"h-screen w-full",attrs:{src:r(596)}})])},function(){var e=this._self._c;return e("div",[e("img",{staticClass:"w-32 h-auto border-2 border-slate-300 mx-auto",staticStyle:{"border-radius":"50%"},attrs:{src:r(364)}})])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"landing-font-44 mt-6 text-center"},[e._v("\n        Welcome to\n        "),t("span",{staticClass:"text-amber-700 font-bold italic leading-[72px]"},[e._v("Docskanry")]),e._v("\n        !\n      ")])}]),f=r(3),v=(r(40),r(32),r(54),{meta:{requiresAuth:!1},data:function(){return{login:!1,email:"",emailRules:[function(e){return!!e||"Please enter your email."},function(e){return/.+@.+/.test(e)||"Please enter your email."}],username:"",usernameRules:[function(e){return!!e||"Please enter your username."}],password:"",passwordRules:[function(e){return!!e||"Please enter your password."},function(e){return e.length>=6||"Please enter at least 6 characters."}],confirmPassword:"",confirmPasswordRules:[function(e){return!!e||"Please confirm your password."}],showSnackbar:!1,snackbarText:"",snackbarColor:"",showModal:!1,messageSuccess:""}},methods:{registerForm:function(e){var t=this;return Object(f.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.preventDefault(),r.prev=1,r.next=4,t.$axios.$post("/auth/sign-up",{email:t.email,username:t.username,password:t.password});case 4:n=r.sent,t.showModal=!0,t.messageSuccess=n.content,setTimeout((function(){t.showModal=!1,t.$router.push("/login")}),1500),r.next=14;break;case 10:r.prev=10,r.t0=r.catch(1),r.t0.response&&400===r.t0.response.status?(console.log(r.t0.response),t.snackbarText=r.t0.response.data.content,t.snackbarColor="error"):console.log(r.t0),t.showSnackbar=!0;case 14:case"end":return r.stop()}}),r,null,[[1,10]])})))()}},computed:{passwordConfirmationRule:function(){var e=this;return function(){return e.password===e.confirmPassword||"Password must match"}}}}),x=r(27),component=Object(x.a)(v,(function(){var e=this,t=e._self._c;return t("div",{},[t("div",{staticClass:"grid grid-cols-1 gap-1 justify-items-center items-center md:grid-cols-2"},[e._m(0),e._v(" "),t("div",{staticClass:"form-login justify-center w-3/4"},[e._m(1),e._v(" "),e._m(2),e._v(" "),t("form",{on:{submit:e.registerForm}},[t("div",{staticClass:"mt-20"},[t("label",{staticClass:"block text-sm font-medium landing-font-18 text-gray-900",attrs:{for:"email"}},[e._v("Email")]),e._v(" "),t("div",{staticClass:"flex rounded-md mt-2"},[t(d.a,{staticClass:"block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600",attrs:{id:"email",rules:e.emailRules,type:"email",outlined:"",dense:"",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v(" "),t("label",{staticClass:"block text-sm font-medium landing-font-18 text-gray-900 mt-5",attrs:{for:"username"}},[e._v("Username")]),e._v(" "),t("div",{staticClass:"flex rounded-md mt-2"},[t(d.a,{staticClass:"block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 invalid:border-pink-500 invalid:text-pink-600",attrs:{id:"username",rules:e.usernameRules,type:"text",outlined:"",dense:"",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),e._v(" "),t("label",{staticClass:"block text-sm font-medium landing-font-18 text-gray-900 mt-5",attrs:{for:"password"}},[e._v("Password")]),e._v(" "),t("div",{staticClass:"flex rounded-md mt-2"},[t(d.a,{staticClass:"block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",attrs:{id:"password",rules:e.passwordRules,type:"password",outlined:"",dense:"",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),e._v(" "),t("label",{staticClass:"block text-sm font-medium landing-font-18 text-gray-900 mt-5",attrs:{for:"confirm-password"}},[e._v("Confirm Password")]),e._v(" "),t("div",{staticClass:"flex rounded-md mt-2"},[t(d.a,{staticClass:"block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6",attrs:{id:"confirm-password",rules:e.confirmPasswordRules.concat(e.passwordConfirmationRule),type:"password",outlined:"",dense:"",required:""},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1),e._v(" "),t("div",{staticClass:"mt-20"},[t("button",{staticClass:"group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold !text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",attrs:{type:"submit"}},[t("span",{staticClass:"absolute inset-y-0 left-0 flex items-center pl-3"},[t("svg",{staticClass:"h-5 w-5 text-indigo-500 group-hover:text-indigo-400",attrs:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"}},[t("path",{attrs:{"fill-rule":"evenodd",d:"M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0\n                                                           00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z","clip-rule":"evenodd"}})])]),e._v("\n              Sign Up\n            ")]),e._v(" "),t(c.a,{attrs:{color:e.snackbarColor,timeout:2e3,top:""},model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[e._v("\n              "+e._s(e.snackbarText)+"\n            ")]),e._v(" "),t(l.a,{attrs:{persistent:"","max-width":"600"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[t(n.a,{staticClass:"success-card"},[t(o.c,{staticClass:"success-card__title"},[t("span",{staticClass:"headline"},[e._v(e._s(e.messageSuccess))])]),e._v(" "),t(o.b,{staticClass:"success-card__text"},[e._v("\n                  Signup successfully. Redirecting to the login page...\n                ")])],1)],1)],1),e._v(" "),t("div",{staticClass:"text-base mt-10 text-center"},[t("span",[e._v(" Already have an account? ")]),e._v(" "),t("nuxt-link",{staticClass:"font-semibold !text-indigo-600 hover:text-indigo-500",attrs:{to:"login"}},[e._v("\n              Login\n            ")])],1)])])])])])}),m,!1,null,null,null);t.default=component.exports}}]);