import{a as _,aj as Y,aS as o,j as h,R as j,e as x,f as M}from"./index-12050af9.js";var N=function(r){_(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t.prototype.render=function(){var n=this.props,s=n.delimiter,g=s===void 0?",":s,d=n.connector,y=d===void 0?"~":d,i=n.value,l=n.valueFormat,m=n.format,c=m===void 0?"YYYY-MM-DD":m,u=n.displayFormat,D=n.classnames,F=n.className,R=n.style;if(!i)return null;typeof i=="string"&&(i=i.split(g));var f=Y(i,2),v=f[0],e=v===void 0?"":v,p=f[1],a=p===void 0?"":p;return l?(e=o(e,l),a=o(a,l)):(e=o(e*1e3),a=o(a*1e3)),e=e!=null&&e.isValid()?e.format(u||c):"",a=a!=null&&a.isValid()?a.format(u||c):"",h("span",{className:D("DateRangeField",F),style:R,children:[e,a].join(" ".concat(y," "))})},t.defaultProps={format:"YYYY-MM-DD",valueFormat:"X",connector:"~"},t}(j.Component),V=function(r){_(t,r);function t(){return r!==null&&r.apply(this,arguments)||this}return t=x([M({type:"date-range"})],t),t}(N);export{N as DateRangeField,V as DateRangeFieldRenderer};
