(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37a7412e"],{"615b":function(t,e,i){},"6ece":function(t,e,i){},b5b6:function(t,e,i){},d123:function(t,e,i){t.exports=i.p+"img/PolitechnikaPoznanska.c9eceb7a.png"},fd2d:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-footer",{attrs:{color:"primary"}},[i("v-card",{staticClass:"primary white--text text-center",attrs:{flat:"",tile:""}},[i("v-card-text",t._l(t.socialMedia,(function(e){return i("v-btn",{key:e.icon,staticClass:"mx-4 white--text",attrs:{icon:"",href:e.link}},[i("v-icon",{attrs:{size:"24px",color:"accent"}},[t._v(t._s(e.icon))])],1)})),1),i("v-row",[i("v-col",{staticClass:"px-5",attrs:{cols:"12",md:"9"}},[i("v-card-text",{staticClass:"white--text pt-0 text-left"},[t._v(" Description ")]),i("v-card-text",{staticClass:"white--text pt-0 text-left"},[t._v(" Made with 💖 using "),i("strong",{staticClass:"accent--text"},[t._v("Vue")]),t._v(" and "),i("strong",{staticClass:"accent--text"},[t._v("Vuetify.")])])],1),i("v-col",{staticClass:"max-height pt-0",attrs:{cols:"12",md:"3"}},[i("v-img",{attrs:{src:t.ppLogo,alt:"Politechnika Poznańska Logo",height:"80",contain:""}})],1)],1),i("v-divider"),i("v-card-text",{staticClass:"white--text"},[t._v(" "+t._s((new Date).getFullYear())+" — "),i("strong",[t._v(" © "),i("a",{staticClass:"font-weight-light white--text",attrs:{href:"mailto:wojciech.kasperski97@gmail.com"}},[t._v(" Wojciech Kasperski ")]),t._v(" , Jakub Werwiński ")])])],1)],1)},a=[],r={name:"Footer",data:function(){return{socialMedia:[{icon:"mdi-github",link:"https://github.com/SuddenlyPineapple"},{icon:"mdi-vuejs",link:"https://vuejs.org/"},{icon:"mdi-vuetify",link:"https://vuetifyjs.com/en/"}],ppLogo:i("d123")}}},n=r,o=i("2877"),c=i("6544"),l=i.n(c),h=i("8336"),d=i("5530"),u=(i("a9e3"),i("0481"),i("4069"),i("615b"),i("10d2")),p=i("2b0e"),g=i("ade3"),f=(i("c7cd"),i("6ece"),i("0789")),v=i("90a2"),m=i("a9ad"),b=i("fe6c"),_=i("a452"),y=i("7560"),k=i("80d2"),B=i("58df"),C=Object(B["a"])(m["a"],Object(b["b"])(["absolute","fixed","top","bottom"]),_["a"],y["a"]),x=C.extend({name:"v-progress-linear",directives:{intersect:v["a"]},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data:function(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground:function(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar:function(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType:function(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer:function(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate:function(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:Object(k["g"])(this.normalizedValue,"%")}}))},__cachedIndeterminate:function(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream:function(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:Object(k["g"])(100-this.normalizedBuffer,"%")}})):null},backgroundStyle:function(){var t,e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return t={opacity:e},Object(g["a"])(t,this.isReversed?"right":"left",Object(k["g"])(this.normalizedValue,"%")),Object(g["a"])(t,"width",Object(k["g"])(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")),t},classes:function(){return Object(d["a"])({"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible},this.themeClasses)},computedTransition:function(){return this.indeterminate?f["b"]:f["c"]},isReversed:function(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer:function(){return this.normalize(this.bufferValue)},normalizedValue:function(){return this.normalize(this.internalLazyValue)},reactive:function(){return Boolean(this.$listeners.change)},styles:function(){var t={};return this.active||(t.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(t.width=Object(k["g"])(this.normalizedBuffer,"%")),t}},methods:{genContent:function(){var t=Object(k["l"])(this,"default",{value:this.internalLazyValue});return t?this.$createElement("div",{staticClass:"v-progress-linear__content"},t):null},genListeners:function(){var t=this.$listeners;return this.reactive&&(t.click=this.onClick),t},genProgressBar:function(t){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:Object(g["a"])({},t,!0)}))},onClick:function(t){if(this.reactive){var e=this.$el.getBoundingClientRect(),i=e.width;this.internalValue=t.offsetX/i*100}},onObserve:function(t,e,i){this.isVisible=i},normalize:function(t){return t<0?0:t>100?100:parseFloat(t)}},render:function(t){var e={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?Object(k["g"])(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return t("div",e,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),j=x,O=p["a"].extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress:function(){return!1===this.loading?null:this.$slots.progress||this.$createElement(j,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}}),w=i("1c87"),V=Object(B["a"])(O,w["a"],u["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(d["a"])(Object(d["a"])({"v-card":!0},w["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},u["a"].options.computed.classes.call(this))},styles:function(){var t=Object(d["a"])({},u["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=O.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),i=e.tag,s=e.data;return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(i,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}}),$=(Object(k["h"])("v-card__actions"),Object(k["h"])("v-card__subtitle"),Object(k["h"])("v-card__text")),z=(Object(k["h"])("v-card__title"),i("62ad")),P=i("ce7e"),S=(i("b5b6"),i("8dd9")),E=i("3a66"),L=i("d10f"),N=Object(B["a"])(S["a"],Object(E["a"])("footer",["height","inset"]),L["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(d["a"])(Object(d["a"])({},S["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(d["a"])(Object(d["a"])({},S["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(k["g"])(t),left:Object(k["g"])(this.computedLeft),right:Object(k["g"])(this.computedRight),bottom:Object(k["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),R=i("132d"),F=i("adda"),I=i("0fd9"),T=Object(o["a"])(n,s,a,!1,null,null,null);e["default"]=T.exports;l()(T,{VBtn:h["a"],VCard:V,VCardText:$,VCol:z["a"],VDivider:P["a"],VFooter:N,VIcon:R["a"],VImg:F["a"],VRow:I["a"]})}}]);
//# sourceMappingURL=chunk-37a7412e.7fae1e89.js.map