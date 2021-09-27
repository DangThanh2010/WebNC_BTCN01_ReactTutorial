(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{14:function(e,t,n){},9:function(e,t,n){"use strict";n.r(t);var r=n(8),s=n(3),c=n(4),i=n(6),a=n(5),o=n(1),u=n.n(o),l=n(7),h=n.n(l),b=(n(14),n(0));function j(e){var t=e.value,n=e.onClick,r=e.background;return Object(b.jsx)("button",{className:"square",onClick:function(){return n()},style:r,children:t})}var p=function(e){Object(i.a)(n,e);var t=Object(a.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"renderSquare",value:function(e){var t=this,n={background:"white"};if(this.props.causeWin)for(var r=0;r<this.props.causeWin.length;r++)if(e===this.props.causeWin[r]){n={background:"yellow"};break}return Object(b.jsx)(j,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)},background:n})}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.rowNumber;t++){for(var n=[],r=0;r<this.props.colNumber;r++)n.push(this.renderSquare(t*this.props.colNumber+r));e.push(Object(b.jsx)("div",{className:"board-row",children:n}))}return Object(b.jsx)("div",{children:e})}}]),n}(u.a.Component),d=function(e){Object(i.a)(n,e);var t=Object(a.a)(n);function n(e){var r;return Object(s.a)(this,n),(r=t.call(this,e)).state={history:[{squares:Array(9).fill(null),location:{col:null,row:null}}],stepNumber:0,IsAscending:!0,xIsNext:!0},r}return Object(c.a)(n,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();f(n)||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:n,location:{col:e%3+1,row:Math.floor(e/3)+1}}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"toggle",value:function(){this.setState({IsAscending:!this.state.IsAscending})}},{key:"render",value:function(){var e,t,n=this,r=this.state.history,s=r[this.state.stepNumber],c=f(s.squares),i=r.map((function(e,t){var r=t?"Go to move #"+t+" ("+e.location.col+", "+e.location.row+")":"Go to game start (col: null, row: null)";return t===n.state.stepNumber?Object(b.jsx)("li",{children:Object(b.jsxs)("button",{onClick:function(){return n.jumpTo(t)},children:[" ",Object(b.jsx)("b",{children:r})," "]})},t):Object(b.jsx)("li",{children:Object(b.jsx)("button",{onClick:function(){return n.jumpTo(t)},children:r})},t)})),a="descending";if(!this.state.IsAscending){a="ascending";for(var o=0;o<i.length/2;o++){var u=i[o];i[o]=i[i.length-1-o],i[i.length-1-o]=u}}return c?(e="Winner: "+c.player,t=c.cause):(e=function(e){for(var t=0;t<e.length;t++)if(!e[t])return!1;return!0}(s.squares)?"Result: Draw":"Next player: "+(this.state.xIsNext?"X":"O"),t=null),Object(b.jsxs)("div",{className:"game",children:[Object(b.jsx)("div",{className:"game-board",children:Object(b.jsx)(p,{squares:s.squares,onClick:function(e){return n.handleClick(e)},rowNumber:3,colNumber:3,causeWin:t})}),Object(b.jsxs)("div",{className:"game-info",children:[Object(b.jsx)("div",{children:e}),Object(b.jsxs)("button",{onClick:function(){return n.toggle()},children:["Sort in ",a," order"]}),Object(b.jsx)("ol",{children:i})]})]})}}]),n}(u.a.Component);function f(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],n=0;n<t.length;n++){var s=Object(r.a)(t[n],3),c=s[0],i=s[1],a=s[2];if(e[c]&&e[c]===e[i]&&e[c]===e[a])return{player:e[c],cause:[c,i,a]}}return null}h.a.render(Object(b.jsx)(d,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.29ed52ab.chunk.js.map