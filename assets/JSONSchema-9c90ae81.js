import{bz as s,bA as c,a as r,b as l,R as o,d,e as i,n as u,o as a,F as p}from"./index-cf399bba.js";var h=s({sourceField:"schema",injectedPropsFilter:function(n,t){return{schema:n.config,loading:n.loading}}})(c),m=function(n){r(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.controlRef=function(e){for(;e!=null&&e.getWrappedInstance;)e=e.getWrappedInstance();this.control=e},t.prototype.validate=function(){var e;return(e=this.control)===null||e===void 0?void 0:e.validate()},t.prototype.render=function(){var e=l(this.props,[]);return o.createElement(h,d({},e,{ref:this.controlRef}))},i([u,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],t.prototype,"controlRef",null),t}(o.PureComponent),g=function(n){r(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t=i([p({type:"json-schema",strictMode:!1})],t),t}(m);export{g as JSONSchemaRenderer,m as default};
