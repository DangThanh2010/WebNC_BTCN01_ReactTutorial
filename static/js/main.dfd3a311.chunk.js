(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(r,e,t){},8:function(r,e,t){"use strict";t.r(e);var s=t(3),a=t(4),n=t(6),i=t(5),o=t(1),u=t.n(o),c=t(7),l=t.n(c),h=(t(13),t(0));function p(r){var e=r.value,t=r.onClick,s=r.background;return Object(h.jsx)("button",{className:"square",onClick:function(){return t()},style:s,children:e})}var f=function(r){Object(n.a)(t,r);var e=Object(i.a)(t);function t(){return Object(s.a)(this,t),e.apply(this,arguments)}return Object(a.a)(t,[{key:"renderSquare",value:function(r){var e=this,t={background:"white"};if(this.props.causeWin)for(var s=0;s<this.props.causeWin.length;s++)if(r===this.props.causeWin[s]){t={background:"yellow"};break}return Object(h.jsx)(p,{value:this.props.squares[r],onClick:function(){return e.props.onClick(r)},background:t})}},{key:"render",value:function(){for(var r=[],e=0;e<this.props.rowNumber;e++){for(var t=[],s=0;s<this.props.colNumber;s++)t.push(this.renderSquare(e*this.props.colNumber+s));r.push(Object(h.jsx)("div",{className:"board-row",children:t}))}return Object(h.jsx)("div",{children:r})}}]),t}(u.a.Component),b=function(r){Object(n.a)(t,r);var e=Object(i.a)(t);function t(r){var a;return Object(s.a)(this,t),(a=e.call(this,r)).state={history:[{squares:Array(a.props.SizeBoard*a.props.SizeBoard).fill(null),location:{col:null,row:null}}],stepNumber:0,IsAscending:!0,xIsNext:!0},a}return Object(a.a)(t,[{key:"handleClick",value:function(r){var e=this.state.history.slice(0,this.state.stepNumber+1),t=e[e.length-1].squares.slice();v(t,this.props.SizeBoard)||t[r]||(t[r]=this.state.xIsNext?"X":"O",this.setState({history:e.concat([{squares:t,location:{col:r%this.props.SizeBoard+1,row:Math.floor(r/this.props.SizeBoard)+1}}]),stepNumber:e.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(r){this.setState({stepNumber:r,xIsNext:r%2===0})}},{key:"toggle",value:function(){this.setState({IsAscending:!this.state.IsAscending})}},{key:"render",value:function(){var r,e,t=this,s=this.state.history,a=s[this.state.stepNumber],n=v(a.squares,this.props.SizeBoard),i=s.map((function(r,e){var s=e?"Go to move #"+e+" ("+r.location.col+", "+r.location.row+")":"Go to game start";return e===t.state.stepNumber?Object(h.jsx)("li",{children:Object(h.jsxs)("button",{onClick:function(){return t.jumpTo(e)},children:[" ",Object(h.jsx)("b",{children:s})," "]})},e):Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:function(){return t.jumpTo(e)},children:s})},e)})),o="descending";if(!this.state.IsAscending){o="ascending";for(var u=0;u<i.length/2;u++){var c=i[u];i[u]=i[i.length-1-u],i[i.length-1-u]=c}}return n?(r="Winner: "+n.player,e=n.cause):(r=function(r){for(var e=0;e<r.length;e++)if(!r[e])return!1;return!0}(a.squares)?"Result: Draw":"Next player: "+(this.state.xIsNext?"X":"O"),e=null),Object(h.jsxs)("div",{className:"game",children:[Object(h.jsx)("div",{className:"game-board",children:Object(h.jsx)(f,{squares:a.squares,onClick:function(r){return t.handleClick(r)},rowNumber:this.props.SizeBoard,colNumber:this.props.SizeBoard,causeWin:e})}),Object(h.jsxs)("div",{className:"game-info",children:[Object(h.jsx)("div",{children:r}),Object(h.jsxs)("button",{onClick:function(){return t.toggle()},children:["Sort in ",o," order"]}),Object(h.jsx)("ol",{children:i})]})]})}}]),t}(u.a.Component);function v(r,e){if(1===e)return r[0]?{player:r[0],cause:[0]}:null;var t;t=e<=5?e:5;for(var s=0;s<e;s++)for(var a=0;a<=e-t;a++)if(r[s*e+a]){var n=1,i=[];i.push(s*e+a);for(var o=a+1;o<e;o++){if(r[s*e+a]!==r[s*e+o]){a=o-1;break}if(n++,i.push(s*e+o),n===t)return{player:r[s*e+a],cause:i}}}for(var u=0;u<e;u++)for(var c=0;c<=e-t;c++)if(r[c*e+u]){var l=1,h=[];h.push(c*e+u);for(var p=c+1;p<e;p++){if(r[c*e+u]!==r[p*e+u]){c=p-1;break}if(l++,h.push(p*e+u),l===t)return{player:r[c*e+u],cause:h}}}for(var f=0;f<=e-t;f++)for(var b=0;b<=e-t-f;b++)if(r[b*e+f+b]){var v=1,d=[];d.push(b*e+f+b);for(var j=b+1;j<e;j++){if(r[b*e+f+b]!==r[j*e+f+j]){b=j-1;break}if(v++,d.push(j*e+f+j),v===t)return{player:r[b*e+f+b],cause:d}}}for(var m=0;m<=e-t;m++)for(var x=0;x<=e-t-m;x++)if(r[m*e+x*e+x]){var k=1,O=[];O.push(m*e+x*e+x);for(var g=x+1;g<e;g++){if(r[m*e+x*e+x]!==r[m*e+g*e+g]){x=g-1;break}if(k++,O.push(m*e+g*e+g),k===t)return{player:r[m*e+x*e+x],cause:O}}}for(var y=e-1;y>=t-1;y--)for(var N=0;N<=e-t+y-(e-1);N++)if(r[N*e+y-N]){var S=1,C=[];C.push(N*e+y-N);for(var q=N+1;q<e;q++){if(r[N*e+y-N]!==r[q*e+y-q]){N=q-1;break}if(S++,C.push(q*e+y-q),S===t)return{player:r[N*e+y-N],cause:C}}}for(var w=0;w<=e-t;w++)for(var I=e-1;I>=t-1+w;I--)if(r[w*e+(e-1-I)*e+I]){var B=1,z=[];z.push(w*e+(e-1-I)*e+I);for(var A=I-1;A>=0;A--){if(r[w*e+(e-1-I)*e+I]!==r[w*e+(e-1-A)*e+A]){I=A+1;break}if(B++,z.push(w*e+(e-1-A)*e+A),B===t)return{player:r[w*e+(e-1-I)*e+I],cause:z}}}return null}l.a.render(Object(h.jsx)(b,{SizeBoard:3}),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.dfd3a311.chunk.js.map