import{a as W,h as H,k as J,r as P,E as z,l as N,G as A,j as l,I as _,J as K,K as L,M as Q,d as p,N as U,O as V,P as q,Q as X,T as Y,U as B,n as Z,V as ee,R as te,e as oe,f as se}from"./index-12050af9.js";var ie=function(m){W(s,m);function s(e){var t=m.call(this,e)||this;return t.state={isOpened:!1},t.open=t.open.bind(t),t.close=t.close.bind(t),t.toogle=t.toogle.bind(t),t.keepOpen=t.keepOpen.bind(t),t.domRef=t.domRef.bind(t),t}return s.prototype.componentDidMount=function(){this.props.defaultIsOpened&&this.setState({isOpened:!0})},s.prototype.domRef=function(e){this.target=e},s.prototype.toogle=function(e){e.preventDefault(),e.stopPropagation(),this.setState({isOpened:!this.state.isOpened})},s.prototype.open=function(){return H(this,void 0,void 0,function(){var e,t,o,a,i,d,n;return J(this,function(r){switch(r.label){case 0:return e=this.props,t=e.dispatchEvent,o=e.data,a=e.buttons,i=e.disabled,d=e.btnDisabled,i||d?[2]:(n=typeof a=="string"?P(a,o,"| raw"):a,[4,t("mouseenter",z(o,{items:n}))]);case 1:return r.sent(),this.setState({isOpened:!0}),[2]}})})},s.prototype.close=function(e){var t=this,o,a,i=this.props,d=i.buttons,n=i.data,r=typeof d=="string"?P(d,n,"| raw"):d;this.timer=setTimeout(function(){t.props.dispatchEvent("mouseleave",z(t.props.data,{items:r})),t.setState({isOpened:!1})},200),!((a=(o=e==null?void 0:e.target)===null||o===void 0?void 0:o.getAttribute)===null||a===void 0)&&a.call(o,"download")||e&&e.preventDefault()},s.prototype.keepOpen=function(){this.timer&&clearTimeout(this.timer)},s.prototype.renderButton=function(e,t){var o,a=this,i=this.props,d=i.render,n=i.classnames,r=i.data,h=i.ignoreConfirm,u=i.testIdBuilder;return t=typeof t=="number"?t.toString():t,typeof e!="string"&&Array.isArray(e==null?void 0:e.children)?N("div",{className:n("DropDown-menu",{"is-mobile":A()}),children:[N("li",{className:n("DropDown-groupTitle"),children:[e.icon?l(_,{cx:n,icon:e.icon,className:"m-r-xs"}):null,l("span",{children:e.label})]},"".concat(t,"/0")),e.children.map(function(v,f){return a.renderButton(v,"".concat(t,"/").concat(f+1))})]},t):typeof e!="string"&&!K(e,r)?null:e==="divider"||e.type==="divider"?l("li",{className:n("DropDown-divider")},t):l("li",{className:n("DropDown-button",(o={},o["is-disabled"]=L(e,r),o),typeof e.level>"u"?"":e.level?"Button--".concat(e.level):"",Q(e.className,r)),children:d("button/".concat(t),p(p({type:"button"},e),{className:"",testIdBuilder:u==null?void 0:u.getChild(e.label||t,r)}),{isMenuItem:!0,ignoreConfirm:h})},t)},s.prototype.renderOuter=function(){var e=this,t,o=this.props,a=o.render,i=o.buttons,d=o.data,n=o.popOverContainer,r=o.classnames,h=o.classPrefix,u=o.children,v=o.body;o.align;var f=o.closeOnClick,k=o.closeOnOutside,g=o.menuClassName,b=o.overlayPlacement,R=o.trigger,C=typeof i=="string"?P(i,d,"| raw"):i,D=l(U,{disabled:!this.state.isOpened,onRootClose:k!==!1?this.close:V,children:function(c){return l("ul",{className:r("DropDown-menu-root","DropDown-menu",{"is-mobile":A()},g),onClick:f?e.close:V,onMouseEnter:e.keepOpen,ref:c,children:u||(v?a("body",v):Array.isArray(C)?C.map(function(I,T){return e.renderButton(I,T)}):null)})}});return n?l(q,{container:n,target:function(){return e.target},placement:b,show:!0,children:l(X,{overlay:R!=="hover",onHide:this.close,classPrefix:h,className:r("DropDown-popover",g),style:{minWidth:(t=this.target)===null||t===void 0?void 0:t.offsetWidth},children:D})}):D},s.prototype.render=function(){var e=this.props,t=e.tooltip,o=e.placement,a=e.tooltipContainer,i=e.tooltipTrigger,d=e.tooltipRootClose,n=e.disabledTip,r=e.block,h=e.disabled,u=e.btnDisabled,v=e.btnClassName,f=e.size,k=f===void 0?"default":f,g=e.label,b=e.level,R=e.primary,C=e.className,D=e.style,c=e.classnames,I=e.align,T=e.iconOnly,$=e.icon,M=e.rightIcon,F=e.isActived,E=e.trigger,j=e.data,G=e.hideCaret,O=e.env,S=e.testIdBuilder,y=e.id,x=e.wrapperCustomStyle,w=e.themeCss;return N("div",{className:c("DropDown ",{"DropDown--block":r,"DropDown--alignRight":I==="right","is-opened":this.state.isOpened,"is-actived":F,"is-mobile":A()},C),style:D,onMouseEnter:E==="hover"?this.open:function(){},onMouseLeave:E==="hover"?this.close:function(){},ref:this.domRef,children:[l(Y,{placement:o,tooltip:h?n:t,container:a||(O==null?void 0:O.getModalContainer),trigger:i,rootClose:d,children:N("button",{...p({onClick:this.toogle,disabled:h||u},S==null?void 0:S.getTestId(j),{className:c("Button",v,typeof b>"u"?"Button--default":b?"Button--".concat(b):"",{"Button--block":r,"Button--primary":R,"Button--iconOnly":T},"Button--size-".concat(k),B(p(p({},this.props),{name:"wrapperCustomStyle",id:y,themeCss:x})),B(p(p({},this.props),{name:"className",id:y,themeCss:w})))}),children:[l(_,{c,icon:$,className:c("icon m-r-xs",B(p(p({},this.props),{name:"iconClassName",id:y,themeCss:w})))}),typeof g=="string"?Z(g,j):g,M&&l(_,{cx:c,icon:M,className:c("icon m-l-xs",B(p(p({},this.props),{name:"iconClassName",id:y,themeCss:w})))}),G?null:l("span",{className:c("DropDown-caret"),children:l(_,{icon:"right-arrow-bold",className:"icon"})})]})}),this.state.isOpened?this.renderOuter():null,l(ee,{...p({},this.props,{config:{themeCss:w,classNames:[{key:"className",weights:{hover:{suf:":not(:disabled):not(.is-disabled)"},active:{suf:":not(:disabled):not(.is-disabled)"}}},{key:"iconClassName",weights:{default:{important:!0},hover:{important:!0,suf:":not(:disabled):not(.is-disabled)"},active:{important:!0,suf:":not(:disabled):not(.is-disabled)"}}}],wrapperCustomStyle:x,id:y},env:O})})]})},s.defaultProps={placement:"top",tooltipTrigger:["hover","focus"],tooltipRootClose:!1,overlayPlacement:"auto"},s}(te.Component),re=function(m){W(s,m);function s(){return m!==null&&m.apply(this,arguments)||this}return s=oe([se({type:"dropdown-button"})],s),s}(ie);export{re as DropDownButtonRenderer,ie as default};
