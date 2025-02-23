import{a as ce,b2 as pe,d as c,cv as be,b as Ie,cw as ye,a7 as ge,cx as xe,h as R,k as F,i as we,r as Ce,bO as Q,af as S,a5 as Pe,an as oe,cy as te,l as H,ap as G,j as _,I as $,ag as Ee,e as fe,p as Ae,q as ne,R as Re,C as Fe,aq as he,c6 as ie,w as K,E as W,aX as Te,ba as le,aY as Be,cz as Se,Y as ke,as as O,aj as N,cA as de,cd as ue,bL as Oe,al as me,n as _e}from"./index-12050af9.js";var U="__isPlaceholder",Ve=function(X){ce(w,X);function w(e){var t=X.call(this,e)||this;t.entityId=1,t.subForms={},t.subFormItems={},t.rowPrinstine=[],t.editting={},t.toDispose=[],t.lazyEmitValue=pe(t.emitValue.bind(t),50,{trailing:!0,leading:!1}),t.emittedValue=null;var i=e.addHook,n=Array.isArray(e.value)?e.value.concat():[];return t.state=c({columns:t.buildColumns(e),editIndex:"",items:n},t.transformState(n)),t.entries=new be,t.buildItemProps=t.buildItemProps.bind(t),t.confirmEdit=t.confirmEdit.bind(t),t.cancelEdit=t.cancelEdit.bind(t),t.handleSaveTableOrder=t.handleSaveTableOrder.bind(t),t.handleTableSave=t.handleTableSave.bind(t),t.handleRadioChange=t.handleRadioChange.bind(t),t.getEntryId=t.getEntryId.bind(t),t.subFormRef=t.subFormRef.bind(t),t.subFormItemRef=t.subFormItemRef.bind(t),t.handlePageChange=t.handlePageChange.bind(t),t.handleTableQuery=t.handleTableQuery.bind(t),t.emitValue=t.emitValue.bind(t),t.tableRef=t.tableRef.bind(t),t.flush=t.flush.bind(t),t.filterItemIndex=t.filterItemIndex.bind(t),i&&t.toDispose.push(i(t.flush,"flush")),t}return w.prototype.componentDidUpdate=function(e,t){var i=this.props,n=null;if(e.disabled!==i.disabled||e.static!==i.static||i.$schema.disabled!==e.$schema.disabled||i.$schema.static!==e.$schema.static){var a=this.state.items.filter(function(r){return!r.hasOwnProperty(U)});n=c(c(c(c({},n),{items:a}),this.transformState(a)),{editIndex:"",columns:this.buildColumns(i)})}if(i.columns!==e.columns&&(n=c(c({},n),{columns:this.buildColumns(i)})),i.value!==e.value&&i.value!==this.emittedValue){var a=Array.isArray(i.value)?i.value.concat():[];n=c(c(c(c({},n),{items:a}),this.transformState(a)),{editIndex:""})}n&&this.setState(n)},w.prototype.componentWillUnmount=function(){this.entries.dispose(),this.lazyEmitValue.cancel(),this.toDispose.forEach(function(e){return e()}),this.toDispose=[]},w.prototype.transformState=function(e,t,i){var n=this.props,a=n.perPage,r=n.matchFunc,o=c(c({},this.state),t),v=o.query,s=o.page,m=v??{},b=m.orderBy,u=m.orderDir,y=Ie(m,["orderBy","orderDir"]),I=Object.keys(y);I.length&&(e=ye(e,{query:y,columns:this.state.columns,matchFunc:typeof r=="string"&&r?ge(r,"items","itemsRaw","options"):typeof r=="function"?r:void 0})),b&&(e=xe(e.concat(),b,typeof u=="string"&&/desc/i.test(u)?-1:1));var p=e.length;if(s=Math.min(s??1,typeof a=="number"?Math.max(1,Math.ceil(p/a)):1),i){var f=e.indexOf(i);~f&&(s=Math.ceil((f+1)/a))}return typeof a=="number"&&a&&e.length>a&&(e=e.slice((s-1)*a,s*a)),{filteredItems:e,page:s,total:p}},w.prototype.flush=function(){return R(this,void 0,void 0,function(){var e,t,i=this;return F(this,function(n){switch(n.label){case 0:return e=[],Object.keys(this.subForms).forEach(function(a){return i.subForms[a]&&e.push(i.subForms[a])}),[4,Promise.all(e.map(function(a){return a.flush()}))];case 1:return n.sent(),t=[],Object.keys(this.subFormItems).forEach(function(a){return i.subFormItems[a]&&t.push(i.subFormItems[a])}),[4,Promise.all(t.map(function(a){var r,o;return(o=(r=a.props).onFlushChange)===null||o===void 0?void 0:o.call(r)}))];case 2:return n.sent(),[4,this.lazyEmitValue.flush()];case 3:return n.sent(),[2]}})})},w.prototype.resolveVariableProps=function(e,t){var i={minLength:0,maxLength:1/0},n=e[t];if(!n)return i[t];if(typeof n=="string")if(we(n)){var a=Ce(n,e.data,"| raw");n=typeof a=="number"&&a>=0?a:i[t]}else{var r=parseInt(n,10);n=isNaN(r)?i[t]:r}return n},w.prototype.subFormRef=function(e,t,i){this.subForms["".concat(t,"-").concat(i)]=e},w.prototype.subFormItemRef=function(e,t,i){this.subFormItems["".concat(t,"-").concat(i)]=e},w.prototype.validate=function(){return R(this,void 0,void 0,function(){var e,t,i,n,a,r,o,v,s,m,b,u,y,I=this;return F(this,function(p){switch(p.label){case 0:return e=this.props,t=e.value,i=e.translate,n=e.columns,a=this.resolveVariableProps(this.props,"minLength"),r=this.resolveVariableProps(this.props,"maxLength"),this.state.editIndex?[2,i("Table.editing")]:a&&(!Array.isArray(t)||t.length<a)?[2,i("Combo.minLength",{minLength:a})]:[3,1];case 1:return r&&Array.isArray(t)&&t.length>r?[2,i("Combo.maxLength",{maxLength:r})]:[3,2];case 2:return o=[],Object.keys(this.subForms).forEach(function(f){return I.subForms[f]&&o.push(I.subForms[f])}),o.length?[4,Promise.all(o.map(function(f){return f.validate()}))]:[3,4];case 3:if(v=p.sent(),s=~v.indexOf(!1)?i("Form.validateFailed"):"",m="",!s&&Array.isArray(n)&&Array.isArray(t)&&n.some(function(f){if(f.unique&&f.name){var g=[];return t.some(function(l){var x=he(l,f.name);return~g.indexOf(x)?(m="".concat(f.label||f.name),!0):(g.push(x),!1)})}return!1})&&(s=i("InputTable.uniqueError",{label:m})),s)return[2,s];p.label=4;case 4:return b=[],Object.keys(this.subFormItems).forEach(function(f){return I.subFormItems[f]&&b.push(I.subFormItems[f])}),[4,Promise.all(b.map(function(f){return f.props.onValidate()}))];case 5:return u=p.sent(),y=~u.indexOf(!1)?i("Form.validateFailed"):"",[2,y]}})})},w.prototype.emitValue=function(e){return R(this,void 0,void 0,function(){var t,i,n;return F(this,function(a){switch(a.label){case 0:return t=e??this.state.items.filter(function(r){return!r.hasOwnProperty(U)}),i=this.props.onChange,[4,this.dispatchEvent("change")];case 1:return n=a.sent(),n||(this.emittedValue=t,i==null||i(t)),[2,n]}})})},w.prototype.doAction=function(e,t){for(var i,n,a=[],r=2;r<arguments.length;r++)a[r-2]=arguments[r];return R(this,void 0,void 0,function(){var o,v,s,m,b,u,y,I,p,f,g,l,x,d,h,E,q,T=this;return F(this,function(A){switch(A.label){case 0:return o=this.props,v=o.onAction,s=o.valueField,m=o.env,b=o.needConfirm,u=o.addable,y=o.addApi,I=o.translate,p=o.onChange,f=e.actionType,f!=="add"?[3,6]:u===!1?[2]:(g=this.state.items.concat(),y||e.payload?(l=null,K(y,t)?[4,m.fetcher(y,t)]:[3,2]):[3,4]);case 1:return x=A.sent(),x&&!x.ok?(!(y!=null&&y.silent)&&m.notify("error",(n=(i=y==null?void 0:y.messages)===null||i===void 0?void 0:i.failed)!==null&&n!==void 0?n:x.msg||I("fetchFailed")),[2]):(x&&x.ok&&(l=x.data),[3,3]);case 2:l=ie(e.payload,t),A.label=3;case 3:return l=Array.isArray(l)?l:[l],l.forEach(function(C){(!s||!me(g,function(P){return P[s]==C[s]}))&&(g.push(C),b!==!1&&Reflect.set(C,U,!0))}),this.setState(c({items:g},this.transformState(g)),function(){l.length===1&&b!==!1?T.startEdit("".concat(g.length-1),!0):p==null||p(g)}),[2];case 4:return[2,this.addItem("".concat(g.length-1),!1)];case 5:return[3,7];case 6:if(f==="remove"||f==="delete"){if(s){if(!e.payload)return[2,m.alert(I("Table.playload"))]}else return[2,m.alert(I("Table.valueField"))];return d=this.state.items.concat(),h=ie(e.payload,t),h=Array.isArray(h)?h:[h],h.forEach(function(C){var P=Oe(d,function(B){return B[s]==C[s]});P!=null&&P.length&&(d=S(d,P,1))}),this.setState(c({items:d},this.transformState(d)),function(){p==null||p(d)}),[2]}else f==="initDrag"?(E=this.table).doAction.apply(E,O([e,t],N(a),!1)):f==="cancelDrag"&&(q=this.table).doAction.apply(q,O([e,t],N(a),!1));A.label=7;case 7:return[2,v&&v.apply(void 0,O([e,t],N(a),!1))]}})})},w.prototype.copyItem=function(e){return R(this,void 0,void 0,function(){var t,i,n,a,r,o,v,s,m,b,u,y,I,p,f,g,l=this;return F(this,function(x){return t=this.props,i=t.needConfirm,n=t.data,a=t.copyData,r=a===void 0?{"&":"$$"}:a,o=this.state.items.concat(),v=e.split(".").map(function(d){return parseInt(d,10)}),s=v.concat(),s[s.length-1]+=1,m=o,b=Q(o,v),u=ie(r,W(n,b)),i===!1?o=S(o,s,0,u):o=S(o,s,0,c(c({},u),(g={},g[U]=!0,g))),this.reUseRowId(o,m,s),y=o[s[0]],I=c(c({},this.transformState(o)),{items:o}),I.filteredItems.includes(y)||(p=o[v[0]],f=I.filteredItems.findIndex(function(d){return d===p}),I.filteredItems.splice(f+1,0,y)),this.setState(I,function(){return R(l,void 0,void 0,function(){var d;return F(this,function(h){switch(h.label){case 0:return[4,this.dispatchEvent("add",{index:s[s.length-1],indexPath:s.join("."),item:u})];case 1:return d=h.sent(),d?[2]:(i===!1?this.emitValue():this.startEdit(s.join("."),!0),[2])}})})}),[2]})})},w.prototype.addItem=function(e,t,i){return t===void 0&&(t=!0),R(this,void 0,void 0,function(){var n,a,r,o,v,s,m,b,u,y,I,p,f,g,l,x=this;return F(this,function(d){return e=e||"".concat(this.state.items.length-1),n=this.props,a=n.needConfirm,r=n.scaffold,o=n.columns,v=n.data,n.perPage,s=this.state.items.concat(),m=(l={},l[U]=!0,l),Array.isArray(o)&&o.forEach(function(h){if(typeof h.value<"u"&&typeof h.name=="string")if("type"in h&&(h.type==="input-date"||h.type==="input-datetime"||h.type==="input-time"||h.type==="input-month"||h.type==="input-quarter"||h.type==="input-year")){if(!(typeof h.value=="string"&&h.value.trim()==="")){var E=Te(h.value,v,h.format||"X");le(m,h.name,(h.utc?Be.utc(E):E).format(h.format||"X"))}}else Se(h.value)||le(m,h.name,h.value)}),m=c(c({},m),r),a===!1&&Reflect.deleteProperty(m,U),b=e.split(".").map(function(h){return parseInt(h,10)}),u=b.concat(),u[u.length-1]+=1,y=s,s=S(s,u,0,m),this.reUseRowId(s,y,u),I=s[u[0]],p=c(c({items:s},this.transformState(s,void 0,I)),a===!1?{}:{editIndex:u.join("."),isCreateMode:!0,columns:this.buildColumns(this.props,!0,"".concat(e))}),p.filteredItems.includes(I)||(f=s[b[0]],g=p.filteredItems.findIndex(function(h){return h===f}),p.filteredItems.splice(g+1,0,I)),this.setState(p,function(){return R(x,void 0,void 0,function(){return F(this,function(h){switch(h.label){case 0:return t?[4,this.dispatchEvent("add",{index:u[u.length-1],indexPath:u.join("."),item:m})]:[3,2];case 1:h.sent(),h.label=2;case 2:return a===!1&&this.emitValue(),i==null||i(),[2]}})})}),[2,!1]})})},w.prototype.subAddItem=function(e,t,i){return t===void 0&&(t=!0),R(this,void 0,void 0,function(){return F(this,function(n){return[2,this.addItem(e+".-1",t,function(){i==null||i.setExpanded(!0)})]})})},w.prototype.editItem=function(e){return R(this,void 0,void 0,function(){var t,i,n,a;return F(this,function(r){switch(r.label){case 0:return t=this.state.items,i=e.split(".").map(function(o){return parseInt(o,10)}),n=Q(t,i),[4,this.dispatchEvent("edit",{index:i[i.length-1],indexPath:i.join("."),item:n})];case 1:return a=r.sent(),!a&&this.startEdit(e,!0),[2]}})})},w.prototype.dispatchEvent=function(e,t){return t===void 0&&(t={}),R(this,void 0,void 0,function(){var i,n,a,r,o;return F(this,function(v){switch(v.label){case 0:return i=this.props.dispatchEvent,n=this.state,a=n.items,r=n.rowIndex,[4,i(e,ke(this.props,c({value:O([],N(a),!1),rowIndex:r},t)))];case 1:return o=v.sent(),[2,!!(o!=null&&o.prevented)]}})})},w.prototype.startEdit=function(e,t){t===void 0&&(t=!1),this.setState({editIndex:e,isCreateMode:t,columns:this.buildColumns(this.props,t,e)})},w.prototype.confirmEdit=function(){var e,t,i;return R(this,void 0,void 0,function(){var n,a,r,o,v,s,m,b,u,y,I,p,f,g,l,x,d,h,E,q,T=this;return F(this,function(A){switch(A.label){case 0:return n=this.props,a=n.addApi,r=n.updateApi,o=n.data,v=n.env,s=n.translate,m=[],Object.keys(this.subForms).forEach(function(C){return T.subForms[C]&&m.push(T.subForms[C])}),m.forEach(function(C){return C.flush()}),b=[],Object.keys(this.subFormItems).forEach(function(C){return T.subFormItems[C]&&b.push(T.subFormItems[C])}),b.forEach(function(C){var P,B;return(B=(P=C.props).onFlushChange)===null||B===void 0?void 0:B.call(P)}),u=m,[4,Promise.all(u.map(function(C){return C.validate()}).concat(b.map(function(C){return C.props.onValidate()})))];case 1:return y=A.sent(),~y.indexOf(!1)?[2]:(I=this.state.items.concat(),p=this.state.editIndex.split(".").map(function(C){return parseInt(C,10)}),f=c({},Q(I,p)),g=f.hasOwnProperty(U),l=g?"addConfirm":"editConfirm",[4,this.dispatchEvent(l,{index:p[p.length-1],indexPath:p.join("."),item:f})]);case 2:return x=A.sent(),x?[2]:(d=null,h=void 0,g&&K(a,W(o,f))?[4,v.fetcher(a,W(o,f))]:[3,4]);case 3:return d=A.sent(),h=(e=a==null?void 0:a.messages)===null||e===void 0?void 0:e.failed,[3,6];case 4:return!g&&K(r,W(o,f))?[4,v.fetcher(r,W(o,f))]:[3,6];case 5:d=A.sent(),h=(t=r==null?void 0:r.messages)===null||t===void 0?void 0:t.failed,A.label=6;case 6:return d&&!d.ok?(!(!((i=g?a:r)===null||i===void 0)&&i.silent)&&v.notify("error",h??(d.msg||s("saveFailed"))),E=g?"addFail":"editFail",this.dispatchEvent(E,{index:p[p.length-1],indexPath:p.join("."),item:f,error:d}),[2]):(d&&d.ok&&(f=c(c({},(g?a:r).replaceData?{}:f),d.data)),Reflect.deleteProperty(f,U),q=I,I=S(I,p,1,f),this.reUseRowId(I,q,p),this.setState(c(c({editIndex:"",items:I},this.transformState(I)),{columns:this.buildColumns(this.props)}),function(){return R(T,void 0,void 0,function(){var C,P;return F(this,function(B){switch(B.label){case 0:return[4,this.emitValue()];case 1:return C=B.sent(),C?[2]:(P=g?"addSuccess":"editSuccess",this.dispatchEvent(P,{index:p[p.length-1],indexPath:p.join("."),item:f}),[2])}})})}),[2])}})})},w.prototype.cancelEdit=function(){var e=this.state.items.concat(),t=this.state.lastModifiedRow,i=this.state.editIndex.split(".").map(function(o){return parseInt(o,10)}),n=c({},Q(e,i)),a=n.hasOwnProperty(U),r=e;a?e=S(e,i,1):t&&~(t==null?void 0:t.index)&&Pe(t==null?void 0:t.data)&&(e=S(e,i,1,c(c({},n),t.data))),this.reUseRowId(e,r,i),this.setState(c(c({editIndex:"",items:e},this.transformState(e)),{columns:this.buildColumns(this.props),lastModifiedRow:void 0}),this.emitValue)},w.prototype.removeItem=function(e){var t,i;return R(this,void 0,void 0,function(){var n,a,r,o,v,s,m,b,u,y,I,p,f,g,l,x=this;return F(this,function(d){switch(d.label){case 0:return n=this.props,a=n.value,n.onChange,r=n.deleteApi,o=n.deleteConfirmText,v=n.env,s=n.data,m=n.translate,b=Array.isArray(a)?a.concat():[],u=e.split(".").map(function(h){return parseInt(h,10)}),y=Q(b,u),y?[4,this.dispatchEvent("delete",{index:u[u.length-1],indexPath:u.join("."),item:y})]:[2];case 1:return I=d.sent(),I?[2]:(p=W(s,y),K(r,p)?[4,v.confirm(o?_e(o,p):m("deleteConfirm"))]:[3,4]);case 2:return f=d.sent(),f?[4,v.fetcher(r,p)]:[2];case 3:if(g=d.sent(),!g.ok)return!(r!=null&&r.silent)&&v.notify("error",(i=(t=r==null?void 0:r.messages)===null||t===void 0?void 0:t.failed)!==null&&i!==void 0?i:m("deleteFailed")),this.dispatchEvent("deleteFail",{index:u[u.length-1],indexPath:u.join("."),item:y,error:g}),[2];d.label=4;case 4:return this.removeEntry(y),l=b,b=S(b,u,1),this.reUseRowId(b,l,u),this.setState(c({items:b},this.transformState(b)),function(){return R(x,void 0,void 0,function(){var h;return F(this,function(E){switch(E.label){case 0:return[4,this.emitValue(b)];case 1:return h=E.sent(),h?[2]:(this.dispatchEvent("deleteSuccess",{value:b,index:u[u.length-1],indexPath:u.join("."),item:y}),[2])}})})}),[2]}})})},w.prototype.convertToRawPath=function(e,t){var i=c(c({},this.state),t),n=i.filteredItems,a=i.items,r="".concat(e).split(".").map(function(v){return parseInt(v,10)}),o=n[r[0]];return r[0]=a.findIndex(function(v){return v===o}),r[0]===-1?e:r.join(".")},w.prototype.reUseRowId=function(e,t,i){for(var n=t,a=e,r=0,o=i.length;r<o;r++){var v=i[r];if(!(n!=null&&n[v])||!(a!=null&&a[v]))break;this.entries.set(a[v],this.entries.get(n[v])||this.entityId++),this.entries.delete(n[v]),a=a[v].children,n=n[v].children}},w.prototype.buildItemProps=function(e,t){var i={},n=this.resolveVariableProps(this.props,"minLength"),a=this.resolveVariableProps(this.props,"maxLength");return i.inputTableCanAddItem=a?a>this.state.items.length:!0,i.inputTableCanRemoveItem=n?n<this.state.items.length:!0,this.props.needConfirm===!1?(i.quickEditEnabled=!0,i):(!this.props.editable&&!this.props.addable&&!this.state.isCreateMode||(i.quickEditEnabled=this.state.editIndex===this.convertToRawPath(e.path)),i)},w.prototype.buildColumns=function(e,t,i){var n=this;t===void 0&&(t=!1);var a=this.props,r=a.env,o=a.enableStaticTransform,v=a.mobileUI,s=a.testIdBuilder,m=Array.isArray(e.columns)?e.columns.concat():[],b=this.props.classPrefix,u=this.props.translate,y=this.props.needConfirm,I=this.props.static,p=this.props.disabled,f=[];if(!I&&e.addable&&e.showTableAddBtn!==!1&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath,h=l.inputTableCanAddItem;return n.state.editIndex&&y!==!1||!h?null:H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("Table.addRow"),tooltipContainer:e.popOverContainer||r.getModalContainer,disabled:p,onClick:n.addItem.bind(n,n.convertToRawPath(d),void 0,void 0),testIdBuilder:s==null?void 0:s.getChild("addRow-".concat(n.convertToRawPath(d))),children:[e.addBtnIcon?_($,{cx:e.classnames,icon:e.addBtnIcon,className:"icon"}):null,e.addBtnLabel?_("span",{children:e.addBtnLabel}):null]},x)}}),!I&&e.childrenAddable&&e.showTableAddBtn!==!1&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath,h=l.row;return n.state.editIndex&&y!==!1?null:H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("Table.subAddRow"),tooltipContainer:e.popOverContainer||r.getModalContainer,disabled:p,onClick:n.subAddItem.bind(n,n.convertToRawPath(d),void 0,h),testIdBuilder:s==null?void 0:s.getChild("subAddRow-".concat(n.convertToRawPath(d))),children:[e.subAddBtnIcon?_($,{cx:e.classnames,icon:e.subAddBtnIcon,className:"icon"}):null,e.subAddBtnLabel?_("span",{children:e.subAddBtnLabel}):null]},x)}}),!I&&e.copyable&&e.showCopyBtn!==!1&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath;return n.state.editIndex&&y!==!1?null:H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("Table.copyRow"),tooltipContainer:e.popOverContainer||r.getModalContainer,disabled:p,onClick:n.copyItem.bind(n,n.convertToRawPath(d),void 0),testIdBuilder:s==null?void 0:s.getChild("copyRow-".concat(n.convertToRawPath(d))),children:[e.copyBtnIcon?_($,{cx:e.classnames,icon:e.copyBtnIcon,className:"icon"}):null,e.copyBtnLabel?_("span",{children:e.copyBtnLabel}):null]},x)}}),e.needConfirm===!1?m=m.map(function(l){var x=l.quickEdit;return x===!1?oe(l,["quickEdit"]):c(c({},l),l.type==="operation"?{}:{quickEdit:c(c(c({},n.columnToQuickEdit(l)),x),{visibleOn:"",hiddenOn:"",visible:!0,hidden:!1,saveImmediately:!0,mode:"inline",disabled:p,static:I||l.static})})}):I!==!0&&(e.addable||e.editable||t)?(m=m.map(function(l,x){var d=!t&&l.hasOwnProperty("quickEditOnUpdate")?l.quickEditOnUpdate:l.quickEdit,h=te(l==null?void 0:l.type);return c(c({},d===!1?oe(l,["quickEdit"]):c(c({},l),{quickEdit:c(c(c({},n.columnToQuickEdit(l)),d),{visibleOn:"",hiddenOn:"",visible:!0,hidden:!1,isQuickEditFormMode:!!(h!=null&&h.isFormItem),saveImmediately:!0,mode:"inline",disabled:p})})),o&&e.needConfirm!==!1?{staticOn:"".concat(!t," || data.index !== '").concat(i,"'")}:{})}),!I&&e.editable&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath,h=l.data;return n.state.editIndex||h&&h.hasOwnProperty(U)?null:H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("Table.editRow"),tooltipContainer:e.popOverContainer||r.getModalContainer,disabled:p,onClick:function(){return n.editItem(n.convertToRawPath(d))},testIdBuilder:s==null?void 0:s.getChild("editRow-".concat(n.convertToRawPath(d))),children:[typeof e.updateBtnIcon<"u"?e.updateBtnIcon?_($,{cx:e.classnames,icon:e.updateBtnIcon,className:"icon"}):null:e.editBtnIcon?_($,{cx:e.classnames,icon:e.editBtnIcon,className:"icon"}):null,e.updateBtnLabel||e.editBtnLabel?_("span",{children:e.updateBtnLabel||e.editBtnLabel}):null]},x)}}),!I&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath;return n.state.editIndex===n.convertToRawPath(d)?H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("save"),tooltipContainer:e.popOverContainer||r.getModalContainer,onClick:n.confirmEdit,testIdBuilder:s==null?void 0:s.getChild("confirmRow-".concat(n.convertToRawPath(d))),children:[e.confirmBtnIcon?_($,{cx:e.classnames,icon:e.confirmBtnIcon,className:"icon"}):null,e.confirmBtnLabel?_("span",{children:e.confirmBtnLabel}):null]},x):null}}),!I&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath;return n.state.editIndex===n.convertToRawPath(d)?H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("cancel"),tooltipContainer:e.popOverContainer||r.getModalContainer,onClick:n.cancelEdit,testIdBuilder:s==null?void 0:s.getChild("cancelRow-".concat(n.convertToRawPath(d))),children:[e.cancelBtnIcon?_($,{cx:e.classnames,icon:e.cancelBtnIcon,className:"icon"}):null,e.cancelBtnLabel?_("span",{children:e.cancelBtnLabel}):null]},x):null}})):m=m.map(function(l){var x=te(l==null?void 0:l.type);return x!=null&&x.isFormItem?c(c({},l),{quickEdit:c(c({},l),{visibleOn:"",hiddenOn:"",visible:!0,hidden:!1,isFormMode:!0})}):l}),!I&&e.removable&&f.push({children:function(l){var x=l.key,d=l.rowIndexPath,h=l.data,E=l.inputTableCanRemoveItem;return(n.state.editIndex||h&&h.hasOwnProperty(U))&&y!==!1||!E?null:H(G,{classPrefix:b,size:"sm",level:"link",tooltip:u("Table.deleteRow"),tooltipContainer:e.popOverContainer||r.getModalContainer,disabled:p,onClick:n.removeItem.bind(n,n.convertToRawPath(d)),testIdBuilder:s==null?void 0:s.getChild("delRow-".concat(n.convertToRawPath(d))),children:[e.deleteBtnIcon?_($,{cx:e.classnames,icon:e.deleteBtnIcon,className:"icon"}):null,e.deleteBtnLabel?_("span",{children:e.deleteBtnLabel}):null]},x)}}),f.length){var g=m.find(function(l){return l.type==="operation"});g||(g={type:"operation",buttons:[],label:u("Table.operation"),className:"v-middle nowrap",fixed:v?"":"right",width:150,innerClassName:"m-n"},m.push(g)),g.buttons=Array.isArray(g.buttons)?g.buttons.concat():[],g.buttons.unshift.apply(g.buttons,f),g.hasOwnProperty("quickEdit")&&delete g.quickEdit}return m},w.prototype.columnToQuickEdit=function(e){var t,i={type:"input-text"};return!((t=te(e==null?void 0:e.type))===null||t===void 0)&&t.isFormItem||~["group"].indexOf(e.type)?c(c({},e),{label:""}):i},w.prototype.handleTableSave=function(e,t,i){var n=this,a;this.setState(function(r,o){var v={},s=r.editIndex,m=r.lastModifiedRow,b=r.items.concat();if(Array.isArray(e))i.forEach(function(d,h){d=n.convertToRawPath(d,r);var E=d.split(".").map(function(T){return parseInt(T,10)}),q=c({},Q(e,E));b=S(b,E,1,q)});else{if(i=n.convertToRawPath(i,r),s&&i===s){var u=s.split(".").map(function(d){return parseInt(d,10)}),y=r.items.concat(),I=Q(y,u);if(!I)return v;var p=c({},e),f=y;return y=S(y,u,1,p),n.reUseRowId(y,f,u),Object.assign(v,c({items:y,filteredItems:r.filteredItems.map(function(d){return d===I?p:d}),rowIndex:s},(m==null?void 0:m.index)===s?{}:{lastModifiedRow:I.hasOwnProperty(U)?void 0:{index:s,data:c({},I)}})),v}var g=i.split(".").map(function(d){return parseInt(d,10)}),l=c({},e),x=b;b=S(b,g,1,l),n.reUseRowId(b,x,g)}return Object.assign(v,c({items:b,rowIndex:i},n.transformState(b,r))),a=n.lazyEmitValue,v},function(){a&&a()})},w.prototype.handleRadioChange=function(e,t){var i=this,n=t.name,a=t.row,r=t.trueValue,o=r===void 0?!0:r,v=t.falseValue,s=v===void 0?!1:v,m;return this.setState(function(b,u){var y=a.path,I=Ee(b.items,function(p,f,g,l,x){var d;return c(c({},p),(d={},d[n]=y===x.join(".")?o:s,d))});return m=b.editIndex==a.path?void 0:i.lazyEmitValue,c({items:I},i.transformState(I))},function(){m==null||m()}),!1},w.prototype.handleSaveTableOrder=function(e,t){var i=this.props.onChange;i(t.map(function(n){return c({},n)}))},w.prototype.handlePageChange=function(e){this.setState(c({},this.transformState(this.state.items,{page:e})))},w.prototype.handleTableQuery=function(e){e=c(c({},this.state.query),e),this.setState(c({query:e},this.transformState(this.state.items,{query:e})))},w.prototype.handlePristineChange=function(e,t){var i=this,n=this.props.needConfirm,a=t.split(".").map(function(r){return parseInt(r,10)});this.setState(function(r){var o=r.items.concat(),v=Q(o,a),s=c(c({},v),e),m=o;return o=S(o,a,1,s),i.reUseRowId(o,m,a),c({items:o},i.transformState(o))},function(){n===!1&&i.emitValue()})},w.prototype.removeEntry=function(e){this.entries.has(e)&&this.entries.delete(e)},w.prototype.getEntryId=function(e){return this.entries.has(e)||this.entries.set(e,this.entityId++),String(this.entries.get(e))},w.prototype.tableRef=function(e){for(;e&&e.getWrappedInstance;)e=e.getWrappedInstance();this.table=e},w.prototype.computedAddBtnDisabled=function(){var e=this.props.disabled;return e||!!this.state.editIndex},w.prototype.filterItemIndex=function(e){return this.convertToRawPath(e)},w.prototype.render=function(){var e=this,t=this.props,i=t.className;t.style,t.value;var n=t.disabled,a=t.render,r=t.placeholder,o=t.draggable,v=t.addable,s=t.columnsTogglable,m=t.combineNum,b=t.combineFromIndex,u=t.translate,y=t.canAccessSuperData,I=t.expandConfig,p=t.affixRow,f=t.prefixRow,g=t.formInited,l=t.perPage,x=t.classnames,d=t.rowClassName,h=t.rowClassNameExpr,E=t.affixHeader,q=E===void 0?!1:E,T=t.autoFillHeight,A=T===void 0?!1:T,C=t.tableContentClassName,P=t.static,B=t.showFooterAddBtn,j=t.footerAddBtn,Y=t.toolbarClassName,Z=t.onEvent,L=t.testIdBuilder,V=t.showIndex,J=this.resolveVariableProps(this.props,"maxLength");if(g===!1)return null;var M=this.state.query,ee=this.state.filteredItems;this.state.items;var D=typeof l=="number",k=this.state.page||1,z=!P&&v&&B!==!1&&(!J||J>this.state.items.length);return H("div",{className:x("InputTable",i),children:[a("body",{type:"table",placeholder:u(r),columns:this.state.columns,affixHeader:q,prefixRow:f,affixRow:p,autoFillHeight:A,tableContentClassName:C,onEvent:Z,showIndex:V},{ref:this.tableRef,value:void 0,saveImmediately:!0,disabled:n,draggable:o&&!this.state.editIndex,items:ee,getEntryId:this.getEntryId,reUseRow:"match",onSave:this.handleTableSave,onRadioChange:this.handleRadioChange,onSaveOrder:this.handleSaveTableOrder,buildItemProps:this.buildItemProps,quickEditFormRef:this.subFormRef,quickEditFormItemRef:this.subFormItemRef,columnsTogglable:s,combineNum:m,combineFromIndex:b,expandConfig:I,canAccessSuperData:y,rowClassName:d,rowClassNameExpr:h,onPristineChange:this.handlePristineChange,testIdBuilder:L==null?void 0:L.getChild("table"),onQuery:this.handleTableQuery,query:M,orderBy:M==null?void 0:M.orderBy,orderDir:M==null?void 0:M.orderDir,filterItemIndex:this.filterItemIndex}),z||D?H("div",{className:x("InputTable-toolbar",Y),children:[z?a("button",c({type:"button",level:"primary",size:"sm",label:u("Table.add"),icon:"fa fa-plus",disabledTip:u("Table.addButtonDisabledTip")},j||{}),{disabled:this.computedAddBtnDisabled(),onClick:function(){return e.addItem()},testIdBuilder:L==null?void 0:L.getChild("add")}):null,D?a("pager",{type:"pagination"},{activePage:k,perPage:l,total:this.state.total,onPageChange:this.handlePageChange,className:"InputTable-pager",testIdBuilder:L==null?void 0:L.getChild("page"),disabled:!!this.state.editIndex}):null]}):null]})},w.defaultProps={placeholder:"placeholder.empty",scaffold:{},addBtnIcon:"plus",subAddBtnIcon:"sub-plus",copyBtnIcon:"copy",editBtnIcon:"pencil",deleteBtnIcon:"minus",confirmBtnIcon:"check",cancelBtnIcon:"close",valueField:"",minLength:0,maxLength:1/0,showFooterAddBtn:!0,showTableAddBtn:!0},w.propsList=["onChange","name","columns","label","scaffold","showTableAddBtn","addable","removable","copyable","editable","addApi","updateApi","deleteApi","needConfirm","canAccessSuperData","formStore","footerActions","toolbarClassName"],fe([Ae,ne("design:type",Function),ne("design:paramtypes",[Object,String]),ne("design:returntype",void 0)],w.prototype,"handlePristineChange",null),w}(Re.Component),qe=function(X){ce(w,X);function w(){return X!==null&&X.apply(this,arguments)||this}return w.prototype.setData=function(e,t,i,n){return R(this,void 0,void 0,function(){var a,r,o,v,s,m=this;return F(this,function(b){switch(b.label){case 0:return this.state.items.length,i===void 0?[3,1]:(a=O([],N(this.state.items),!1),r=String(i).split(","),r.forEach(function(u){var y=u.split(".").map(function(p){return parseInt(p,10)}),I=a;a=S(a,y,1,e),m.reUseRowId(a,I,y)}),this.setState(c({items:a},this.transformState(a)),function(){m.emitValue()}),[3,4]);case 1:return n===void 0?[3,3]:(o=O([],N(this.state.items),!1),v=[],de(o,function(u,y,I,p,f){return v.unshift(function(){return R(m,void 0,void 0,function(){var g,l;return F(this,function(x){switch(x.label){case 0:return[4,ue(n,u)];case 1:return g=x.sent(),g&&(l=o,o=S(o,O(O([],N(f),!1),[y],!1),1,e),this.reUseRowId(o,l,O(O([],N(f),!1),[y],!1))),[2]}})})}),!0}),[4,Promise.all(v.map(function(u){return u()}))]);case 2:return b.sent(),this.setState(c({items:o},this.transformState(o)),function(){m.emitValue()}),[3,4];case 3:s=O([],N(e),!1),this.setState(c({items:s},this.transformState(s)),function(){m.emitValue()}),b.label=4;case 4:return[2]}})})},w.prototype.doAction=function(e,t,i,n){var a,r,o,v,s,m,b;return i===void 0&&(i=!1),R(this,void 0,void 0,function(){var u,y,I,p,f,g,l,x,d,h,E,q,T,A,C,P,V,B,j,Y,Z,L,V,J,M,ee=this;return F(this,function(D){switch(D.label){case 0:return u=this.props,y=u.valueField,I=u.env,p=u.needConfirm,u.addable,f=u.addApi,g=u.deleteApi,l=u.resetValue,x=u.translate,d=u.onChange,h=u.formStore,E=u.store,q=u.name,T=e.actionType,A=((a=this.props.store)===null||a===void 0?void 0:a.data)||{},T!=="addItem"?[3,6]:(C=this.state.items.concat(),f||n?(P=null,K(f,A)?[4,I.fetcher(f,A)]:[3,2]):[3,4]);case 1:return V=D.sent(),V&&!V.ok?(!(f!=null&&f.silent)&&I.notify("error",(o=(r=f==null?void 0:f.messages)===null||r===void 0?void 0:r.failed)!==null&&o!==void 0?o:V.msg||x("fetchFailed")),[2]):(V&&V.ok&&(P=V.data),[3,3]);case 2:P=n.item,D.label=3;case 3:return P=(Array.isArray(P)?P:[P]).filter(function(k){return!y||!me(C,function(z){return z[y]==k[y]})}),B=[],typeof n.index=="string"&&/^\d+(\.\d+)*$/.test(n.index)?B=n.index.split(".").map(function(k){return parseInt(k,10)}):typeof n.index=="number"&&(B=[n.index]),B.length?C=S.apply(void 0,O([C,B,0],N(P),!1)):C.push.apply(C,O([],N(P),!1)),this.setState(c({items:C},this.transformState(C)),function(){if(P.length===1&&p!==!1){var k=B.concat();k[k.length-1]+=1,ee.startEdit(k.join("."),!0)}else d==null||d(C)}),[2];case 4:return[2,this.addItem("".concat(C.length-1),!1)];case 5:return[3,13];case 6:return T!=="deleteItem"?[3,12]:(j=O([],N(this.state.items),!1),Y=[],(n==null?void 0:n.index)===void 0?[3,7]:(Z=String(n.index).split(","),Z.forEach(function(k){var z=k.split(".").map(function(ae){return parseInt(ae,10)});Y.push(Q(j,z)),j=S(j,z,1)}),[3,9]));case 7:return(n==null?void 0:n.condition)===void 0?[3,9]:(L=[],de(j,function(k,z,ae,Le,ve){return L.unshift(function(){return R(ee,void 0,void 0,function(){var re;return F(this,function(se){switch(se.label){case 0:return[4,ue(n==null?void 0:n.condition,k)];case 1:return re=se.sent(),re&&(Y.push(k),j=S(j,O(O([],N(ve),!1),[z],!1),1)),[2]}})})}),!0}),[4,L.reduce(function(k,z){return k.then(z)},Promise.resolve())]);case 8:D.sent(),D.label=9;case 9:return K(g,W(A,{deletedItems:Y}))?[4,I.fetcher(g,W(A,{deletedItems:Y}))]:[3,11];case 10:if(V=D.sent(),V&&!V.ok)return!(g!=null&&g.silent)&&I.notify("error",(s=(v=g==null?void 0:g.messages)===null||v===void 0?void 0:v.failed)!==null&&s!==void 0?s:V.msg||x("fetchFailed")),[2];D.label=11;case 11:return this.setState(c({items:j},this.transformState(j)),function(){d==null||d(j)}),[2];case 12:if(T==="clear")return this.setState({items:[]},function(){d==null||d([])}),[2];if(T==="reset")return J=(b=he((m=h==null?void 0:h.pristine)!==null&&m!==void 0?m:E==null?void 0:E.pristine,q))!==null&&b!==void 0?b:l,M=Array.isArray(J)?J:[],this.setState(c({items:M},this.transformState(M)),function(){d==null||d(M)}),[2];D.label=13;case 13:return[2,X.prototype.doAction.call(this,e,t,i,A)]}})})},w=fe([Fe({type:"input-table"})],w),w}(Ve);export{qe as TableControlRenderer,Ve as default};
