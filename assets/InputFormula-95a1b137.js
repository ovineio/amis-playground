import{a as E,i as u,r as b,R as v,bO as W,e as c,n as j,o as d,F as A}from"./index-cf399bba.js";var $=function(o){E(a,o);function a(){return o!==null&&o.apply(this,arguments)||this}return a.prototype.formulaRef=function(e){if(e){for(;e&&e.getWrappedInstance;)e=e.getWrappedInstance();this.ref=e}else this.ref=void 0},a.prototype.validate=function(){var e,t=this.props,s=t.translate,l=t.value;if(!((e=this.ref)===null||e===void 0)&&e.validate&&l){var r=this.ref.validate(l);if(r!==!0)return s("FormulaEditor.invalidData",{err:r})}},a.prototype.render=function(){var e=this.props;e.selectedOptions;var t=e.disabled,s=e.onChange,l=e.evalMode,r=e.mixedMode,m=e.variableMode,f=e.header,h=e.label,M=e.value,g=e.clearable,C=e.className;e.style,e.classPrefix,e.classnames,e.allowInput;var N=e.borderMode,_=e.placeholder,y=e.inputMode,I=e.btnLabel,F=e.level,O=e.btnSize,P=e.icon,R=e.title,x=e.variableClassName,S=e.functionClassName,V=e.data,k=e.onPickerOpen,w=e.selfVariableName;e.popOverContainer;var z=e.env,L=e.inputSettings,U=e.mobileUI,p=this.props,i=p.variables,n=p.functions;return u(i)&&(i=b(i,this.props.data,"| raw")),u(n)&&(n=b(n,this.props.data,"| raw")),v.createElement(W,{popOverContainer:z.getModalContainer,ref:this.formulaRef,className:C,value:M,disabled:t,onChange:s,evalMode:l,variables:i,variableMode:m,functions:n,header:f||h||"",borderMode:N,placeholder:_,mode:y,inputSettings:L,btnLabel:I,level:F,btnSize:O,icon:P,title:R,clearable:g,variableClassName:x,functionClassName:S,data:V,onPickerOpen:k,selfVariableName:w,mixedMode:r,mobileUI:U})},a.defaultProps={inputMode:"input-button",borderMode:"full",evalMode:!0},c([j,d("design:type",Function),d("design:paramtypes",[Object]),d("design:returntype",void 0)],a.prototype,"formulaRef",null),a=c([A({type:"input-formula"})],a),a}(v.Component);export{$ as InputFormulaRenderer};
