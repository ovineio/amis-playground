import{a as g,h,j as l,R as f,cO as C,d as u,r as y,e as p,n as v,o as s,F as m}from"./index-cf399bba.js";var _=function(e){g(n,e);function n(){return e!==null&&e.apply(this,arguments)||this}return n.prototype.onFinish=function(r){return h(this,void 0,void 0,function(){var t,i,d,o;return l(this,function(a){switch(a.label){case 0:return t=this.props,i=t.dispatchEvent,d=t.data,[4,i("finish",u(u({},d),{value:r}),this)];case 1:return o=a.sent(),o!=null&&o.prevented?[2]:[2]}})})},n.prototype.onChange=function(r){return h(this,void 0,void 0,function(){var t,i,d,o,a;return l(this,function(c){switch(c.label){case 0:return t=this.props,i=t.onChange,d=t.data,o=t.dispatchEvent,[4,o("change",u(u({},d),{value:r}))];case 1:return a=c.sent(),a!=null&&a.prevented?[2]:(i==null||i(r),[2])}})})},n.prototype.render=function(){var r=this.props.separator;return f.createElement(C,u({},this.props,{separator:typeof r=="string"?function(t){return y(r,t)}:function(){},onFinish:this.onFinish,onChange:this.onChange}))},p([v,s("design:type",Function),s("design:paramtypes",[String]),s("design:returntype",Promise)],n.prototype,"onFinish",null),p([v,s("design:type",Function),s("design:paramtypes",[String]),s("design:returntype",Promise)],n.prototype,"onChange",null),n}(f.Component),E=function(e){g(n,e);function n(){return e!==null&&e.apply(this,arguments)||this}return n=p([m({type:"input-verification-code"})],n),n}(_);export{E as VerificationCodeControlRenderer,_ as default};
