import{a as p,n as v,Z as _,j as C,dh as L,e as c,p as R,q as o,R as T,f as j,z as x}from"./index-12050af9.js";var F=function(n){p(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.handleClick=function(e){var a=this.props,r=a.env,i=a.href,l=a.blank,s=a.body;r==null||r.tracker({eventType:"url",eventData:{url:i,blank:l,label:s}},this.props)},t.prototype.getHref=function(){},t.prototype.render=function(){var e=this.props,a=e.className,r=e.style,i=e.body,l=e.href;e.classnames;var s=e.blank,h=e.disabled,u=e.htmlTarget,f=e.data,y=e.render,b=e.translate,k=e.title,m=e.icon,g=e.rightIcon,d=(typeof l=="string"&&l?v(l,f,"| raw"):void 0)||_(this.props);return C(L,{className:a,style:r,href:d,disabled:h,title:k,htmlTarget:u||(s?"_blank":"_self"),icon:m,rightIcon:g,onClick:this.handleClick,children:i?y("body",i):d||b("link")})},t.defaultProps={blank:!0,disabled:!1,htmlTarget:""},c([R,o("design:type",Function),o("design:paramtypes",[Object]),o("design:returntype",void 0)],t.prototype,"handleClick",null),t}(T.Component),N=function(n){p(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t=c([j({type:"link"}),x],t),t}(F);export{F as LinkCmpt,N as LinkFieldRenderer};
