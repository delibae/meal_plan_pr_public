import{al as Bt,am as Lt,an as T,ao as Pe,ap as xe,r as b,g as Ae,w as N,s as Fe,a0 as x,a1 as A,a2 as F,o as Ie,b as m,C as $,v as ee,k as R,j as te,ae as Be,aq as Le,f as h,ar as Ve,a9 as D,x as $e,as as ae,at as ne,ab as We,ac as He,ad as je}from"./index.320f5567.js";import{_ as Ke,a as qe}from"./CardBoxTest.4a5e65b0.js";function L(e,t,a,n){const l=e,r=new SyntaxError(String(l));return r.code=e,r.loc=t,r}const le=Symbol(""),H=Symbol(""),Ge=Symbol(""),Ue=Symbol(""),Ye=Symbol(""),ze=Symbol(""),_e=Symbol(""),Ze=Symbol(""),Je=Symbol(""),Qe=Symbol(""),ce=Symbol(""),Xe=Symbol(""),be=Symbol(""),et=Symbol(""),tt=Symbol(""),at=Symbol(""),S={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function oe(e,t,a,n,l,r,u,s=!1,d=!1,c=!1,g=S){return e&&(s?(e.helper(H),e.helper(q(e.inSSR,c))):e.helper(K(e.inSSR,c)),u&&e.helper(Ze)),{type:13,tag:t,props:a,children:n,patchFlag:l,dynamicProps:r,directives:u,isBlock:s,disableTracking:d,isComponent:c,loc:g}}function I(e,t=S){return{type:15,loc:t,properties:e}}function ke(e,t){return{type:16,loc:S,key:T(e)?w(e,!0):e,value:t}}function w(e,t=!1,a=S,n=0){return{type:4,loc:a,content:e,isStatic:t,constType:t?3:n}}function re(e,t=S){return{type:8,loc:t,children:e}}function j(e,t=[],a=S){return{type:14,loc:a,callee:e,arguments:t}}function de(e,t=void 0,a=!1,n=!1,l=S){return{type:18,params:e,returns:t,newline:a,isSlot:n,loc:l}}function nt(e,t,a,n=!0){return{type:19,test:e,consequent:t,alternate:a,newline:n,loc:S}}function rt(e){return{type:21,body:e,loc:S}}const lt=e=>e.type===4&&e.isStatic;function ot(e,t,a){const l={source:e.source.slice(t,t+a),start:fe(e.start,e.source,t),end:e.end};return a!=null&&(l.end=fe(e.start,e.source,t+a)),l}function fe(e,t,a=t.length){return it(Pe({},e),t,a)}function it(e,t,a=t.length){let n=0,l=-1;for(let r=0;r<a;r++)t.charCodeAt(r)===10&&(n++,l=r);return e.offset+=a,e.line+=n,e.column=l===-1?e.column+a:a-l,e}function Ee(e,t,a=!1){for(let n=0;n<e.props.length;n++){const l=e.props[n];if(l.type===7&&(a||l.exp)&&(T(t)?l.name===t:t.test(l.name)))return l}}function we(e,t,a=!1,n=!1){for(let l=0;l<e.props.length;l++){const r=e.props[l];if(r.type===6){if(a)continue;if(r.name===t&&(r.value||n))return r}else if(r.name==="bind"&&(r.exp||n)&&st(r.arg,t))return r}}function st(e,t){return!!(e&&lt(e)&&e.content===t)}function ut(e){return e.type===7&&e.name==="slot"}function Se(e){return e.type===1&&e.tagType===3}function pe(e){return e.type===1&&e.tagType===2}function K(e,t){return e||t?Ye:ze}function q(e,t){return e||t?Ge:Ue}const ct=new Set([Xe,be]);function Ce(e,t=[]){if(e&&!T(e)&&e.type===14){const a=e.callee;if(!T(a)&&ct.has(a))return Ce(e.arguments[0],t.concat(e))}return[e,t]}function G(e,t,a){let n,l=e.type===13?e.props:e.arguments[2],r=[],u;if(l&&!T(l)&&l.type===14){const s=Ce(l);l=s[0],r=s[1],u=r[r.length-1]}if(l==null||T(l))n=I([t]);else if(l.type===14){const s=l.arguments[0];!T(s)&&s.type===15?s.properties.unshift(t):l.callee===et?n=j(a.helper(ce),[I([t]),l]):l.arguments.unshift(I([t])),!n&&(n=l)}else if(l.type===15){let s=!1;if(t.key.type===4){const d=t.key.content;s=l.properties.some(c=>c.key.type===4&&c.key.content===d)}s||l.properties.unshift(t),n=l}else n=j(a.helper(ce),[I([t]),l]),u&&u.callee===be&&(u=r[r.length-2]);e.type===13?u?u.arguments[0]=n:e.props=n:u?u.arguments[0]=n:e.arguments[2]=n}function dt(e){return e.type===14&&e.callee===tt?e.arguments[1].returns:e}function ft(e,{helper:t,removeHelper:a,inSSR:n}){e.isBlock||(e.isBlock=!0,a(K(n,e.isComponent)),t(H),t(q(n,e.isComponent)))}function pt(e,t){let a=0;const n=()=>{a--};for(;a<e.children.length;a++){const l=e.children[a];T(l)||(t.parent=e,t.childIndex=a,t.onNodeRemoved=n,ie(l,t))}}function ie(e,t){t.currentNode=e;const{nodeTransforms:a}=t,n=[];for(let r=0;r<a.length;r++){const u=a[r](e,t);if(u&&(xe(u)?n.push(...u):n.push(u)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(_e);break;case 5:t.ssr||t.helper(Qe);break;case 9:for(let r=0;r<e.branches.length;r++)ie(e.branches[r],t);break;case 10:case 11:case 1:case 0:pt(e,t);break}t.currentNode=e;let l=n.length;for(;l--;)n[l]()}function Me(e,t){const a=T(e)?n=>n===e:n=>e.test(n);return(n,l)=>{if(n.type===1){const{props:r}=n;if(n.tagType===3&&r.some(ut))return;const u=[];for(let s=0;s<r.length;s++){const d=r[s];if(d.type===7&&a(d.name)){r.splice(s,1),s--;const c=t(n,d,l);c&&u.push(c)}}return u}}}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments,typeof,void".split(",").join("\\b|\\b")+"\\b");Me(/^(if|else|else-if)$/,(e,t,a)=>mt(e,t,a,(n,l,r)=>{const u=a.parent.children;let s=u.indexOf(n),d=0;for(;s-->=0;){const c=u[s];c&&c.type===9&&(d+=c.branches.length)}return()=>{if(r)n.codegenNode=ge(l,d,a);else{const c=gt(n.codegenNode);c.alternate=ge(l,d+n.branches.length-1,a)}}}));function mt(e,t,a,n){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){const l=t.exp?t.exp.loc:e.loc;a.onError(L(28,t.loc)),t.exp=w("true",!1,l)}if(t.name==="if"){const l=me(e,t),r={type:9,loc:e.loc,branches:[l]};if(a.replaceNode(r),n)return n(r,l,!0)}else{const l=a.parent.children;let r=l.indexOf(e);for(;r-->=-1;){const u=l[r];if(u&&u.type===2&&!u.content.trim().length){a.removeNode(u);continue}if(u&&u.type===9){t.name==="else-if"&&u.branches[u.branches.length-1].condition===void 0&&a.onError(L(30,e.loc)),a.removeNode();const s=me(e,t);u.branches.push(s);const d=n&&n(u,s,!1);ie(s,a),d&&d(),a.currentNode=null}else a.onError(L(30,e.loc));break}}}function me(e,t){const a=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:a&&!Ee(e,"for")?e.children:[e],userKey:we(e,"key"),isTemplateIf:a}}function ge(e,t,a){return e.condition?nt(e.condition,he(e,t,a),j(a.helper(_e),['""',"true"])):he(e,t,a)}function he(e,t,a){const{helper:n}=a,l=ke("key",w(`${t}`,!1,S,2)),{children:r}=e,u=r[0];if(r.length!==1||u.type!==1)if(r.length===1&&u.type===11){const d=u.codegenNode;return G(d,l,a),d}else{let d=64;return oe(a,n(le),I([l]),r,d+"",void 0,void 0,!0,!1,!1,e.loc)}else{const d=u.codegenNode,c=dt(d);return c.type===13&&ft(c,a),G(c,l,a),d}}function gt(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}Me("for",(e,t,a)=>{const{helper:n,removeHelper:l}=a;return ht(e,t,a,r=>{const u=j(n(Je),[r.source]),s=Se(e),d=Ee(e,"memo"),c=we(e,"key"),g=c&&(c.type===6?w(c.value.content,!0):c.exp),v=c?ke("key",g):null,_=r.source.type===4&&r.source.constType>0,k=_?64:c?128:256;return r.codegenNode=oe(a,n(le),void 0,u,k+"",void 0,void 0,!0,!_,!1,e.loc),()=>{let p;const{children:C}=r,U=C.length!==1||C[0].type!==1,P=pe(e)?e:s&&e.children.length===1&&pe(e.children[0])?e.children[0]:null;if(P?(p=P.codegenNode,s&&v&&G(p,v,a)):U?p=oe(a,n(le),v?I([v]):void 0,e.children,64+"",void 0,void 0,!0,void 0,!1):(p=C[0].codegenNode,s&&v&&G(p,v,a),p.isBlock!==!_&&(p.isBlock?(l(H),l(q(a.inSSR,p.isComponent))):l(K(a.inSSR,p.isComponent))),p.isBlock=!_,p.isBlock?(n(H),n(q(a.inSSR,p.isComponent))):n(K(a.inSSR,p.isComponent))),d){const V=de(ye(r.parseResult,[w("_cached")]));V.body=rt([re(["const _memo = (",d.exp,")"]),re(["if (_cached",...g?[" && _cached.key === ",g]:[],` && ${a.helperString(at)}(_cached, _memo)) return _cached`]),re(["const _item = ",p]),w("_item.memo = _memo"),w("return _item")]),u.arguments.push(V,w("_cache"),w(String(a.cached++)))}else u.arguments.push(de(ye(r.parseResult),p,!0))}})});function ht(e,t,a,n){if(!t.exp){a.onError(L(31,t.loc));return}const l=_t(t.exp);if(!l){a.onError(L(32,t.loc));return}const{addIdentifiers:r,removeIdentifiers:u,scopes:s}=a,{source:d,value:c,key:g,index:v}=l,_={type:11,loc:t.loc,source:d,valueAlias:c,keyAlias:g,objectIndexAlias:v,parseResult:l,children:Se(e)?e.children:[e]};a.replaceNode(_),s.vFor++;const k=n&&n(_);return()=>{s.vFor--,k&&k()}}const vt=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,ve=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,yt=/^\(|\)$/g;function _t(e,t){const a=e.loc,n=e.content,l=n.match(vt);if(!l)return;const[,r,u]=l,s={source:W(a,u.trim(),n.indexOf(u,r.length)),value:void 0,key:void 0,index:void 0};let d=r.trim().replace(yt,"").trim();const c=r.indexOf(d),g=d.match(ve);if(g){d=d.replace(ve,"").trim();const v=g[1].trim();let _;if(v&&(_=n.indexOf(v,c+d.length),s.key=W(a,v,_)),g[2]){const k=g[2].trim();k&&(s.index=W(a,k,n.indexOf(k,s.key?_+v.length:c+d.length)))}}return d&&(s.value=W(a,d,c)),s}function W(e,t,a){return w(t,!1,ot(e,a,t.length))}function ye({value:e,key:t,index:a},n=[]){return bt([e,t,a,...n])}function bt(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((a,n)=>a||w("_".repeat(n+1),!1))}const kt=h("option",{value:"0"},"\uC800\uD0C4\uACE0\uC9C0",-1),Et=h("option",{value:"1"},"\uD3C9\uADE0",-1),wt=h("option",{value:"2"},"\uACE0\uD0C4\uC800\uC9C0",-1),St=[kt,Et,wt],Ct={class:"grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6"},Mt=h("br",null,null,-1),Nt=h("br",null,null,-1),Rt=h("br",null,null,-1),Tt=h("br",null,null,-1),Ot=h("br",null,null,-1),Dt=h("br",null,null,-1),Pt=h("br",null,null,-1),xt={class:"gap-6 mb-6"},At={name:"LoginView",components:{},beforeMount(){var e=A+":"+F+"/api/session";x.get(e,{withCredentials:!0}).then(function(t){console.log(t),t.data==""&&(window.location.href="/login")}).catch(function(t){console.log(t)}).then(function(){})},data(){return{avg_weight:73,avg_lose:2e3,avg_consume:3e3}},methods:{test:function(){console.log(1)},change:function(){console.log(1),window.location.href="/login"}}},$t=Object.assign(At,{setup(e){const t=b(null);t.value={coeff:1};const a=b(null),n=b(null);n.value={kcal:0,carbo:0,protein:0,fat:0},a.value={carbo:0,protein:0,fat:0};function l(){var o=r.value.today_cal,f=t.value.coeff;f==0?(a.value.carbo=Math.round(o/100*20*.8/4),a.value.protein=Math.round(o/100*40*.8/4),a.value.fat=Math.round(o/100*40*.8/9)):f==1?(a.value.carbo=Math.round(o/100*25*.8/4),a.value.protein=Math.round(o/100*40*.8/4),a.value.fat=Math.round(o/100*35*.8/9)):(a.value.carbo=Math.round(o/100*30*.8/4),a.value.protein=Math.round(o/100*40*.8/4),a.value.fat=Math.round(o/100*30*.8/9)),n.value.kcal=Math.round(s.value.kcal/r.value.today_cal*100),n.value.carbo=Math.round(s.value.carbo/a.value.carbo*100),n.value.protein=Math.round(s.value.protein/a.value.protein*100),n.value.fat=Math.round(s.value.fat/a.value.fat*100),console.log("\uC5EC\uAE30\uC5EC\uAE30",n.value.protein)}const r=b(null),u=b(null),s=b(null),d=b(null),c=b(null),g=b(null),v=b(null);d.value=["13%","down"],r.value={today_cal:0,today_weight:0,today_remain:0},s.value={fat:0,protein:0,carbo:0,kcal:0},g.value={fat:0,protein:0,carbo:0,kcal:0},c.value={fat:["12%","down"],protein:["13%","up"],carbo:["0%","mid"],kcal:["20%","down"]};var _;const k=b(null),p=b(null);p.value=[];let C=new Date("2022-09-01");const U=function(o,f,y,i,E,B,M,Y){p.value.push({date:o,meal_type:f,meal_amount:y,meal_cal:i,meal_carbo:E,meal_protein:B,meal_fat:M,id:Y})},P=async()=>{try{var o=await x.get(A+":"+F+"/api/profile",{withCredentials:!0});_=o.data[0].user_id,p.value=[]}catch(Q){console.log("Error >>",Q)}try{for(var o=await x.get(A+":"+F+"/api/today/total",{params:{date:C},withCredentials:!0}),f={fat:0,protein:0,carbo:0,kcal:0},y=0,i=0;i<o.data[0].length;i++){console.log(o.data[0][i].id);var E=C,B=o.data[0][i].food_name,M=o.data[0][i].gram,Y=Math.round(o.data[0][i].kcal*M),Re=Math.round(o.data[0][i].carbo*M),Te=Math.round(o.data[0][i].protein*M),Oe=Math.round(o.data[0][i].fat*M),De=o.data[0][i].id;U(E,B,M,Y,Re,Te,Oe,De)}try{var o=await x.get(A+":"+F+"/api/profile",{withCredentials:!0});console.log(o),r.value.today_cal=o.data[0].kcal_per_day,r.value.today_weight=o.data[0].current_weight;let Ft=new Date("2022-09-01")}catch(X){console.log("Error >>",X)}try{var o=await x.get(A+":"+F+"/api/today/total",{params:{date:C},withCredentials:!0}),f={fat:0,protein:0,carbo:0,kcal:0},y=0;console.log(o.data);for(var i=0;i<o.data[0].length;i++)f.fat+=o.data[0][i].fat*o.data[0][i].gram,f.protein+=o.data[0][i].protein*o.data[0][i].gram,f.carbo+=o.data[0][i].carbo*o.data[0][i].gram,f.kcal+=o.data[0][i].kcal*o.data[0][i].gram,y+=o.data[0][i].kcal*o.data[0][i].gram;f.protein=Math.round(f.protein),f.kcal=Math.round(f.kcal),f.carbo=Math.round(f.carbo),f.fat=Math.round(f.fat),s.value=f;for(var f={fat:0,protein:0,carbo:0,kcal:0},se=0,i=0;i<o.data[1].length;i++)f.fat+=o.data[1][i].fat*o.data[1][i].gram,f.protein+=o.data[1][i].protein*o.data[1][i].gram,f.carbo+=o.data[1][i].carbo*o.data[1][i].gram,f.kcal+=o.data[1][i].kcal*o.data[1][i].gram,se+=o.data[1][i].kcal*o.data[1][i].gram;console.log("total, yes",y,se),g.value=f,console.log("yes",g.value);for(var O=["fat","protein","carbo","kcal"],i=0;i<O.length;i++){var z=Math.round((s.value[O[i]]-g.value[O[i]])*100/g.value[O[i]]);c.value[O[i]][0]=z+"%",z>0?c.value[O[i]][1]="up":z<0?c.value[O[i]][1]="down":c.value[O[i]][1]="mid"}var ue=o.data[2][0].weight,Z=Math.round((r.value.today_weight-ue)*100/ue);d.value[0]=Z+"%",Z>0?d.value[1]="up":Z<0?d.value[1]="down":d.value[1]="mid";for(var J={today_activity:0,today_activity_goal:0},i=0;i<o.data[3].length;i++)J.today_activity+=Math.round(o.data[3][i].working_time*o.data[3][i].coefficient*r.value.today_weight/15);u.value=J,r.value.today_remain=r.value.today_cal-y+J.today_activity,console.log("\uB0A8\uC740\uCE7C\uB85C\uB9AC = ",r.value.today_remain),r.value.today_remain>=0?u.value.today_activity_goal=0:(u.value.today_activity_goal-=r.value.total_remain,v.value[0]="Warning!",v.value[1]="alert"),console.log(),l(),console.log("today total >>",o.data[3]),k.value=!0}catch(X){console.log("Error >>",X)}k.value=!0}catch(Q){console.log("Error >>",Q)}};P();const V=async o=>{console.log("Added>>",o),p.value.unshift(o),console.log("Updated data>>",p.value);var f=o.meal_type,y=o.meal_amount,i=A+":"+F+"/api/insertFood",E=new FormData;E.append("user_id",_),E.append("food_name",f),E.append("date",C.addDays(0)),E.append("gram",y);try{var B=await x.post(i,E,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});P(),console.log("response >> ",B)}catch(M){console.log("Error >>",M)}};Date.prototype.addDays=function(o){var f=new Date(this.valueOf());return f.setDate(f.getDate()+o),f.getFullYear()+"-"+(f.getMonth()+1>9?(f.getMonth()+1).toString():"0"+(f.getMonth()+1))+"-"+(f.getDate()>9?f.getDate().toString():"0"+f.getDate().toString())};const Ne=async o=>{console.log("Delete index number>>",o),console.log("New linedata>>",p.value);var f=A+":"+F+"/api/deleteFood",y=new FormData;y.append("food_name",p.value[o].meal_type),y.append("date",C.addDays(0)),y.append("user_id",_),y.append("id",p.value[o].id),p.value.splice(o,1);try{var i=await x.post(f,y,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});console.log("response >> ",i),P()}catch(E){console.log("Error >>",E)}};return(o,f)=>(Ie(),Ae(Fe,{onChange:o.change},{default:N(()=>[m($e,null,{default:N(()=>[m($,null,{default:N(()=>[m(ee,{icon:R(ae),title:"Today Overview"},{default:N(()=>[m(te,{icon:R(ne),color:"whiteDark"},null,8,["icon"])]),_:1},8,["icon"]),Be(h("select",{"onUpdate:modelValue":f[0]||(f[0]=y=>t.value.coeff=y),id:"meal_type",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500",required:"",onClick:P,style:{width:"100px"}},St,512),[[Le,t.value.coeff]]),h("div",Ct,[m(Ve,{number1:a.value.carbo,suffix1:"g",label1:"\uAD8C\uC7A5 \uD0C4\uC218\uD654\uBB3C",number2:a.value.protein,label2:"\uAD8C\uC7A5 \uB2E8\uBC31\uC9C8",suffix2:"g",number3:a.value.fat,label3:"\uAD8C\uC7A5 \uC9C0\uBC29",suffix3:"g",class:"bg-amber-50 mt-3"},null,8,["number1","number2","number3"]),h("div",null,[m(D,{trend:c.value.kcal[0],"trend-type":c.value.kcal[1],color:"text-rose-300",number:s.value.kcal,suffix:"kcal",label:"kcal"},null,8,["trend","trend-type","number"]),Mt,m(D,{number:n.value.kcal,suffix:"%",label:"\uD558\uB8E8\uAD8C\uC7A5 \uB300\uBE44"},null,8,["number"])]),h("div",null,[m(D,{trend:c.value.carbo[0],"trend-type":c.value.carbo[1],color:"text-lime-400",icon:R(We),number:s.value.carbo,suffix:"g",label:"\uD0C4\uC218\uD654\uBB3C"},null,8,["trend","trend-type","icon","number"]),Nt,m(D,{number:n.value.carbo,suffix:"%",label:"\uD558\uB8E8\uAD8C\uC7A5 \uB300\uBE44"},null,8,["number"])]),h("div",null,[m(D,{trend:c.value.protein[0],"trend-type":c.value.protein[1],color:"text-orange-800",icon:R(He),number:s.value.protein,suffix:"g",label:"\uB2E8\uBC31\uC9C8"},null,8,["trend","trend-type","icon","number"]),Rt,m(D,{number:n.value.protein,suffix:"%",label:"\uD558\uB8E8\uAD8C\uC7A5 \uB300\uBE44"},null,8,["number"])]),h("div",null,[m(D,{trend:c.value.fat[0],"trend-type":c.value.fat[1],color:"text-rose-300",icon:R(je),number:s.value.fat,suffix:"g",label:"\uC9C0\uBC29"},null,8,["trend","trend-type","icon","number"]),Tt,m(D,{number:n.value.fat,suffix:"%",label:"\uD558\uB8E8\uAD8C\uC7A5 \uB300\uBE44"},null,8,["number"])])])]),_:1}),Ot,m($,null,{default:N(()=>[m(ee,{icon:R(ae),title:"\uC2DD\uB2E8 \uC778\uC99D"},{default:N(()=>[m(te,{icon:R(ne),color:"whiteDark"},null,8,["icon"])]),_:1},8,["icon"]),Dt,m($,{class:"mb-6","has-table":""},{default:N(()=>[m(Ke,{checkable:"",today_sum:r.value,perday_nutrient:a.value,lineData:p.value,onPush_data:V,onPop_data:Ne},null,8,["today_sum","perday_nutrient","lineData"])]),_:1})]),_:1}),Pt,m($,null,{default:N(()=>[m(ee,{icon:R(ae),title:"AI\uAC00 \uCD94\uCC9C\uD558\uB294 \uC2DD\uB2E8"},{default:N(()=>[m(te,{icon:R(ne),color:"whiteDark"},null,8,["icon"])]),_:1},8,["icon"]),h("div",xt,[m(qe,{class:"grid shadow-md",color:"text-rose-300",number:s.value.fat,suffix:"g"},null,8,["number"])])]),_:1})]),_:1})]),_:1},8,["onChange"]))}});export{$t as default};
