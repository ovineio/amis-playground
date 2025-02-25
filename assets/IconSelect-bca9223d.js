import{a as M,a$ as _,d as m,R as o,U as i,I as C,cB as f,h as I,j as S,b1 as E,bR as F,S as T,cC as N,aS as g,am as k,e as d,n as p,o as a,F as x,cD as b}from"./index-cf399bba.js";var L=function(h){M(n,h);function n(e){var t=h.call(this,e)||this;return t.state={activeTypeIndex:0,showModal:!1,tmpCheckIconId:null,searchValue:"",isRefreshLoading:!1},t.handleSearchValueChange=_(t.handleSearchValueChange.bind(t),300),t}return n.prototype.getSvgName=function(e){var t;return typeof e=="string"?((t=/data-name="(.*?)"/.exec(e))===null||t===void 0?void 0:t[1])||"":(e==null?void 0:e.name)||(e==null?void 0:e.id)||""},n.prototype.getSvgId=function(e){var t;return typeof e=="string"?((t=/data-id="(.*?)"/.exec(e))===null||t===void 0?void 0:t[1])||"":(e==null?void 0:e.id)||""},n.prototype.getValueBySvg=function(e){var t;if(!e)return null;if(typeof e!="string")return m(m({},e),{svg:(t=e.svg)===null||t===void 0?void 0:t.replace(/'/g,"")});var r=this.getSvgName(e),l=this.getSvgId(e);return{name:r,id:l,svg:e.replace(/'/g,"")}},n.prototype.handleClick=function(){this.props.disabled||this.toggleModel(!0)},n.prototype.handleClear=function(e){e.preventDefault(),e.stopPropagation(),this.props.onChange&&this.props.onChange("")},n.prototype.renderInputArea=function(){var e=this.props,t=e.classPrefix,r=e.disabled,l=e.value,c=e.placeholder,u=e.clearable,s=this.getValueBySvg(l);return o.createElement("div",{className:i("".concat(t,"IconSelectControl-input-area"))},o.createElement("div",{className:i("".concat(t,"IconSelectControl-input-icon-show"))},o.createElement(C,{icon:s==null?void 0:s.svg,className:"icon"})),o.createElement("span",{className:i("".concat(t,"IconSelectControl-input-icon-id"))},s==null?void 0:s.name),u&&!r&&s?o.createElement("a",{onClick:this.handleClear,className:i("".concat(t,"IconSelectControl-clear"))},o.createElement(C,{icon:"input-clear",className:"icon"})):null,!s&&c&&o.createElement("span",{className:i("".concat(t,"IconSelectControl-input-icon-placeholder"))},c)||null)},n.prototype.handleIconTypeClick=function(e,t){this.setState({activeTypeIndex:t})},n.prototype.renderIconTypes=function(){var e=this,t=this.props.classPrefix,r=f.map(function(l){return{id:l.groupId,label:l.name}});return o.createElement("ul",{className:i("".concat(t,"IconSelectControl-type-list"))},r.map(function(l,c){return o.createElement("li",{key:l.id,onClick:function(){return e.handleIconTypeClick(l,c)},className:i({active:c===e.state.activeTypeIndex})},l.label)}))},n.prototype.handleConfirm=function(){var e=this.state.tmpCheckIconId;if(this.props.returnSvg){var t=e&&e.svg||"";t=t.replace(/<svg/,'<svg data-name="'.concat(e==null?void 0:e.name,'" data-id="').concat(e==null?void 0:e.id,'"')),this.props.noSize&&(t=t.replace(/width=".*?"/,"").replace(/height=".*?"/,"")),this.props.onChange&&this.props.onChange(t)}else this.props.onChange&&this.props.onChange(e&&e.id?m(m({},e),{id:"svg-"+e.id}):"");this.toggleModel(!1)},n.prototype.handleLocalUpload=function(e){return I(this,void 0,void 0,function(){return S(this,function(t){return this.props.onChange&&this.props.onChange(e),this.toggleModel(!1),[2]})})},n.prototype.handleClickIconInModal=function(e){var t;this.setState({tmpCheckIconId:(e==null?void 0:e.id)===((t=this.state.tmpCheckIconId)===null||t===void 0?void 0:t.id)?null:e})},n.prototype.renderIconList=function(e){var t=this,r=this.props,l=r.classPrefix,c=r.noDataTip,u=r.translate;return!e||!e.length?o.createElement("p",{className:i("".concat(l,"IconSelectControl-icon-list-empty"))},u(c)):o.createElement("ul",{className:i("".concat(l,"IconSelectControl-icon-list"))},e.map(function(s,v){var y;return o.createElement("li",{key:s.id},o.createElement("div",{className:i("".concat(l,"IconSelectControl-icon-list-item"),{active:((y=t.state.tmpCheckIconId)===null||y===void 0?void 0:y.id)===s.id}),onClick:function(){return t.handleClickIconInModal(s)}},o.createElement("svg",null,o.createElement("use",{xlinkHref:"#".concat(s.id)})),o.createElement("div",{className:i("".concat(l,"IconSelectControl-icon-list-item-info"))},o.createElement("p",{className:i("".concat(l,"IconSelectControl-icon-list-item-info-name"))},s.name))))}))},n.prototype.handleSearchValueChange=function(e){this.setState({searchValue:e})},n.prototype.handleRefreshIconList=function(){return I(this,void 0,void 0,function(){var e,t;return S(this,function(r){switch(r.label){case 0:if(e=b,!(e&&typeof e=="function"))return[3,5];r.label=1;case 1:return r.trys.push([1,3,4,5]),this.setState({isRefreshLoading:!0}),[4,Promise.resolve(e())];case 2:return r.sent(),[3,5];case 3:return t=r.sent(),console.error(t),[3,5];case 4:return this.setState({isRefreshLoading:!1}),[7];case 5:return[2]}})})},n.prototype.renderModalContent=function(){var e=this.props,t=e.render,r=e.classPrefix,l=e.loadingConfig;e.funcSchema;var c=e.funcCom,u=this.getIconsByType(),s=this.state.searchValue,v=s?E(u,s,{keys:["name"],threshold:E.rankings.CONTAINS}):u;return o.createElement(o.Fragment,null,o.createElement(F,{className:i("".concat(r,"IconSelectControl-Modal-search")),mini:!1,clearable:!0,onChange:this.handleSearchValueChange}),b&&t("refresh-btn",{type:"button",icon:"fa fa-refresh"},{className:i("".concat(r,"IconSelectControl-Modal-refresh")),onClick:this.handleRefreshIconList})||null,c?o.createElement("div",{className:i("".concat(r,"IconSelectControl-Modal-func"))},o.createElement(c,{onUpload:this.handleLocalUpload})):null,o.createElement("div",{className:i("".concat(r,"IconSelectControl-Modal-content"))},o.createElement(T,{size:"lg",loadingConfig:l,overlay:!0,key:"info",show:this.state.isRefreshLoading}),o.createElement("div",{className:i("".concat(r,"IconSelectControl-Modal-content-aside"))},this.renderIconTypes()),o.createElement("div",{className:i("".concat(r,"IconSelectControl-Modal-content-main"))},this.renderIconList(v))))},n.prototype.getIconsByType=function(){return(N===null||N===void 0?void 0:f.length)&&f[this.state.activeTypeIndex].children||[]},n.prototype.toggleModel=function(e){var t=this.props.value,r=typeof t=="string"?this.getValueBySvg(t):t;if(e===void 0){this.setState({showModal:!this.state.showModal,searchValue:""});return}this.setState({showModal:e,tmpCheckIconId:e&&(r!=null&&r.id)?m(m({},r),{id:String(r.id).replace(/^svg-/,"")}):null,searchValue:""})},n.prototype.render=function(){var e=this,t=this.props,r=t.className;t.style;var l=t.classPrefix,c=t.disabled,u=t.translate;return o.createElement("div",{className:i(r,"".concat(l,"IconSelectControl"),{"is-focused":this.state.showModal,"is-disabled":c})},o.createElement("div",{className:i("".concat(l,"IconSelectControl-input")),onClick:this.handleClick},this.renderInputArea()),o.createElement(g,{show:this.state.showModal,closeOnOutside:!0,closeOnEsc:!0,size:"lg",overlay:!0,onHide:function(){return e.toggleModel(!1)}},o.createElement(g.Header,{onClose:function(){return e.toggleModel(!1)}},u("IconSelect.choice")),o.createElement(g.Body,null,this.renderModalContent()),o.createElement(g.Footer,null,o.createElement(k,{type:"button",className:"m-l",onClick:function(){return e.toggleModel(!1)}},u("cancel")),o.createElement(k,{type:"button",level:"primary",onClick:this.handleConfirm},u("confirm")))))},n.defaultProps={noDataTip:"placeholder.noData",clearable:!0},d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",void 0)],n.prototype,"handleClick",null),d([p,a("design:type",Function),a("design:paramtypes",[Object]),a("design:returntype",void 0)],n.prototype,"handleClear",null),d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",void 0)],n.prototype,"renderInputArea",null),d([p,a("design:type",Function),a("design:paramtypes",[Object,Number]),a("design:returntype",void 0)],n.prototype,"handleIconTypeClick",null),d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",void 0)],n.prototype,"renderIconTypes",null),d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",void 0)],n.prototype,"handleConfirm",null),d([p,a("design:type",Function),a("design:paramtypes",[String]),a("design:returntype",Promise)],n.prototype,"handleLocalUpload",null),d([p,a("design:type",Function),a("design:paramtypes",[Array]),a("design:returntype",void 0)],n.prototype,"renderIconList",null),d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",Promise)],n.prototype,"handleRefreshIconList",null),d([p,a("design:type",Function),a("design:paramtypes",[]),a("design:returntype",void 0)],n.prototype,"renderModalContent",null),d([p,a("design:type",Function),a("design:paramtypes",[Boolean]),a("design:returntype",void 0)],n.prototype,"toggleModel",null),n}(o.PureComponent),R=function(h){M(n,h);function n(){return h!==null&&h.apply(this,arguments)||this}return n=d([x({type:"icon-select"})],n),n}(L);export{R as IconSelectControlRenderer,L as default};
