import{a as ee,h as A,j as L,a3 as ge,a0 as Q,R as m,aM as ye,I as Y,a2 as V,l as B,d as C,z as x,bR as me,K as be,aI as Ce,dw as Ie,dx as Se,S as we,e as E,n as _,o as h,bs as Ee,bz as Ne,ad as z,aj as _e,aQ as le,ab as j,dy as oe,ac as J,a1 as Oe,r as xe,b as ce,p as Ae,f as Le,ah as ie,c7 as De,a4 as Re,b1 as de,dz as Te,bI as se,u as Fe}from"./index-cf399bba.js";var je=function(g){ee(s,g);function s(){var e=g!==null&&g.apply(this,arguments)||this;return e.startPoint={y:0,x:0},e.state={keyword:"",filteredLinks:[]},e}return s.prototype.handleClick=function(e,t){return A(this,void 0,void 0,function(){var a,n,r;return L(this,function(i){switch(i.label){case 0:return a=this.props,n=a.env,r=a.onSelect,e&&e.to&&(n==null||n.tracker({eventType:"link",eventData:{label:e.label,link:e.to}})),[4,r==null?void 0:r(e,t)];case 1:return i.sent(),[2,!1]}})})},s.prototype.handleChange=function(e){return A(this,void 0,void 0,function(){var t;return L(this,function(a){return t=this.props.onChange,t&&t(e),[2]})})},s.prototype.toggleLink=function(e,t,a){var n,r;(r=(n=this.props).onToggle)===null||r===void 0||r.call(n,e,t,a)},s.prototype.getDropInfo=function(e,t,a){var n,r,i=this.props,d=i.dragOnSameLevel,p=i.indentSize,v=e.target.getBoundingClientRect(),o=(n=this.dragNode)===null||n===void 0?void 0:n.link,u=v.top,f=v.height,l=v.width,y=e.clientY,b=e.clientX,c=a*((r=parseInt(p,10))!==null&&r!==void 0?r:16),I=c+l*.2,S;return y>=u+f/2?S="bottom":S="top",!d&&S==="bottom"&&b>=this.startPoint.x+I&&(S="self"),{nodeId:t,dragLink:o,position:S,rect:v,height:f,left:c}},s.prototype.updateDropIndicator=function(e){var t,a=this.props,n=a.dragOnSameLevel,r=a.overflow,i=e.target.querySelector("a"),d=i==null?void 0:i.getAttribute("data-id"),p=Number(i==null?void 0:i.getAttribute("data-depth")),v=r&&r.enable&&r.wrapperComponent||"ul";if(n&&((t=this.dragNode)===null||t===void 0?void 0:t.node.closest("".concat(v,'[role="menu"]')))!==(i==null?void 0:i.closest("".concat(v,'[role="menu"]')))){this.setState({dropIndicator:void 0}),this.dropInfo=null;return}this.dropInfo=this.getDropInfo(e,d,p);var o=this.dropInfo,u=o.position,f=o.rect,l=o.dragLink,y=o.height,b=o.left;if(d===(l==null?void 0:l.__id)){this.setState({dropIndicator:void 0}),this.dropInfo=null;return}var c=ge.findDOMNode(this).firstChild;if(u==="self"){var I={top:f.top-c.getBoundingClientRect().top,left:b,width:c.getBoundingClientRect().width-b,height:y,opacity:.2};(!this.state.dropIndicator||this.state.dropIndicator&&!Q(this.state.dropIndicator,I))&&this.setState({dropIndicator:I})}else{var I={top:(u==="bottom"?f.top+f.height:f.top)-c.getBoundingClientRect().top,left:b,width:c.getBoundingClientRect().width-b};(!this.state.dropIndicator||this.state.dropIndicator&&!Q(this.state.dropIndicator,I))&&this.setState({dropIndicator:I})}},s.prototype.handleDragStart=function(e){var t=this;return function(a){a.stopPropagation();var n=a.currentTarget;a.dataTransfer.effectAllowed="copyMove",a.dataTransfer.setDragImage(n,0,0),t.dragNode={node:n,link:e},t.dropInfo=null,t.startPoint={x:a.clientX,y:a.clientY},n.addEventListener("dragend",t.handleDragEnd),document.body.addEventListener("dragover",t.handleDragOver)}},s.prototype.handleDragOver=function(e){if(e.preventDefault(),e.stopPropagation(),!!this.dragNode){var t=e.target.querySelector("a"),a=t==null?void 0:t.getAttribute("data-id");a&&this.updateDropIndicator(e)}},s.prototype.handleDragEnd=function(e){var t,a,n;e.preventDefault(),e.stopPropagation(),this.setState({dropIndicator:void 0});var r=e.currentTarget,i=r.getAttribute("data-id");if(!i){var d=r.querySelector("a");d&&(i=d.getAttribute("data-id"))}var p=(t=this.dropInfo)===null||t===void 0?void 0:t.nodeId;!this.dropInfo||!p||i===p||(r.removeEventListener("dragend",this.handleDragEnd),document.body.removeEventListener("dragover",this.handleDragOver),(n=(a=this.props).onDragUpdate)===null||n===void 0||n.call(a,this.dropInfo),this.dragNode=null,this.dropInfo=null)},s.prototype.normalizeNavigations=function(e,t){var a=this,n=this.props,r=n.level,i=n.stacked,d=n.mode,p=n.itemActions,v=n.render,o=n.popOverContainer,u=n.env,f=n.classnames,l=n.data,y=n.collapsed;if(!e)return[];if(r&&t>r)return[];var b=y&&t===1;return e.filter(function(c){return!(c.hidden===!0||c.visible===!1)}).map(function(c){var I=[],S=[];c.icon&&(Array.isArray(c.icon)?c.icon:[c.icon]).forEach(function(w,T){if(m.isValidElement(w))I.push(w);else if(ye(w))I.push(m.createElement(Y,{key:"icon-".concat(T),cx:f,icon:w,className:b?"":"mr-2"}));else if(w&&V(w)){var U=w.position==="after",K=m.createElement(Y,{key:"icon-".concat(T),cx:f,icon:w.icon||w,className:b?"":U?"ml-2":"mr-2"});U?S.push(K):I.push(K)}});var F=typeof c.label=="string"?B(c.label,l):m.isValidElement(c.label)?m.cloneElement(c.label):v("inline",c.label),q=i&&d!=="float"&&!c.expanded&&c.overflow&&V(c.overflow)&&c.overflow.enable,N=c.children;if(q){var M=c.overflow,Z=M.maxVisibleCount,W=M.overflowIndicator,G=W===void 0?"fa fa-ellipsis-h":W,D=M.overflowLabel,X=M.overflowClassName,R=Z||2;R<((N==null?void 0:N.length)||0)&&(N=N==null?void 0:N.map(function(w,T){return C(C({},w),{label:T===R?m.createElement("span",{className:f(X)},m.createElement(Y,{icon:G,className:"icon Nav-item-icon"}),D&&V(D)?v("nav-overflow-label",D):D):w.label,hidden:T>R?!0:c.hidden,expandMore:T===R})}))}return{link:c,label:F,labelExtra:S.length?m.createElement("i",{className:f("Nav-Menu-item-icon-after")},S):null,icon:I.length?m.createElement("i",null,I):null,children:N?a.normalizeNavigations(N,c.mode==="group"?t:t+1):[],path:c.to,open:c.unfolded,extra:p?v("inline",p,{data:x(l,c),popOverContainer:o||(u&&u.getModalContainer?u.getModalContainer:function(){return document.body}),closeOnClick:!0}):null,disabled:!!c.disabled,disabledTip:c.disabledTip,hidden:c.hidden,className:c.className,mode:c.mode}})},s.prototype.handleSearch=function(e){return A(this,void 0,void 0,function(){var t,a,n,r,i,d,p;return L(this,function(v){return t=this.props,a=t.links,n=t.searchConfig,r=n===void 0?{}:n,i=De(a??[]),d=r==null?void 0:r.matchFunc,e?(d&&typeof d=="string"?d=Re(d,"link","keyword"):typeof d=="function"||(d=function(o,u){var f,l,y=(f=de([o],u,{keys:["label","title","key"],threshold:de.rankings.CONTAINS}))===null||f===void 0?void 0:f.length;return y||(o==null?void 0:o.children)&&((l=o.children)===null||l===void 0?void 0:l.length)>0}),p=function(o,u){var f=function(l,y){if(d(y,u))return l.push(C(C({},y),{unfolded:!0})),l;if(Array.isArray(y.children)){var b=y.children.reduce(f,[]);b.length&&l.push(C(C({},y),{unfolded:!0,children:b}))}return l};return o.reduce(f,[])},this.setState({keyword:e,filteredLinks:p(i,e)}),[2]):(this.setState({keyword:"",filteredLinks:[]}),[2])})})},s.prototype.renderSearchBox=function(){var e,t,a,n=this.props,r=n.classnames,i=n.searchable,d=n.searchConfig,p=d===void 0?{}:d,v=this.state.keyword;return m.createElement(m.Fragment,null,i?m.createElement(me,{className:r("Nav-SearchBox",p==null?void 0:p.className),mini:(e=p.mini)!==null&&e!==void 0?e:!1,enhance:(t=p.enhance)!==null&&t!==void 0?t:!1,clearable:(a=p.clearable)!==null&&a!==void 0?a:!0,searchImediately:p.searchImediately,placeholder:p.placeholder,defaultValue:"",value:v??"",onSearch:this.handleSearch,onChange:be}):null)},s.prototype.render=function(){var e,t=this.props,a=t.className,n=t.style,r=t.stacked,i=t.mode,d=t.classnames,p=t.links,v=t.loading,o=t.overflow,u=t.loadingConfig,f=t.itemBadge,l=t.badge,y=t.data,b=t.location,c=t.collapsed,I=t.expandIcon,S=t.indentSize,F=t.accordion,q=t.draggable,N=t.themeColor,M=t.expandPosition,Z=t.popupClassName,W=t.disabled,G=t.id,D=t.render,X=t.popOverContainer,R=t.env,w=t.searchable,T=t.testIdBuilder,U=this.state,K=U.dropIndicator,H=U.filteredLinks,te=null;if(o&&V(o)&&o.enable){var ne=o.overflowIndicator,ue=ne===void 0?"fa fa-ellipsis-h":ne,$=o.overflowLabel,pe=o.overflowClassName;te=m.createElement("span",{className:d(pe)},m.createElement(m.Fragment,null,m.createElement(Y,{icon:ue,className:"icon Nav-item-icon"}),$&&V($)?D("nav-overflow-label",$):$))}var k=null,P="";if(n)try{k=Ce(n,y);var ve=JSON.stringify(k).replace(/\,/g,";").replace(/\"/g,"").replace(/[A-Z]/g,function(O){return"-"+O.toLowerCase()});P=d("Nav-PopupClassName-".concat(G)),document.getElementById(P)||Ie({style:".".concat(P," ").concat(ve),classId:P})}catch{}var ae=Array.isArray(H)&&H.length>0?H:p,re=m.createElement(m.Fragment,null,Array.isArray(ae)?m.createElement(Se,{navigations:this.normalizeNavigations(ae,1),isActive:function(O,Pe){if(O.link&&typeof O.link.active<"u")return O.link.active;var fe=O.path,he=b.pathname===fe;return!!he},isOpen:function(O){return!!O.open},stacked:!!r,mode:i,testIdBuilder:T,themeColor:N,onSelect:this.handleClick,onToggle:this.toggleLink,onChange:this.handleChange,renderLink:function(O){return O.link},badge:f||l,collapsed:c,overflowedIndicator:te,overflowMaxCount:o==null?void 0:o.maxVisibleCount,overflowedIndicatorPopupClassName:d(o==null?void 0:o.overflowPopoverClassName),overflowSuffix:o!=null&&o.overflowSuffix?D("nav-overflow-suffix",o==null?void 0:o.overflowSuffix):null,overflowItemWidth:o==null?void 0:o.itemWidth,overflowComponent:o==null?void 0:o.wrapperComponent,overflowStyle:o==null?void 0:o.style,popupClassName:"".concat(Z||"").concat(P?" ".concat(P):""),expandIcon:I?typeof I=="string"?I:D("expand-icon",I):null,expandBefore:M!=="after",inlineIndent:S,accordion:F,draggable:q,data:y,disabled:W,onDragStart:this.handleDragStart,popOverContainer:X||(R&&R.getModalContainer?R.getModalContainer:function(){return document.body})}):null,m.createElement(we,{show:!!v,overlay:!0,loadingConfig:u}));return m.createElement("div",{className:d("Nav",a,(e={},e["Nav-horizontal"]=!r,e["Nav--searchable"]=!!w,e)),style:k},w?m.createElement(m.Fragment,null,this.renderSearchBox(),re):re,K?m.createElement("div",{className:d("Nav-dropIndicator"),style:K}):null)},s.defaultProps={indentSize:16},E([_,h("design:type",Function),h("design:paramtypes",[Object,Number]),h("design:returntype",Promise)],s.prototype,"handleClick",null),E([_,h("design:type",Function),h("design:paramtypes",[Array]),h("design:returntype",Promise)],s.prototype,"handleChange",null),E([_,h("design:type",Function),h("design:paramtypes",[Object,Number,Boolean]),h("design:returntype",void 0)],s.prototype,"toggleLink",null),E([_,h("design:type",Function),h("design:paramtypes",[DragEvent,String,Number]),h("design:returntype",Object)],s.prototype,"getDropInfo",null),E([_,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"updateDropIndicator",null),E([_,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"handleDragStart",null),E([_,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"handleDragOver",null),E([_,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"handleDragEnd",null),E([_,h("design:type",Function),h("design:paramtypes",[String]),h("design:returntype",Promise)],s.prototype,"handleSearch",null),s}(m.Component),Be=Ee(je),Me=Ne({adaptor:function(g,s){var e=Array.isArray(g)?g:g.links||g.options||g.items||g.rows;if(!Array.isArray(e))throw new Error("payload.data.options is not array.");return e},afterLoad:function(g,s,e){return A(void 0,void 0,void 0,function(){var t,a,n,r;return L(this,function(i){switch(i.label){case 0:return t=e.dispatchEvent,a=e.data,[4,t("loaded",x(a,{data:g.value,items:g.links}))];case 1:return n=i.sent(),n!=null&&n.prevented?[2]:(g.value&&!Te(s,function(d){return d.active})&&(r=e.env,r.jumpTo(B(g.value,e.data),void 0,e.data)),[2])}})})},normalizeConfig:function(g,s,e,t){if(Array.isArray(g)&&t!=="toggle"){var a=e.data,n=e.env,r=e.unfoldedField,i=e.foldedField,d=e.location,p=e.level,v=e.defaultOpenLevel,o=e.disabled,u=e.valueField,f=function(l,y){return o||l.disabled?!1:t&&!["location-change","data-change"].includes(t)&&typeof l.active<"u"?l.active:(y===p?!!j(l.children||[],function(b){return!!(b.hasOwnProperty("to")&&n&&n.isCurrentUrl(B(b.to,a),l))}):!1)||(l.activeOn?ie(l.activeOn,a)||ie(l.activeOn,d):!!(l.hasOwnProperty("to")&&l.to!==null&&n&&n.isCurrentUrl(B(l.to,a),l)))};g=z(g,function(l,y,b){var c,I=C(C(C({},l),_e(l,a)),{active:f(l,b),__id:(c=l.__id)!==null&&c!==void 0?c:le()}),S=null;return!l.defer&&u&&l[u]&&(S=j(s||[],function(F){return F[u]===l[u]})),I.unfolded=S?oe(S,{unfoldedField:r,foldedField:i}):typeof l.unfolded<"u"?oe(I,{unfoldedField:r,foldedField:i}):v&&b<=v?!0:l.children&&!!j(l.children,function(F,q,N){return f(F,b+N)}),I},1,!0)}return g},beforeDeferLoad:function(g,s,e){return J(e,s,1,C(C({},g),{loading:!0}))},afterDeferLoad:function(g,s,e,t,a){var n,r,i,d;return A(this,void 0,void 0,function(){var p,v,o,u,f;return L(this,function(l){switch(l.label){case 0:return p=a.dispatchEvent,v=a.data,[4,p("loaded",x(v,{data:e.data,item:C({},g)}))];case 1:return o=l.sent(),o!=null&&o.prevented?[2]:(u=C(C({},g),{loading:!1,loaded:!0,error:e.ok?void 0:e.msg}),f=Array.isArray(e.data)?e.data:((n=e.data)===null||n===void 0?void 0:n.links)||((r=e.data)===null||r===void 0?void 0:r.options)||((i=e.data)===null||i===void 0?void 0:i.items)||((d=e.data)===null||d===void 0?void 0:d.rows),Array.isArray(f)&&(u.children=f.concat(),u.unfolded=!0),[2,J(t,s,1,u)])}})})}})(function(g){ee(s,g);function s(e){var t=g.call(this,e)||this;return t.state={currentKey:e.showKey||"",collapsed:e.collapsed||!1},t.toggleLink=t.toggleLink.bind(t),t.handleSelect=t.handleSelect.bind(t),t.dragUpdate=t.dragUpdate.bind(t),t.handleChange=t.handleChange.bind(t),e==null||e.onRef(t),t}return s.prototype.componentDidMount=function(){Array.isArray(this.props.links)&&this.props.updateConfig(this.props.links,"mount")},s.prototype.componentDidUpdate=function(e,t){Q(this.props.location,e.location)?Q(this.props.links,e.links)?Oe(this.props.data,e.data,!1,void 0,void 0,10)&&this.props.updateConfig(this.props.config,"data-change"):this.props.updateConfig(this.props.links,"update"):this.props.updateConfig(this.props.config,"location-change"),e.defaultOpenLevel!==this.props.defaultOpenLevel&&this.props.updateConfig(this.props.config,"update"),e.collapsed!==this.props.collapsed&&this.setState({collapsed:this.props.collapsed}),t.collapsed!==this.state.collapsed&&this.props.dispatchEvent("collapsed",x(this.props.data,{collapsed:this.state.collapsed}))},s.prototype.getCurrentLink=function(e){var t=null,a=this.props,n=a.config,r=a.data,i=a.valueField,d=xe(e,r,"| raw");return e&&(t=j(n,function(p){return i?p[i]===d:p.label==d||p.key==d})),t},s.prototype.toggleLink=function(e,t,a){return A(this,void 0,void 0,function(){var n,r,i,d,p,v,o,u,f,l,y;return L(this,function(b){switch(b.label){case 0:return n=this.props,r=n.config,i=n.updateConfig,d=n.deferLoad,p=n.dispatchEvent,v=n.stacked,o=n.mode,u=n.accordion,f=n.data,l=v&&o!=="float"&&u,[4,p("toggled",x(f,{item:C({},e),open:typeof a<"u"?!a:!e.unfolded}))];case 1:return y=b.sent(),y!=null&&y.prevented?[2]:(e.defer&&!e.loaded?d(e):i(z(r,function(c){return e.__id===c.__id?C(C({},c),{unfolded:typeof a<"u"?!a:!c.unfolded}):C(C({},c),{unfolded:l?!!j(c.children||[],function(I){return I===e}):c.unfolded})}),"toggle"),[2])}})})},s.prototype.dragUpdate=function(e){var t,a;return A(this,void 0,void 0,function(){var n,r,i,d,p,v;return L(this,function(o){switch(o.label){case 0:return n=this.props.config,r=e.nodeId,i=e.dragLink,d=e.position,i&&(p=se(n,function(u){return u.__id===i.__id}),n=J(n,p,1),d==="self"?z(n,function(u){return u.__id===r&&(u.children||(u.children=[]),u.children.push(i)),u}):(v=se(n,function(u){return u.__id===r}),d==="bottom"&&v&&v.push(v.pop()+1),n=J(n,v,0,i))),this.props.updateConfig(n,"update"),(a=(t=this.props).onOrderChange)===null||a===void 0||a.call(t,n),[4,this.saveOrder(z(n,function(u){for(var f in u)/^__.*$/.test(f)&&delete u[f];return u}))];case 1:return o.sent(),[2]}})})},s.prototype.saveOrder=function(e){return A(this,void 0,void 0,function(){var t,a,n,r,i;return L(this,function(d){switch(d.label){case 0:return t=this.props,a=t.saveOrderApi,n=t.env,r=t.data,i=t.reload,a&&Fe(a)?[4,n==null?void 0:n.fetcher(a,x(r,{data:e}),{method:"post"})]:[3,2];case 1:return d.sent(),i(),[3,3];case 2:this.props.onOrderChange||n==null||n.alert("NAV saveOrderApi is required!"),d.label=3;case 3:return[2]}})})},s.prototype.expandLink=function(e){var t=this.props,a=t.config,n=t.updateConfig;n(z(a,function(r){return j((r==null?void 0:r.children)||[],function(i){return i.__id===e.__id})?C(C({},r),{expanded:!0}):C({},r)}),"expand")},s.prototype.handleChange=function(e){var t=this.props,a=t.dispatchEvent,n=t.data;setTimeout(function(){a("change",x(n,{value:e}))})},s.prototype.handleSelect=function(e,t){return A(this,void 0,void 0,function(){var a,n,r,i,d,p,v,o,u;return L(this,function(f){switch(f.label){case 0:return a=this.props,n=a.onSelect,r=a.env,i=a.data,d=a.level,p=a.dispatchEvent,v=a.updateConfig,o=a.config,[4,p("click",x(i,{item:C({},e)}))];case 1:return u=f.sent(),u!=null&&u.prevented?[2]:n&&n(e)===!1?[2]:t===d?(v(z(o,function(l){return C(C({},l),{active:l.__id===e.__id})}),"select"),[2]):e.expandMore?(this.expandLink(e),[2]):e.to?(r==null||r.jumpTo(B(e.to,i),e,i),[2]):[2]}})})},s.prototype.render=function(){var e=this.props,t=e.disabled,a=e.loading,n=e.config;e.deferLoad,e.updateConfig;var r=ce(e,["disabled","loading","config","deferLoad","updateConfig"]),i=this.getCurrentLink(this.state.currentKey);return m.createElement(Be,C({},r,{loading:a,links:(i==null?void 0:i.children)||n,collapsed:this.state.collapsed,disabled:t||a,onSelect:this.handleSelect,onToggle:this.toggleLink,onChange:this.handleChange,onDragUpdate:this.dragUpdate}))},s}(m.Component)),Ue=function(g){ee(s,g);function s(e,t){var a=g.call(this,e)||this;a.remoteRef=void 0;var n=t;return n.registerComponent(a),a}return s.prototype.remoteConfigRef=function(e){this.remoteRef=e},s.prototype.getRef=function(e){this.navRef=e},s.prototype.componentDidUpdate=function(e){this.remoteRef&&this.props.source!==e.source&&this.remoteRef.syncConfig()},s.prototype.componentWillUnmount=function(){var e=this.context;e.unRegisterComponent(this)},s.prototype.doAction=function(e,t,a,n){var r,i=e==null?void 0:e.actionType,d=(n==null?void 0:n.value)||((r=e==null?void 0:e.data)===null||r===void 0?void 0:r.value);if(i==="updateItems"){var p=this.props.valueField,v=[];if(d){if(Array.isArray(d)){if(d.length>0){var o=d.find(function(S){return S.children&&S.children.length});if(o){var u=p?o[p]:(o==null?void 0:o.key)||(o==null?void 0:o.label);this.navRef.state.currentKey!==u&&(this.navRef.setState({currentKey:u}),v=o.children)}else this.navRef.setState({currentKey:""})}}else if(typeof d=="string"&&this.navRef.state.currentKey!==d){this.navRef.setState({currentKey:d});var f=this.navRef.getCurrentLink(d);v=f==null?void 0:f.children}}if(v.length>0){var l=this.props,y=l.env,b=l.data,c=j(v,function(S){return y&&y.isCurrentUrl(B(S.to,b),S)});y==null||y.jumpTo(B(c?c.to:v[0].to,b),void 0,b)}}else if(i==="collapse"){var I=typeof d<"u"?d:!this.navRef.state.collapsed;this.navRef.setState({collapsed:I})}else i==="reset"&&this.navRef.setState({currentKey:""})},s.prototype.reload=function(e,t,a){var n;if(t)return this.receive(t);var r=this.props,i=r.data;r.translate;var d=a?x(i,a):i;(n=this.remoteRef)===null||n===void 0||n.loadConfig(d)},s.prototype.receive=function(e){this.reload(void 0,void 0,e)},s.prototype.render=function(){var e=this.props,t=e.id,a=ce(e,["id"]);return m.createElement(Me,C({},a,{id:t||le(),onRef:this.getRef,reload:this.reload,remoteConfigRef:this.remoteConfigRef}))},s.contextType=Ae,E([_,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"remoteConfigRef",null),E([_,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"getRef",null),E([_,h("design:type",Function),h("design:paramtypes",[String,Object,Object]),h("design:returntype",void 0)],s.prototype,"reload",null),E([_,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"receive",null),s=E([Le({type:"nav",alias:["navigation"],name:"nav"}),h("design:paramtypes",[Object,Object])],s),s}(m.Component);export{je as Navigation,Ue as NavigationRenderer,Be as default};
