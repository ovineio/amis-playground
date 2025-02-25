import{a as Q,a$ as xe,u as de,z as se,h as O,j as E,b0 as le,R as d,b1 as ce,l as K,d as v,M,aH as he,b2 as Oe,I as B,b3 as ve,S as Ee,O as Ne,P as Te,b4 as we,N as re,b5 as Ve,e as L,n as G,o as y,aX as Ie,b6 as oe,b7 as Se,an as Pe,V as N,ai as Fe}from"./index-cf399bba.js";var ue=function(f){Q(s,f);function s(t){var e=f.call(this,t)||this,n=t.value;return e.state={isOpen:!1,inputValue:t.multiple||t.creatable===!1?"":e.valueToString(n),isFocused:!1,revealPassword:!1},e.focus=e.focus.bind(e),e.clearValue=e.clearValue.bind(e),e.toggleRevealPassword=e.toggleRevealPassword.bind(e),e.inputRef=e.inputRef.bind(e),e.handleClick=e.handleClick.bind(e),e.handleFocus=e.handleFocus.bind(e),e.handleBlur=e.handleBlur.bind(e),e.handleInputChange=e.handleInputChange.bind(e),e.handleKeyDown=e.handleKeyDown.bind(e),e.handleChange=e.handleChange.bind(e),e.handleStateChange=e.handleStateChange.bind(e),e.loadAutoComplete=xe(e.loadAutoComplete.bind(e),250,{trailing:!0,leading:!1}),e}return s.prototype.componentDidMount=function(){var t=this,e=this.props,n=e.formItem,a=e.autoComplete,i=e.addHook,u=e.formInited,r=e.data,o=e.name;de(a,r)&&n&&(u?n.loadOptions(a,se(r,{term:""})):i&&(this.unHook=i(function(p){return O(t,void 0,void 0,function(){return E(this,function(l){switch(l.label){case 0:return[4,n.loadOptions(a,se(p,{term:""}))];case 1:return l.sent(),n.value&&Se(p,o,n.value),[2]}})})},"init")))},s.prototype.componentDidUpdate=function(t){var e=this.props;t.value!==e.value&&this.setState({inputValue:e.multiple||e.creatable===!1?"":this.valueToString(e.value)}),t.revealPassword!==e.revealPassword&&!e.revealPassword&&this.setState({revealPassword:!1})},s.prototype.componentWillUnmount=function(){this.unHook&&this.unHook()},s.prototype.inputRef=function(t){this.input=t},s.prototype.doAction=function(t,e,n,a){var i=t==null?void 0:t.actionType;i==="reset"?this.resetValue():i==="clear"?this.clearValue():i==="focus"?this.focus():i==="review"?this.setState({revealPassword:!0}):i==="encrypt"&&this.setState({revealPassword:!1})},s.prototype.focus=function(){if(this.input){this.input.focus();var t=this.input.value.length;t&&(this.input.type==="email"?(this.input.type="text",this.input.setSelectionRange(t,t),this.input.type="email"):this.input.setSelectionRange(t,t))}},s.prototype.resetValue=function(){var t,e;return O(this,void 0,void 0,function(){var n,a,i,u,r,o,p,l,c,m=this;return E(this,function(g){switch(g.label){case 0:return n=this.props,a=n.onChange,i=n.dispatchEvent,u=n.resetValue,r=n.formStore,o=n.store,p=n.name,l=(e=Pe((t=r==null?void 0:r.pristine)!==null&&t!==void 0?t:o==null?void 0:o.pristine,p))!==null&&e!==void 0?e:u,[4,i("change",N(this.props,{value:l}))];case 1:return c=g.sent(),c!=null&&c.prevented?[2]:(a(l),this.setState({inputValue:l},function(){m.loadAutoComplete()}),[2])}})})},s.prototype.clearValue=function(){return O(this,void 0,void 0,function(){var t,e,n,a,i,u,r,o=this;return E(this,function(p){switch(p.label){case 0:return t=this.props,e=t.onChange,n=t.dispatchEvent,a=t.clearValueOnEmpty,i=this.props.resetValue,a&&i===""&&(i=void 0),[4,n("clear",N(this.props,{value:i}))];case 1:return u=p.sent(),u!=null&&u.prevented?[2]:[4,n("change",N(this.props,{value:i}))];case 2:return r=p.sent(),r!=null&&r.prevented?[2]:(e(i),this.setState({inputValue:i},function(){o.loadAutoComplete()}),[2])}})})},s.prototype.removeItem=function(t){var e=this.props,n=e.selectedOptions,a=e.onChange,i=n.concat();i.splice(t,1),a(this.normalizeValue(i))},s.prototype.handleClick=function(){return O(this,void 0,void 0,function(){var t,e,n,a;return E(this,function(i){switch(i.label){case 0:return t=this.props,e=t.dispatchEvent,n=t.value,[4,e("click",N(this.props,{value:n}))];case 1:return a=i.sent(),a!=null&&a.prevented?[2]:(this.state.isFocused||this.focus(),this.setState({isOpen:!0}),[2])}})})},s.prototype.handleFocus=function(t){return O(this,void 0,void 0,function(){var e,n,a,i,u;return E(this,function(r){switch(r.label){case 0:return e=this.props,n=e.dispatchEvent,a=e.onFocus,i=e.value,this.setState({isOpen:!0,isFocused:!0}),[4,n("focus",N(this.props,{value:i}))];case 1:return u=r.sent(),u!=null&&u.prevented?[2]:(a==null||a(t),[2])}})})},s.prototype.handleBlur=function(t){return O(this,void 0,void 0,function(){var e,n,a,i,u,r,o,p=this;return E(this,function(l){switch(l.label){case 0:return e=this.props,n=e.onBlur,a=e.trimContents,i=e.value,u=e.onChange,r=e.dispatchEvent,this.setState({isFocused:!1},function(){if(a&&i&&typeof i=="string"){var c=i.trim();p.input&&(p.input.value=c),u(c)}}),[4,r("blur",N(this.props,{value:i}))];case 1:return o=l.sent(),o!=null&&o.prevented?[2]:(n&&n(t),[2])}})})},s.prototype.close=function(){this.setState({isFocused:!1})},s.prototype.handleInputChange=function(t){return O(this,void 0,void 0,function(){var e,n,a,i,u,r,o,p=this;return E(this,function(l){switch(l.label){case 0:return e=this.transformValue(t.currentTarget.value),n=this.props,a=n.creatable,i=n.multiple,u=n.onChange,r=n.dispatchEvent,[4,r("change",N(this.props,{value:e}))];case 1:return o=l.sent(),o!=null&&o.prevented?[2]:(this.setState({inputValue:e},function(){a!==!1&&!i&&(u==null||u(e)),p.loadAutoComplete()}),[2])}})})},s.prototype.handleKeyDown=function(t){var e;return O(this,void 0,void 0,function(){var n,a,i,u,r,o,p,c,l,c,m;return E(this,function(g){switch(g.label){case 0:return n=this.props,a=n.selectedOptions,i=n.onChange,u=n.multiple,r=n.creatable,o=n.dispatchEvent,p=((e=this.props)===null||e===void 0?void 0:e.valueField)||"value",a.length&&!this.state.inputValue&&t.keyCode===8?(t.preventDefault(),c=a.concat(),c.pop(),i(this.normalizeValue(c)),this.setState({inputValue:""},this.loadAutoComplete),[3,4]):[3,1];case 1:return t.key==="Enter"&&this.state.inputValue&&typeof this.highlightedIndex!="number"&&r!==!1?(t.preventDefault(),l=this.state.inputValue,u&&l&&(Fe(a,function(P){return P[p]==l})?l=this.normalizeValue(a).concat():(c=a.concat(),c.push({label:l,value:l}),l=this.normalizeValue(c).concat())),[4,o("enter",N(this.props,{value:l}))]):[3,3];case 2:return m=g.sent(),m!=null&&m.prevented?[2]:(i(l),this.setState({inputValue:u?"":l,isOpen:!1},this.loadAutoComplete),[3,4]);case 3:t.key==="Enter"&&this.state.isOpen&&typeof this.highlightedIndex!="number"&&this.setState({isOpen:!1}),g.label=4;case 4:return[2]}})})},s.prototype.handleChange=function(t){var e=this.props,n=e.onChange,a=e.multiple,i=e.options,u=e.selectedOptions,r=e.creatable,o=e.valueField,p=i.find(function(c){return c[o||"value"]===t});if(a){var l=u.concat();p&&l.push(p),n(this.normalizeValue(l))}else n(p?this.normalizeValue(p):t);(a||r===!1)&&this.setState({inputValue:""},this.loadAutoComplete)},s.prototype.handleStateChange=function(t){var e=this.props.creatable,n=this.props.multiple||this.props.multi;switch(t.type){case le.stateChangeTypes.itemMouseEnter:this.setState({isOpen:!0});break;case le.stateChangeTypes.changeInput:this.setState({isOpen:!0});break;default:var a={};typeof t.isOpen<"u"&&(a.isOpen=t.isOpen),typeof t.highlightedIndex<"u"&&(this.highlightedIndex=t.highlightedIndex),!n&&e===!1&&this.state.isOpen&&t.isOpen===!1&&(a.inputValue=""),this.setState(a);break}},s.prototype.handleNormalInputChange=function(t){return O(this,void 0,void 0,function(){var e,n,a,i,u,r,o;return E(this,function(p){switch(p.label){case 0:return e=this.props,n=e.onChange,a=e.dispatchEvent,i=e.trimContents,u=e.clearValueOnEmpty,r=this.transformValue(t.currentTarget.value),typeof r=="string"&&(i&&(r=r.trim()),u&&r===""&&(r=void 0)),[4,a("change",N(this.props,{value:r}))];case 1:return o=p.sent(),o!=null&&o.prevented?[2]:(n(r),[2])}})})},s.prototype.normalizeValue=function(t){var e=this.props,n=e.multiple,a=e.delimiter,i=e.joinValues,u=e.extractValue,r=e.valueField,o=Array.isArray(t)?t:t?[t]:[];if(i)return o.map(function(l){return l[r||"value"]}).join(a||",");if(u){var p=o.map(function(l){return l[r||"value"]});return n?p:p[0]}else return n?o:o[0]},s.prototype.transformValue=function(t){var e=this.props.transform;return e&&Object.keys(e).forEach(function(n){var a=e[n];switch(n){case"lowerCase":a&&(t=t.toLowerCase());break;case"upperCase":a&&(t=t.toUpperCase());break}}),t},s.prototype.loadAutoComplete=function(){var t=this.props,e=t.formItem,n=t.autoComplete,a=t.data;de(n,a)&&e&&e.loadOptions(n,se(a,{term:this.state.inputValue||""}),{extendsOptions:!0})},s.prototype.reload=function(){var t=this.props.reloadOptions;t&&t()},s.prototype.valueToString=function(t){return typeof t>"u"||t===null?"":typeof t=="string"?t:t instanceof Date?t.toISOString():JSON.stringify(t)},s.prototype.getTarget=function(){var t;return(t=this.input)===null||t===void 0?void 0:t.parentElement},s.prototype.renderSugestMode=function(){var t=this,e,n=this.props,a=n.className;n.style;var i=n.inputControlClassName,u=n.nativeInputClassName,r=n.inputOnly,o=n.value,p=n.placeholder,l=n.classnames,c=n.disabled,m=n.readOnly,g=n.name,P=n.loading,D=n.clearable,F=n.options,V=n.selectedOptions,_=n.autoComplete,b=n.labelField,h=n.valueField,I=n.multiple,x=n.creatable,k=n.borderMode,j=n.showCounter,Y=n.data,T=n.maxLength,Z=n.minLength,$=n.translate,W=n.loadingConfig,J=n.popOverContainer,X=n.themeCss,w=n.css,z=n.id,me=n.nativeAutoComplete,ee=n.testIdBuilder,fe=(e=this.props.type)===null||e===void 0?void 0:e.replace(/^(?:native|input)\-/,"");return d.createElement(le,{isOpen:this.state.isOpen&&!c&&!m,inputValue:this.state.inputValue,onChange:this.handleChange,onStateChange:this.handleStateChange,selectedItem:V.map(function(S){return S[h||"value"]})},function(S){var H,te,ne,Ce=S.getInputProps,ge=S.getItemProps,U=S.isOpen,q=S.inputValue,ae=S.selectedItem,ye=S.highlightedIndex,A=q&&U&&!_?ce(F,q,{keys:[b||"label",h||"value"],threshold:ce.rankings.CONTAINS}):F,be=U?_e(A,ae):{};A=A.filter(function(C){return!~ae.indexOf(C.value)}),t.state.inputValue&&x!==!1&&I&&!A.some(function(C){return C.value===t.state.inputValue})&&!~ae.indexOf(t.state.inputValue)&&A.push((H={},H[b||"label"]=t.state.inputValue,H[h||"value"]=t.state.inputValue,H.isNew=!0,H));var pe=K(p,Y);return d.createElement("div",v({className:l("TextControl-input TextControl-input--withAC",i,M(v(v({},t.props),{name:"inputControlClassName",id:z,themeCss:X||w})),M(v(v({},t.props),{name:"inputControlClassName",id:z,themeCss:X||w,extra:"inner"})),r?a:"",(te={"is-opened":U,"TextControl-input--multiple":I},te["TextControl-input--border".concat(he(k))]=k,te)),onClick:t.handleClick},ee==null?void 0:ee.getTestId()),d.createElement(d.Fragment,null,pe&&!V.length&&!t.state.inputValue&&!t.state.isFocused?d.createElement("div",{className:l("TextControl-placeholder")},pe):null,V.map(function(C,R){return I?d.createElement("div",{className:l("TextControl-value"),key:R},d.createElement(Oe,{className:l("TextControl-valueLabel"),tooltip:"".concat(C[b||"label"])},"".concat(C[b||"label"])),d.createElement(B,{icon:"close",className:l("TextControl-valueIcon","icon"),onClick:t.removeItem.bind(t,R)})):q&&U||x!==!1?null:d.createElement("div",{className:l("TextControl-value"),key:R},C.label)}),d.createElement(ve,v({},Ce({name:g,ref:t.inputRef,disabled:c,readOnly:m,type:fe,onFocus:t.handleFocus,onBlur:t.handleBlur,onChange:t.handleInputChange,onKeyDown:t.handleKeyDown,maxLength:T,minLength:Z}),{autoComplete:me,size:10,className:l(u)}))),D&&!c&&!m&&o?d.createElement("a",{onClick:t.clearValue,className:l("TextControl-clear")},d.createElement(B,{icon:"input-clear",className:"icon",iconContent:"InputText-clear"})):null,j?d.createElement("span",{className:l("TextControl-counter")},"".concat((ne=t.valueToString(o))===null||ne===void 0?void 0:ne.length).concat(typeof T=="number"&&T?"/".concat(T):"")):null,P?d.createElement(Ee,{show:!0,icon:"reload",size:"sm",spinnerClassName:l("TextControl-spinner"),loadingConfig:W}):null,d.createElement(Ne,{container:J||t.getTarget,target:t.getTarget,show:!!(U&&A.length)},d.createElement(Te,{className:l("TextControl-popover"),style:{width:t.input?t.input.parentElement.offsetWidth:"auto"}},d.createElement("div",{className:l("TextControl-sugs")},A.map(function(C){var R=C[b||"label"],ie=C[h||"value"];return d.createElement("div",v({},ge({item:ie,disabled:C.disabled,className:l("TextControl-sugItem",{"is-highlight":ye===be[ie],"is-disabled":C.disabled||C.readOnly})}),{key:ie}),C.isNew?d.createElement("span",null,$("Text.add",{label:R}),d.createElement(B,{icon:"enter",className:"icon"})):d.createElement("span",null,C.disabled?R:we(R,q),C.tip))})))))})},s.prototype.toggleRevealPassword=function(){return O(this,void 0,void 0,function(){var t,e,n,a,i;return E(this,function(u){switch(u.label){case 0:return t=this.props,e=t.dispatchEvent,n=t.value,a=this.state.revealPassword?"encrypt":"review",[4,e(a,N(this.props,{value:n}))];case 1:return i=u.sent(),i!=null&&i.prevented||i!=null&&i.stoped?[2]:(this.setState({revealPassword:!this.state.revealPassword}),[2])}})})},s.prototype.renderNormal=function(){var t,e,n,a=this.props;a.classPrefix;var i=a.classnames,u=a.className;a.style;var r=a.inputControlClassName,o=a.nativeInputClassName,p=a.inputOnly,l=a.value,c=a.placeholder;a.onChange;var m=a.disabled,g=a.readOnly,P=a.max,D=a.min,F=a.step,V=a.clearable,_=a.revealPassword,b=_===void 0?!0:_,h=a.name,I=a.borderMode,x=a.prefix,k=a.suffix,j=a.data,Y=a.showCounter,T=a.maxLength,Z=a.minLength,$=a.themeCss,W=a.css,J=a.id,X=a.nativeAutoComplete,w=a.testIdBuilder,z=(e=this.props.type)===null||e===void 0?void 0:e.replace(/^(?:native|input)\-/,"");return d.createElement("div",v({className:i("TextControl-input",(t={},t["TextControl-input--border".concat(he(I))]=I,t),M(v(v({},this.props),{name:"inputControlClassName",id:J,themeCss:$||W})),M(v(v({},this.props),{name:"inputControlClassName",id:J,themeCss:$||W,extra:"inner"})),r,p?u:"")},w==null?void 0:w.getTestId()),x?d.createElement("span",{className:i("TextControl-inputPrefix")},K(x,j)):null,d.createElement(ve,v({name:h,placeholder:K(c,j),ref:this.inputRef,disabled:m,readOnly:g,type:this.state.revealPassword?"text":z,onFocus:this.handleFocus,onBlur:this.handleBlur,max:P,min:D,maxLength:T,minLength:Z,autoComplete:X,size:10,step:F,onChange:this.handleNormalInputChange,value:this.valueToString(l),className:i(o,{"TextControl-input-password":z==="password"&&b})},w==null?void 0:w.getChild("input").getTestId())),V&&!m&&!g&&l?d.createElement("a",{onClick:this.clearValue,className:i("TextControl-clear")},d.createElement(B,{icon:"input-clear",className:"icon",iconContent:"InputText-clear"})):null,z==="password"&&b&&!m?d.createElement("a",{onClick:this.toggleRevealPassword,className:i("TextControl-revealPassword")},this.state.revealPassword?d.createElement(B,{icon:"view",className:i("TextControl-icon-view"),classNameProp:i("TextControl-icon-view"),iconContent:"InputText-view"}):d.createElement(B,{icon:"invisible",className:i("TextControl-icon-invisible"),classNameProp:i("TextControl-icon-invisible"),iconContent:"InputText-invisible"})):null,Y?d.createElement("span",{className:i("TextControl-counter")},"".concat((n=this.valueToString(l))===null||n===void 0?void 0:n.length).concat(typeof T=="number"&&T?"/".concat(T):"")):null,k?d.createElement("span",{className:i("TextControl-inputSuffix")},K(k,j)):null)},s.prototype.renderBody=function(t){var e,n,a=this.props,i=a.classnames,u=a.className,r=a.style,o=a.classPrefix,p=a.addOn,l=a.render,c=a.data,m=a.disabled,g=a.readOnly,P=a.inputOnly,D=a.static,F=a.addOnClassName,V=a.themeCss,_=a.css,b=a.id,h=typeof p=="string"?{label:p,type:"plain"}:p,I=d.createElement(B,{cx:i,icon:h==null?void 0:h.icon,className:"Icon"}),x=h&&!D?h.actionType||~["button","submit","reset","action"].indexOf(h.type)?d.createElement("div",{className:i("".concat(o,"TextControl-button"),F,M(v(v({},this.props),{name:"addOnClassName",id:b,themeCss:V||_,extra:"addOn"})))},l("addOn",h,{disabled:m})):d.createElement("div",{className:i("".concat(o,"TextControl-addOn"),F,M(v(v({},this.props),{name:"addOnClassName",id:b,themeCss:V||_,extra:"addOn"})))},I,h.label?K(h.label,c):null):null;if(P)return t;var k=D?i("".concat(o,"TextControl"),(n={},n["".concat(o,"TextControl--withAddOn")]=!!x,n)):i(u,"".concat(o,"TextControl"),(e={},e["".concat(o,"TextControl--withAddOn")]=!!x,e["is-focused"]=this.state.isFocused,e["is-disabled"]=m||g,e));return d.createElement("div",{className:k,style:r},h&&h.position==="left"?x:null,t,h&&h.position!=="left"?x:null)},s.prototype.render=function(){var t=this.props,e=t.options,n=t.source,a=t.autoComplete,i=t.themeCss,u=t.css,r=t.id,o=t.env,p=t.classPrefix,l=a!==!1&&(n||e!=null&&e.length||a)?this.renderSugestMode():this.renderNormal();return d.createElement(d.Fragment,null,this.renderBody(l),d.createElement(re,v({},this.props,{config:{themeCss:i||u,classNames:[{key:"inputControlClassName",weights:{focused:{parent:".".concat(p,"TextControl.is-focused")},disabled:{parent:".".concat(p,"TextControl.is-disabled")}}}],id:r},env:o})),d.createElement(re,v({},this.props,{config:{themeCss:Ve(i||u),classNames:[{key:"inputControlClassName",weights:{default:{inner:"input"},hover:{inner:"input"},focused:{parent:".".concat(p,"TextControl.is-focused"),inner:"input"},disabled:{parent:".".concat(p,"TextControl.is-disabled"),inner:"input"}}}],id:r&&r+"-inner"},env:o})),d.createElement(re,v({},this.props,{config:{themeCss:i||u,classNames:[{key:"addOnClassName"}],id:r&&r+"-addOn"},env:o})))},s.defaultProps={resetValue:"",labelField:"label",valueField:"value",placeholder:"",allowInputText:!0,trimContents:!0,nativeAutoComplete:"off"},L([G,y("design:type",Function),y("design:paramtypes",[]),y("design:returntype",void 0)],s.prototype,"close",null),L([G,y("design:type",Function),y("design:paramtypes",[Object]),y("design:returntype",Promise)],s.prototype,"handleNormalInputChange",null),L([G,y("design:type",Function),y("design:paramtypes",[]),y("design:returntype",void 0)],s.prototype,"getTarget",null),L([G,Ie(),y("design:type",Function),y("design:paramtypes",[]),y("design:returntype",Object)],s.prototype,"render",null),s}(d.PureComponent);function _e(f,s,t){return t===void 0&&(t="value"),f.filter(function(e){return s.indexOf(e[t||"value"])===-1}).reduce(function(e,n,a){return e[n[t||"value"]]=a,e},{})}var Ae=function(f){Q(s,f);function s(){return f!==null&&f.apply(this,arguments)||this}return s=L([oe({type:"input-text",alias:["input-password","native-date","native-time","native-number"]})],s),s}(ue),Re=function(f){Q(s,f);function s(){return f!==null&&f.apply(this,arguments)||this}return s=L([oe({type:"input-email",validations:"isEmail"})],s),s}(ue),Be=function(f){Q(s,f);function s(){return f!==null&&f.apply(this,arguments)||this}return s=L([oe({type:"input-url",validations:"isUrl"})],s),s}(ue);export{Re as EmailControlRenderer,Ae as TextControlRenderer,Be as UrlControlRenderer,ue as default,_e as mapItemIndex};
