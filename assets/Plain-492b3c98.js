import{a as v,E as l,Z as C,j as h,n as x,e as o,p as d,q as a,R as M,f as _}from"./index-12050af9.js";var P=function(i){v(t,i);function t(){return i!==null&&i.apply(this,arguments)||this}return t.prototype.handleClick=function(e){var n=this.props,s=n.dispatchEvent,r=n.data;s("click",l(r,{nativeEvent:e}))},t.prototype.handleMouseEnter=function(e){var n=this.props,s=n.dispatchEvent,r=n.data;s(e,l(r,{nativeEvent:e}))},t.prototype.handleMouseLeave=function(e){var n=this.props,s=n.dispatchEvent,r=n.data;s(e,l(r,{nativeEvent:e}))},t.prototype.render=function(){var e=this.props,n=e.className,s=e.style,r=e.wrapperComponent,c=e.text,y=e.data,u=e.tpl,m=e.inline,f=e.placeholder,E=e.classnames,p=C(this.props),g=r||(m?"span":"div");return h(g,{className:E("PlainField",n),style:s,onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,children:u||c?x(u||c,y):typeof p>"u"||p===""||p===null?h("span",{className:"text-muted",children:f}):String(p)})},t.defaultProps={wrapperComponent:"",inline:!0,placeholder:"-"},o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleClick",null),o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleMouseEnter",null),o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleMouseLeave",null),t}(M.Component),b=function(i){v(t,i);function t(){return i!==null&&i.apply(this,arguments)||this}return t=o([_({type:"plain",alias:["text"],name:"plain"})],t),t}(P);export{P as Plain,b as PlainRenderer};
