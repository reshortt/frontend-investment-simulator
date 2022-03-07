(this["webpackJsonpinvestment-simulator"]=this["webpackJsonpinvestment-simulator"]||[]).push([[0],{197:function(e,t,n){},276:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(55),c=n.n(s),o=(n(197),n(27)),i=n(188),u=n(282),l=n(185),b=n(177),j=n(76),p=n(18),d=n.n(p),f=n(40),h="AUTH_TOKEN_KEY",m=n(56),x=n.n(m),O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=""+e,a=new URLSearchParams(t).toString();return n+"?"+a},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"GET";return{method:e,headers:{authorization:"Bearer ".concat(sessionStorage.getItem(h))}}},g=function(){return!!sessionStorage.getItem(h)},y=function(){var e=Object(f.a)(d.a.mark((function e(t,n,a){var r,s,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userID:t,password:n,name:a})},e.next=3,x()(O("/API/signup"),r);case 3:if(s=e.sent,200!==s.status){e.next=9;break}return e.abrupt("return",{success:!0,message:""});case 9:return e.next=11,s.json();case 11:return c=e.sent,console.log("Signup failed: "+c.message),e.abrupt("return",{success:!1,message:c.message});case 14:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),k=function(){var e=Object(f.a)(d.a.mark((function e(t,n){var a,r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userID:t,password:n})},e.next=3,x()(O("/API/login"),a);case 3:r=e.sent,e.t0=r.status,e.next=200===e.t0?7:401===e.t0||400===e.t0?13:15;break;case 7:return e.next=9,r.json();case 9:return s=e.sent,sessionStorage.setItem(h,s.token),console.log("Successful login: "+s),e.abrupt("return",!0);case 13:return console.log("unsuccessful login for user "+t),e.abrupt("return",!1);case 15:return console.log("unexpected login response"),e.abrupt("return",!1);case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),w=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v(),e.next=3,x()(O("/API/getAccount"),t);case 3:n=e.sent,e.t0=n.status,e.next=200===e.t0?7:401===e.t0?11:17;break;case 7:return e.next=9,n.json();case 9:return a=e.sent,e.abrupt("return",a);case 11:return e.t1=console,e.next=14,n.json();case 14:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",null);case 17:return console.log("unexpected getAccount response"),e.abrupt("return",null);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v(),e.next=3,x()(O("/API/getUserInfo"),t);case 3:n=e.sent,e.t0=n.status,e.next=200===e.t0?7:401===e.t0?11:17;break;case 7:return e.next=9,n.json();case 9:return a=e.sent,e.abrupt("return",a);case 11:return e.t1=console,e.next=14,n.json();case 14:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",null);case 17:return console.log("unexpected getUser response"),e.abrupt("return",null);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v(),e.next=3,x()(O("/API/getAssets"),t);case 3:n=e.sent,e.t0=n.status,e.next=200===e.t0?7:401===e.t0?12:18;break;case 7:return e.next=9,n.json();case 9:return a=e.sent,console.log("Assets retrieved: "+a.assets),e.abrupt("return",a.assets);case 12:return e.t1=console,e.next=15,n.json();case 15:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",a);case 18:return console.log("unexpected getAssets response"),e.abrupt("return",a);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v(),e.next=3,x()(O("/API/getTransactions"),t);case 3:n=e.sent,e.t0=n.status,e.next=200===e.t0?7:401===e.t0?11:17;break;case 7:return e.next=9,n.json();case 9:return a=e.sent,e.abrupt("return",a.transactions);case 11:return e.t1=console,e.next=14,n.json();case 14:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",a);case 17:return console.log("unexpected getAssets response"),e.abrupt("return",a);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=v(),e.next=3,x()(O("/API/getCash"),t);case 3:n=e.sent,e.t0=n.status,e.next=200===e.t0?7:401===e.t0?11:17;break;case 7:return e.next=9,n.json();case 9:return a=e.sent,e.abrupt("return",a.cash);case 11:return e.t1=console,e.next=14,n.json();case 14:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",a);case 17:return console.log("unexpected getAssets response"),e.abrupt("return",a);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,a,r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Looking up ticker: "+t+"......."),n=v(),a=O("/API/lookupTicker",{tickerSymbol:t}),e.next=5,x()(a,n);case 5:r=e.sent,console.log("ticker lookup: ",r.status," - ",r.json),e.t0=r.status,e.next=200===e.t0?10:400===e.t0?14:15;break;case 10:return e.next=12,r.text();case 12:return s=e.sent,e.abrupt("return",s);case 14:return e.abrupt("return",null);case 15:return console.log("unexpected lookupTicker response"),e.abrupt("return",null);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function D(e,t){return T.apply(this,arguments)}function T(){return(T=Object(f.a)(d.a.mark((function e(t,n){var a,r,s,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v(),r=O("/API/getHistoricalPrices",{ticker:t,date:n.toDateString()}),console.log("Getting  historical prices for ",t," with URL=",r),e.next=5,x()(r,a);case 5:s=e.sent,e.t0=s.status,e.next=200===e.t0?9:13;break;case 9:return e.next=11,s.json();case 11:return c=e.sent,e.abrupt("return",c);case 13:return console.log("unexpected buyAsset response"),e.abrupt("return",[]);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=function(){var e=Object(f.a)(d.a.mark((function e(t,n,a){var r,s,c,o,i,u,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=v(),s=n.toString(),c=a.toString(),o=O("/API/buyAsset",{tickerSymbol:t,shares:s,price:c}),e.next=6,x()(o,r);case 6:i=e.sent,e.t0=i.status,e.next=200===e.t0?10:15;break;case 10:return e.next=12,i.json();case 12:return u=e.sent,l=u.cash,e.abrupt("return",{successful:!0,remainingCash:l});case 15:return console.log("unexpected buyAsset response"),e.abrupt("return",{successful:!1,remainingCash:0});case 17:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),L=function(){var e=Object(f.a)(d.a.mark((function e(t,n,a){var r,s,c,o,i,u,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=v(),s=n.toString(),c=a.toString(),o=O("/API/sellAsset",{tickerSymbol:t,shares:s,price:c}),e.next=6,x()(o,r);case 6:i=e.sent,console.log("response: ",i.status),e.t0=i.status,e.next=200===e.t0?11:16;break;case 11:return e.next=13,i.json();case 13:return u=e.sent,l=u.cash,e.abrupt("return",{successful:!0,remainingCash:l});case 16:return console.log("unexpected getAssets response"),e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),U=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,a,r,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=v(),a=O("/API/getStockPrice",{tickerSymbol:t}),e.next=4,x()(a,n);case 4:return r=e.sent,e.next=7,r.json();case 7:s=e.sent,console.log("Get Stock Price Response:: ",s),e.t0=r.status,e.next=200===e.t0?12:401===e.t0?13:19;break;case 12:return e.abrupt("return",s);case 13:return e.t1=console,e.next=16,r.json();case 16:return e.t2=e.sent,e.t1.log.call(e.t1,e.t2),e.abrupt("return",s);case 19:return console.log("unexpected getAssets response"),e.abrupt("return",s);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(e){var t=0;return e?(e.lots.map((function(e){t+=e.shares})),t):0},B=(n(150),n(5));var F=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(B.jsxs)(u.a,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!0},onFinish:function(e){r(!0),k(e.username,e.password).then((function(e){r(!1),e?I().then((function(e){i.b.success("User "+(null===e||void 0===e?void 0:e.name)+" successfully logged in",1).then((function(){window.location.assign("/")}))})):i.b.error("Invalid credentials")}))},onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[Object(B.jsx)(u.a.Item,{label:"User name",name:"username",rules:[{required:!0,message:"Please input your username"}],children:Object(B.jsx)(l.a,{})}),Object(B.jsx)(u.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(B.jsx)(l.a.Password,{})}),Object(B.jsx)(u.a.Item,{wrapperCol:{offset:8,span:16},children:n||g()?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)(j.a,{type:"primary",htmlType:"submit",children:"Login"})}),Object(B.jsxs)(u.a.Item,{wrapperCol:{offset:8,span:16},children:[Object(B.jsx)("label",{children:"No Account? "}),Object(B.jsx)(j.a,{type:"link",onClick:function(){window.location.assign("/signup")},children:"Sign Up"})]})]})},z=n.p+"static/media/stocks.0f6444bc.png";function Y(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){g()&&!n&&I().then((function(e){e&&r(e)}))})),Object(B.jsxs)("div",{style:{padding:"20px 10px 50px",fontSize:"16px",width:"100%",height:"60px",backgroundColor:"green"},children:[Object(B.jsx)("img",{src:z,width:"24",height:"24",style:{verticalAlign:"middle"}}),Object(B.jsxs)("label",{style:{color:"white",font:"Arial",textAlign:"center",verticalAlign:"bottom",paddingLeft:"10px"},children:[n?" Investment Simulator - "+n.name:" Investment Simulator"," "]})]})}var M,V=n(280),R=n(17),G=n(58),q=n(191),H=n(281);!function(e){e.GIFT="GIFT",e.BUY="BUY",e.SELL="SELL",e.DIVIDEND="DIVIDEND",e.SPLIT="SPLIT"}(M||(M={}));var J=function(e){var t,n=0,a=Object(R.a)(e.lots);try{for(a.s();!(t=a.n()).done;){var r=t.value;n+=r.basis*r.shares}}catch(s){a.e(s)}finally{a.f()}return n},K=function(e){var t,n=0,a=Object(R.a)(e.lots);try{for(a.s();!(t=a.n()).done;){n+=t.value.shares}}catch(r){a.e(r)}finally{a.f()}return n},$=function(e){return K(e)*(e.stock.price.bid||e.stock.price.previousClose||0)},_=function(e){return Q(e)-1e6},Q=function(e){var t,n=0,a=Object(R.a)(e.assets);try{for(a.s();!(t=a.n()).done;){var r=t.value;n+=$(r)}}catch(s){a.e(s)}finally{a.f()}return n+e.info.cash},W=function(e,t){return $(t)/Q(e)},X=function(e){return $(e)-J(e)},Z=function(e){return"$"+new Intl.NumberFormat("en-us",{minimumFractionDigits:2,maximumFractionDigits:2}).format(e)},ee=function(e){return new Intl.NumberFormat("en-us",{minimumFractionDigits:2,maximumFractionDigits:2}).format(100*e)+"%"},te=function(e,t){var n=new Date(e);if(!Object(q.a)(n))return"";var a=t?"MMMM dd, yyyy":"yyyy-MM-dd";return Object(H.a)(n,a)};function ne(e,t){var n=[];t.setHours(0,0,0,0);var a,r=Object(R.a)(e);try{for(r.s();!(a=r.n()).done;){var s=a.value,c=new Date(s.date);if(c.setHours(0,0,0,0),c>t)break;c.getTime()===t.getTime()&&n.push(s)}}catch(o){r.e(o)}finally{r.f()}return n}function ae(e,t){var n,a=e.shares,r=Object(R.a)(t);try{for(r.s();!(n=r.n()).done;){var s=n.value;s.type===M.SPLIT&&s.symbol.toUpperCase()===e.symbol.toUpperCase()&&s.date>e.date&&(a*=s.to/s.from)}}catch(c){r.e(c)}finally{r.f()}return a}function re(e){return se.apply(this,arguments)}function se(){return(se=Object(f.a)(d.a.mark((function e(t){var n,a,r,s,c,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=new Map,a=[],r=0,s=new Date(t[0].date),(c=new Date(Date.now())).setDate(c.getDate()-1),o=function(e){var s,c=ne(t,e),o=Object(R.a)(c);try{for(o.s();!(s=o.n()).done;){var i=s.value;switch(i.type){case M.BUY:var u=n.get(i.symbol),l=ae(i,t);void 0!==u?u+=l:u=l,n.set(i.symbol,u),r-=i.amount;break;case M.DIVIDEND:r+=i.amount;break;case M.SELL:var b=n.get(i.symbol),j=ae(i,t);void 0!==b?b-=j:(console.log("******** Error - sold shares that were not owned"),b=0),n.set(i.symbol,b),r+=i.amount;break;case M.GIFT:r+=i.amount}}}catch(d){o.e(d)}finally{o.f()}var p=[];n.forEach((function(e,t){void 0!==e&&e>0&&p.push({shares:e,symbol:t})})),a.push({cash:r,date:new Date(e),positions:p})},i=s;i<c;i.setDate(i.getDate()+1))o(i);return e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ce=new Map,oe=function(){var e=Object(f.a)(d.a.mark((function e(t,n){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=ce.get(t))){e.next=3;break}return e.abrupt("return",a);case 3:return e.next=5,D(t,n);case 5:return a=e.sent,ce.set(t,a),e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),ie=function(){var e=Object(f.a)(d.a.mark((function e(t,n){var a,r,s,c,o,i,u,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe(t,n);case 2:if(a=e.sent,r=a.length>2?Math.abs(new Date(a[0].date).getTime()-new Date(n).getTime()):void 0,s=a.length>2?Math.abs(new Date(a[a.length-1].date).getTime()-new Date(n).getTime()):void 0,!(r&&s&&r>s)){e.next=17;break}c=a.length-1;case 7:if(!(c>=0)){e.next=15;break}if(o=a[c],!(new Date(o.date)<=n)){e.next=12;break}return e.abrupt("return",o.price);case 12:--c,e.next=7;break;case 15:e.next=35;break;case 17:i=Object(R.a)(a),e.prev=18,i.s();case 20:if((u=i.n()).done){e.next=27;break}if(l=u.value,!(new Date(l.date)>=n)){e.next=25;break}return e.abrupt("return",l.price);case 25:e.next=20;break;case 27:e.next=32;break;case 29:e.prev=29,e.t0=e.catch(18),i.e(e.t0);case 32:return e.prev=32,i.f(),e.finish(32);case 35:return console.log(t,"price on ",n,": ",0),e.abrupt("return",0);case 37:case"end":return e.stop()}}),e,null,[[18,29,32,35]])})));return function(t,n){return e.apply(this,arguments)}}(),ue=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,a,r,s,c,o,i,u,l,b,j,p,f;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,re(t);case 3:a=e.sent,r=Object(R.a)(a),e.prev=5,r.s();case 7:if((s=r.n()).done){e.next=37;break}c=s.value,o=0,i=new Date(c.date),u=[],l=Object(R.a)(c.positions),e.prev=13,l.s();case 15:if((b=l.n()).done){e.next=25;break}return j=b.value,e.next=19,ie(j.symbol,i);case 19:p=e.sent,f={symbol:j.symbol,value:j.shares*p},u.push(f),o+=f.value;case 23:e.next=15;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e.catch(13),l.e(e.t0);case 30:return e.prev=30,l.f(),e.finish(30);case 33:o+=c.cash,n.push({date:i,cash:c.cash,total:o,stocks:u});case 35:e.next=7;break;case 37:e.next=42;break;case 39:e.prev=39,e.t1=e.catch(5),r.e(e.t1);case 42:return e.prev=42,r.f(),e.finish(42);case 45:return ce.clear(),e.abrupt("return",n);case 47:case"end":return e.stop()}}),e,null,[[5,39,42,45],[13,27,30,33]])})));return function(t){return e.apply(this,arguments)}}(),le=function(e){return e.type===M.BUY?(e.amount-e.commission)/e.shares:(e.amount+e.commission)/e.shares},be=n(77),je=n(189),pe=n(59);pe.c.register.apply(pe.c,Object(G.a)(pe.j));var de=["cadetblue","darkorchid","cornflowerblue","indigo","olive","darkseagreen","darkmagenta"];var fe=function(){var e=Object(a.useState)(void 0),t=Object(o.a)(e,2),n=t[0],r=t[1];Object(a.useEffect)((function(){C().then((function(e){ue(e).then((function(e){var t=s(e);r(t)}))}))}),[]);var s=function(e){var t=[],n=[],a=[],r=[];e=function(e){if(e.length<100)return e;for(var t=[],n=e.length/100,a=0;a<e.length;a+=n){var r=Math.floor(a);t.push(e[r])}return t[t.length-1]!=e[e.length-1]&&t.push(e[e.length-1]),t}(e);var s,c=new Map,o=Object(R.a)(e);try{for(o.s();!(s=o.n()).done;){var i,u=s.value,l=Object(R.a)(u.stocks);try{for(l.s();!(i=l.n()).done;){var b=i.value;c.get(b.symbol)||c.set(b.symbol,[])}}catch(m){l.e(m)}finally{l.f()}}}catch(m){o.e(m)}finally{o.f()}var j,p=Object(R.a)(e);try{var d=function(){var e=j.value;t.push(te(e.date,!1)),a.push(e.total),r.push(e.cash),c.forEach((function(t,n){var a,r=NaN,s=Object(R.a)(e.stocks);try{for(s.s();!(a=s.n()).done;){var c=a.value;if(c.symbol.toUpperCase()===n.toUpperCase()){r=c.value;break}}}catch(m){s.e(m)}finally{s.f()}t.push(r)}))};for(p.s();!(j=p.n()).done;)d()}catch(m){p.e(m)}finally{p.f()}n.push({id:1,label:"Total",data:a,pointRadius:3,pointHoverRadius:6,borderColor:"blue"}),n.push({id:2,label:"Cash",data:r,pointRadius:3,pointHoverRadius:6,borderColor:"green"});var f=3,h=0;return c.forEach((function(e,t){var a=de[h];++h==de.length&&(h=0),n.push({id:f++,label:t,data:e,pointRadius:3,pointHoverRadius:6,borderColor:a})})),{labels:t,datasets:n}};return Object(B.jsx)("div",{className:"Analysis",children:Object(B.jsx)("header",{className:"Analysis-header",children:void 0===n?Object(B.jsx)("div",{children:Object(B.jsx)(b.a,{size:"default"})}):n.labels.length<7?Object(B.jsx)(be.a,{description:"History unavailable for accounts created within the last week"}):Object(B.jsx)(je.a,{datasetIdKey:"1",data:n})})})},he=n(35);var me=function(){var e=Object(a.useState)(),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(),c=Object(o.a)(s,2),i=c[0],l=c[1],j=Object(a.useState)(!1),p=Object(o.a)(j,2),d=p[0],f=p[1],h=Object(a.useState)(!1),m=Object(o.a)(h,2),x=m[0],O=m[1];return Object(a.useEffect)((function(){O(!0),I().then((function(e){e&&l(e),O(!1),f(!0),w().then((function(e){e&&r(e),f(!1)}))}))}),[]),Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)("br",{}),Object(B.jsxs)(u.a,Object(he.a)(Object(he.a)({name:"overview"},{labelCol:{span:2,offset:0},wrapperCol:{span:36,offset:1}}),{},{children:[Object(B.jsx)(u.a.Item,{label:"Name",labelAlign:"right",children:x||!i?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{children:i.name})}),Object(B.jsx)(u.a.Item,{label:"User ID",labelAlign:"right",children:Object(B.jsx)("span",{className:"ant-form-text",children:i&&!x&&i.userID?i.userID:Object(B.jsx)(b.a,{size:"small"})})}),Object(B.jsx)(u.a.Item,{label:"Account Created",labelAlign:"right",children:Object(B.jsx)("span",{className:"ant-form-text",children:i&&!x?te(i.created,!0):Object(B.jsx)(b.a,{size:"small"})})}),Object(B.jsx)(u.a.Item,{label:"Account Value",labelAlign:"right",children:Object(B.jsx)("span",{className:"ant-form-text",children:!n||d?Object(B.jsx)(b.a,{size:"small"}):function(e){return Z(Q(e))}(n)})}),Object(B.jsx)(u.a.Item,{label:"Cash Balance",labelAlign:"right",children:Object(B.jsx)("span",{className:"ant-form-text",children:i&&!x?Z(i.cash):Object(B.jsx)(b.a,{size:"small"})})}),Object(B.jsx)(u.a.Item,{label:"Total Gain/Loss",labelAlign:"right",children:Object(B.jsx)("span",{className:"ant-form-text",children:d||!n?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{style:_(n)<0?{color:"red"}:{color:void 0},children:function(e){return Z(_(e))}(n)})})})]}))]})},xe=n(279);var Oe,ve=function(){var e=Object(a.useState)(),t=Object(o.a)(e,2),n=t[0],r=t[1];Object(a.useEffect)((function(){w().then((function(e){e&&r(s(e))}))}),[]);var s=function(e){var t,n=[],a=Object(R.a)(e.assets);try{for(a.s();!(t=a.n()).done;){var r=t.value;X(r),J(r),n.push({name:r.stock.name,symbol:r.stock.symbol,bid:Z(r.stock.price.bid||r.stock.price.previousClose),ask:Z(r.stock.price.ask||r.stock.price.previousClose),quantity:K(r).toString(),costBasis:Z(J(r)),currentValue:Z($(r)),percentOfAccount:ee(W(e,r)),gain:Z(X(r)),gainPercent:ee(X(r)/J(r))})}}catch(s){a.e(s)}finally{a.f()}return n.push({name:"Cash",currentValue:Z(e.info.cash),costBasis:Z(e.info.cash),percentOfAccount:ee(e.info.cash/Q(e))}),n},c=[{title:"Symbol",dataIndex:"symbol",key:"symbol"},{title:"Asset",dataIndex:"name",key:"name"},{title:"Quantity",dataIndex:"quantity",key:"quantity"},{title:"Bid",dataIndex:"bid",key:"bid"},{title:"Ask",dataIndex:"ask",key:"ask"},{title:"Current Value",dataIndex:"currentValue",key:"currentValue"},{title:"Cost Basis",dataIndex:"costBasis",key:"costBasis"},{title:"Percentage of Account",dataIndex:"percentOfAccount",key:"percentOfAccount"},{title:"Total Gain/Loss",dataIndex:"gain",key:"gain",onCell:function(e){return{style:{color:(t=e.gain,(t?(t=t.replace("$",""),parseFloat(t)):0)<0?"red":"black")}};var t}},{title:"Total Gain/Loss %",dataIndex:"gainPercent",key:"gainPercent",onCell:function(e){return{style:{color:(t=e.gainPercent,(t?(t=t.replace("%",""),parseFloat(t)):0)<0?"red":"black")}};var t}}];return Object(B.jsx)("div",{className:"Positions",children:Object(B.jsx)("header",{className:"Overview-header",children:void 0===n?Object(B.jsx)("div",{children:Object(B.jsx)(b.a,{size:"default"})}):Object(B.jsx)(xe.a,{dataSource:n,columns:c,pagination:{pageSize:100}})})})},ge=n(114),ye=n(278);function ke(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(0),c=Object(o.a)(s,2),i=c[0],p=c[1],h=Object(a.useState)(0),m=Object(o.a)(h,2),x=m[0],O=m[1],v=Object(a.useState)(0),g=Object(o.a)(v,2),y=g[0],k=g[1],w=Object(a.useState)(0),I=Object(o.a)(w,2),S=(I[0],I[1]),C=Object(a.useState)(null),D=Object(o.a)(C,2),T=D[0],L=D[1],N=Object(a.useState)(0),F=Object(o.a)(N,2),z=F[0],Y=F[1],M=Object(a.useRef)(""),V=Object(a.useState)(!1),R=Object(o.a)(V,2),G=R[0],q=R[1],H=Object(a.useState)(!1),J=Object(o.a)(H,2),K=J[0],$=J[1];Object(a.useEffect)((function(){P().then((function(e){Y(e)}))}),[]),Object(a.useEffect)((function(){q(!0),M.current=n,A(n).then((function(e){n===M.current&&(q(!1),L(e),e?($(!0),U(n).then((function(e){$(!1),O(e.ask)})).catch((function(e){$(!1)}))):O(null),q(!1))})).catch((function(e){q(!1)}))}),[n]),Object(a.useEffect)((function(){if(null!=T&&null!=x){var e=i*x;S(e),k(e>0?e+15:e)}else S(0),k(0)}),[T,x,i]);var _=function(){var e=Object(f.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(z<y)){e.next=3;break}return window.alert("You don't have enough cash for  that purchase "),e.abrupt("return");case 3:T?(t="Please confirm purchase of "+i+" shares of "+T+" for a total of "+Z(y)+".",window.confirm(t)&&E(n,i,x||0).then((function(e){var t=e.successful,n=e.remainingCash;t&&(window.alert("Purchase successful. New cash balance is "+Z(n)),window.location.assign("/transactions"))}),(function(){window.alert("Purchase was not executed due to critical server error")}))):window.alert("Purchase cancelled");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(B.jsxs)(u.a,Object(he.a)(Object(he.a)({name:"buy"},{labelCol:{span:2,offset:0},wrapperCol:{span:6,offset:1}}),{},{children:[Object(B.jsxs)(u.a.Item,{label:"Stock",children:[Object(B.jsx)(l.a,{value:n,placeholder:"Enter stock ticker symbol",onChange:function(e){r(e.target.value.toUpperCase())}}),Object(B.jsxs)(B.Fragment,{children:[G?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{style:n&&T?{color:void 0}:{color:"red"},children:n?T||"Invalid ticker symbol":""})," "]})]}),Object(B.jsx)(u.a.Item,{label:"Current Ask Price",children:K||G?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{children:x?Z(x):"Please enter a valid ticker symbol"})}),Object(B.jsx)(u.a.Item,{label:"Shares to Buy",children:Object(B.jsx)(l.a,{placeholder:"Enter number of shares to buy",onChange:function(e){var t=e.target.value,n=Number.parseInt(t);p(n||0)},value:0===i?void 0:i})}),Object(B.jsx)(u.a.Item,{label:"Commission",children:Object(B.jsx)("label",{children:Z(15)})}),Object(B.jsx)(u.a.Item,{label:"Total Cost",children:i>0&&(G||K)?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{style:y>z?{color:"red"}:{color:void 0},children:i>0?Z(y):"Please enter the number of shares to buy"})}),Object(B.jsx)(u.a.Item,Object(he.a)(Object(he.a)({},{wrapperCol:{offset:3,span:16}}),{},{children:Object(B.jsx)(j.a,{type:"primary",onClick:_,disabled:0===i||K||G||!T||y>z,children:"Submit"})}))]}))}function we(){var e=Object(a.useState)(void 0),t=Object(o.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(!1),c=Object(o.a)(s,2),i=c[0],p=c[1],h=Object(a.useState)(void 0),m=Object(o.a)(h,2),x=m[0],O=m[1],v=Object(a.useState)(0),g=Object(o.a)(v,2),y=g[0],k=g[1],w=Object(a.useState)({bid:0,ask:0,previousClose:0}),I=Object(o.a)(w,2),C=I[0],P=I[1],A=Object(a.useState)(!1),D=Object(o.a)(A,2),T=D[0],E=D[1],F=function(){var e=Object(f.a)(d.a.mark((function e(){var t,n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(y>N(x))){e.next=3;break}return window.alert("Insufficient shares for this sale"),e.abrupt("return");case 3:if(!x){e.next=15;break}if(t=C.bid*y-15,n="Please confirm sale of "+y+" shares of "+x.stock.name+" for a total of "+Z(t)+".",!window.confirm(n)){e.next=14;break}return e.next=10,L(x.stock.symbol,y,C.bid||0);case 10:(a=e.sent)?(window.alert("Sale confirmed. New cash balance is "+Z(a.remainingCash)),window.location.assign("/")):window.alert("Sale failed: "+a),e.next=15;break;case 14:alert("Sale cancelled");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){p(!0),S().then((function(e){r(e),p(!1),e&&e.length>0&&O(e[0])}))}),[]),Object(a.useEffect)((function(){x&&(E(!0),k(0),U(x.stock.symbol).then((function(e){P(e),E(!1)})))}),[x]);return Object(B.jsx)(B.Fragment,{children:i?Object(B.jsx)(b.a,{size:"large"}):n&&0!=n.length?Object(B.jsxs)(u.a,Object(he.a)(Object(he.a)({name:"sell"},{labelCol:{span:2,offset:0},wrapperCol:{span:6,offset:1}}),{},{children:[Object(B.jsx)(u.a.Item,{label:"Stock",children:Object(B.jsx)(ge.a,{onChange:function(e){if(n&&e){var t=n.find((function(t){return t.stock.symbol.toUpperCase()===e.toUpperCase()}));t&&(O(t),k(0))}},defaultValue:n[0].stock.symbol,value:null===x||void 0===x?void 0:x.stock.symbol,children:n.map((function(e){return Object(B.jsx)(ge.a.Option,{value:e.stock.symbol,children:e.stock.name+"  ("+e.stock.symbol+")"})}))})}),Object(B.jsx)(u.a.Item,{label:"Current Bid Price",children:T?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsxs)("label",{children:[" ",Z(C.bid)]})}),Object(B.jsx)(u.a.Item,{label:"Shares to Sell",children:Object(B.jsx)(l.a,{placeholder:x?N(x)+" shares of "+x.stock.symbol+" available to sell":"Enter number of shares to sell",onChange:function(e){var t=e.target.value,n=Number.parseInt(t);k(n||0)},value:0==y?void 0:y,style:y>N(x)?{color:"red"}:{color:void 0}})}),Object(B.jsx)(u.a.Item,{label:"Commission",children:Object(B.jsx)("label",{children:Z(15)})}),Object(B.jsx)(u.a.Item,{label:"Net Proceeds",children:T&&y>0?Object(B.jsx)(b.a,{size:"small"}):Object(B.jsx)("label",{children:y>N(x)?"You may sell a maximum of "+N(x)+" shares of "+(null===x||void 0===x?void 0:x.stock.symbol):0==y?"Please enter the number of shares to sell":y>0?Z(C.bid*y-15):0})}),Object(B.jsx)(u.a.Item,Object(he.a)(Object(he.a)({},{wrapperCol:{offset:3,span:16}}),{},{children:Object(B.jsx)(j.a,{type:"primary",onClick:F,disabled:!x||!C||y<=0||y>N(x),children:"Submit"})}))]})):Object(B.jsx)(be.a,{description:"You do not have any stocks to sell"})})}!function(e){e.BUY="BUY",e.SELL="SELL"}(Oe||(Oe={}));var Ie=function(){var e=Object(a.useState)(Oe.BUY),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)("br",{}),Object(B.jsx)(u.a,Object(he.a)(Object(he.a)({name:"trade"},{labelCol:{span:2,offset:0},wrapperCol:{span:2}}),{},{children:Object(B.jsx)(u.a.Item,{label:"Trade Type",labelAlign:"left",children:Object(B.jsxs)(ge.a,{onChange:function(e){r(e)},defaultValue:Oe.BUY,children:[Object(B.jsx)(ge.a.Option,{value:Oe.BUY,children:Oe.BUY}),Object(B.jsx)(ge.a.Option,{value:Oe.SELL,children:Oe.SELL})]})})})),Object(B.jsx)(ye.a,{orientation:"left",orientationMargin:"0",children:n==Oe.BUY?"Buy Stock":"Sell Stock"}),n==Oe.BUY?Object(B.jsx)(ke,{}):Object(B.jsx)(we,{})]})};var Se=function(){var e=Object(a.useState)(),t=Object(o.a)(e,2),n=t[0],r=t[1];Object(a.useEffect)((function(){C().then((function(e){r(s(e))}))}),[]);var s=function(e){var t,n=[],a=Object(R.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n.push({date:te(r.date,!0),description:c(r),amount:r.amount?Z(r.amount):Z(0),cash:Z(r.cash)})}}catch(s){a.e(s)}finally{a.f()}return n},c=function(e){var t="";switch(e.type){case M.BUY:t="Buy "+e.shares+" of "+e.name+" ("+e.symbol+") at "+Z(le(e));break;case M.DIVIDEND:t="Dividend on "+e.shares+" shares of "+e.name+" ("+e.symbol+")";break;case M.GIFT:t="Initial Deposit";break;case M.SELL:t="Sell "+e.shares+" of "+e.name+" ("+e.symbol+") at "+Z(le(e));break;case M.SPLIT:t=e.symbol+" "+e.to+"-for-"+e.from+" Stock Split";break;default:console.log("This is transaction type: "+e.type),t="There is no describing this transaction"}return t};return Object(B.jsxs)("div",{className:"Transactions",children:[Object(B.jsx)("header",{className:"Transactions-header"}),void 0===n?Object(B.jsx)(b.a,{size:"default"}):Object(B.jsx)(xe.a,{dataSource:n,columns:[{title:"Date",dataIndex:"date",key:"date"},{title:"Description",dataIndex:"description",key:"description"},{title:"Amount",dataIndex:"amount",key:"amount"},{title:"Cash Balance",dataIndex:"cash",key:"cash"}],pagination:{pageSize:100}})]})},Ce=V.a.TabPane,Pe=Object(B.jsx)(j.a,{type:"primary",onClick:function(){window.confirm("OK to Log Out?")&&(sessionStorage.removeItem(h),window.location.assign("/login"))},children:"Logout"});var Ae=function(){return Object(B.jsxs)(V.a,{style:{paddingTop:"5px",paddingLeft:"10px",paddingRight:"5px",boxSizing:"content-box"},tabBarExtraContent:Pe,tabPosition:"top",type:"card",children:[Object(B.jsx)(Ce,{tab:"Overview",children:Object(B.jsx)(me,{})},"1"),Object(B.jsx)(Ce,{tab:"Positions",children:Object(B.jsx)(ve,{})},"2"),Object(B.jsx)(Ce,{tab:"Transactions",children:Object(B.jsx)(Se,{})},"3"),Object(B.jsx)(Ce,{tab:"Analysis",children:Object(B.jsx)(fe,{})},"4"),Object(B.jsx)(Ce,{tab:"Trade",children:Object(B.jsx)(Ie,{})},"5")]})},De=n(187),Te=n(42);var Ee=function(){return Object(B.jsxs)(u.a,Object(he.a)(Object(he.a)({name:"signup"},{labelCol:{span:2,offset:0},wrapperCol:{span:10,offset:1}}),{},{onFinish:function(e){y(e.userID,e.password,e.name).then((function(t){t.success?(window.location.assign("/login"),window.alert("Welcome, "+e.name+". Your account was successfully created.")):window.alert("Error creating account : "+t.message)}))},children:[Object(B.jsx)(u.a.Item,{label:"Name",name:"name",rules:[{required:!0,message:"Please input your name"}],children:Object(B.jsx)(l.a,{placeholder:"Fred Smith"})}),Object(B.jsx)(u.a.Item,{label:"User ID",name:"userID",rules:[{required:!0,message:"Please input your user ID"}],children:Object(B.jsx)(l.a,{placeholder:"stock-market-whiz"})}),Object(B.jsx)(u.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password"}],children:Object(B.jsx)(l.a.Password,{autoComplete:"new-password"})}),Object(B.jsx)(u.a.Item,{wrapperCol:{offset:8,span:3},children:Object(B.jsx)(j.a,{type:"primary",htmlType:"submit",children:"Sign Up"})})]}))},Le=n(180);function Ue(){return Object(B.jsx)("div",{children:Object(B.jsx)(De.a,{children:Object(B.jsxs)("div",{children:[Object(B.jsx)(Le.a,{children:Object(B.jsx)("title",{children:"Investment Simulator"})}),Object(B.jsx)(Y,{}),Object(B.jsx)("br",{}),Object(B.jsxs)(Te.c,{children:[Object(B.jsx)(Te.a,{path:"/signup",children:Object(B.jsx)(Ee,{})}),Object(B.jsx)(Te.a,{path:"/login",children:g()?Object(B.jsx)(Ae,{}):Object(B.jsx)(F,{})}),Object(B.jsx)(Te.a,{path:"/",children:g()?Object(B.jsx)(Ae,{}):Object(B.jsx)(F,{})})]})]})})})}var Ne=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,283)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),s(e),c(e)}))};c.a.render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(Ue,{})}),document.getElementById("root")),Ne()}},[[276,1,2]]]);
//# sourceMappingURL=main.e89553de.chunk.js.map