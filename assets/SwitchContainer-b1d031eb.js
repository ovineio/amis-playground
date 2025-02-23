import{a as g,j as f,J as E,l as N,U as b,d as c,aL as x,V as j,e as o,p as d,q as a,R as M,f as I}from"./index-12050af9.js";var L=function(r){g(t,r);function t(s){var e=r.call(this,s)||this;return e.state={activeIndex:-1},e}return t.prototype.componentDidUpdate=function(s){var e=this.props.items||[];this.state.activeIndex>0&&!e[this.state.activeIndex]&&this.setState({activeIndex:0})},t.prototype.handleClick=function(s){var e=this.props,n=e.dispatchEvent,i=e.data;n(s,i)},t.prototype.handleMouseEnter=function(s){var e=this.props,n=e.dispatchEvent,i=e.data;n(s,i)},t.prototype.handleMouseLeave=function(s){var e=this.props,n=e.dispatchEvent,i=e.data;n(s,i)},t.prototype.renderBody=function(s){var e=this.props,n=e.children,i=e.render,p=e.disabled,l=s==null?void 0:s.body,h=n?typeof n=="function"?n(this.props):n:l?i("body",l,{disabled:p}):null;return f("div",{style:{display:"inline"},children:h})},t.prototype.switchTo=function(s){var e=this.props.items||[];s>=0&&s<e.length&&this.setState({activeIndex:s})},t.prototype.render=function(){var s,e=this.props,n=e.className,i=e.items,p=i===void 0?[]:i,l=e.classnames,h=e.style,y=e.data,u=e.id,v=e.wrapperCustomStyle,_=e.env,m=e.themeCss,C=(s=p[this.state.activeIndex])!==null&&s!==void 0?s:p.find(function(w){return E(w,y)}),S=N("div",{className:l("SwitchContainer",n,b(c(c({},this.props),{name:"baseControlClassName",id:u,themeCss:m})),b(c(c({},this.props),{name:"wrapperCustomStyle",id:u,themeCss:v}))),onClick:this.handleClick,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,style:x(h,y),"data-role":"container",children:[C&&this.renderBody(C),f(j,{config:{wrapperCustomStyle:v,id:u,themeCss:m,classNames:[{key:"baseControlClassName"}]},env:_})]});return S},t.propsList=["body","className"],t.defaultProps={className:""},o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleClick",null),o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleMouseEnter",null),o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"handleMouseLeave",null),o([d,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",Object)],t.prototype,"renderBody",null),o([d,a("design:type",Function),a("design:paramtypes",[Number]),a("design:returntype",void 0)],t.prototype,"switchTo",null),t}(M.Component),F=function(r){g(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t=o([I({type:"switch-container"})],t),t}(L);export{F as SwitchContainerRenderer,L as default};
