import{a as d,R as s,U as o,e as m,f}from"./index-cf399bba.js";var h=function(t){d(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.renderChild=function(n,r){var a=this.props.render;return a(n,r)},e.prototype.renderCell=function(n,r){var a=this.props.classPrefix;return s.createElement("div",{className:o("".concat(a,"Vbox-cell"),n.cellClassName)},this.renderChild("row/".concat(r),n))},e.prototype.render=function(){var n=this,r=this.props,a=r.className,p=r.style,l=r.rows,u=r.classPrefix;return s.createElement("div",{className:o("".concat(u,"Vbox"),a),style:p},Array.isArray(l)?l.map(function(c,i){return s.createElement("div",{className:o("row-row",c.rowClassName),key:i},n.renderCell(c,i))}):null)},e.propsList=["rows"],e.defaultProps={},e}(s.Component),y=function(t){d(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e=m([f({type:"vbox"})],e),e}(h);export{y as VBoxRenderer,h as default};
