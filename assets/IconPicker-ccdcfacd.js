import{a as N,cC as F,cD as w,b3 as I,j as r,b4 as P,l as m,d as V,I as T,X as B,e as s,p as l,q as t,R as K,C as A}from"./index-12050af9.js";var q=function(d){N(n,d);function n(){var e=d!==null&&d.apply(this,arguments)||this;return e.state={isOpen:!1,inputValue:"",isFocused:!1,vendorIndex:0},e}return n.prototype.componentDidUpdate=function(e){var i=this.props;e.value!==i.value&&this.setState({inputValue:""})},n.prototype.changeVendor=function(e){this.setState({vendorIndex:e},this.formatOptions)},n.prototype.formatOptions=function(){var e=this.state.vendorIndex||0,i=F[e],o=i.prefix,p=i.icons;return p.map(function(u){return{label:o+u,value:o+u}})},n.prototype.getVendors=function(){return F.map(function(e){return e.name})},n.prototype.inputRef=function(e){this.input=e},n.prototype.focus=function(){if(this.input){this.input.focus();var e=this.input.value.length;e&&this.input.setSelectionRange(e,e)}},n.prototype.handleClick=function(){this.props.disabled||(this.focus(),this.setState({isOpen:!0}))},n.prototype.handleFocus=function(e){this.setState({isOpen:!0,isFocused:!0}),this.props.onFocus&&this.props.onFocus(e)},n.prototype.handleBlur=function(e){var i=this.props,o=i.onBlur,p=i.trimContents,u=i.value,a=i.onChange;this.setState({isFocused:!1},function(){p&&u&&typeof u=="string"&&a(u.trim())}),o&&o(e)},n.prototype.handleInputChange=function(e){var i=e.currentTarget.value;this.setState({inputValue:i})},n.prototype.handleKeyDown=function(e){var i=w(e.keyCode);if(i==="backspace"){var o=this.props.onChange;this.state.inputValue||(o(""),this.setState({inputValue:""}))}},n.prototype.handleChange=function(e){var i=this.props,o=i.onChange,p=i.disabled;p||(o(e),this.setState({isFocused:!1,inputValue:""}))},n.prototype.handleStateChange=function(e){switch(e.type){case I.stateChangeTypes.itemMouseEnter:case I.stateChangeTypes.changeInput:this.setState({isOpen:!0});break;default:var i={};typeof e.isOpen<"u"&&(i.isOpen=e.isOpen),this.state.isOpen&&e.isOpen===!1&&(i.inputValue=""),this.setState(i);break}},n.prototype.handleClear=function(){var e=this,i=this.props,o=i.onChange,p=i.resetValue;o==null||o(p),this.setState({inputValue:p,isFocused:!0},function(){e.focus()})},n.prototype.renderFontIcons=function(){var e=this,i=this.props,o=i.className,p=i.inputOnly,u=i.placeholder,a=i.classnames,S=i.name,c=i.value,_=i.noDataTip,k=i.disabled,x=i.clearable,D=i.translate,O=this.formatOptions(),g=this.getVendors();return r(I,{isOpen:this.state.isOpen,inputValue:this.state.inputValue,onChange:this.handleChange,onOuterClick:this.handleBlur,onStateChange:this.handleStateChange,selectedItem:[c],children:function(v){var j=v.getInputProps,R=v.getItemProps,f=v.isOpen,C=v.inputValue,b=C&&f?P(O,C,{keys:["label","value"],threshold:P.rankings.CONTAINS}):O;return m("div",{className:a("IconPickerControl-input IconPickerControl-input--withAC",p?o:"",{"is-opened":f}),onClick:e.handleClick,children:[m("div",{className:a("IconPickerControl-valueWrap"),children:[u&&!c&&!e.state.inputValue?r("div",{className:a("IconPickerControl-placeholder"),children:u}):null,!c||C&&f?null:m("div",{className:a("IconPickerControl-value"),children:[r("i",{className:a(c)}),typeof c=="string"?c:""]}),r("input",{...V({},j({name:S,ref:e.inputRef,onFocus:e.handleFocus,onChange:e.handleInputChange,onKeyDown:e.handleKeyDown,value:e.state.inputValue}),{autoComplete:"off",disabled:k,size:10})}),x&&!k&&c?r("a",{onClick:e.handleClear,className:a("IconPickerControl-clear"),children:r(T,{icon:"input-clear",className:"icon"})}):null]}),f?m("div",{className:a("IconPickerControl-sugsPanel"),children:[g.length>1?r("div",{className:a("IconPickerControl-tabs"),children:g.map(function(h,y){return r("div",{className:a("IconPickerControl-tab",{active:e.state.vendorIndex===y}),onClick:function(){return e.changeVendor(y)},children:h},y)})}):null,b.length?r("div",{className:a("IconPickerControl-sugs",g.length>1?"IconPickerControl-multiVendor":"IconPickerControl-singleVendor"),children:b.map(function(h,y){return r("div",{...V({},R({item:h.value,className:a("IconPickerControl-sugItem",{"is-active":c===h.value})}),{key:y}),children:r("i",{className:a("".concat(h.value)),title:"".concat(h.value)})})})}):r("div",{className:a(g.length>1?"IconPickerControl-multiVendor":"IconPickerControl-singleVendor"),children:D(_)})]}):null]})}})},n.prototype.render=function(){var e=this.props,i=e.className;e.style;var o=e.classPrefix,p=e.inputOnly,u=e.disabled,a=this.renderFontIcons();return p?a:r("div",{className:B(i,"".concat(o,"IconPickerControl"),{"is-focused":this.state.isFocused,"is-disabled":u}),children:a})},n.defaultProps={resetValue:"",placeholder:"",noDataTip:"placeholder.noData"},s([l,t("design:type",Function),t("design:paramtypes",[Number]),t("design:returntype",void 0)],n.prototype,"changeVendor",null),s([l,t("design:type",Function),t("design:paramtypes",[]),t("design:returntype",void 0)],n.prototype,"formatOptions",null),s([l,t("design:type",Function),t("design:paramtypes",[]),t("design:returntype",void 0)],n.prototype,"getVendors",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"inputRef",null),s([l,t("design:type",Function),t("design:paramtypes",[]),t("design:returntype",void 0)],n.prototype,"focus",null),s([l,t("design:type",Function),t("design:paramtypes",[]),t("design:returntype",void 0)],n.prototype,"handleClick",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleFocus",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleBlur",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleInputChange",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleKeyDown",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleChange",null),s([l,t("design:type",Function),t("design:paramtypes",[Object]),t("design:returntype",void 0)],n.prototype,"handleStateChange",null),s([l,t("design:type",Function),t("design:paramtypes",[]),t("design:returntype",void 0)],n.prototype,"handleClear",null),n}(K.PureComponent),E=function(d){N(n,d);function n(){return d!==null&&d.apply(this,arguments)||this}return n=s([A({type:"icon-picker"})],n),n}(q);export{E as IconPickerControlRenderer,q as default};
