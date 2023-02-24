import{M as V,r as h,g as k,w as l,s as O,o as B,b as e,v as D,k as m,j as d,x as f,N as w,n as F,O as s,P as i,Q as r,y as x,R as M,S as N,f as S,t as T,q as _,T as j,A as C,U as v,V as q}from"./index.2257af7c.js";import{_ as c}from"./FormCheckRadioGroup.713b664a.js";import{_ as $}from"./SectionTitle.54044803.js";const G=_("Custom elements"),R=_("Form with status example"),Y={class:"capitalize"},z=_(" state"),I={__name:"FormsView",setup(A){const b=[{id:1,label:"Business development"},{id:2,label:"Marketing"},{id:3,label:"Sales"}],t=V({name:"John Doe",email:"john.doe@example.com",phone:"",department:b[0],subject:"",question:""}),n=V({checkbox:["lorem"],radio:"one",switch:["one"],file:null}),g=()=>{},y=h(!0),u=h(0),p=["info","success","danger","warning"],U=()=>{u.value=p[u.value+1]?u.value+1:0};return(E,o)=>(B(),k(O,null,{default:l(()=>[e(x,null,{default:l(()=>[e(D,{icon:m(j),title:"Forms example",main:""},{default:l(()=>[e(d,{href:"https://github.com/justboil/admin-one-vue-tailwind",target:"_blank",icon:m(C),label:"Star on GitHub",color:"contrast","rounded-full":"",small:""},null,8,["icon"])]),_:1},8,["icon"]),e(f,{form:"",onSubmit:w(g,["prevent"])},{footer:l(()=>[e(F,null,{default:l(()=>[e(d,{type:"submit",color:"info",label:"Submit"}),e(d,{type:"reset",color:"info",outline:"",label:"Reset"})]),_:1})]),default:l(()=>[e(s,{label:"Grouped with icons"},{default:l(()=>[e(i,{modelValue:t.name,"onUpdate:modelValue":o[0]||(o[0]=a=>t.name=a),icon:m(v)},null,8,["modelValue","icon"]),e(i,{modelValue:t.email,"onUpdate:modelValue":o[1]||(o[1]=a=>t.email=a),type:"email",icon:m(q)},null,8,["modelValue","icon"])]),_:1}),e(s,{label:"With help line",help:"Do not enter the leading zero"},{default:l(()=>[e(i,{modelValue:t.phone,"onUpdate:modelValue":o[2]||(o[2]=a=>t.phone=a),type:"tel",placeholder:"Your phone number"},null,8,["modelValue"])]),_:1}),e(s,{label:"Dropdown"},{default:l(()=>[e(i,{modelValue:t.department,"onUpdate:modelValue":o[3]||(o[3]=a=>t.department=a),options:b},null,8,["modelValue"])]),_:1}),e(r),e(s,{label:"Question",help:"Your question. Max 255 characters"},{default:l(()=>[e(i,{type:"textarea",placeholder:"Explain how we can help you"})]),_:1})]),_:1},8,["onSubmit"])]),_:1}),e($,null,{default:l(()=>[G]),_:1}),e(x,null,{default:l(()=>[e(f,null,{default:l(()=>[e(s,{label:"Checkbox"},{default:l(()=>[e(c,{modelValue:n.checkbox,"onUpdate:modelValue":o[4]||(o[4]=a=>n.checkbox=a),name:"sample-checkbox",options:{lorem:"Lorem",ipsum:"Ipsum",dolore:"Dolore"}},null,8,["modelValue"])]),_:1}),e(r),e(s,{label:"Radio"},{default:l(()=>[e(c,{modelValue:n.radio,"onUpdate:modelValue":o[5]||(o[5]=a=>n.radio=a),name:"sample-radio",type:"radio",options:{one:"One",two:"Two"}},null,8,["modelValue"])]),_:1}),e(r),e(s,{label:"Switch"},{default:l(()=>[e(c,{modelValue:n.switch,"onUpdate:modelValue":o[6]||(o[6]=a=>n.switch=a),name:"sample-switch",type:"switch",options:{one:"One",two:"Two"}},null,8,["modelValue"])]),_:1}),e(r),e(M,{modelValue:n.file,"onUpdate:modelValue":o[7]||(o[7]=a=>n.file=a),label:"Upload"},null,8,["modelValue"])]),_:1}),e($,null,{default:l(()=>[R]),_:1}),e(f,{class:"md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto","is-form":"","is-hoverable":"",onSubmit:w(U,["prevent"])},{footer:l(()=>[e(d,{label:"Trigger",type:"submit",color:"info"})]),default:l(()=>[e(N,{color:p[u.value],"is-placed-with-header":y.value},{default:l(()=>[S("span",null,[S("b",Y,T(p[u.value]),1),z])]),_:1},8,["color","is-placed-with-header"]),e(s,{label:"Fields"},{default:l(()=>[e(i,{modelValue:t.name,"onUpdate:modelValue":o[8]||(o[8]=a=>t.name=a),"icon-left":m(v),help:"Your full name",placeholder:"Name"},null,8,["modelValue","icon-left"])]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1}))}};export{I as default};