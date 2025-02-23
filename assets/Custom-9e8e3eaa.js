import{a0 as U,as as C,aj as y,a as c,R as p,a3 as a,aO as f,aP as g,j as v,e as M,f as E}from"./index-12050af9.js";var m=U(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return new(Function.bind.apply(Function,C([void 0],y(e),!1)))},function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return JSON.stringify(e)}),O=function(e){c(t,e);function t(n){var o=e.call(this,n)||this;return o.onUpdate=function(){},o.onMount=function(){},o.onUnmount=function(){},o.childElemArr=[],o.dom=p.createRef(),o.initOnMount(n),o.initOnUpdate(n),o.initOnUnmount(n),o.renderChild=o.renderChild.bind(o),o.recordChildElem=o.recordChildElem.bind(o),o.unmountChildElem=o.unmountChildElem.bind(o),o}return t.prototype.initOnMount=function(n){n.onMount&&(typeof n.onMount=="string"?this.onMount=m("dom","value","onChange","props",n.onMount):this.onMount=n.onMount)},t.prototype.initOnUpdate=function(n){n.onUpdate&&(typeof n.onUpdate=="string"?this.onUpdate=m("dom","data","prevData","props",n.onUpdate):this.onUpdate=n.onUpdate)},t.prototype.initOnUnmount=function(n){n.onUnmount&&(typeof n.onUnmount=="string"?this.onUnmount=m("props",n.onUnmount):this.onUnmount=n.onUnmount)},t.prototype.componentDidUpdate=function(n){a(this.props.onUpdate,n.onUpdate)||this.initOnUpdate(this.props),(!a(this.props.onUpdate,n.onUpdate)||!a(this.props.data,n.data))&&this.onUpdate(this.dom,this.props.data,n.data,this.props),a(this.props.onMount,n.onMount)||this.initOnMount(this.props),a(this.props.onUnmount,n.onUnmount)||this.initOnUnmount(this.props)},t.prototype.componentDidMount=function(){var n=this.props,o=n.value,i=n.onChange;this.onMount(this.dom.current,o,i,this.props)},t.prototype.componentWillUnmount=function(){this.onUnmount(this.props),this.unmountChildElem()},t.prototype.recordChildElem=function(n){n&&!this.childElemArr.some(function(o){return o===n})&&this.childElemArr.push(n)},t.prototype.unmountChildElem=function(){this.childElemArr&&this.childElemArr.length>0&&this.childElemArr.forEach(function(n){return f.unmountComponentAtNode(n)})},t.prototype.renderChild=function(n,o,i){var s=this,l=this.props.render,u=null,r=null;if(g(i)){var d=document.getElementById(i);d&&(r=d)}else r=i;if(o&&r){var h=l(n,o);u=f.render(h,r,function(){s.recordChildElem(r)})}return u},t.prototype.render=function(){var n=this.props,o=n.className,i=n.style,s=n.html,l=n.id,u=n.wrapperComponent,r=n.inline;n.translate;var d=n.classnames,h=u||r?"span":"div";return v(h,{ref:this.dom,className:d(o),style:i,id:l,dangerouslySetInnerHTML:{__html:s||""}})},t.defaultProps={inline:!1},t}(p.Component),R=function(e){c(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t=M([E({type:"custom"})],t),t}(O);export{O as Custom,R as CustomRenderer};
