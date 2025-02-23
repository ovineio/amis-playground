import{a as w,Z as y,h as m,k as g,ba as f,Y as b,j as F,bU as U,s as P,e as d,p as c,q as i,f as D,R as N,E as O}from"./index-12050af9.js";var V=function(v){w(n,v);function n(t,e){var a=v.call(this,t)||this;a.state={value:y(t)||""};var r=e;return r.registerComponent(a),a}return n.prototype.componentWillUnmount=function(){var t=this.context;t.unRegisterComponent(this)},n.prototype.handleChange=function(t){return m(this,void 0,void 0,function(){var e,a,r,o;return g(this,function(s){switch(s.label){case 0:return e=this.props,a=e.onChange,r=e.dispatchEvent,this.setState({value:t}),[4,r("change",b(this.props,{value:t}))];case 1:return o=s.sent(),o!=null&&o.prevented?[2]:(a==null||a(t),[2])}})})},n.prototype.handleCancel=function(){var t=this.props.name,e=this.props.onQuery,a=y(this.props);if(a!==""){var r={};f(r,t,""),e==null||e(r)}},n.prototype.handleSearch=function(t){return m(this,void 0,void 0,function(){var e,a,r,o,s,l;return g(this,function(p){switch(p.label){case 0:return e=this.props,a=e.name,r=e.onQuery,o=e.dispatchEvent,s={},f(s,a,t),[4,o("search",O(this.props.data,s))];case 1:return l=p.sent(),l!=null&&l.prevented?[2]:(r==null||r(s),[2])}})})},n.prototype.dispatchEvent=function(t){var e=this.props.dispatchEvent;e(t,b(this.props,{value:this.state.value}))},n.prototype.doAction=function(t,e,a,r){var o=t==null?void 0:t.actionType;o==="clear"&&this.setState({value:""})},n.prototype.setData=function(t){typeof t=="string"&&this.handleChange(t)},n.prototype.render=function(){var t=this,e=this.props;e.data;var a=e.name,r=e.disabled,o=e.onQuery,s=e.mini,l=e.enhance,p=e.clearable,C=e.searchImediately,E=e.clearAndSubmit,S=e.placeholder,_=e.onChange,I=e.className,x=e.style,B=e.mobileUI,A=e.loading,Q=e.loadingConfig,h=e.onEvent,R=e.testIdBuilder,u=this.state.value,j=!o&&!(h!=null&&h.search)||r;return F(U,{className:I,style:x,name:a,disabled:j,loading:A,loadingConfig:Q,defaultActive:!!u,defaultValue:_?void 0:u,value:u,mini:s,enhance:l,clearable:p,searchImediately:C,clearAndSubmit:E,onSearch:this.handleSearch,onCancel:this.handleCancel,placeholder:S,onChange:this.handleChange,onFocus:function(){return t.dispatchEvent("focus")},onBlur:function(){return t.dispatchEvent("blur")},mobileUI:B,testIdBuilder:R})},n.defaultProps={name:"keywords",mini:!1,enhance:!1,clearable:!1,searchImediately:!1,clearAndSubmit:!1},n.contextType=P,n.propsList=["mini","searchImediately"],d([c,i("design:type",Function),i("design:paramtypes",[String]),i("design:returntype",Promise)],n.prototype,"handleChange",null),d([c,i("design:type",Function),i("design:paramtypes",[]),i("design:returntype",void 0)],n.prototype,"handleCancel",null),d([c,i("design:type",Function),i("design:paramtypes",[String]),i("design:returntype",Promise)],n.prototype,"handleSearch",null),d([c,i("design:type",Function),i("design:paramtypes",[String]),i("design:returntype",void 0)],n.prototype,"dispatchEvent",null),n=d([D({type:"search-box"}),i("design:paramtypes",[Object,Object])],n),n}(N.Component);export{V as SearchBoxRenderer};
