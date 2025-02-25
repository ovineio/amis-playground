import{a as c,aI as B,d as l,R as i,M as C,N as E,e as v,f as b}from"./index-cf399bba.js";var k=function(n){c(t,n);function t(e){return n.call(this,e)||this}return t.prototype.render=function(){var e=this.props,s=e.items,a=e.direction,m=e.justify,u=e.alignItems,g=e.alignContent,N=e.style,I=e.className,F=e.render,R=e.disabled,S=e.data,o=e.id,f=e.wrapperCustomStyle,w=e.env,h=e.themeCss,_=e.classnames,j=B(N,S),r=l({display:"flex",flexDirection:a,justifyContent:m,alignItems:u,alignContent:g},j);if(r.flexBasis!==void 0&&r.flex){var p=r.flex.split(" ");r.flex="".concat(p[0]," ").concat(p[1]||p[0]," ").concat(r.flexBasis)}return i.createElement("div",{style:r,className:_("Flex",I,C(l(l({},this.props),{name:"baseControlClassName",id:o,themeCss:h})),C(l(l({},this.props),{name:"wrapperCustomStyle",id:o,themeCss:f}))),"data-id":o,"data-role":"container"},(Array.isArray(s)?s:s?[s]:[]).map(function(d,x){var y;return F("flexItem/".concat(x),d,{key:"flexItem/".concat(x),disabled:(y=d==null?void 0:d.disabled)!==null&&y!==void 0?y:R})}),i.createElement(E,l({},this.props,{config:{wrapperCustomStyle:f,id:o,themeCss:h,classNames:[{key:"baseControlClassName"}]},env:w})))},t.defaultProps={direction:"row",justify:"center",alignItems:"stretch",alignContent:"center"},t}(i.Component),z=function(n){c(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.renderBody=function(){var e=this.props,s=e.children,a=e.body,m=e.render,u=e.disabled;return s?typeof s=="function"?s(this.props):s:a?m("body",a,{disabled:u}):null},t.prototype.render=function(){var e=this.props,s=e.className;e.size,e.classnames;var a=e.style;return i.createElement("div",{className:s,style:a},this.renderBody())},t.propsList=["body","className","children"],t}(i.Component),L=function(n){c(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t=v([b({type:"flex"})],t),t}(k),M=function(n){c(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t=v([b({type:"flex-item"})],t),t}(z);export{z as FlexItem,M as FlexItemRenderer,L as FlexRenderer,k as default};
