import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-CXnKph_e.js";var r=e(t(),1),i={guide:`_guide_jgwgj_1`,copy:`_copy_jgwgj_16`,routes:`_routes_jgwgj_25`,emblem:`_emblem_jgwgj_43`,nebula:`_nebula_jgwgj_52`,starfield:`_starfield_jgwgj_57`,portal:`_portal_jgwgj_60`,horizon:`_horizon_jgwgj_61`,disk:`_disk_jgwgj_66`,orbitA:`_orbitA_jgwgj_70`,orbitB:`_orbitB_jgwgj_70`,orbitC:`_orbitC_jgwgj_70`,aperture:`_aperture_jgwgj_80`,beacon:`_beacon_jgwgj_87`,signature:`_signature_jgwgj_93`,effigy:`_effigy_jgwgj_96`,"human-emergence":`_human-emergence_jgwgj_1`,revolve:`_revolve_jgwgj_1`,float:`_float_jgwgj_1`,twinkle:`_twinkle_jgwgj_1`,space:`_space_jgwgj_119`,nameY:`_nameY_jgwgj_163`},a=n(),o=`
attribute vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}
`,s=`
precision highp float;
uniform vec2 resolution;
uniform mat2 orbitRotation0;
uniform mat2 orbitRotation1;
uniform mat2 orbitRotation2;
uniform mat2 orbitRotation3;
uniform mat2 orbitRotation4;
uniform mat2 orbitRotation5;
uniform mat2 orbitRotation6;
uniform mat2 orbitRotation7;
uniform float time;
uniform sampler2D david;
uniform float davidReady;
mat2 rotation(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float torus(vec3 p, float radius, float thickness) {
 vec2 q=abs(vec2(length(p.xy)-radius,p.z))-vec2(thickness,thickness*.62);
 return length(max(q,0.))+min(max(q.x,q.y),0.);
}
vec2 geometry(vec3 p) {
 p.xz=orbitRotation0*p.xz;
 p.yz=orbitRotation1*p.yz;
 vec3 a=p; a.yz=orbitRotation2*a.yz; a.xy=orbitRotation3*a.xy;
 vec3 b=p; b.xz=orbitRotation4*b.xz; b.xy=orbitRotation5*b.xy;
 vec3 c=p; c.yz=orbitRotation6*c.yz; c.xz=orbitRotation7*c.xz;
 vec2 d=vec2(torus(a,.94,.053),0.);
 float t=torus(b,.94,.053);
 if(t<d.x)d=vec2(t,1.);
 t=torus(c,.94,.053);
 if(t<d.x)d=vec2(t,2.);
 return d;
}
vec3 material(float id) {
 if(id<.5)return vec3(.18,.43,.66);
 if(id<1.5)return vec3(1.,.72,.055);
 return vec3(1.,.018,.009);
}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
// A classical marble effigy, softly emerging inside the moving throat.
vec4 effigy(vec2 p) {
 p=rotation(.025*sin(time*.17))*p;
 p-=vec2(.008*sin(time*.21),.012);
 p/=.98+.02*sin(time*.16);
 vec2 uv=vec2(p.x/.57+.5,.5-p.y/.57);
 if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)return vec4(0.);
 vec4 sculpture=texture2D(david,uv);
 float emerge=.76+.24*smoothstep(-.55,.65,sin(time*.16));
 sculpture.rgb*=1.10+.08*sin(time*.19);
 sculpture.a*=emerge*davidReady;
 return sculpture;
}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
 vec3 color=vec3(.009,.014,.020);
 vec2 cell=floor(uv*52.);
 float star=step(.987,hash(cell));
 color+=vec3(.25,.32,.38)*star*pow(max(0.,1.-length(fract(uv*52.)-.5)*2.),7.);
 color+=vec3(.015,.022,.03)*exp(-dot(uv,uv)*5.);
 vec3 origin=vec3(.12*sin(time*.09),.12*cos(time*.13),3.65);
 vec3 ray=normalize(vec3(uv*2.8,-3.2));
 float distance=0.,glow=0.;vec2 surface=vec2(1.);
 for(int i=0;i<64;i++){
   vec3 p=origin+ray*distance;
   surface=geometry(p);
   glow+=.0025/(.018+surface.x*surface.x*120.);
   if(surface.x<.0015||distance>6.)break;
   distance+=surface.x*.78;
 }
 if(surface.x<.003){
  vec3 p=origin+ray*distance;
  vec2 e=vec2(.002,0.);
  vec3 normal=normalize(vec3(
    geometry(p+e.xyy).x-geometry(p-e.xyy).x,
    geometry(p+e.yxy).x-geometry(p-e.yxy).x,
    geometry(p+e.yyx).x-geometry(p-e.yyx).x));
  vec3 base=material(surface.y);
  vec3 light=normalize(vec3(-2.,3.,4.));
  float diffuse=max(0.,dot(normal,light));
  vec3 reflection=reflect(ray,normal);
  float spec=pow(max(0.,dot(reflect(-light,normal),-ray)),90.);
  float softbox=pow(max(0.,dot(reflection,normalize(vec3(-.8,1.2,2.)))),18.);
  float strip=pow(max(0.,1.-abs(reflection.y-.38)*5.),12.);
  float fresnel=.35+.65*pow(1.-max(0.,dot(normal,-ray)),5.);
  float rim=pow(1.-max(0.,dot(normal,-ray)),3.);
  float angle=atan(p.y,p.x);
  float engraving=pow(.5+.5*cos(angle*120.),40.);
  float bands=.86-.20*engraving;
  float milling=.96+.04*sin(p.x*430.+p.y*390.);
  color=base*(.22+.85*diffuse)*bands*milling
    +mix(base,vec3(.65,.70,.74),.35)*(softbox*2.6+strip*1.9)*fresnel
    +mix(base,vec3(.85,.88,.90),.48)*spec*3.5+base*rim*.48;
  // Polished precious metal and lacquer: bright highlights, saturated bodies.
  if(surface.y>.5 && surface.y<1.5){
    float glint=pow(max(0.,dot(reflection,normalize(vec3(1.4,.5,2.)))),110.);
    float facets=pow(.5+.5*sin(angle*37.+time*.65),30.);
    color=base*(.48+1.55*diffuse)*bands*milling
      +vec3(1.,.86,.37)*(softbox*4.6+strip*3.4)*fresnel
      +vec3(1.,.98,.83)*(spec*8.+glint*7.)
      +base*rim*1.3+vec3(1.,.94,.64)*facets*rim*1.5;
  } else if(surface.y>1.5){
    color=base*(.40+1.65*diffuse)*bands*milling
      +vec3(1.,.085,.035)*(softbox*3.6+strip*2.6)*fresnel
      +vec3(1.,.83,.76)*spec*5.2+base*rim*.95;
  }


 }
 color+=vec3(.09,.36,.57)*glow*.028;
 // Nested photon rings and helical light traces recede into the central throat.
 float plane=(0.-origin.z)/ray.z;
 vec3 at=origin+ray*plane;
 if(distance>plane){
   float r=length(at.xy);
   float angle=atan(at.y,at.x);
   // Continuous outward radiance, without flashes or extra rendering passes.
   float rays=pow(.5+.5*cos(angle*12.+.2*sin(time*.3)),12.);
   float beam=exp(-r*r*2.8)*(0.28+rays*.7);
   color+=vec3(.65,.86,1.)*beam;
   color+=vec3(1.,.86,.53)*exp(-r*r*5.)*.3;
   float horizon=exp(-pow((r-.395)*58.,2.));
   float corona=exp(-pow((r-.425)*23.,2.));
   color+=vec3(.65,.88,1.)*corona*2.4+vec3(1.,.76,.36)*horizon*3.8;
   if(r<.39){
     float depth=-log(max(r/.39,.008));
     float spin=angle+depth*1.4-time*.65;
     float rings=pow(.5+.5*cos(depth*17.-time*2.4),16.);
     float spiral=pow(.5+.5*cos(spin*7.+depth*5.),22.);
     float fine=pow(.5+.5*sin(spin*23.-depth*7.),28.);
     float fade=smoothstep(.007,.07,r)*(1.-smoothstep(.32,.39,r));
     vec3 tunnel=mix(vec3(.015,.30,.8),vec3(1.,.025,.006),.5+.5*sin(spin+depth*2.));
     vec3 gold=vec3(1.,.60,.18);
     color+=fade*(tunnel*(.25+rings*1.5+spiral*1.1)+gold*fine*.8)/(1.+depth*.22);
     color*=1.-.8*(1.-smoothstep(.008,.025,r));
     color+=vec3(.72,.90,1.)*exp(-r*r*14.)*1.4;
     vec4 human=effigy(at.xy);
     color=mix(color,human.rgb,human.a*.86);
   }
 }
 // Nine solid satellites on three inclined orbital planes.
 for(int i=0;i<9;i++){
   float j=float(i);
   float group=mod(j,3.);
   float planeId=floor(j/3.);
   float angle=time*(.07+planeId*.009)+j*2.399;
   float radius=1.22+mod(planeId,3.)*.12;
   vec3 q=vec3(radius*cos(angle),radius*sin(angle),0.);
   q.yz=rotation(.45+planeId*.59)*q.yz;
   q.xy=rotation(planeId*.47)*q.xy;
   vec2 projected=(q.xy-origin.xy)/(origin.z-q.z)*3.2/2.8;
   vec2 delta=uv-projected;
   float sphereRadius=(.018+mod(j,4.)*.003)/(origin.z-q.z)*3.2;
   float d=length(delta);
   float satelliteDistance=length(q-origin);
   if(satelliteDistance<distance+.12){
     vec3 metal=material(group);
     color+=metal*.000004/(d*d+.0003);
     if(d<sphereRadius){
       vec2 disk=delta/sphereRadius;
       vec3 normal=normalize(vec3(disk,sqrt(max(0.,1.-dot(disk,disk)))));
       vec3 lamp=normalize(vec3(-.6,.7,1.));
       float sheen=pow(max(0.,dot(reflect(-lamp,normal),vec3(0.,0.,1.))),45.);
       color=metal*(.18+.8*max(0.,dot(normal,lamp)))+vec3(.8,.85,.9)*sheen*1.3;
     }
   }
 }
 color=1.-exp(-color*1.30);
 gl_FragColor=vec4(color,1.);
}
`;function c(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let n=t.getContext(`webgl`,{alpha:!1,antialias:!1,powerPreference:`low-power`});if(!n){t.dataset.renderer=`fallback`;return}let r=[];function i(e,i){let a=n.createShader(e);return a?(r.push(a),n.shaderSource(a,i),n.compileShader(a),n.getShaderParameter(a,n.COMPILE_STATUS)?a:(t.dataset.renderer=`shader-error`,console.warn(`Virgilio shader:`,n.getShaderInfoLog(a)),null)):null}let a=i(n.VERTEX_SHADER,o),c=i(n.FRAGMENT_SHADER,s),l=n.createProgram();if(!a||!c||!l){r.forEach(e=>n.deleteShader(e)),l&&n.deleteProgram(l);return}if(n.attachShader(l,a),n.attachShader(l,c),n.linkProgram(l),!n.getProgramParameter(l,n.LINK_STATUS)){r.forEach(e=>n.deleteShader(e)),n.deleteProgram(l);return}n.useProgram(l);let u=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,u),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW);let d=n.getAttribLocation(l,`position`);n.enableVertexAttribArray(d),n.vertexAttribPointer(d,2,n.FLOAT,!1,0,0);let f=n.getUniformLocation(l,`time`),p=Array.from({length:8},(e,t)=>n.getUniformLocation(l,`orbitRotation${t}`)),m=new Float32Array(4),h=n.getUniformLocation(l,`resolution`),g=n.createTexture();n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,g),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),n.uniform1i(n.getUniformLocation(l,`david`),0);let _=n.getUniformLocation(l,`davidReady`),v=new Image;v.crossOrigin=`anonymous`,v.decoding=`async`,v.onload=()=>{n.bindTexture(n.TEXTURE_2D,g),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,v),n.uniform1f(_,1),x&&!document.hidden&&D()},v.src=`https://maxbraghin.github.io/Y-sito-web-compilato/virgilio-poet-front-v2.webp`;let y=matchMedia(`(prefers-reduced-motion: reduce)`),b=0,x=!1,S=0,C=0,w=1,T=()=>{let e=matchMedia(`(pointer: coarse)`).matches;w=Math.max(1,Math.min(e?400:480,Math.round(t.clientWidth*Math.min(devicePixelRatio,1.25)))),t.width!==w&&(t.width=w,t.height=w)},E=[0,0],D=()=>{n.viewport(0,0,w,w),n.uniform2f(h,w,w);let e=C*7;[E[0]*.55,.3+E[1]*.4,e*.56+.64,e*.16,-e*.43+1.04,e*.25+.65,e*.37-.98,-e*.22-.72].forEach((e,t)=>{let r=Math.cos(e),i=Math.sin(e);m[0]=r,m[1]=-i,m[2]=i,m[3]=r,n.uniformMatrix2fv(p[t],!1,m)}),n.uniform1f(f,C*4),n.drawArrays(n.TRIANGLES,0,6),t.dataset.ready=`true`},O=e=>{b=0,!(!x||document.hidden)&&(e-S>=40&&(C+=Math.min(e-S,80)/1e3,S=e,D()),b=requestAnimationFrame(O))},k=()=>{cancelAnimationFrame(b),b=0,S=performance.now(),x&&!document.hidden&&(T(),D(),!y.matches&&!document.documentElement.classList.contains(`y-save-data`)&&(b=requestAnimationFrame(O)))},A=new IntersectionObserver(([e])=>{x=e.isIntersecting,k()});A.observe(t);let j=new ResizeObserver(()=>{x&&(T(),D())});j.observe(t);let M=e=>{let n=t.getBoundingClientRect();E[0]=(e.clientX-n.left)/n.width-.5,E[1]=(e.clientY-n.top)/n.height-.5,y.matches&&D()};return t.addEventListener(`pointermove`,M),document.addEventListener(`visibilitychange`,k),y.addEventListener(`change`,k),()=>{A.disconnect(),j.disconnect(),cancelAnimationFrame(b),t.removeEventListener(`pointermove`,M),document.removeEventListener(`visibilitychange`,k),y.removeEventListener(`change`,k),v.onload=null,n.deleteTexture(g),n.deleteBuffer(u),n.deleteProgram(l),r.forEach(e=>n.deleteShader(e))}},[]),(0,a.jsx)(`canvas`,{ref:e,className:i.space,"aria-hidden":`true`})}export{c as default};