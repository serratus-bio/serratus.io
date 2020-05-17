(function(t){function c(c){for(var n,l,r=c[0],i=c[1],o=c[2],p=0,f=[];p<r.length;p++)l=r[p],Object.prototype.hasOwnProperty.call(a,l)&&a[l]&&f.push(a[l][0]),a[l]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(c);while(f.length)f.shift()();return s.push.apply(s,o||[]),e()}function e(){for(var t,c=0;c<s.length;c++){for(var e=s[c],n=!0,r=1;r<e.length;r++){var i=e[r];0!==a[i]&&(n=!1)}n&&(s.splice(c--,1),t=l(l.s=e[0]))}return t}var n={},a={app:0},s=[];function l(c){if(n[c])return n[c].exports;var e=n[c]={i:c,l:!1,exports:{}};return t[c].call(e.exports,e,e.exports,l),e.l=!0,e.exports}l.m=t,l.c=n,l.d=function(t,c,e){l.o(t,c)||Object.defineProperty(t,c,{enumerable:!0,get:e})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,c){if(1&c&&(t=l(t)),8&c)return t;if(4&c&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(l.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&c&&"string"!=typeof t)for(var n in t)l.d(e,n,function(c){return t[c]}.bind(null,n));return e},l.n=function(t){var c=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(c,"a",c),c},l.o=function(t,c){return Object.prototype.hasOwnProperty.call(t,c)},l.p="/serratus.io/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],i=r.push.bind(r);r.push=c,r=r.slice();for(var o=0;o<r.length;o++)c(r[o]);var u=i;s.push([0,"chunk-vendors"]),e()})({0:function(t,c,e){t.exports=e("56d7")},"56d7":function(t,c,e){"use strict";e.r(c);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),a=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",{staticClass:"flex flex-col items-stretch",attrs:{id:"app"}},[e("Navbar",{staticClass:"z-10"}),e("router-view")],1)},s=[],l=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("header",{staticClass:"text-gray-700 body-font top-0 fixed w-full bg-white shadow-lg"},[e("div",{staticClass:"container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center"},[t._m(0),e("nav",{staticClass:"md:ml-auto flex flex-wrap items-center text-base justify-center"},[e("div",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#home",expression:"'#home'"}],staticClass:"mr-16 hover:text-gray-900 cursor-pointer"},[t._v("Home")]),e("div",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#about",expression:"'#about'"}],staticClass:"mr-16 hover:text-gray-900 cursor-pointer"},[t._v("About")]),e("div",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#info",expression:"'#info'"}],staticClass:"hover:text-gray-900 cursor-pointer"},[t._v("Info")])])])])},r=[function(){var t=this,c=t.$createElement,n=t._self._c||c;return n("a",{staticClass:"flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"},[n("img",{staticClass:"w-8 h-8",attrs:{src:e("afb5")}}),n("span",{staticClass:"ml-3 text-xl"},[t._v("Serratus")])])}],i={name:"Navbar",props:{msg:String}},o=i,u=e("2877"),p=Object(u["a"])(o,l,r,!1,null,"a816bc5a",null),f=p.exports,v=(e("def6"),{name:"App",components:{Navbar:f}}),h=v,d=Object(u["a"])(h,a,s,!1,null,null,null),m=d.exports,x=e("8c4f"),g=function(){var t=this,c=t.$createElement;t._self._c;return t._m(0)},w=[function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",{staticClass:"flex flex-col justify-center items-center bg-white pt-32",staticStyle:{height:"50vh"}},[e("h1",{staticClass:"text-5xl text-black font-semibold text-center"},[t._v("Why Serratus?")]),e("h1",{staticClass:"text-xl text-black font-light text-center w-3/4 lg:w-3/5 mt-8"},[e("strong",[t._v("The world needs us.")]),t._v(" We are currently in a pandemic and we are ill-equiped. The quality of the sequencing data available for SARS-Cov-2 (Covid-19) is not in good condition, with only 12% of coronaviruses having complete genomes. It is also likely that many more viruses in the same family have yet to be discovered. Serratus is here to help, but how? ")])])}],b={props:{msg:String}},C=b,A=Object(u["a"])(C,g,w,!1,null,"041ffa14",null),y=A.exports,z=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("section",{staticClass:"text-blue-700 body-font bg-white h-screen flex flex-col justify-center"},[e("div",{staticClass:"container px-5 py-24 mx-auto"},[e("div",{staticClass:"flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4"},[e("div",{staticClass:"p-4 md:w-1/3 sm:mb-0 mb-6"},[e("div",{staticClass:"h-64 mx-auto bg-blue-400 border-8 border-blue-700 p-16 w-64 rounded-full mb-48 flex justify-center relative"},[e("div",{staticClass:"w-full-h-full absolute",staticStyle:{left:"50%",top:"95%",transform:"translateX(-50%)"}},[e("svg",{staticClass:"h-32 p-3 w-auto mx-auto fill-current text-blue-700",staticStyle:{"enable-background":"new 0 0 512 512"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 512 512","xml:space":"preserve"}},[e("g",[e("g",[e("path",{attrs:{d:"M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20    c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285    l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018    l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z"}})])])])]),e("svg",{staticClass:"fill-current text-gray-100 h-full w-auto",staticStyle:{"enable-background":"new 0 0 60 60"},attrs:{version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 60 60","xml:space":"preserve"}},[e("path",{attrs:{d:"M35,0C23.849,0,14.43,2.588,11.215,6.475C4.669,8.077,0.884,10.775,0.146,13.51C0.062,13.657,0,13.818,0,14v0.5V26v0.5V27\n            v11v0.5V39v12c0,0.162,0.043,0.315,0.117,0.451C1.298,56.346,11.864,60,25,60c11.24,0,20.579-2.68,23.786-6.518\n            c6.359-1.546,10.366-4.076,11.09-7C59.955,46.34,60,46.175,60,46V34v-0.5V22v-0.5v-12C60,4.895,51.238,0,35,0z M47.805,39.348\n            c-0.04,0.099-0.089,0.198-0.143,0.297c-0.067,0.123-0.142,0.246-0.231,0.369c-0.066,0.093-0.141,0.185-0.219,0.277\n            c-0.111,0.131-0.229,0.262-0.363,0.392c-0.081,0.079-0.17,0.157-0.26,0.236c-0.164,0.143-0.335,0.285-0.526,0.426\n            c-0.082,0.061-0.17,0.12-0.257,0.18c-0.226,0.156-0.462,0.311-0.721,0.463c-0.068,0.041-0.141,0.08-0.212,0.12\n            c-0.298,0.168-0.609,0.335-0.945,0.497c-0.043,0.021-0.088,0.041-0.132,0.061c-0.375,0.177-0.767,0.351-1.186,0.519\n            c-0.012,0.005-0.024,0.009-0.036,0.014c-2.271,0.907-5.176,1.67-8.561,2.17c-0.017,0.002-0.034,0.004-0.051,0.007\n            c-0.658,0.097-1.333,0.183-2.026,0.259c-0.113,0.012-0.232,0.02-0.346,0.032c-0.605,0.063-1.217,0.121-1.847,0.167\n            c-0.288,0.021-0.59,0.031-0.883,0.049c-0.474,0.028-0.943,0.059-1.429,0.076C26.637,45.984,25.827,46,25,46\n            s-1.637-0.016-2.432-0.044c-0.486-0.017-0.955-0.049-1.429-0.076c-0.293-0.017-0.595-0.028-0.883-0.049\n            c-0.63-0.046-1.242-0.104-1.847-0.167c-0.114-0.012-0.233-0.02-0.346-0.032c-0.693-0.076-1.368-0.163-2.026-0.259\n            c-0.017-0.002-0.034-0.004-0.051-0.007c-3.385-0.5-6.29-1.263-8.561-2.17c-0.012-0.004-0.024-0.009-0.036-0.014\n            c-0.419-0.168-0.812-0.342-1.186-0.519c-0.043-0.021-0.089-0.041-0.132-0.061c-0.336-0.162-0.647-0.328-0.945-0.497\n            c-0.07-0.04-0.144-0.079-0.212-0.12c-0.259-0.152-0.495-0.307-0.721-0.463c-0.086-0.06-0.175-0.119-0.257-0.18\n            c-0.191-0.141-0.362-0.283-0.526-0.426c-0.089-0.078-0.179-0.156-0.26-0.236c-0.134-0.13-0.252-0.26-0.363-0.392\n            c-0.078-0.092-0.153-0.184-0.219-0.277c-0.088-0.123-0.163-0.246-0.231-0.369c-0.054-0.099-0.102-0.198-0.143-0.297\n            c-0.049-0.121-0.088-0.242-0.116-0.363C2.041,38.823,2,38.661,2,38.5c0-0.113,0.013-0.226,0.031-0.338\n            C2.056,38.011,2.042,37.86,2,37.717v-7.424c0.028,0.026,0.063,0.051,0.092,0.077c0.218,0.192,0.44,0.383,0.69,0.567\n            C6.549,33.786,14.082,36,25,36c10.872,0,18.386-2.196,22.169-5.028c0.302-0.22,0.574-0.447,0.83-0.678L48,30.293v7.424\n            c-0.042,0.143-0.056,0.294-0.031,0.445C47.987,38.274,48,38.387,48,38.5c0,0.161-0.041,0.323-0.079,0.485\n            C47.892,39.106,47.854,39.227,47.805,39.348z M2.601,18.797c0.3,0.236,0.624,0.469,0.975,0.696c0.073,0.047,0.155,0.093,0.231,0.14\n            c0.294,0.183,0.605,0.362,0.932,0.538c0.121,0.065,0.242,0.129,0.367,0.193c0.365,0.186,0.748,0.367,1.151,0.542\n            c0.066,0.029,0.126,0.059,0.193,0.087c0.469,0.199,0.967,0.389,1.485,0.573c0.143,0.051,0.293,0.099,0.44,0.149\n            c0.412,0.139,0.838,0.272,1.279,0.401c0.159,0.046,0.315,0.094,0.478,0.138c0.585,0.162,1.189,0.316,1.823,0.458\n            c0.087,0.02,0.181,0.036,0.269,0.055c0.559,0.122,1.139,0.235,1.735,0.341c0.202,0.036,0.407,0.07,0.613,0.104\n            c0.567,0.093,1.151,0.178,1.75,0.256c0.154,0.02,0.301,0.043,0.457,0.062c0.744,0.09,1.514,0.167,2.305,0.233\n            c0.195,0.016,0.398,0.028,0.596,0.042c0.633,0.046,1.28,0.084,1.942,0.114c0.241,0.011,0.481,0.022,0.727,0.031\n            C23.212,23.979,24.09,24,25,24s1.788-0.021,2.65-0.05c0.245-0.009,0.485-0.02,0.727-0.031c0.662-0.03,1.309-0.068,1.942-0.114\n            c0.198-0.015,0.4-0.026,0.596-0.042c0.791-0.065,1.561-0.143,2.305-0.233c0.156-0.019,0.303-0.042,0.457-0.062\n            c0.599-0.078,1.182-0.163,1.75-0.256c0.206-0.034,0.411-0.068,0.613-0.104c0.596-0.106,1.176-0.219,1.735-0.341\n            c0.088-0.019,0.182-0.036,0.269-0.055c0.634-0.142,1.238-0.297,1.823-0.458c0.163-0.045,0.319-0.092,0.478-0.138\n            c0.441-0.129,0.867-0.262,1.279-0.401c0.147-0.05,0.297-0.098,0.44-0.149c0.518-0.184,1.017-0.374,1.485-0.573\n            c0.067-0.028,0.127-0.058,0.193-0.087c0.403-0.176,0.786-0.356,1.151-0.542c0.125-0.064,0.247-0.128,0.367-0.193\n            c0.327-0.175,0.638-0.354,0.932-0.538c0.076-0.047,0.158-0.093,0.231-0.14c0.351-0.227,0.675-0.459,0.975-0.696\n            c0.075-0.06,0.142-0.12,0.215-0.18c0.13-0.108,0.267-0.215,0.387-0.324v7.424c-0.042,0.143-0.056,0.294-0.031,0.445\n            C47.987,26.274,48,26.387,48,26.5c0,0.161-0.041,0.323-0.079,0.485c-0.028,0.121-0.067,0.241-0.116,0.363\n            c-0.04,0.099-0.089,0.198-0.143,0.297c-0.067,0.123-0.142,0.246-0.231,0.369c-0.066,0.093-0.141,0.185-0.219,0.277\n            c-0.111,0.131-0.229,0.262-0.363,0.392c-0.081,0.079-0.17,0.157-0.26,0.236c-0.164,0.143-0.335,0.285-0.526,0.426\n            c-0.082,0.061-0.17,0.12-0.257,0.18c-0.226,0.156-0.462,0.311-0.721,0.463c-0.068,0.041-0.141,0.08-0.212,0.12\n            c-0.298,0.168-0.609,0.335-0.945,0.497c-0.043,0.021-0.088,0.041-0.132,0.061c-0.375,0.177-0.767,0.351-1.186,0.519\n            c-0.012,0.005-0.024,0.009-0.036,0.014c-2.271,0.907-5.176,1.67-8.561,2.17c-0.017,0.002-0.034,0.004-0.051,0.007\n            c-0.658,0.097-1.333,0.183-2.026,0.259c-0.113,0.012-0.232,0.02-0.346,0.032c-0.605,0.063-1.217,0.121-1.847,0.167\n            c-0.288,0.021-0.59,0.031-0.883,0.049c-0.474,0.028-0.943,0.059-1.429,0.076C26.637,33.984,25.827,34,25,34\n            s-1.637-0.016-2.432-0.044c-0.486-0.017-0.955-0.049-1.429-0.076c-0.293-0.017-0.595-0.028-0.883-0.049\n            c-0.63-0.046-1.242-0.104-1.847-0.167c-0.114-0.012-0.233-0.02-0.346-0.032c-0.693-0.076-1.368-0.163-2.026-0.259\n            c-0.017-0.002-0.034-0.004-0.051-0.007c-3.385-0.5-6.29-1.263-8.561-2.17c-0.012-0.004-0.024-0.009-0.036-0.014\n            c-0.419-0.168-0.812-0.342-1.186-0.519c-0.043-0.021-0.089-0.041-0.132-0.061c-0.336-0.162-0.647-0.328-0.945-0.497\n            c-0.07-0.04-0.144-0.079-0.212-0.12c-0.259-0.152-0.495-0.307-0.721-0.463c-0.086-0.06-0.175-0.119-0.257-0.18\n            c-0.191-0.141-0.362-0.283-0.526-0.426c-0.089-0.078-0.179-0.156-0.26-0.236c-0.134-0.13-0.252-0.26-0.363-0.392\n            c-0.078-0.092-0.153-0.184-0.219-0.277c-0.088-0.123-0.163-0.246-0.231-0.369c-0.054-0.099-0.102-0.198-0.143-0.297\n            c-0.049-0.121-0.088-0.242-0.116-0.363C2.041,26.823,2,26.661,2,26.5c0-0.113,0.013-0.226,0.031-0.338\n            C2.056,26.011,2.042,25.86,2,25.717v-7.424c0.12,0.109,0.257,0.216,0.387,0.324C2.459,18.677,2.526,18.737,2.601,18.797z M50,39.09\n            V39v-0.5V38v-8.828c0.043-0.012,0.083-0.025,0.126-0.037c0.4-0.112,0.79-0.227,1.168-0.346c0.004-0.001,0.009-0.003,0.013-0.004\n            c2.961-0.936,5.22-2.099,6.693-3.427V33.5c0,0.116-0.015,0.232-0.035,0.349c-0.016,0.096-0.043,0.192-0.072,0.288\n            c-0.009,0.028-0.015,0.056-0.025,0.085c-0.036,0.105-0.081,0.21-0.133,0.315c-0.006,0.013-0.013,0.026-0.019,0.039\n            c-0.828,1.615-3.465,3.202-7.27,4.379C50.299,39,50.151,39.046,50,39.09z M58,13.347V21.5c0,0.116-0.015,0.232-0.035,0.349\n            c-0.016,0.096-0.043,0.192-0.072,0.288c-0.009,0.028-0.015,0.056-0.025,0.085c-0.036,0.105-0.081,0.21-0.133,0.315\n            c-0.006,0.013-0.013,0.026-0.019,0.039c-0.828,1.615-3.465,3.202-7.27,4.379C50.299,27,50.151,27.046,50,27.09V27v-0.5V26v-8.828\n            c0.084-0.023,0.161-0.049,0.244-0.072c0.23-0.065,0.454-0.133,0.677-0.2c0.189-0.057,0.378-0.115,0.561-0.174\n            c0.228-0.074,0.448-0.15,0.667-0.227c0.166-0.058,0.334-0.115,0.495-0.174c0.231-0.085,0.452-0.174,0.673-0.262\n            c0.137-0.055,0.279-0.108,0.412-0.164c0.256-0.108,0.5-0.219,0.742-0.332c0.087-0.04,0.179-0.079,0.263-0.119\n            c0.324-0.156,0.635-0.316,0.931-0.479c0.031-0.017,0.057-0.035,0.088-0.052c0.261-0.146,0.513-0.295,0.751-0.447\n            c0.084-0.054,0.159-0.109,0.24-0.163c0.176-0.117,0.35-0.235,0.512-0.356c0.089-0.066,0.169-0.134,0.253-0.201\n            c0.141-0.112,0.282-0.224,0.411-0.338C57.946,13.389,57.976,13.369,58,13.347z M35,2c13.555,0,23,3.952,23,7.5\n            c0,0.133-0.014,0.266-0.04,0.399c-0.008,0.044-0.025,0.087-0.036,0.131c-0.023,0.09-0.045,0.179-0.079,0.269\n            c-0.02,0.052-0.047,0.104-0.07,0.156c-0.037,0.081-0.073,0.162-0.119,0.243c-0.031,0.055-0.068,0.11-0.103,0.165\n            c-0.05,0.078-0.1,0.156-0.157,0.233c-0.042,0.056-0.089,0.112-0.135,0.167c-0.063,0.076-0.127,0.152-0.197,0.227\n            c-0.052,0.056-0.108,0.112-0.164,0.168c-0.075,0.074-0.153,0.149-0.236,0.223c-0.062,0.055-0.126,0.111-0.192,0.166\n            c-0.088,0.073-0.18,0.146-0.275,0.219c-0.071,0.054-0.143,0.109-0.218,0.163c-0.101,0.073-0.208,0.145-0.316,0.217\n            c-0.079,0.053-0.158,0.105-0.241,0.158c-0.116,0.073-0.237,0.145-0.36,0.216c-0.085,0.05-0.169,0.1-0.258,0.149\n            c-0.132,0.073-0.272,0.146-0.412,0.219c-0.089,0.046-0.175,0.093-0.267,0.138c-0.153,0.076-0.315,0.15-0.476,0.225\n            c-0.088,0.04-0.171,0.081-0.261,0.121c-0.213,0.094-0.434,0.187-0.659,0.278c-0.045,0.018-0.086,0.037-0.131,0.055\n            c-0.274,0.109-0.558,0.216-0.85,0.321c-0.081,0.029-0.168,0.057-0.25,0.085c-0.214,0.074-0.428,0.148-0.651,0.22\n            c-0.116,0.038-0.238,0.073-0.357,0.11c-0.161,0.05-0.322,0.099-0.487,0.147V14.5V14c0-0.113-0.027-0.22-0.065-0.322\n            c-0.014-0.04-0.027-0.078-0.046-0.115c-0.002-0.004-0.003-0.01-0.006-0.014c-0.284-1.177-1.122-2.279-2.396-3.279\n            c-0.007-0.006-0.013-0.012-0.021-0.017c-0.182-0.143-0.385-0.28-0.585-0.418c-3.547-2.511-10.075-4.479-19.335-4.786\n            C26.71,5.018,25.861,5,25,5c-0.854,0-1.703,0.017-2.545,0.048c-2.498,0.083-4.787,0.291-6.884,0.594C19.445,3.612,26.273,2,35,2z\n            M13.493,8.061c0.252-0.05,0.512-0.094,0.769-0.141c0.332-0.061,0.666-0.12,1.009-0.175c0.299-0.048,0.601-0.093,0.905-0.137\n            c0.337-0.048,0.681-0.093,1.028-0.136c0.294-0.037,0.587-0.075,0.885-0.107c0.599-0.065,1.209-0.122,1.833-0.17\n            c0.237-0.019,0.478-0.031,0.717-0.047c0.484-0.032,0.972-0.06,1.47-0.081c0.235-0.01,0.47-0.02,0.707-0.028\n            C23.534,7.017,24.258,7,25,7c0.827,0,1.637,0.016,2.433,0.044c0.48,0.017,0.943,0.048,1.411,0.075c0.3,0.017,0.607,0.029,0.902,0.05\n            c0.621,0.045,1.224,0.103,1.821,0.164c0.123,0.012,0.252,0.021,0.374,0.035c0.677,0.074,1.336,0.159,1.98,0.253\n            c0.033,0.005,0.068,0.009,0.1,0.013c3.369,0.498,6.261,1.256,8.526,2.157c0.025,0.01,0.052,0.02,0.077,0.03\n            c0.406,0.163,0.786,0.332,1.149,0.503c0.056,0.026,0.114,0.052,0.169,0.078c0.325,0.157,0.625,0.318,0.914,0.48\n            c0.08,0.045,0.164,0.09,0.241,0.136c0.249,0.147,0.477,0.296,0.696,0.447c0.095,0.065,0.191,0.131,0.28,0.197\n            c0.184,0.136,0.349,0.273,0.507,0.411c0.095,0.083,0.19,0.166,0.276,0.25c0.129,0.126,0.244,0.252,0.351,0.379\n            c0.081,0.096,0.16,0.192,0.228,0.289c0.086,0.119,0.159,0.239,0.225,0.359c0.056,0.102,0.105,0.203,0.146,0.304\n            c0.048,0.119,0.086,0.239,0.114,0.358C47.959,14.176,48,14.338,48,14.5c0,3.548-9.445,7.5-23,7.5S2,18.048,2,14.5\n            C2,12.08,6.399,9.475,13.493,8.061z M25,58c-13.036,0-22.401-3.703-22.968-7.162C2.024,50.793,2.014,50.749,2,50.707v-8.414\n            c0.028,0.026,0.063,0.051,0.092,0.077c0.218,0.192,0.44,0.383,0.69,0.567C6.549,45.786,14.082,48,25,48\n            c10.872,0,18.386-2.196,22.169-5.028c0.302-0.22,0.574-0.447,0.83-0.678L48,42.293v8.41c-0.014,0.044-0.024,0.089-0.032,0.135\n            c-0.033,0.204-0.103,0.409-0.196,0.613c-0.036,0.079-0.092,0.158-0.137,0.237C45.826,54.877,36.971,58,25,58z M57.968,45.838\n            c-0.317,1.941-3.314,3.891-7.972,5.255C49.999,51.063,50,51.031,50,51v-9.828c0.043-0.012,0.083-0.025,0.126-0.037\n            c0.4-0.112,0.79-0.227,1.168-0.346c0.004-0.001,0.009-0.003,0.013-0.004c2.961-0.936,5.22-2.099,6.693-3.427v8.346\n            C57.986,45.747,57.976,45.792,57.968,45.838z"}}),e("g")])]),e("h2",{staticClass:"text-3xl font-medium title-font text-gray-900 mt-5 text-center"},[t._v("NCBI SRA Database")]),e("p",{staticClass:"text-lg text-gray-800 leading-relaxed mt-2 text-center"},[t._v("The NCBI SRA database contains over 1 million RNA-seq libraries amounting to a whopping 5.72 petabytes (yes, that prefix is right, peta-bytes) of data. It is our goal to reanalyze all of these sequences utilizing our ultra-high throughput analysis pipeline hosted on Aamazon Web Service's (AWS) Cloud Computing.")])]),e("div",{staticClass:"p-4 md:w-1/3 sm:mb-0 mb-6"},[e("div",{staticClass:"h-64 mx-auto bg-blue-400 border-8 border-blue-700 p-12 w-64 rounded-full mb-48 flex justify-center relative"},[e("div",{staticClass:"w-full-h-full absolute",staticStyle:{left:"50%",top:"95%",transform:"translateX(-50%)"}},[e("svg",{staticClass:"h-32 p-3 w-auto mx-auto fill-current text-blue-700",staticStyle:{"enable-background":"new 0 0 512 512"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 512 512","xml:space":"preserve"}},[e("g",[e("g",[e("path",{attrs:{d:"M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20    c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285    l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018    l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z"}})])])])]),e("svg",{staticClass:"fill-current text-gray-100 h-full w-auto",staticStyle:{"enable-background":"new 0 0 480.236 480.236",transform:"translateY(-5px)"},attrs:{version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 480.236 480.236","xml:space":"preserve"}},[e("g",[e("g",[e("path",{attrs:{d:"M479.886,295.684c-4.407-54.062-49.622-95.658-103.863-95.551c-8.127-0.014-16.228,0.926-24.136,2.8\n                c-2.552-46.414-35.404-85.587-80.664-96.184c-0.728-0.176-1.464-0.32-2.192-0.464c-20.771-33.768-64.984-44.304-98.753-23.533\n                c-15.773,9.702-27.187,25.125-31.855,43.045c-32.24-14.554-70.174-0.216-84.728,32.024c-3.733,8.27-5.667,17.239-5.672,26.312\n                c-0.001,2.841,0.183,5.679,0.552,8.496c-30.596,4.038-52.126,32.114-48.089,62.711c1.699,12.871,7.826,24.748,17.329,33.593\n                c-0.968,1.112-1.968,2.208-2.848,3.376c-9.725,12.535-14.984,27.959-14.944,43.824c0.044,39.746,32.254,71.956,72,72h304\n                c2.968,0,5.848-0.088,8.656-0.344C441.927,403.124,484.553,352.932,479.886,295.684z M26.129,221.604\n                c7.582-8.556,18.462-13.458,29.894-13.47h0.624c0.266-0.015,0.534-0.015,0.8,0c2.667,0.305,5.308-0.761,7.016-2.832\n                c1.71-2.058,2.277-4.836,1.512-7.4c-1.307-4.472-1.964-9.109-1.952-13.768c0.026-26.499,21.501-47.974,48-48\n                c9.913-0.056,19.591,3.024,27.648,8.8c3.587,2.579,8.586,1.761,11.165-1.826c0.841-1.17,1.351-2.546,1.475-3.982\n                c2.821-30.089,28.903-52.58,59.08-50.944c13.49,0.771,26.233,6.444,35.832,15.952c-0.504,0-0.992,0.08-1.496,0.088h-0.32\n                c-3.719,0.099-7.431,0.393-11.12,0.88l-0.432,0.072c-3.604,0.486-7.18,1.164-10.712,2.032l-0.592,0.152\n                c-3.411,0.852-6.775,1.88-10.08,3.08l-0.928,0.336c-3.12,1.168-6.173,2.483-9.16,3.944c-0.464,0.224-0.928,0.432-1.384,0.664\n                c-2.768,1.408-5.464,2.952-8.104,4.608c-0.6,0.368-1.208,0.712-1.792,1.088c-2.48,1.6-4.88,3.392-7.2,5.24\n                c-0.632,0.496-1.288,0.936-1.912,1.448c-2.888,2.365-5.649,4.88-8.272,7.536c-6.617,6.677-12.243,14.269-16.704,22.544v-0.048\n                l-0.064,0.096c-0.24,0.372-0.452,0.763-0.632,1.168c-3.403,6.275-6.122,12.897-8.112,19.752\n                c-1.722,5.935-2.908,12.013-3.544,18.16c-0.446,3.703-0.66,7.43-0.64,11.16c0,0.536,0,1.072,0,1.6\n                c-17.084-3.419-34.815-1.227-50.552,6.248c-3.447,1.687-6.777,3.604-9.968,5.736c-1.901,1.226-3.711,2.587-5.416,4.072\n                c-3.011,2.367-5.84,4.955-8.464,7.744c-2.589,2.714-4.964,5.624-7.104,8.704c-5.353,7.614-9.328,16.108-11.744,25.096\n                c-3.514,1.066-6.929,2.434-10.208,4.088c-3.474,1.74-6.807,3.749-9.968,6.008c-0.336,0.232-0.736,0.4-1.064,0.64\n                C13.002,263.418,11.477,238.137,26.129,221.604z M383.287,391.846c-2.4,0.224-4.8,0.288-7.264,0.288h-304\n                c-30.913-0.035-55.965-25.087-56-56c-0.026-12.363,4.08-24.38,11.664-34.144c2.168-2.845,4.624-5.459,7.328-7.8\n                c3.841-3.377,8.12-6.221,12.72-8.456c3.689-1.837,7.583-3.23,11.6-4.152c3.019-0.73,5.342-3.141,5.96-6.184\n                c1.749-8.602,5.254-16.751,10.296-23.936c1.685-2.443,3.558-4.751,5.6-6.904c2.233-2.361,4.64-4.551,7.2-6.552\n                c1.263-1.086,2.599-2.083,4-2.984c2.56-1.721,5.233-3.268,8-4.632c2.027-0.953,4.102-1.802,6.216-2.544\n                c1.536-0.544,3.104-0.976,4.68-1.4c0.528-0.144,1.04-0.32,1.6-0.448c1.68-0.408,3.376-0.712,5.072-0.984\n                c0.48-0.072,0.96-0.176,1.44-0.24c1.528-0.208,3.064-0.328,4.6-0.424c0.8-0.048,1.536-0.112,2.312-0.128\n                c1.504-0.048,2.992,0,4.48,0c0.536,0,1.072,0,1.6,0.072c1.496,0.096,2.968,0.264,4.432,0.464c0.552,0.072,1.112,0.128,1.656,0.216\n                c1.504,0.248,2.992,0.584,4.464,0.944c0.464,0.112,0.936,0.192,1.4,0.312c1.897,0.509,3.766,1.115,5.6,1.816\n                c4.122,1.591,8.753-0.46,10.344-4.582c0.487-1.26,0.646-2.624,0.464-3.962c-0.504-3.768-0.747-7.566-0.728-11.368\n                c-0.018-3.104,0.153-6.205,0.512-9.288c0.545-5.249,1.551-10.44,3.008-15.512c1.72-5.938,4.094-11.667,7.08-17.08\n                c0.056-0.104,0.112-0.208,0.16-0.312c0.048-0.104,0.192-0.336,0.28-0.512c3.749-6.938,8.475-13.301,14.032-18.896\n                c16.539-16.954,39.244-26.479,62.928-26.4c2.664,0,5.32,0.152,7.888,0.36c2.296,0.224,4.528,0.504,6.744,0.936l0.456,0.072\n                c1.514,0.19,3.017,0.457,4.504,0.8c39.921,9.328,68.221,44.836,68.408,85.832c0,1.728-0.08,3.456-0.152,5.176\n                c-0.191,4.414,3.233,8.147,7.647,8.338c1.04,0.045,2.078-0.113,3.057-0.466c9.45-3.376,19.414-5.084,29.448-5.048\n                c48.601-0.084,88.068,39.247,88.152,87.848C464.254,349.884,429.039,388.136,383.287,391.846z"}})])])])]),e("h2",{staticClass:"text-3xl font-medium title-font text-gray-900 mt-5 text-center"},[t._v("Cloud Architecture")]),e("p",{staticClass:"text-lg text-gray-800 leading-relaxed mt-2 text-center"},[t._v("Since there is a lot of data, we need a lot of computers. AWS allows us to spin up hundreds of them at a single time to process data in parallel, utilizing the same bioinformatics pipeline on each of them. Serratus is currently operational, scaling up to 250 nodes with real time tracking and cluster performance analysis, but we are not stopping there..")])]),e("div",{staticClass:"p-4 md:w-1/3 sm:mb-0 mb-6"},[e("div",{staticClass:"h-64 mx-auto bg-blue-400 border-8 border-blue-700 p-16 w-64 rounded-full mb-48 flex justify-center relative"},[e("div",{staticClass:"w-full-h-full absolute",staticStyle:{left:"50%",top:"95%",transform:"translateX(-50%)"}},[e("svg",{staticClass:"h-32 p-3 w-auto mx-auto fill-current text-blue-700",staticStyle:{"enable-background":"new 0 0 512 512"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",viewBox:"0 0 512 512","xml:space":"preserve"}},[e("g",[e("g",[e("path",{attrs:{d:"M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20    c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285    l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018    l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z"}})])])])]),e("svg",{staticClass:"fill-current text-white h-full w-auto",staticStyle:{"enable-background":"new 0 0 480.119 480.119",transform:"translateY(-10px)"},attrs:{version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 480.119 480.119","xml:space":"preserve"}},[e("g",[e("g",[e("path",{attrs:{d:"M423.239,120.119c-5.838-0.005-11.642,0.888-17.208,2.648c0.528-4.195,0.795-8.42,0.8-12.648\n              C405.792,48.272,354.813-1.023,292.965,0.016c-45.131,0.758-85.397,28.534-102.134,70.455\n              C158.463,50.4,115.953,60.37,95.883,92.738c-6.534,10.537-10.106,22.641-10.34,35.037c-8.714-5.031-18.602-7.673-28.664-7.656\n              c-30.928,0-56,25.072-56,56c0,30.928,25.072,56,56,56c4.418,0,8-3.582,8-8s-3.582-8-8-8\n              c-22.089-0.359-39.704-18.556-39.345-40.645c0.359-22.089,18.556-39.704,40.645-39.345c13.446,0.219,25.882,7.179,33.1,18.525\n              c2.42,3.697,7.378,4.732,11.075,2.313c3.195-2.091,4.467-6.148,3.037-9.689c-2.519-6.076-3.834-12.583-3.872-19.16\n              c0.321-28.992,24.048-52.253,53.04-52c12.918,0.051,25.38,4.78,35.08,13.312c3.33,2.904,8.384,2.558,11.287-0.772\n              c0.787-0.902,1.361-1.97,1.681-3.124c14.638-50.936,67.796-80.361,118.731-65.723c40.442,11.622,68.595,48.236,69.437,90.307\n              c-0.034,8.386-1.205,16.729-3.48,24.8c-1.183,4.257,1.308,8.667,5.565,9.85c2.303,0.64,4.772,0.217,6.731-1.154\n              c6.92-4.88,15.181-7.498,23.648-7.496c22.091,0,40,17.909,40,40s-17.909,40-40,40c-4.418,0-8,3.582-8,8s3.582,8,8,8\n              c30.928,0,56-25.072,56-56C479.239,145.191,454.167,120.119,423.239,120.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M376.039,304.119h-272c-13.255,0-24,10.745-24,24v32c0,13.255,10.745,24,24,24h272c13.255,0,24-10.745,24-24v-32\n              C400.039,314.864,389.294,304.119,376.039,304.119z M384.039,360.119c0,4.418-3.582,8-8,8h-272c-4.418,0-8-3.582-8-8v-32\n              c0-4.418,3.582-8,8-8h272c4.418,0,8,3.582,8,8V360.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M353.847,328.615c-8.525,0.053-15.408,6.978-15.408,15.503c0.04,8.584,7.016,15.517,15.6,15.504\n              c8.563-0.053,15.461-7.037,15.408-15.6C369.394,335.46,362.41,328.562,353.847,328.615z M354.039,344.623\n              c-0.24,0-0.4-0.264-0.4-0.504l0.4-0.496V344.623z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M270.439,336.119h-152c-4.418,0-8,3.582-8,8s3.582,8,8,8h152c4.418,0,8-3.582,8-8S274.858,336.119,270.439,336.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M319.839,336.119h-21.28c-4.418,0-8,3.582-8,8s3.582,8,8,8h21.28c4.418,0,8-3.582,8-8S324.258,336.119,319.839,336.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M376.039,400.119h-272c-13.255,0-24,10.745-24,24v32c0,13.255,10.745,24,24,24h272c13.255,0,24-10.745,24-24v-32\n              C400.039,410.864,389.294,400.119,376.039,400.119z M384.039,456.119c0,4.418-3.582,8-8,8h-272c-4.418,0-8-3.582-8-8v-32\n              c0-4.418,3.582-8,8-8h272c4.418,0,8,3.582,8,8V456.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M353.847,424.615c-8.525,0.053-15.408,6.978-15.408,15.503c0.04,8.584,7.016,15.517,15.6,15.504\n              c8.563-0.053,15.461-7.037,15.408-15.6C369.394,431.46,362.41,424.562,353.847,424.615z M354.039,440.623\n              c-0.24,0-0.4-0.264-0.4-0.504l0.4-0.496V440.623z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M270.439,432.119h-152c-4.418,0-8,3.582-8,8s3.582,8,8,8h152c4.418,0,8-3.582,8-8S274.858,432.119,270.439,432.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M319.839,432.119h-21.28c-4.418,0-8,3.582-8,8s3.582,8,8,8h21.28c4.418,0,8-3.582,8-8S324.258,432.119,319.839,432.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M376.039,208.119h-272c-13.255,0-24,10.745-24,24v32c0,13.255,10.745,24,24,24h272c13.255,0,24-10.745,24-24v-32\n              C400.039,218.864,389.294,208.119,376.039,208.119z M384.039,264.119c0,4.418-3.582,8-8,8h-272c-4.418,0-8-3.582-8-8v-32\n              c0-4.418,3.582-8,8-8h272c4.418,0,8,3.582,8,8V264.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M366.935,245.935c-1.542-8.499-9.681-14.139-18.18-12.597c-4.027,0.73-7.607,3.01-9.972,6.349\n              c-2.375,3.352-3.303,7.517-2.576,11.56c1.346,7.447,7.825,12.865,15.392,12.872c0.874-0.001,1.746-0.073,2.608-0.216\n              c4.108-0.678,7.769-2.986,10.152-6.4C366.742,254.151,367.671,249.98,366.935,245.935z M351.191,248.751l0.36-0.632l0.04,1\n              C351.231,249.119,351.207,248.919,351.191,248.751z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M268.839,240.119h-152c-4.418,0-8,3.582-8,8s3.582,8,8,8h152c4.418,0,8-3.582,8-8S273.258,240.119,268.839,240.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M314.727,240.119h-21.28c-4.418,0-8,3.582-8,8s3.582,8,8,8h21.28c4.418,0,8-3.582,8-8S319.146,240.119,314.727,240.119z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M205.695,130.463l-24-24c-3.124-3.123-8.188-3.123-11.312,0l-24,24c-3.069,3.178-2.981,8.243,0.197,11.312\n              c3.1,2.994,8.015,2.994,11.115,0l10.344-10.344v52.688c0,4.418,3.582,8,8,8s8-3.582,8-8v-52.688l10.344,10.344\n              c3.178,3.069,8.243,2.981,11.312-0.197C208.689,138.478,208.689,133.563,205.695,130.463z"}})])]),e("g",[e("g",[e("path",{attrs:{d:"M333.499,154.463c-3.1-2.994-8.015-2.994-11.116,0l-10.344,10.344v-52.688c0-4.418-3.582-8-8-8s-8,3.582-8,8v52.688\n              l-10.344-10.344c-3.178-3.07-8.242-2.982-11.312,0.196c-2.994,3.1-2.994,8.015,0,11.116l24,24c3.124,3.123,8.188,3.123,11.312,0\n              l24-24C336.765,162.597,336.677,157.532,333.499,154.463z"}})])])])]),e("h2",{staticClass:"text-3xl font-medium title-font text-gray-900 mt-5 text-center"},[t._v("CoV Sequence Database")]),e("p",{staticClass:"text-lg text-gray-800 leading-relaxed mt-2 text-center"},[t._v("Once serratus is done, all resulting alignment files will be stored in a free, immediate access public database. It is our goal to provide accurate, honest data in order to continue the collaborative effort in fighting Covid-19.")])])])])])},M=[],S={props:{msg:String}},V=S,j=Object(u["a"])(V,z,M,!1,null,"65c795fd",null),B=j.exports,R=function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("div",{staticClass:"flex flex-col w-full"},[e("Home",{attrs:{id:"home"}}),e("Why",{attrs:{id:"about"}}),e("Info",{attrs:{id:"info"}})],1)},O=[],k=function(){var t=this,c=t.$createElement,n=t._self._c||c;return n("div",{staticClass:"h-screen flex flex-col items-center bg-blue-500 justify-center"},[n("img",{staticClass:"absolute top-0 h-full w-full",attrs:{src:e("de3f"),alt:"serratus home"}}),n("div",{staticClass:"flex flex-col z-10 items-center text-white "},[n("h1",{staticClass:"text-5xl font-semibold text-center"},[t._v("Welcome to Serratus!")]),t._m(0),n("a",{staticClass:"border border-white flex text-xl mt-16 justify-center items-center w-auto  px-6 py-2 mt-4 rounded-md hover:text-blue-600 hover:bg-white",attrs:{onClick:"window.open(this.href); return false",href:"https://github.com/ababaian/serratus"}},[n("svg",{staticClass:"fill-current h-6 w-6  mr-3",attrs:{xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"}})]),t._v("Join Us On GitHub")])])])},E=[function(){var t=this,c=t.$createElement,e=t._self._c||c;return e("h1",{staticClass:"text-xl font-light text-center"},[t._v("An open source, "),e("strong",[t._v(" ultra-deep ")]),t._v(" search for Novel Coronaviruses.")])}],U={},I=U,W=Object(u["a"])(I,k,E,!1,null,"b0facc76",null),X=W.exports,L={components:{Home:X,Why:y,Info:B}},N=L,Y=Object(u["a"])(N,R,O,!1,null,null,null),D=Y.exports,P=e("f13c");n["a"].use(P),n["a"].config.productionTip=!1,n["a"].use(x["a"]);var F=[{path:"/",component:D},{path:"/About",component:y},{path:"/Info",component:B}],K=new x["a"]({routes:F});new n["a"]({render:function(t){return t(m)},router:K}).$mount("#app")},afb5:function(t,c){t.exports="data:image/png;base64,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"},de3f:function(t,c,e){t.exports=e.p+"img/serratus.a7631f87.jpg"},def6:function(t,c,e){}});
//# sourceMappingURL=app.b3bf6ecc.js.map