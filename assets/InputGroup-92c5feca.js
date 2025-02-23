import{a as g,a2 as F,d as H,as as G,aj as M,am as k,cM as A,j as y,R as D,e as z,C as B}from"./index-12050af9.js";var O=function(l){g(t,l);function t(o){var r=l.call(this,o)||this;return r.toDispose=[],r.handleFocus=r.handleFocus.bind(r),r.handleBlur=r.handleBlur.bind(r),r.validateHook=r.validateHook.bind(r),r.state={isFocused:!1},r}return t.prototype.componentDidMount=function(){var o=this.props,r=o.addHook,e=o.name;e&&r&&this.toDispose.push(r(this.validateHook,"validate"))},t.prototype.componentDidUpdate=function(o){var r;F(["errorCode","delimiter"],o==null?void 0:o.validationConfig,(r=this.props)===null||r===void 0?void 0:r.validationConfig)&&this.validateHook()},t.prototype.componentWillUnmount=function(){this.toDispose.forEach(function(o){return o()}),this.toDispose=[]},t.prototype.getValidationConfig=function(){var o=this.props.validationConfig;return{errorMode:(o==null?void 0:o.errorMode)!=="partial"?"full":"partial",delimiter:o!=null&&o.delimiter&&typeof o.delimiter=="string"?o.delimiter:"; "}},t.prototype.validateHook=function(){var o,r=this.props,e=r.formStore,n=r.formItem,d=r.name,f=this.getValidationConfig().delimiter;if(d){var i=(o=e==null?void 0:e.inputGroupItems)===null||o===void 0?void 0:o[d];if(Array.isArray(i)){var h=i.map(function(s,c){if(s.errors.length<=0)return"";var m=s.label?"(".concat(c+1,")").concat(s.label):"(".concat(c+1,")");return"".concat(m,": ").concat(s.errors.join(f))}).filter(Boolean);n&&n.setError(h)}}},t.prototype.handleFocus=function(){this.setState({isFocused:!0})},t.prototype.handleBlur=function(){this.setState({isFocused:!1})},t.prototype.renderControl=function(o,r,e){var n=this.props,d=n.render,f=n.onChange;if(!o)return null;var i=o;return d("".concat(r),i,H({onChange:f},e))},t.prototype.validate=function(){var o=this.props.formItem,r=[];return o==null||o.subFormItems.forEach(function(e){e.errors.length&&r.push.apply(r,G([],M(e.errors),!1))}),r.length?r:""},t.prototype.render=function(){var o=this,r=this.props,e=r.body,n=r.controls,d=r.className;r.style,r.mode;var f=r.horizontal;r.formMode;var i=r.formHorizontal,h=r.data,s=r.classnames,c=r.static,m=r.disabled,b=r.mobileUI,C=this.getValidationConfig().errorMode,u=Array.isArray(n)?n:e;Array.isArray(u)||(u=[]),u=u.filter(function(a){if(a&&(a.hidden||a.visible===!1))return!1;var p=k(a||{},h);return!(p.hidden||p.visible===!1)});var I=f||(i?A(i,u.length):void 0);return y("div",{className:s("InputGroup","InputGroup-validation--".concat(C),d,{"is-focused":this.state.isFocused},{"is-mobile":b}),children:u.map(function(a,p){var _=~["icon","plain","tpl","button","submit","reset"].indexOf(a&&a.type),v=o.renderControl(a,p,{formHorizontal:I,formMode:"normal",inputOnly:!0,inputGroupControl:{name:o.props.name,path:o.props.$path,schema:o.props.$schema},key:p,static:c,disabled:m,onFocus:o.handleFocus,onBlur:o.handleBlur});return _?y("span",{className:s(a.addOnclassName,~["button","submit","reset"].indexOf(a&&a.type)?"InputGroup-btn":"InputGroup-addOn"),children:v},p):v})})},t.defaultProps={validationConfig:{errorMode:"full",delimiter:"; "}},t}(D.Component),x=function(l){g(t,l);function t(){return l!==null&&l.apply(this,arguments)||this}return t=z([B({type:"input-group",strictMode:!1})],t),t}(O);export{O as InputGroup,x as default};
