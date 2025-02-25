import{a as b,ah as g,z as m,b as y,d as v,i as h,r as V,R as u,C,e as p,n as f,o,bz as B,cb as O,F as _}from"./index-cf399bba.js";var E=function(i){b(r,i);function r(){return i!==null&&i.apply(this,arguments)||this}return r.prototype.renderEtrValue=function(e,n){return this.props.render("inline",Object.assign({},e,{label:!1,inputOnly:!0,changeImmediately:!0}),n)},r.prototype.renderPickerIcon=function(){var e=this.props,n=e.render,t=e.pickerIcon;return t?n("picker-icon",t):void 0},r.prototype.getAddBtnVisible=function(e){var n=this.props,t=n.data,a=n.addBtnVisibleOn;return typeof a=="string"&&a?g(a,m(t,e)):!0},r.prototype.getAddGroupBtnVisible=function(e){var n=this.props,t=n.data,a=n.addGroupBtnVisibleOn;return typeof a=="string"&&a?g(a,m(t,e)):!0},r.prototype.validate=function(){var e,n=this.props,t=n.value,a=n.required,l=n.translate;if(a){if(!t||!t.children)return l("Condition.isRequired");var d=!0,s=["is_empty","is_not_empty"];return(e=t==null?void 0:t.children)===null||e===void 0||e.forEach(function(c){if(c.op&&(c.right||~s.indexOf(c.op))){d=!1;return}}),d?l("Condition.isRequired"):null}},r.prototype.render=function(){var e=this.props,n=e.className,t=e.classnames;e.style,e.pickerIcon;var a=e.env,l=e.popOverContainer,d=y(e,["className","classnames","style","pickerIcon","env","popOverContainer"]),s=this.props.formula?v({},this.props.formula):void 0;return s&&s.variables&&h(s.variables)&&(s.variables=V(s.variables,this.props.data,"| raw")),u.createElement("div",{className:t("ConditionBuilderControl",{"is-mobile":C()},n)},u.createElement(A,v({renderEtrValue:this.renderEtrValue,pickerIcon:this.renderPickerIcon(),isAddBtnVisibleOn:this.getAddBtnVisible,isAddGroupBtnVisibleOn:this.getAddGroupBtnVisible,popOverContainer:l||a.getModalContainer},d,{formula:s})))},p([f,o("design:type",Function),o("design:paramtypes",[Object,Object]),o("design:returntype",void 0)],r.prototype,"renderEtrValue",null),p([f,o("design:type",Function),o("design:paramtypes",[Object]),o("design:returntype",void 0)],r.prototype,"getAddBtnVisible",null),p([f,o("design:type",Function),o("design:paramtypes",[Object]),o("design:returntype",void 0)],r.prototype,"getAddGroupBtnVisible",null),r}(u.PureComponent),A=B({adaptor:function(i){return i.fields||i}})(function(i){b(r,i);function r(){return i!==null&&i.apply(this,arguments)||this}return r.prototype.render=function(){var e=this.props,n=e.loading,t=e.config;e.deferLoad;var a=e.disabled,l=e.renderEtrValue,d=y(e,["loading","config","deferLoad","disabled","renderEtrValue"]);return u.createElement(O,v({},d,{fields:t||d.fields||[],disabled:a||n,renderEtrValue:l}))},r}(u.Component)),k=function(i){b(r,i);function r(){return i!==null&&i.apply(this,arguments)||this}return r=p([_({type:"condition-builder",strictMode:!1})],r),r}(E);export{k as ConditionBuilderRenderer,E as default};
