(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{11:function(e,t,r){e.exports={boardContainer:"Board_boardContainer__1LEFg",boardGrid:"Board_boardGrid__30AAE",boardGridCell:"Board_boardGridCell__2cENT",tilesContainer:"Board_tilesContainer__3TIBn",tileContainer:"Board_tileContainer__3YcLx",tile:"Board_tile__36kz5",newRandomTile:"Board_newRandomTile__3aOcI",newRandomTileAnimation:"Board_newRandomTileAnimation__1eu4J",newMergedTile:"Board_newMergedTile__2fYCj",newMergedTileAnimation:"Board_newMergedTileAnimation__1FEAj","tile-2":"Board_tile-2__1868c","tile-4":"Board_tile-4__2ZMie","tile-8":"Board_tile-8__TQ_WY","tile-16":"Board_tile-16__h7mTZ","tile-32":"Board_tile-32__3Ge3d","tile-64":"Board_tile-64__1QBuo","tile-128":"Board_tile-128__fVeou","tile-256":"Board_tile-256__1HYOa","tile-512":"Board_tile-512__1YoSF","tile-1024":"Board_tile-1024__3qOp-","tile-2048":"Board_tile-2048__3LhJo","tile-4096":"Board_tile-4096__3irdB","tile-8192":"Board_tile-8192__273NZ","tile-16384":"Board_tile-16384__1GhCe","tile-32768":"Board_tile-32768__39-EQ","tile-65536":"Board_tile-65536__YuCUh","tile-131072":"Board_tile-131072__3ScEQ"}},13:function(e,t,r){e.exports={container:"EndGamePanel_container__F2q-c",endGamePanel:"EndGamePanel_endGamePanel__1vMAp",fadeInAnimation:"EndGamePanel_fadeInAnimation__3GGIs",panelBtn:"EndGamePanel_panelBtn__PTD2G"}},14:function(e,t,r){e.exports={container:"Game_container__39SqM",howToPlayText:"Game_howToPlayText__6SN9W",viewOnGithubLink:"Game_viewOnGithubLink__2drxN",githubLogo:"Game_githubLogo__1gF9j",positionRelative:"Game_positionRelative__29WxI",boldText:"Game_boldText__1PbJY"}},29:function(e,t,r){e.exports=r(43)},42:function(e,t,r){},43:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(16),o=r.n(c),i=r(8),l=r(10),u=r(28),s=r(9),f="NEW_GAME",m="CHECK_END_GAME",d="UPDATE_BEST_SCORE",b="GET_BEST_SCORE",p="NEW_TILE",_="MOVE_TILES",O="MERGE_TILES",v={IN_PROGRESS:"IN_PROGRESS",VICTORY:"VICTORY",GAME_OVER:"GAME_OVER",IN_PROGRESS_AFTER_VICTORY:"IN_PROGRESS_AFTER_VICTORY"},E=4,w={UP:"UP",LEFT:"LEFT",DOWN:"DOWN",RIGHT:"RIGHT"},g={38:w.UP,37:w.LEFT,40:w.DOWN,39:w.RIGHT};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j={gameState:v.IN_PROGRESS},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return y({},e,{gameState:v.IN_PROGRESS});case"KEEP_PLAYING":return y({},e,{gameState:v.IN_PROGRESS_AFTER_VICTORY});case"GAME_OVER":return y({},e,{gameState:v.GAME_OVER});case"VICTORY":return y({},e,{gameState:v.VICTORY});default:return e}};function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var G={grid:[],tilesMoving:!1},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TILES_MOVING":return T({},e,{tilesMoving:t.payload});case"UPDATE_GRID":return T({},e,{grid:t.payload});default:return e}};function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var R={currentScore:0,bestScore:0},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return C({},e,{currentScore:0});case"INCREMENT_SCORE":var r=e.currentScore+t.payload;return C({},e,{currentScore:r});case d:return C({},e,{bestScore:t.payload});default:return e}},I=Object(l.c)({game:x,tiles:P,score:k}),B=r(5),M=r.n(B),A=r(4),L=function(){return{type:p}},V=function(e){return{type:_,payload:e}},D=function(){return{type:O}},Y=function(e){return{type:"UPDATE_GRID",payload:e}},H=function(e){return{type:"SET_TILES_MOVING",payload:e}},W=function(){return{type:f}},F=function(){return{type:"GAME_OVER"}},U=function(){return{type:"VICTORY"}},J=function(){return{type:"KEEP_PLAYING"}},K=function(){return{type:m}},Q=function(e){return{type:"INCREMENT_SCORE",payload:e}},q=function(e){return{type:d,payload:e}},Z=function(){return{type:b}},z=r(24),X=r.n(z);function $(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ee(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var te={UP:{row:-1,col:0},DOWN:{row:1,col:0},LEFT:{row:0,col:-1},RIGHT:{row:0,col:1}},re="MERGE",ne="MOVE",ae=function(e){for(var t=[],r=0;r<e;r+=1){var n=Array(e).fill(null);t.push(n)}return t},ce=function(e,t,r){var n=e.row>=0&&e.row<t.length,a=e.col>=0&&e.col<t.length;if(!(n&&a))return!1;var c=t[e.row][e.col],o=null===c,i=c&&c.value===r,l=c&&!c.mergeWithTile;return o||i&&l},oe=function(e,t){for(var r=e.length,n=ae(r),a=te[t],c=!1,o=0;o<r;o+=1)for(var i=0;i<r;i+=1){var l=o,u=i;t===w.DOWN&&(l=r-o-1),t===w.RIGHT&&(u=r-i-1);var s=e[l][u];if(null!==s){var f=ee({},s),m={row:s.row+a.row,col:s.col+a.col};for(f.newMerged=!1,f.newRandom=!1;ce(m,n,f.value);)f.row=m.row,f.col=m.col,m.row+=a.row,m.col+=a.col,f.row===s.row&&f.col===s.col||(c=!0);null!==n[f.row][f.col]?n[f.row][f.col].mergeWithTile=f:n[f.row][f.col]=f}}return{newGrid:n,gridChanged:c}},ie=function(e){var t=e.flat(),r=e.length;if(t.some((function(e){return null===e})))return!0;var n=!0,a=!1,c=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=o.value,u=l.row,s=l.col,f=l.value;if(u+1<r&&e[u+1][s].value===f)return!0;if(s+1<r&&e[u][s+1].value===f)return!0}}catch(m){a=!0,c=m}finally{try{n||null==i.return||i.return()}finally{if(a)throw c}}return!1},le=function(e,t,r,n){var a=n===re,c=n===ne;return{id:X()(),value:r,row:e,col:t,newRandom:c,newMerged:a,mergeWithTile:null}},ue=function(e){var t=Math.random()>.9?4:2,r=se(e),n=r.row,a=r.col;return le(n,a,t,ne)},se=function(e){var t=function(e){var t=[];return e.forEach((function(e,r){e.forEach((function(e,n){e||t.push({row:r,col:n})}))})),t}(e);return t[Math.floor(Math.random()*t.length)]},fe=function(e,t){return e.map((function(e,r){return r!==t.row?e:e.map((function(e,r){return r!==t.col?e:t}))}))},me=function(e){return e.map((function(e){return e.map((function(e){if(e&&e.mergeWithTile){var t=e.row,r=e.col,n=e.value;return le(t,r,2*n,re)}return e}))}))},de=function(e){return e.flat().filter((function(e){return null!==e})).some((function(e){return 2048===e.value}))},be=function(e){return e.flat().filter((function(e){return null!==e})).reduce((function(e,t){return t.newMerged?e+t.value:e}),0)},pe=M.a.mark(je),_e=M.a.mark(xe),Oe=M.a.mark(Se),ve=M.a.mark(Te),Ee=M.a.mark(Ge),we=M.a.mark(Pe),ge=M.a.mark(Ne),he=M.a.mark(Ce),ye=function(e){return new Promise((function(t){return setTimeout(t,e)}))};function je(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t,r,n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.c)((function(e){return e.tiles.grid}));case 2:if(!(t=e.sent).length){e.next=8;break}return r=ue(t),n=fe(t,r),e.next=8,Object(A.b)(Y(n));case 8:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(p,t);case 4:case"end":return r.stop()}}),pe)}function xe(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=ae(E),e.next=3,Object(A.b)(Y(t));case 3:return e.next=5,Object(A.b)(L());case 5:return e.next=7,Object(A.b)(L());case 7:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(f,t);case 4:case"end":return r.stop()}}),_e)}function Se(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(t){var r,n,a,c,o,i,l,u;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.c)((function(e){return e.tiles}));case 2:return r=e.sent,n=r.grid,a=r.tilesMoving,e.next=7,Object(A.c)((function(e){return e.game.gameState}));case 7:if(c=e.sent,o=oe(n,t.payload),i=o.newGrid,l=o.gridChanged,u=c===v.VICTORY||c===v.GAME_OVER,!a&&!u){e.next=12;break}return e.abrupt("return");case 12:if(!l){e.next=27;break}return e.next=15,Object(A.b)(H(!0));case 15:return e.next=17,Object(A.b)(Y(i));case 17:return e.next=19,ye(150);case 19:return e.next=21,Object(A.b)(H(!1));case 21:return e.next=23,Object(A.b)(D());case 23:return e.next=25,Object(A.b)(L());case 25:return e.next=27,Object(A.b)(K());case 27:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(_,t);case 4:case"end":return r.stop()}}),Oe)}function Te(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t,r,n;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.c)((function(e){return e.tiles.grid}));case 2:return t=e.sent,r=me(t),n=be(r),e.next=7,Object(A.b)(Y(r));case 7:return e.next=9,Object(A.b)(Q(n));case 9:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(O,t);case 4:case"end":return r.stop()}}),ve)}function Ge(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t,r,n,a,c;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.c)((function(e){return e.tiles.grid}));case 2:return t=e.sent,e.next=5,Object(A.c)((function(e){return e.game.gameState}));case 5:return r=e.sent,e.next=8,Object(A.c)((function(e){return e.score}));case 8:if(n=e.sent,a=n.currentScore,c=n.bestScore,r===v.IN_PROGRESS_AFTER_VICTORY){e.next=17;break}if(!de(t)){e.next=17;break}return e.next=15,Object(A.b)(U());case 15:return e.next=17,Object(A.b)(q(Math.max(a,c)));case 17:if(ie(t)){e.next=22;break}return e.next=20,Object(A.b)(F());case 20:return e.next=22,Object(A.b)(q(Math.max(a,c)));case 22:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(m,t);case 4:case"end":return r.stop()}}),Ee)}function Pe(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.c)((function(e){return e.score.bestScore}));case 2:t=e.sent,localStorage.setItem("bestScore",t);case 4:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(d,t);case 4:case"end":return r.stop()}}),we)}function Ne(){var e,t;return M.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t=function(){var t;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=localStorage.getItem("bestScore"))){e.next=4;break}return e.next=4,Object(A.b)(q(parseInt(t)));case 4:case"end":return e.stop()}}),e)},e=M.a.mark(t),r.next=4,Object(A.d)(b,t);case 4:case"end":return r.stop()}}),ge)}function Ce(){return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(A.a)([xe(),Se(),Te(),je(),Ge(),Pe(),Ne()]);case 2:case"end":return e.stop()}}),he)}var Re=Object(u.a)(),ke=Object(l.e)(I,Object(l.d)(Object(l.a)(Re)));Re.run(Ce);var Ie=ke,Be=r(25),Me=r(7),Ae=r.n(Me);var Le=function(e){var t=e.score,r=e.bestScore,n=e.onNewGameClick;return a.a.createElement("div",{className:Ae.a.container},a.a.createElement("div",{className:Ae.a.titleContainer},a.a.createElement("h1",{className:Ae.a.title},"2048"),a.a.createElement("h2",{className:Ae.a.subTitle},"Join the numbers and get to the 2048 tile!")),a.a.createElement("div",{className:Ae.a.gameInfo},a.a.createElement("div",{className:Ae.a.scoresContainer},a.a.createElement("div",{className:Ae.a.scoreContainer},a.a.createElement("div",{className:Ae.a.scoreLabel},"Score"),a.a.createElement("div",{className:Ae.a.scoreValue},t)),a.a.createElement("div",{className:Ae.a.scoreContainer},a.a.createElement("div",{className:Ae.a.scoreLabel},"Best"),a.a.createElement("div",{className:Ae.a.scoreValue},r))),a.a.createElement("div",{className:Ae.a.buttonsContainer},a.a.createElement("button",{className:Ae.a.newGameBtn,onClick:n},"New Game"))))};var Ve=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.score})),r=t.currentScore,c=t.bestScore,o=Object(n.useCallback)((function(){e(W())}),[e]);return a.a.createElement(Le,{score:r,bestScore:c,onNewGameClick:o})},De=r(26),Ye=r(27),He=r.n(Ye),We=r(11),Fe=r.n(We),Ue=function(){for(var e=[],t=0;t<E*E;t+=1)e.push(a.a.createElement("div",{key:t,className:Fe.a.boardGridCell}));return a.a.createElement("div",{className:Fe.a.boardGrid},e)},Je=function(e){var t=e.tiles;return a.a.createElement("div",{className:Fe.a.tilesContainer},t.map((function(e){var t,r={transform:"translate(".concat(85*e.col,"px, ").concat(85*e.row,"px)")},n=He()(Fe.a.tile,(t={},Object(s.a)(t,Fe.a.newRandomTile,e.newRandom),Object(s.a)(t,Fe.a.newMergedTile,e.newMerged),Object(s.a)(t,Fe.a["tile-".concat(e.value)],!0),t));return a.a.createElement("div",{key:e.id,className:Fe.a.tileContainer,style:r},a.a.createElement("div",{className:n},e.value))})))};var Ke=function(e){var t=e.tiles;return a.a.createElement("div",{className:Fe.a.boardContainer},a.a.createElement(Ue,null),a.a.createElement(Je,{tiles:t}))},Qe=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){var t=[];return Object(De.flatten)(e.tiles.grid).forEach((function(e){e&&(t.push(e),e.mergeWithTile&&t.push(e.mergeWithTile))})),t.sort((function(e,t){return e.id>t.id?1:-1}))}));Object(n.useEffect)((function(){return window.addEventListener("keydown",r),function(){window.removeEventListener("keydown",r)}}));var r=function(t){var r=g[t.keyCode];r&&e(V(r))};return a.a.createElement(Ke,{tiles:t})},qe=r(13),Ze=r.n(qe),ze=function(e){return a.a.createElement("div",{className:Ze.a.endGamePanel},a.a.createElement("h1",null,"GAME OVER!"),a.a.createElement("button",{className:Ze.a.panelBtn,onClick:e.onNewGameClick},"Try Again"))},Xe=function(e){return a.a.createElement("div",{className:Ze.a.endGamePanel},a.a.createElement("h1",null,"YOU WIN!"),a.a.createElement("div",null,a.a.createElement("button",{className:Ze.a.panelBtn,onClick:e.onKeepPlayingClick},"Keep Playing"),a.a.createElement("button",{className:Ze.a.panelBtn,onClick:e.onNewGameClick},"Try Again")))};var $e=function(e){var t=e.onNewGameClick,r=e.onKeepPlayingClick,n=null;return e.gameState===v.GAME_OVER?n=a.a.createElement(ze,{onNewGameClick:t}):e.gameState===v.VICTORY&&(n=a.a.createElement(Xe,{onNewGameClick:t,onKeepPlayingClick:r})),a.a.createElement("div",{className:Ze.a.container},n)};var et=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.game.gameState})),r=Object(n.useCallback)((function(){e(W())}),[e]),c=Object(n.useCallback)((function(){e(J())}),[e]);return a.a.createElement($e,{gameState:t,onNewGameClick:r,onKeepPlayingClick:c})};function tt(){return(tt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function rt(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var nt=a.a.createElement("g",null,a.a.createElement("path",{d:"M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365 c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63 c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996 c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136 c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559 c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559 c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997 c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851 c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136 c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41 c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126 c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817 c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994 c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849 c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24 c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979 c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146 c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995 c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906 C438.536,184.851,428.728,148.168,409.132,114.573z"})),at=function(e){var t=e.svgRef,r=e.title,n=rt(e,["svgRef","title"]);return a.a.createElement("svg",tt({id:"Capa_1",x:"0px",y:"0px",width:"438.549px",height:"438.549px",viewBox:"0 0 438.549 438.549",style:{enableBackground:"new 0 0 438.549 438.549"},xmlSpace:"preserve",ref:t},n),r?a.a.createElement("title",null,r):null,nt)},ct=a.a.forwardRef((function(e,t){return a.a.createElement(at,tt({svgRef:t},e))})),ot=(r.p,r(14)),it=r.n(ot);var lt=function(e){var t=e.gameState!==v.PLAYING;return a.a.createElement("div",{className:it.a.container},a.a.createElement(Ve,null),a.a.createElement("div",{className:it.a.positionRelative},a.a.createElement(Qe,null),t&&a.a.createElement(et,null)),a.a.createElement("p",{className:it.a.howToPlayText},a.a.createElement("span",{className:it.a.boldText},"HOW TO PLAY"),": Use your arrow keys or swipe to move the tiles. When two tiles with the same number touch, they merge into one!"),a.a.createElement("div",null,a.a.createElement("a",{href:"https://github.com/rbika/2048",className:it.a.viewOnGithubLink,target:"_blank"},a.a.createElement(ct,{className:it.a.githubLogo}),"View on Github")))};var ut=function(){var e=Object(i.c)((function(e){return e.game.gameState})),t=Object(i.b)();return Object(n.useEffect)((function(){t(W())}),[]),Object(n.useEffect)((function(){t(Z())}),[]),a.a.createElement(Be.a,{onSwiped:function(e){var r=w[e.dir.toUpperCase()];r&&t(V(r))}},a.a.createElement(lt,{gameState:e}))};r(42);o.a.render(a.a.createElement(i.a,{store:Ie},a.a.createElement(a.a.StrictMode,null,a.a.createElement(ut,null))),document.getElementById("root"))},7:function(e,t,r){e.exports={container:"Header_container__27QFJ",titleContainer:"Header_titleContainer__53BfW",title:"Header_title__3_fub",subTitle:"Header_subTitle__10-eU",gameInfo:"Header_gameInfo__3aUvJ",scoresContainer:"Header_scoresContainer__N5WX-",scoreContainer:"Header_scoreContainer__3bq5H",scoreLabel:"Header_scoreLabel__3uraT",scoreValue:"Header_scoreValue__2HLNR",undoBtn:"Header_undoBtn__25oAM",newGameBtn:"Header_newGameBtn__1c5MY"}}},[[29,1,2]]]);
//# sourceMappingURL=main.5ed5ba48.chunk.js.map