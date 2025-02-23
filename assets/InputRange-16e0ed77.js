import{aj as P,a as E,d as y,n as $,b$ as S,c0 as U,h as M,k as j,l as O,j as C,bk as D,e as v,p as x,q as p,R as B,aq as q,c1 as w,c2 as T,c3 as Y,bS as z,a3 as G,I as H,a_ as J,C as K,i as L,r as Q,Y as R}from"./index-12050af9.js";var c=function(l,a,n){if(a===void 0&&(a={}),typeof l=="string"){if(l=L(l)?Q(l,a):l,typeof l=="string"){var t=parseFloat(l);return isNaN(t)?n:t}else if(typeof l=="number")return l}else if(typeof l=="number")return l;return l??n};function A(l,a){var n,t;if(a.multiple){var e=a.min,i=a.max;return typeof l=="string"?(n=P(l.split(a.delimiter||",").map(function(s){return Number(s)}),2),e=n[0],i=n[1]):Array.isArray(l)?(t=P(l,2),e=t[0],i=t[1]):typeof l=="object"&&(e=l.min,i=l.max),{min:e===void 0||e<a.min?a.min:e,max:i===void 0||i>a.max?a.max:i}}return+l<a.min?a.min:Math.min(+l,a.max)}var k=function(l){E(a,l);function a(){return l!==null&&l.apply(this,arguments)||this}return a.prototype.handleInputNumberChange=function(n){var t,e=this.props,i=e.multiple,s=e.value,r=e.type,o=e.min,u=e.max,m=e.onChange,d=this.getValue(n,r);m==null||m(i?y(y({},s),(t={},t[r]=d,t)):Math.max(Math.min(n,u),o))},a.prototype.onUpdateValue=function(n){var t,e=this.props,i=e.multiple,s=e.value,r=e.type,o=this.getValue(n,r);this.props.onChange(i?y(y({},s),(t={},t[r]=o,t)):n)},a.prototype.checkNum=function(n){return typeof n!="number"&&(n=$(n,this.props.data),n=/^[-]?\d+/.test(n)?+n:void 0),n},a.prototype.getStepPrecision=function(){var n,t=this.props,e=t.step,i=t.data,s=c(e,i,1),r=/^\d+\.\d+$/.test(s.toString());return!r||s<0?0:(n=s.toString().split(".")[1])===null||n===void 0?void 0:n.length},a.prototype.getValue=function(n,t){var e=this.props,i=e.min,s=e.max,r=e.step,o=e.value;n=n??(t==="min"?i:s);var u=Math.round(parseFloat(n+"")/r)*r;switch(u=parseFloat(u.toFixed(this.getStepPrecision())),t){case"min":return S(o)&&U(o.max)?u>=o.max?o.max-r:u:i;case"max":return S(o)&&U(o.min)?u<=o.min?o.min+r:u:s;default:return u<i&&i||u>s&&s||u}},a.prototype.onBlur=function(n){return M(this,void 0,void 0,function(){var t,e,i,s,r;return j(this,function(o){switch(o.label){case 0:return t=this.props,e=t.dispatchEvent,i=t.value,s=t.onBlur,[4,e("blur",R(this.props,{value:i}))];case 1:return r=o.sent(),r!=null&&r.prevented?[2]:(s==null||s(n),[2])}})})},a.prototype.onFocus=function(n){return M(this,void 0,void 0,function(){var t,e,i,s,r;return j(this,function(o){switch(o.label){case 0:return t=this.props,e=t.dispatchEvent,i=t.value,s=t.onFocus,[4,e("focus",R(this.props,{value:i}))];case 1:return r=o.sent(),r!=null&&r.prevented?[2]:(s==null||s(n),[2])}})})},a.prototype.render=function(){var n,t=this.props,e=t.classnames;t.style;var i=t.value,s=t.multiple,r=t.type,o=t.step,u=t.classPrefix,m=t.disabled,d=t.max,b=t.min,V=t.mobileUI,g=t.unit,h=t.showInputUnit,f=s?r==="min"?Math.min(i.min,i.max):Math.max(i.min,i.max):i;return O("div",{className:e("".concat(u,"InputRange-input"),(n={},n["".concat(u,"InputRange-input-with-unit")]=g&&h,n)),children:[C(D,{value:+f,step:o,max:this.checkNum(d),min:this.checkNum(b),onChange:this.handleInputNumberChange,disabled:m,onBlur:this.onBlur,onFocus:this.onFocus,mobileUI:V}),g&&h&&C("div",{className:e("".concat(u,"InputRange-unit"),"".concat(u,"Select")),children:g})]})},v([x,p("design:type",Function),p("design:paramtypes",[Number]),p("design:returntype",void 0)],a.prototype,"handleInputNumberChange",null),v([x,p("design:type",Function),p("design:paramtypes",[Number]),p("design:returntype",void 0)],a.prototype,"onUpdateValue",null),v([x,p("design:type",Function),p("design:paramtypes",[Object]),p("design:returntype",Promise)],a.prototype,"onBlur",null),v([x,p("design:type",Function),p("design:paramtypes",[Object]),p("design:returntype",Promise)],a.prototype,"onFocus",null),a}(B.Component),W=function(l){E(a,l);function a(n){var t=l.call(this,n)||this,e=t.props,i=e.value,s=e.multiple,r=e.delimiter,o=e.min,u=e.max,m=e.data,d=A(i,{multiple:s,delimiter:r,min:c(o,m,0),max:c(u,m,0)});return t.state={value:t.getValue(d)},t}return a.prototype.componentDidUpdate=function(n){var t=n.value,e=n.min,i=n.max,s=n.data,r=this.props,o=r.value,u=r.multiple,m=r.delimiter,d=r.min,b=r.max,V=r.data;r.onChange;var g=c(e,s,0),h=c(i,s,100),f=c(d,V,0),F=c(b,V,100);if(t!==o||g!==f||h!==F){var _=A(o,{multiple:u,delimiter:m,min:f,max:F});this.setState({value:this.getValue(_)})}},a.prototype.doAction=function(n,t,e){var i=n==null?void 0:n.actionType;i==="reset"?this.resetValue():i==="clear"&&this.clearValue()},a.prototype.resetValue=function(){var n,t,e=this.props,i=e.multiple,s=e.min,r=e.max,o=e.data,u=e.onChange,m=e.formStore,d=e.store,b=e.name,V=e.resetValue,g=c(s,o,0),h=c(r,o,100),f=(t=q((n=m==null?void 0:m.pristine)!==null&&n!==void 0?n:d==null?void 0:d.pristine,b))!==null&&t!==void 0?t:V,F=this.getFormatValue(f??(i?{min:g,max:h}:g));u==null||u(F)},a.prototype.clearValue=function(n){var t=this.props,e=t.multiple,i=t.min,s=t.max,r=t.data,o=t.onChange,u=c(i,r,0),m=c(s,r,100),d=this.getFormatValue(e?{min:u,max:m}:u);o==null||o(d)},a.prototype.getStepPrecision=function(){var n,t=this.props,e=t.step,i=t.data,s=c(e,i,1),r=/^\d+\.\d+$/.test(s.toString());return!r||s<0?0:(n=s.toString().split(".")[1])===null||n===void 0?void 0:n.length},a.prototype.getValue=function(n){var t=this.props.multiple,e=this.getStepPrecision();return t?{max:w(n.max,e),min:w(n.min,e)}:w(n,e)},a.prototype.handleChange=function(n){return M(this,void 0,void 0,function(){var t,e,i,s,r,o;return j(this,function(u){switch(u.label){case 0:return t=this.getValue(n),this.setState({value:t}),e=this.props,i=e.onChange,s=e.dispatchEvent,r=this.getFormatValue(t),[4,s("change",R(this.props,{value:r}))];case 1:return o=u.sent(),o!=null&&o.prevented?[2]:(i==null||i(r),[2])}})})},a.prototype.onAfterChange=function(){var n=this.state.value,t=this.props.onAfterChange,e=this.getFormatValue(this.getValue(n));t&&t(e)},a.prototype.getFormatValue=function(n){var t=this.props,e=t.multiple,i=t.joinValues,s=t.delimiter,r=t.extraName;return e?r?[n.min,n.max]:i?[n.min,n.max].join(s||","):{min:n.min,max:n.max}:n},a.prototype.render=function(){var n=this,t=this.state.value,e=y(y({},this.props),{min:c(this.props.min,this.props.data,0),max:c(this.props.max,this.props.data,0),step:c(this.props.step,this.props.data,1),value:t,onChange:this.handleChange,onAfterChange:this.onAfterChange}),i=e.classPrefix,s=e.multiple;e.parts;var r=e.showInput,o=e.classnames,u=e.className,m=e.disabled,d=e.clearable,b=e.min,V=e.max,g=e.render,h=e.marks,f=e.region,F=e.mobileUI,_=h&&y({},h);return h&&T(h,function(I,N){S(I)&&I.type&&_&&(_[N]=g(f,I)),_&&!Y(N.replace(/%$/,""))&&delete _[N]}),O("div",{className:o("RangeControl","".concat(i,"InputRange"),{"is-disabled":m},{"is-mobile":F},u),children:[r&&s&&C(k,{...y({},e,{type:"min"})}),C(z,{...y({},e,{marks:_})}),r&&C(k,{...y({},e,{type:"max"})}),d&&!m&&r?C("a",{onClick:function(){return n.clearValue()},className:o("InputRange-clear",{"is-active":s?G(this.state.value,{min:b,max:V}):this.state.value!==b}),children:C(H,{icon:"close",className:"icon"})}):null]})},a.defaultProps={value:0,max:100,min:0,step:1,unit:"",clearable:!0,disabled:!1,showInput:!1,showInputUnit:!1,multiple:!1,joinValues:!0,delimiter:",",showSteps:!1,parts:1,tooltipPlacement:"auto"},v([x,p("design:type",Function),p("design:paramtypes",[]),p("design:returntype",void 0)],a.prototype,"resetValue",null),v([x,p("design:type",Function),p("design:paramtypes",[String]),p("design:returntype",void 0)],a.prototype,"clearValue",null),v([x,p("design:type",Function),p("design:paramtypes",[Object]),p("design:returntype",void 0)],a.prototype,"getValue",null),v([x,p("design:type",Function),p("design:paramtypes",[Object]),p("design:returntype",Promise)],a.prototype,"handleChange",null),v([x,p("design:type",Function),p("design:paramtypes",[]),p("design:returntype",void 0)],a.prototype,"onAfterChange",null),v([x,p("design:type",Function),p("design:paramtypes",[Object]),p("design:returntype",Object)],a.prototype,"getFormatValue",null),v([J(),p("design:type",Function),p("design:paramtypes",[]),p("design:returntype",void 0)],a.prototype,"render",null),a}(B.PureComponent),Z=function(l){E(a,l);function a(){return l!==null&&l.apply(this,arguments)||this}return a=v([K({type:"input-range"})],a),a}(W);export{k as Input,Z as RangeControlRenderer,W as default,A as formatValue};
