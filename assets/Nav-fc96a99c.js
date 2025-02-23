import{a as ae,h as A,k as E,a6 as be,a3 as Q,R as z,aP as Ce,a5 as q,j as w,I as Z,n as F,d as b,l as W,E as L,F as G,bU as Se,O as Ie,aL as we,dz as Ne,dA as _e,S as Oe,e as N,p as O,q as h,bv as xe,bC as Le,ag as M,am as Ae,aT as pe,ae as B,dB as se,af as H,a4 as Ee,r as De,b as ve,s as Re,f as Te,ca as je,a7 as Be,b4 as le,dC as Fe,ak as ue,bL as ce,w as Pe}from"./index-12050af9.js";var Ue=function(g){ae(s,g);function s(){var e=g!==null&&g.apply(this,arguments)||this;return e.startPoint={y:0,x:0},e.state={keyword:"",filteredLinks:[]},e}return s.prototype.handleClick=function(e,t){return A(this,void 0,void 0,function(){var a,n,r;return E(this,function(i){switch(i.label){case 0:return a=this.props,n=a.env,r=a.onSelect,e&&e.to&&(n==null||n.tracker({eventType:"link",eventData:{label:e.label,link:e.to}})),[4,r==null?void 0:r(e,t)];case 1:return i.sent(),[2,!1]}})})},s.prototype.handleChange=function(e){return A(this,void 0,void 0,function(){var t;return E(this,function(a){return t=this.props.onChange,t&&t(e),[2]})})},s.prototype.toggleLink=function(e,t,a){var n,r;(r=(n=this.props).onToggle)===null||r===void 0||r.call(n,e,t,a)},s.prototype.getDropInfo=function(e,t,a){var n,r,i=this.props,d=i.dragOnSameLevel,p=i.indentSize,v=e.target.getBoundingClientRect(),o=(n=this.dragNode)===null||n===void 0?void 0:n.link,c=v.top,f=v.height,l=v.width,y=e.clientY,m=e.clientX,u=a*((r=parseInt(p,10))!==null&&r!==void 0?r:16),C=u+l*.2,S;return y>=c+f/2?S="bottom":S="top",!d&&S==="bottom"&&m>=this.startPoint.x+C&&(S="self"),{nodeId:t,dragLink:o,position:S,rect:v,height:f,left:u}},s.prototype.updateDropIndicator=function(e){var t,a=this.props,n=a.dragOnSameLevel,r=a.overflow,i=e.target.querySelector("a"),d=i==null?void 0:i.getAttribute("data-id"),p=Number(i==null?void 0:i.getAttribute("data-depth")),v=r&&r.enable&&r.wrapperComponent||"ul";if(n&&((t=this.dragNode)===null||t===void 0?void 0:t.node.closest("".concat(v,'[role="menu"]')))!==(i==null?void 0:i.closest("".concat(v,'[role="menu"]')))){this.setState({dropIndicator:void 0}),this.dropInfo=null;return}this.dropInfo=this.getDropInfo(e,d,p);var o=this.dropInfo,c=o.position,f=o.rect,l=o.dragLink,y=o.height,m=o.left;if(d===(l==null?void 0:l.__id)){this.setState({dropIndicator:void 0}),this.dropInfo=null;return}var u=be.findDOMNode(this).firstChild;if(c==="self"){var C={top:f.top-u.getBoundingClientRect().top,left:m,width:u.getBoundingClientRect().width-m,height:y,opacity:.2};(!this.state.dropIndicator||this.state.dropIndicator&&!Q(this.state.dropIndicator,C))&&this.setState({dropIndicator:C})}else{var C={top:(c==="bottom"?f.top+f.height:f.top)-u.getBoundingClientRect().top,left:m,width:u.getBoundingClientRect().width-m};(!this.state.dropIndicator||this.state.dropIndicator&&!Q(this.state.dropIndicator,C))&&this.setState({dropIndicator:C})}},s.prototype.handleDragStart=function(e){var t=this;return function(a){a.stopPropagation();var n=a.currentTarget;a.dataTransfer.effectAllowed="copyMove",a.dataTransfer.setDragImage(n,0,0),t.dragNode={node:n,link:e},t.dropInfo=null,t.startPoint={x:a.clientX,y:a.clientY},n.addEventListener("dragend",t.handleDragEnd),document.body.addEventListener("dragover",t.handleDragOver)}},s.prototype.handleDragOver=function(e){if(e.preventDefault(),e.stopPropagation(),!!this.dragNode){var t=e.target.querySelector("a"),a=t==null?void 0:t.getAttribute("data-id");a&&this.updateDropIndicator(e)}},s.prototype.handleDragEnd=function(e){var t,a,n;e.preventDefault(),e.stopPropagation(),this.setState({dropIndicator:void 0});var r=e.currentTarget,i=r.getAttribute("data-id");if(!i){var d=r.querySelector("a");d&&(i=d.getAttribute("data-id"))}var p=(t=this.dropInfo)===null||t===void 0?void 0:t.nodeId;!this.dropInfo||!p||i===p||(r.removeEventListener("dragend",this.handleDragEnd),document.body.removeEventListener("dragover",this.handleDragOver),(n=(a=this.props).onDragUpdate)===null||n===void 0||n.call(a,this.dropInfo),this.dragNode=null,this.dropInfo=null)},s.prototype.normalizeNavigations=function(e,t){var a=this,n=this.props,r=n.level,i=n.stacked,d=n.mode,p=n.itemActions,v=n.render,o=n.popOverContainer,c=n.env,f=n.classnames,l=n.data,y=n.collapsed;if(!e)return[];if(r&&t>r)return[];var m=y&&t===1;return e.filter(function(u){return!(u.hidden===!0||u.visible===!1)}).map(function(u){var C=[],S=[];u.icon&&(Array.isArray(u.icon)?u.icon:[u.icon]).forEach(function(I,T){if(z.isValidElement(I))C.push(I);else if(Ce(I))C.push(w(Z,{cx:f,icon:I,className:m?"":"mr-2"},"icon-".concat(T)));else if(I&&q(I)){var K=I.position==="after",V=w(Z,{cx:f,icon:I.icon||I,className:m?"":K?"ml-2":"mr-2"},"icon-".concat(T));K?S.push(V):C.push(V)}});var j=typeof u.label=="string"?F(u.label,l):z.isValidElement(u.label)?z.cloneElement(u.label):v("inline",u.label),X=i&&d!=="float"&&!u.expanded&&u.overflow&&q(u.overflow)&&u.overflow.enable,_=u.children;if(X){var P=u.overflow,k=P.maxVisibleCount,$=P.overflowIndicator,ee=$===void 0?"fa fa-ellipsis-h":$,D=P.overflowLabel,Y=P.overflowClassName,R=k||2;R<((_==null?void 0:_.length)||0)&&(_=_==null?void 0:_.map(function(I,T){return b(b({},I),{label:T===R?W("span",{className:f(Y),children:[w(Z,{icon:ee,className:"icon Nav-item-icon"}),D&&q(D)?v("nav-overflow-label",D):D]}):I.label,hidden:T>R?!0:u.hidden,expandMore:T===R})}))}return{link:u,label:j,labelExtra:S.length?w("i",{className:f("Nav-Menu-item-icon-after"),children:S}):null,icon:C.length?w("i",{children:C}):null,children:_?a.normalizeNavigations(_,u.mode==="group"?t:t+1):[],path:u.to,open:u.unfolded,extra:p?v("inline",p,{data:L(l,u),popOverContainer:o||(c&&c.getModalContainer?c.getModalContainer:function(){return document.body}),closeOnClick:!0}):null,disabled:!!u.disabled,disabledTip:u.disabledTip,hidden:u.hidden,className:u.className,mode:u.mode}})},s.prototype.handleSearch=function(e){return A(this,void 0,void 0,function(){var t,a,n,r,i,d,p;return E(this,function(v){return t=this.props,a=t.links,n=t.searchConfig,r=n===void 0?{}:n,i=je(a??[]),d=r==null?void 0:r.matchFunc,e?(d&&typeof d=="string"?d=Be(d,"link","keyword"):typeof d=="function"||(d=function(o,c){var f,l,y=(f=le([o],c,{keys:["label","title","key"],threshold:le.rankings.CONTAINS}))===null||f===void 0?void 0:f.length;return y||(o==null?void 0:o.children)&&((l=o.children)===null||l===void 0?void 0:l.length)>0}),p=function(o,c){var f=function(l,y){if(d(y,c))return l.push(b(b({},y),{unfolded:!0})),l;if(Array.isArray(y.children)){var m=y.children.reduce(f,[]);m.length&&l.push(b(b({},y),{unfolded:!0,children:m}))}return l};return o.reduce(f,[])},this.setState({keyword:e,filteredLinks:p(i,e)}),[2]):(this.setState({keyword:"",filteredLinks:[]}),[2])})})},s.prototype.renderSearchBox=function(){var e,t,a,n=this.props,r=n.classnames,i=n.searchable,d=n.searchConfig,p=d===void 0?{}:d,v=this.state.keyword;return w(G,{children:i?w(Se,{className:r("Nav-SearchBox",p==null?void 0:p.className),mini:(e=p.mini)!==null&&e!==void 0?e:!1,enhance:(t=p.enhance)!==null&&t!==void 0?t:!1,clearable:(a=p.clearable)!==null&&a!==void 0?a:!0,searchImediately:p.searchImediately,placeholder:p.placeholder,defaultValue:"",value:v??"",onSearch:this.handleSearch,onChange:Ie}):null})},s.prototype.render=function(){var e,t=this.props,a=t.className,n=t.style,r=t.stacked,i=t.mode,d=t.classnames,p=t.links,v=t.loading,o=t.overflow,c=t.loadingConfig,f=t.itemBadge,l=t.badge,y=t.data,m=t.location,u=t.collapsed,C=t.expandIcon,S=t.indentSize,j=t.accordion,X=t.draggable,_=t.themeColor,P=t.expandPosition,k=t.popupClassName,$=t.disabled,ee=t.id,D=t.render,Y=t.popOverContainer,R=t.env,I=t.searchable,T=t.testIdBuilder,K=this.state,V=K.dropIndicator,te=K.filteredLinks,re=null;if(o&&q(o)&&o.enable){var oe=o.overflowIndicator,fe=oe===void 0?"fa fa-ellipsis-h":oe,J=o.overflowLabel,he=o.overflowClassName;re=w("span",{className:d(he),children:W(G,{children:[w(Z,{icon:fe,className:"icon Nav-item-icon"}),J&&q(J)?D("nav-overflow-label",J):J]})})}var ne=null,U="";if(n)try{ne=we(n,y);var ge=JSON.stringify(ne).replace(/\,/g,";").replace(/\"/g,"").replace(/[A-Z]/g,function(x){return"-"+x.toLowerCase()});U=d("Nav-PopupClassName-".concat(ee)),document.getElementById(U)||Ne({style:".".concat(U," ").concat(ge),classId:U})}catch{}var ie=Array.isArray(te)&&te.length>0?te:p,de=W(G,{children:[Array.isArray(ie)?w(_e,{navigations:this.normalizeNavigations(ie,1),isActive:function(x,Ke){if(x.link&&typeof x.link.active<"u")return x.link.active;var ye=x.path,me=m.pathname===ye;return!!me},isOpen:function(x){return!!x.open},stacked:!!r,mode:i,testIdBuilder:T,themeColor:_,onSelect:this.handleClick,onToggle:this.toggleLink,onChange:this.handleChange,renderLink:function(x){return x.link},badge:f||l,collapsed:u,overflowedIndicator:re,overflowMaxCount:o==null?void 0:o.maxVisibleCount,overflowedIndicatorPopupClassName:d(o==null?void 0:o.overflowPopoverClassName),overflowSuffix:o!=null&&o.overflowSuffix?D("nav-overflow-suffix",o==null?void 0:o.overflowSuffix):null,overflowItemWidth:o==null?void 0:o.itemWidth,overflowComponent:o==null?void 0:o.wrapperComponent,overflowStyle:o==null?void 0:o.style,popupClassName:"".concat(k||"").concat(U?" ".concat(U):""),expandIcon:C?typeof C=="string"?C:D("expand-icon",C):null,expandBefore:P!=="after",inlineIndent:S,accordion:j,draggable:X,data:y,disabled:$,onDragStart:this.handleDragStart,popOverContainer:Y||(R&&R.getModalContainer?R.getModalContainer:function(){return document.body})}):null,w(Oe,{show:!!v,overlay:!0,loadingConfig:c})]});return W("div",{className:d("Nav",a,(e={},e["Nav-horizontal"]=!r,e["Nav--searchable"]=!!I,e)),style:ne,children:[I?W(G,{children:[this.renderSearchBox(),de]}):de,V?w("div",{className:d("Nav-dropIndicator"),style:V}):null]})},s.defaultProps={indentSize:16},N([O,h("design:type",Function),h("design:paramtypes",[Object,Number]),h("design:returntype",Promise)],s.prototype,"handleClick",null),N([O,h("design:type",Function),h("design:paramtypes",[Array]),h("design:returntype",Promise)],s.prototype,"handleChange",null),N([O,h("design:type",Function),h("design:paramtypes",[Object,Number,Boolean]),h("design:returntype",void 0)],s.prototype,"toggleLink",null),N([O,h("design:type",Function),h("design:paramtypes",[DragEvent,String,Number]),h("design:returntype",Object)],s.prototype,"getDropInfo",null),N([O,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"updateDropIndicator",null),N([O,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"handleDragStart",null),N([O,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"handleDragOver",null),N([O,h("design:type",Function),h("design:paramtypes",[DragEvent]),h("design:returntype",void 0)],s.prototype,"handleDragEnd",null),N([O,h("design:type",Function),h("design:paramtypes",[String]),h("design:returntype",Promise)],s.prototype,"handleSearch",null),s}(z.Component),Me=xe(Ue),ze=Le({adaptor:function(g,s){var e=Array.isArray(g)?g:g.links||g.options||g.items||g.rows;if(!Array.isArray(e))throw new Error("payload.data.options is not array.");return e},afterLoad:function(g,s,e){return A(void 0,void 0,void 0,function(){var t,a,n,r;return E(this,function(i){switch(i.label){case 0:return t=e.dispatchEvent,a=e.data,[4,t("loaded",L(a,{data:g.value,items:g.links}))];case 1:return n=i.sent(),n!=null&&n.prevented?[2]:(g.value&&!Fe(s,function(d){return d.active})&&(r=e.env,r.jumpTo(F(g.value,e.data),void 0,e.data)),[2])}})})},normalizeConfig:function(g,s,e,t){if(Array.isArray(g)&&t!=="toggle"){var a=e.data,n=e.env,r=e.unfoldedField,i=e.foldedField,d=e.location,p=e.level,v=e.defaultOpenLevel,o=e.disabled,c=e.valueField,f=function(l,y){return o||l.disabled?!1:t&&!["location-change","data-change"].includes(t)&&typeof l.active<"u"?l.active:(y===p?!!B(l.children||[],function(m){return!!(m.hasOwnProperty("to")&&n&&n.isCurrentUrl(F(m.to,a),l))}):!1)||(l.activeOn?ue(l.activeOn,a)||ue(l.activeOn,d):!!(l.hasOwnProperty("to")&&l.to!==null&&n&&n.isCurrentUrl(F(l.to,a),l)))};g=M(g,function(l,y,m){var u,C=b(b(b({},l),Ae(l,a)),{active:f(l,m),__id:(u=l.__id)!==null&&u!==void 0?u:pe()}),S=null;return!l.defer&&c&&l[c]&&(S=B(s||[],function(j){return j[c]===l[c]})),C.unfolded=S?se(S,{unfoldedField:r,foldedField:i}):typeof l.unfolded<"u"?se(C,{unfoldedField:r,foldedField:i}):v&&m<=v?!0:l.children&&!!B(l.children,function(j,X,_){return f(j,m+_)}),C},1,!0)}return g},beforeDeferLoad:function(g,s,e){return H(e,s,1,b(b({},g),{loading:!0}))},afterDeferLoad:function(g,s,e,t,a){var n,r,i,d;return A(this,void 0,void 0,function(){var p,v,o,c,f;return E(this,function(l){switch(l.label){case 0:return p=a.dispatchEvent,v=a.data,[4,p("loaded",L(v,{data:e.data,item:b({},g)}))];case 1:return o=l.sent(),o!=null&&o.prevented?[2]:(c=b(b({},g),{loading:!1,loaded:!0,error:e.ok?void 0:e.msg}),f=Array.isArray(e.data)?e.data:((n=e.data)===null||n===void 0?void 0:n.links)||((r=e.data)===null||r===void 0?void 0:r.options)||((i=e.data)===null||i===void 0?void 0:i.items)||((d=e.data)===null||d===void 0?void 0:d.rows),Array.isArray(f)&&(c.children=f.concat(),c.unfolded=!0),[2,H(t,s,1,c)])}})})}})(function(g){ae(s,g);function s(e){var t=g.call(this,e)||this;return t.state={currentKey:e.showKey||"",collapsed:e.collapsed||!1},t.toggleLink=t.toggleLink.bind(t),t.handleSelect=t.handleSelect.bind(t),t.dragUpdate=t.dragUpdate.bind(t),t.handleChange=t.handleChange.bind(t),e==null||e.onRef(t),t}return s.prototype.componentDidMount=function(){Array.isArray(this.props.links)&&this.props.updateConfig(this.props.links,"mount")},s.prototype.componentDidUpdate=function(e,t){Q(this.props.location,e.location)?Q(this.props.links,e.links)?Ee(this.props.data,e.data,!1,void 0,void 0,10)&&this.props.updateConfig(this.props.config,"data-change"):this.props.updateConfig(this.props.links,"update"):this.props.updateConfig(this.props.config,"location-change"),e.defaultOpenLevel!==this.props.defaultOpenLevel&&this.props.updateConfig(this.props.config,"update"),e.collapsed!==this.props.collapsed&&this.setState({collapsed:this.props.collapsed}),t.collapsed!==this.state.collapsed&&this.props.dispatchEvent("collapsed",L(this.props.data,{collapsed:this.state.collapsed}))},s.prototype.getCurrentLink=function(e){var t=null,a=this.props,n=a.config,r=a.data,i=a.valueField,d=De(e,r,"| raw");return e&&(t=B(n,function(p){return i?p[i]===d:p.label==d||p.key==d})),t},s.prototype.toggleLink=function(e,t,a){return A(this,void 0,void 0,function(){var n,r,i,d,p,v,o,c,f,l,y;return E(this,function(m){switch(m.label){case 0:return n=this.props,r=n.config,i=n.updateConfig,d=n.deferLoad,p=n.dispatchEvent,v=n.stacked,o=n.mode,c=n.accordion,f=n.data,l=v&&o!=="float"&&c,[4,p("toggled",L(f,{item:b({},e),open:typeof a<"u"?!a:!e.unfolded}))];case 1:return y=m.sent(),y!=null&&y.prevented?[2]:(e.defer&&!e.loaded?d(e):i(M(r,function(u){return e.__id===u.__id?b(b({},u),{unfolded:typeof a<"u"?!a:!u.unfolded}):b(b({},u),{unfolded:l?!!B(u.children||[],function(C){return C===e}):u.unfolded})}),"toggle"),[2])}})})},s.prototype.dragUpdate=function(e){var t,a;return A(this,void 0,void 0,function(){var n,r,i,d,p,v;return E(this,function(o){switch(o.label){case 0:return n=this.props.config,r=e.nodeId,i=e.dragLink,d=e.position,i&&(p=ce(n,function(c){return c.__id===i.__id}),n=H(n,p,1),d==="self"?M(n,function(c){return c.__id===r&&(c.children||(c.children=[]),c.children.push(i)),c}):(v=ce(n,function(c){return c.__id===r}),d==="bottom"&&v&&v.push(v.pop()+1),n=H(n,v,0,i))),this.props.updateConfig(n,"update"),(a=(t=this.props).onOrderChange)===null||a===void 0||a.call(t,n),[4,this.saveOrder(M(n,function(c){for(var f in c)/^__.*$/.test(f)&&delete c[f];return c}))];case 1:return o.sent(),[2]}})})},s.prototype.saveOrder=function(e){return A(this,void 0,void 0,function(){var t,a,n,r,i;return E(this,function(d){switch(d.label){case 0:return t=this.props,a=t.saveOrderApi,n=t.env,r=t.data,i=t.reload,a&&Pe(a)?[4,n==null?void 0:n.fetcher(a,L(r,{data:e}),{method:"post"})]:[3,2];case 1:return d.sent(),i(),[3,3];case 2:this.props.onOrderChange||n==null||n.alert("NAV saveOrderApi is required!"),d.label=3;case 3:return[2]}})})},s.prototype.expandLink=function(e){var t=this.props,a=t.config,n=t.updateConfig;n(M(a,function(r){return B((r==null?void 0:r.children)||[],function(i){return i.__id===e.__id})?b(b({},r),{expanded:!0}):b({},r)}),"expand")},s.prototype.handleChange=function(e){var t=this.props,a=t.dispatchEvent,n=t.data;setTimeout(function(){a("change",L(n,{value:e}))})},s.prototype.handleSelect=function(e,t){return A(this,void 0,void 0,function(){var a,n,r,i,d,p,v,o,c;return E(this,function(f){switch(f.label){case 0:return a=this.props,n=a.onSelect,r=a.env,i=a.data,d=a.level,p=a.dispatchEvent,v=a.updateConfig,o=a.config,[4,p("click",L(i,{item:b({},e)}))];case 1:return c=f.sent(),c!=null&&c.prevented?[2]:n&&n(e)===!1?[2]:t===d?(v(M(o,function(l){return b(b({},l),{active:l.__id===e.__id})}),"select"),[2]):e.expandMore?(this.expandLink(e),[2]):e.to?(r==null||r.jumpTo(F(e.to,i),e,i),[2]):[2]}})})},s.prototype.render=function(){var e=this.props,t=e.disabled,a=e.loading,n=e.config;e.deferLoad,e.updateConfig;var r=ve(e,["disabled","loading","config","deferLoad","updateConfig"]),i=this.getCurrentLink(this.state.currentKey);return w(Me,{...b({},r,{loading:a,links:(i==null?void 0:i.children)||n,collapsed:this.state.collapsed,disabled:t||a,onSelect:this.handleSelect,onToggle:this.toggleLink,onChange:this.handleChange,onDragUpdate:this.dragUpdate})})},s}(z.Component)),qe=function(g){ae(s,g);function s(e,t){var a=g.call(this,e)||this;a.remoteRef=void 0;var n=t;return n.registerComponent(a),a}return s.prototype.remoteConfigRef=function(e){this.remoteRef=e},s.prototype.getRef=function(e){this.navRef=e},s.prototype.componentDidUpdate=function(e){this.remoteRef&&this.props.source!==e.source&&this.remoteRef.syncConfig()},s.prototype.componentWillUnmount=function(){var e=this.context;e.unRegisterComponent(this)},s.prototype.doAction=function(e,t,a,n){var r,i=e==null?void 0:e.actionType,d=(n==null?void 0:n.value)||((r=e==null?void 0:e.data)===null||r===void 0?void 0:r.value);if(i==="updateItems"){var p=this.props.valueField,v=[];if(d){if(Array.isArray(d)){if(d.length>0){var o=d.find(function(S){return S.children&&S.children.length});if(o){var c=p?o[p]:(o==null?void 0:o.key)||(o==null?void 0:o.label);this.navRef.state.currentKey!==c&&(this.navRef.setState({currentKey:c}),v=o.children)}else this.navRef.setState({currentKey:""})}}else if(typeof d=="string"&&this.navRef.state.currentKey!==d){this.navRef.setState({currentKey:d});var f=this.navRef.getCurrentLink(d);v=f==null?void 0:f.children}}if(v.length>0){var l=this.props,y=l.env,m=l.data,u=B(v,function(S){return y&&y.isCurrentUrl(F(S.to,m),S)});y==null||y.jumpTo(F(u?u.to:v[0].to,m),void 0,m)}}else if(i==="collapse"){var C=typeof d<"u"?d:!this.navRef.state.collapsed;this.navRef.setState({collapsed:C})}else i==="reset"&&this.navRef.setState({currentKey:""})},s.prototype.reload=function(e,t,a){var n;if(t)return this.receive(t);var r=this.props,i=r.data;r.translate;var d=a?L(i,a):i;(n=this.remoteRef)===null||n===void 0||n.loadConfig(d)},s.prototype.receive=function(e){this.reload(void 0,void 0,e)},s.prototype.render=function(){var e=this.props,t=e.id,a=ve(e,["id"]);return w(ze,{...b({},a,{id:t||pe(),onRef:this.getRef,reload:this.reload,remoteConfigRef:this.remoteConfigRef})})},s.contextType=Re,N([O,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"remoteConfigRef",null),N([O,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"getRef",null),N([O,h("design:type",Function),h("design:paramtypes",[String,Object,Object]),h("design:returntype",void 0)],s.prototype,"reload",null),N([O,h("design:type",Function),h("design:paramtypes",[Object]),h("design:returntype",void 0)],s.prototype,"receive",null),s=N([Te({type:"nav",alias:["navigation"],name:"nav"}),h("design:paramtypes",[Object,Object])],s),s}(z.Component);export{Ue as Navigation,qe as NavigationRenderer,Me as default};
