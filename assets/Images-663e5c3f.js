import{a as _,d as t,l as p,i as O,r as Q,W as q,R as i,M as y,cP as R,N as z,cQ as B,e as F,n as D,o as f,f as H}from"./index-cf399bba.js";var J=function(n){_(l,n);function l(){var o=n!==null&&n.apply(this,arguments)||this;return o.list=[],o}return l.prototype.handleEnlarge=function(o){var a=this.props,h=a.onImageEnlarge,c=a.src,m=a.originalSrc;h&&h(t(t({},o),{originalSrc:o.originalSrc||o.src,list:this.list.map(function(e){return{src:c?p(c,e,"| raw"):e&&e.image||e,originalSrc:m?p(m,e,"| raw"):(e==null?void 0:e.src)||p(c,e,"| raw")||(e==null?void 0:e.image)||e,title:e&&(e.enlargeTitle||e.title),caption:e&&(e.enlargeCaption||e.description||e.caption)}})}),this.props)},l.prototype.render=function(){var o=this,a=this.props,h=a.className,c=a.style,m=a.defaultImage,e=a.thumbMode,v=a.thumbRatio,G=a.data;a.name;var T=a.placeholder,g=a.classnames,C=a.source,M=a.delimiter,P=a.enlargeAble,W=a.enlargeWithGallary,N=a.src,A=a.originalSrc,I=a.listClassName,w=a.options,k=a.showToolbar,x=a.toolbarActions,V=a.imageGallaryClassName;a.galleryControlClassName;var d=a.id,S=a.wrapperCustomStyle,j=a.env,u=a.themeCss;a.imagesControlClassName;var b,s;return typeof C=="string"&&O(C)?s=Q(C,G,"| raw")||void 0:Array.isArray(b=q(this.props))||typeof b=="string"?s=b:Array.isArray(w)&&(s=w),typeof s=="string"?s=s.split(M):s&&!Array.isArray(s)&&(s=[s]),this.list=s,i.createElement("div",{className:g("ImagesField",h,y(t(t({},this.props),{name:"imagesControlClassName",id:d,themeCss:u})),y(t(t({},this.props),{name:"wrapperCustomStyle",id:d,themeCss:S}))),style:c},Array.isArray(s)?i.createElement("div",{className:g("Images",I)},s.map(function(r,E){return i.createElement(R,{index:E,className:g("Images-item"),key:E,src:(N?p(N,r,"| raw"):r&&r.image)||r,originalSrc:(A?p(A,r,"| raw"):r&&r.src)||r,title:r&&r.title,caption:r&&(r.description||r.caption),thumbMode:e,thumbRatio:v,enlargeAble:P,enlargeWithGallary:W,onEnlarge:o.handleEnlarge,showToolbar:k,imageGallaryClassName:"".concat(V," ").concat(y(t(t({},o.props),{name:"imageGallaryClassName",id:d,themeCss:u}))," ").concat(y(t(t({},o.props),{name:"galleryControlClassName",id:d,themeCss:u}))),toolbarActions:x})})):m?i.createElement("div",{className:g("Images",I)},i.createElement(R,{className:g("Images-item"),src:m,thumbMode:e,thumbRatio:v})):T,i.createElement(z,t({},this.props,{config:{wrapperCustomStyle:S,id:d,themeCss:u,classNames:[{key:"imagesControlClassName"},{key:"galleryControlClassName"}]},env:j})))},l.defaultProps={className:"",delimiter:",",defaultImage:B,placehoder:"-",thumbMode:"contain",thumbRatio:"1:1"},F([D,f("design:type",Function),f("design:paramtypes",[Object]),f("design:returntype",void 0)],l.prototype,"handleEnlarge",null),l}(i.Component),L=function(n){_(l,n);function l(){return n!==null&&n.apply(this,arguments)||this}return l=F([H({type:"images"})],l),l}(J);export{J as ImagesField,L as ImagesFieldRenderer};
