import{a as m,W as l,i as u,r as f,s as h,h as _,j as v,R as d,dj as w,e as y,f as C,_ as k,u as R}from"./index-cf399bba.js";function g(){return k(()=>import("./Markdown-677ef196.js"),["./Markdown-677ef196.js","./index-cf399bba.js","./index-03ea497b.css"],import.meta.url).then(function(o){return o.default})}var E=function(o){m(n,o);function n(e){var t=o.call(this,e)||this,a=t.props,r=a.name,i=a.data,s=a.src;if(s)t.state={content:""},t.updateContent();else{var c=l(t.props)||(r&&u(r)?f(r,i,"| raw"):null);t.state={content:c}}return t}return n.prototype.componentDidUpdate=function(e){var t=this.props;t.src?h(e.src,t.src,e.data,t.data)&&this.updateContent():this.updateContent()},n.prototype.updateContent=function(){return _(this,void 0,void 0,function(){var e,t,a,r,i,s,c;return v(this,function(p){switch(p.label){case 0:return e=this.props,t=e.name,a=e.data,r=e.src,i=e.env,r&&R(r,a)?[4,i.fetcher(r,a)]:[3,2];case 1:return s=p.sent(),typeof s=="string"?this.setState({content:s}):typeof s=="object"&&s.data?this.setState({content:s.data}):console.error("markdown response error",s),[3,3];case 2:c=l(this.props)||(t&&u(t)?f(t,a,"| raw"):null),c!==this.state.content&&this.setState({content:c}),p.label=3;case 3:return[2]}})})},n.prototype.render=function(){var e=this.props,t=e.className,a=e.style,r=e.classnames,i=e.options;return d.createElement("div",{className:r("Markdown",t),style:a},d.createElement(w,{getComponent:g,content:this.state.content||"",options:i}))},n}(d.Component),A=function(o){m(n,o);function n(){return o!==null&&o.apply(this,arguments)||this}return n=y([C({type:"markdown"})],n),n}(E);export{E as Markdown,A as MarkdownRenderer};
