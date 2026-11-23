const WL={
en:"the be of and a to in he have it that for they I with as not on she at by this we you do but from or which one would all will there say who make when can more if no man out other so what time up go about than into could state only new year some take come these know see use get like then first any work now may such give over think most even find day also after way many must look before great back through long where much should well people down own just because good each those feel seem how high too place little world very still nation hand old life tell write become here show house both between need mean call develop under last right move thing general school never same another begin while number part turn real leave might want point form off child few small since against ask late home interest large person end open public follow during present without again hold govern around possible head consider word program problem however lead system set order eye plan run keep face fact group play stand increase early course change help line".split(" "),
uz:"men sen u biz siz ular bu shu qanday nima kim qayer qachon yaxshi katta kichik uy maktab kitob qalam suv non osh gul bola ona ota do'st vaqt kun tun yil oy hafta shahar qishloq yo'l mashina daraxt tog' daryo osmon quyosh yulduz ish o'qish yozish ko'rish bilish aytish borish kelish olish berish yashash sevish kulish o'ynash tez sekin baland past issiq sovuq yangi eski chiroyli bahor yoz kuz qish ko'cha bozor mehmon sovg'a savol javob hayot orzu".split(" ")};
const Q={en:["The quick brown fox jumps over the lazy dog and keeps running through the quiet forest.","Practice makes progress, and every small step forward is better than standing still.","Speed comes naturally when accuracy is built first, one careful keystroke at a time."],
uz:["Ilm olish har bir insonning burchi, bilim esa eng katta boylikdir.","Yaxshi so'z jon ozig'i, yomon so'z esa jon qozig'i bo'lib qoladi.","Tez yozish uchun avval aniq yozishni o'rganing, tezlik o'zi keladi."]};
const $=id=>document.getElementById(id);
let S={mode:"time",time:15,words:25,punct:false,nums:false,lang:"en",stop:"off",diff:"normal",caret:"line",smooth:true,live:true,kb:true,hl:true,sound:true,blind:false,size:1};
try{Object.assign(S,JSON.parse(localStorage.getItem("tt-set")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("tt-set",JSON.stringify(S))}catch(e){}};
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

/* keyboard */
const MAP={"`":"Backquote","-":"Minus","=":"Equal","[":"BracketLeft","]":"BracketRight","\\":"Backslash",";":"Semicolon","'":"Quote",",":"Comma",".":"Period","/":"Slash"," ":"Space"};
const SH={"~":"`","!":"1","@":"2","#":"3","$":"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0","_":"-","+":"=","{":"[","}":"]","|":"\\",":":";",'"':"'","<":",",">":".","?":"/"};
const codeOf=c=>{c=SH[c]||c;if(/[a-z]/i.test(c))return"Key"+c.toUpperCase();if(/\d/.test(c))return"Digit"+c;return MAP[c]};
const needShift=c=>/[A-Z]/.test(c)||c in SH;
const ROWS=[["`~","1!","2@","3#","4$","5%","6^","7&","8*","9(","0)","-_","=+",["Backspace","Backspace",2]],
[["Tab","Tab",1.5],..."QWERTYUIOP".split(""),"[{","]}",["\\|","Backslash",1.5]],
[["Caps","CapsLock",1.8],..."ASDFGHJKL".split(""),";:","'\"",["Enter","Enter",2.2]],
[["Shift","ShiftLeft",2.3],..."ZXCVBNM".split(""),",<",".>","/?",["Shift","ShiftRight",2.7]],
[["Ctrl","ControlLeft",1.3],["Win","MetaLeft",1.3],["Alt","AltLeft",1.3],["Space","Space",6.5],["Alt","AltRight",1.3],["Menu","ContextMenu",1.3],["Ctrl","ControlRight",1.3]]];
const kmap={};
(function(){const kb=$("kb");ROWS.forEach(r=>{const row=document.createElement("div");row.className="row";
 r.forEach(a=>{const k=document.createElement("div");k.className="k";let code;
  if(Array.isArray(a)){k.textContent=a[0];code=a[1];k.classList.add("x");k.style.setProperty("--w",a[2]);if(/Enter|Backspace|ShiftR|Space/.test(code))k.classList.add("v")}
  else if(a.length===1){k.textContent=a;code="Key"+a;if("OPLM".includes(a))k.classList.add("v")}
  else{k.textContent=a[1]+"\n"+a[0];k.classList.add("s");code=codeOf(a[0])}
  kmap[code]=k;row.appendChild(k)});kb.appendChild(row)})})();
document.querySelectorAll(".row").forEach(r=>{const ks=[...r.children],W=k=>+k.style.getPropertyValue("--w")||1,tot=ks.reduce((a,k)=>a+W(k),0);let acc=0;ks.forEach(k=>{k.style.setProperty("--p",((acc+W(k)/2)/tot).toFixed(3));acc+=W(k)})});
const flash=(c,cls)=>{const k=kmap[c];if(!k)return;k.classList.add(cls);setTimeout(()=>k.classList.remove(cls),130)};

/* settings UI */
const grp=(l,k,o)=>`<div class="grp"><span>${l}</span>${o.map(([t,v])=>`<button data-k="${k}" data-v='${JSON.stringify(v)}' class="${S[k]===v?"on":""}">${t}</button>`).join("")}</div>`;
const THEMES=[["neon","Neon","#1fa8ff","#8a4dff"],["sunset","Olov","#ff8a1f","#ff2d78"],["emerald","Zumrad","#16e0a0","#0aa3c9"],["sakura","Pushti","#ff4fd8","#9b4dff"],["purple","Binafsha","#a05bff","#5b5bff"],["gold","Oltin","#ffc32b","#ff8c1a"]];
const SW=()=>`<div class="grp"><span>Rang</span>${THEMES.map(t=>`<button class="sw ${(S.theme||"neon")===t[0]?"on":""}" data-k="theme" data-v='"${t[0]}"' title="${t[1]}" aria-label="${t[1]}" style="--s1:${t[2]};--s2:${t[3]}"></button>`).join("")}<input class="cp ${S.theme==="custom"?"on":""}" type="color" data-col title="O'z rangingiz" value="${S.custom||"#a05bff"}"></div>`;
const onoff=[["yoq",false],["ha",true]];
function build(){
 const am=S.mode==="time"?grp("Soniya","time",[[15,15],[30,30],[60,60],[120,120]])+`<div class="grp"><input class="cu" type="number" min="1" max="3600" placeholder="boshqa" data-c="time"></div>`
  :S.mode==="words"?grp("So'z soni","words",[[10,10],[25,25],[50,50],[100,100]])+`<div class="grp"><input class="cu" type="number" min="1" max="500" placeholder="boshqa" data-c="words"></div>`:"";
 $("tools").innerHTML=grp("Rejim","mode",[["vaqt","time"],["so'zlar","words"],["iqtibos","quote"]])+am+
  (S.mode==="quote"?"":grp("Qo'shimcha","punct",[["@ belgilar",!S.punct]]).replace(/class="">/,`class="${S.punct?"on":""}">`)+grp("","nums",[["# raqam",!S.nums]]).replace(/class="">/,`class="${S.nums?"on":""}">`))+
  grp("Til","lang",[["English","en"],["O'zbekcha","uz"]])+SW()+`<button id="gear">⚙ Sozlamalar</button>`;
 $("adv").innerHTML=grp("Qiyinlik","diff",[["oddiy","normal"],["expert","expert"],["master","master"]])+
  grp("Xatoda to'xtash","stop",[["o'chiq","off"],["harf","letter"],["so'z","word"]])+
  grp("Kursor","caret",[["chiziq","line"],["blok","block"],["tagchiziq","under"],["yo'q","off"]])+
  grp("Silliq kursor","smooth",onoff)+grp("Jonli statistika","live",onoff)+grp("Klaviatura","kb",onoff)+
  grp("Keyingi tugma","hl",onoff)+grp("Tovush","sound",onoff)+grp("Ko'r rejim","blind",onoff)+
  grp("Shrift","size",[["kichik",.8],["o'rta",1],["katta",1.25],["juda katta",1.5]]);
 if(adv)$("adv").classList.add("show");
 view()}
let adv=false;
function view(){const R=document.documentElement;R.dataset.theme=S.theme||"neon";
 const P=["blue","violet","cyan","green","ok","bg","bg1","bg2","bg3","pan1","pan2","dim","mut"];
 if(S.theme==="custom"){const h=S.custom||"#a05bff",m=(p,c)=>`color-mix(in srgb,${h} ${p}%,${c})`,V={blue:h,violet:m(60,"#6a4dff"),cyan:m(55,"#fff"),green:m(70,"#fff"),ok:m(75,"#fff"),bg:m(6,"#000"),bg1:m(35,"#000"),bg2:m(30,"#000"),bg3:m(38,"#000"),pan1:m(12,"#000"),pan2:m(7,"#000"),dim:m(45,"#000"),mut:m(45,"#fff")};P.forEach(p=>R.style.setProperty("--"+p,V[p]))}
 else P.forEach(p=>R.style.removeProperty("--"+p));document.body.classList.toggle("nokb",!S.kb);document.body.classList.toggle("nolive",!S.live);
 document.documentElement.style.setProperty("--sc",S.size);
 const c=$("caret");if(c){c.className=(S.smooth?"smooth ":"")+(S.caret==="block"?"block":S.caret==="under"?"under":"")}}
document.addEventListener("click",e=>{
 if(e.target.id==="gear"){adv=!adv;$("adv").classList.toggle("show",adv);return}
 const b=e.target.closest("button[data-k]");if(!b)return;const k=b.dataset.k,v=JSON.parse(b.dataset.v);
 S[k]=v;save();build();if(["mode","time","words","punct","nums","lang"].includes(k))reset();else{view();paint(wi);mark()}b.blur()});
document.addEventListener("input",e=>{if(e.target.dataset&&e.target.dataset.col!==undefined){S.theme="custom";S.custom=e.target.value;save();view();paint(wi);mark()}});
document.addEventListener("change",e=>{if(e.target.dataset&&e.target.dataset.col!==undefined)build()});
document.addEventListener("change",e=>{const c=e.target.dataset&&e.target.dataset.c;if(!c)return;const v=Math.max(1,Math.min(3600,+e.target.value|0));if(v){S[c]=v;save();build();reset()}});

/* engine */
let words=[],wEls=[],typed=[],cur="",wi=0,started=false,done=false,t0=0,tick=null,keys=0,okKeys=0,samples=[],lastRaw=0;
function gen(n){const L=WL[S.lang],o=[];
 for(let i=0;i<n;i++){let w=L[Math.random()*L.length|0];
  if(S.nums&&Math.random()<.12)w=String(Math.random()*(Math.random()<.5?100:10000)|0);
  else if(S.punct){if(i===0||/[.?!]$/.test(o[i-1]))w=w[0].toUpperCase()+w.slice(1);const r=Math.random();if(r<.08)w+=",";else if(r<.14)w+=".";else if(r<.16)w+="?";else if(r<.18)w+="!"}
  o.push(w)}
 return o}
function addW(i){const d=document.createElement("div");d.className="w";d.innerHTML=[...words[i]].map(c=>`<span>${esc(c)}</span>`).join("");$("txt").appendChild(d);wEls[i]=d}
function render(){$("txt").innerHTML='<i id="caret"></i>';wEls=[];words.forEach((_,i)=>addW(i));view()}
function paint(i){const w=words[i];if(!w||!wEls[i])return;const inp=i<wi?typed[i]:i===wi?cur:"";let h="";
 for(let j=0;j<w.length;j++){let c="";if(j<inp.length)c=(inp[j]===w[j]||S.blind)?"ok":"bad";else if(i<wi)c="miss";h+=`<span class="${c}">${esc(w[j])}</span>`}
 for(let j=w.length;j<inp.length;j++)h+=`<span class="extra">${esc(inp[j])}</span>`;
 wEls[i].innerHTML=h;wEls[i].classList.toggle("err",i<wi&&inp!==w&&!S.blind)}
function mark(){
 const w=wEls[wi];if(!w)return;
 const lh=parseFloat(getComputedStyle($("txt")).lineHeight)||60;
 $("txt").style.transform=`translateY(${-Math.max(0,w.offsetTop-lh)}px)`;
 const c=$("caret");if(S.caret==="off"||done){c.style.display="none"}else{
  const ch=w.children,t=$("txt").getBoundingClientRect(),end=cur.length>=ch.length,r=ch[end?ch.length-1:cur.length].getBoundingClientRect();
  const x=end?r.right:r.left;c.style.display="block";c.style.transform=`translate(${x-t.left}px,${r.top-t.top}px)`;
  c.style.height=S.caret==="under"?"3px":r.height+"px";c.style.marginTop=S.caret==="under"?r.height-3+"px":"0";
  c.style.width=S.caret==="line"?"3px":(r.width||14)+"px"}
 document.querySelectorAll(".k.nx").forEach(k=>k.classList.remove("nx"));
 if(S.hl&&!done){const n=words[wi][cur.length]??" ";if(kmap[codeOf(n)])kmap[codeOf(n)].classList.add("nx");if(needShift(n))kmap.ShiftLeft.classList.add("nx")}}
const fmt=s=>String(s/60|0).padStart(2,"0")+":"+String(Math.max(0,s)%60|0).padStart(2,"0");
function counts(){let cc=0,raw=0;for(let i=0;i<wi;i++){const w=words[i],t=typed[i];raw+=t.length+1;if(t===w)cc+=w.length+1}
 raw+=cur.length;if(words[wi]&&words[wi].startsWith(cur))cc+=cur.length;return{cc,raw}}
function stats(el){const{cc,raw}=counts(),m=Math.max(el,.001)/60,wpm=el>0?Math.round(cc/5/m):0,acc=keys?Math.round(okKeys/keys*100):100;
 $("wpm").textContent=wpm;$("acc").textContent=acc+"%";
 $("wa").setAttribute("stroke-dasharray",Math.min(100,wpm/150*100)+" 100");$("aa").setAttribute("stroke-dasharray",acc+" 100");$("nd").style.transform=`rotate(${Math.min(1,wpm/150)*180}deg)`;dot("ad",acc/100);
 return{wpm,acc,raw,rawW:Math.round(raw/5/m)}}
(function(){let h="";for(let i=0;i<=30;i++){const a=Math.PI*(1-i/30),M=i%5===0,r1=M?92:98,c=Math.cos(a),n=Math.sin(a);h+=`<line x1="${150+r1*c}" y1="${172-r1*n}" x2="${150+106*c}" y2="${172-106*n}" stroke-width="${M?2.5:1.2}"/>`;if(M)h+=`<text x="${150+77*c}" y="${172-77*n+3}" text-anchor="middle">${i*5}</text>`}$("wt").innerHTML=h})();
function dot(id,p){const a=Math.PI*(1-p),e=$(id);e.setAttribute("cx",150+120*Math.cos(a));e.setAttribute("cy",172-120*Math.sin(a))}
function reset(){
 clearInterval(tick);wi=0;cur="";typed=[];started=done=false;keys=okKeys=0;samples=[];lastRaw=0;
 words=S.mode==="quote"?Q[S.lang][Math.random()*Q[S.lang].length|0].split(" "):gen(S.mode==="time"?100:S.words);
 render();$("res").classList.remove("show");stats(0);$("hint").style.opacity=1;
 $("tr").textContent=S.mode==="time"?fmt(S.time):"00:00";$("pb").style.width="0";$("pp").textContent="0%";mark()}
function begin(){started=true;t0=performance.now();$("hint").style.opacity=0;tick=setInterval(frame,100)}
function frame(){const el=(performance.now()-t0)/1000,s=stats(el);
 while(samples.length<Math.floor(el)){samples.push({w:s.wpm,r:Math.round((s.raw-lastRaw)*12)});lastRaw=s.raw}
 let p;if(S.mode==="time"){if(el>=S.time)return finish(false);$("tr").textContent=fmt(Math.ceil(S.time-el));p=el/S.time}
 else{$("tr").textContent=fmt(Math.floor(el));p=wi/words.length}
 p=Math.min(1,p);$("pb").style.width=p*100+"%";$("pp").textContent=Math.round(p*100)+"%"}
function finish(failed){
 if(done)return;done=true;clearInterval(tick);
 const el=S.mode==="time"&&!failed?S.time:Math.max(1,(performance.now()-t0)/1000),s=stats(el);
 let ci=0,ii=0,ex=0,ms=0;
 for(let i=0;i<=wi&&words[i];i++){const w=words[i],t=i<wi?typed[i]:cur;for(let j=0;j<Math.max(w.length,t.length);j++){if(j>=w.length)ex++;else if(j>=t.length){if(i<wi)ms++}else if(t[j]===w[j])ci++;else ii++}}
 const ws=samples.map(x=>x.w),mean=ws.reduce((a,b)=>a+b,0)/(ws.length||1),sd=Math.sqrt(ws.reduce((a,b)=>a+(b-mean)**2,0)/(ws.length||1)),cons=ws.length>1&&mean?Math.max(0,Math.round(100-sd/mean*100)):100;
 $("rt").textContent=failed?"Muvaffaqiyatsiz":"Natija";
 $("rm").textContent=`${S.mode==="time"?"vaqt "+S.time:S.mode==="words"?"so'zlar "+S.words:"iqtibos"} · ${S.lang==="en"?"english":"o'zbekcha"} · ${S.diff}`;
 $("rw").textContent=s.wpm;$("ra").textContent=s.acc+"%";$("rr").textContent=s.rawW;$("rc").textContent=`${ci}/${ii}/${ex}/${ms}`;$("rs").textContent=Math.round(el)+"s";$("rk").textContent=cons+"%";
 const mx=Math.max(10,...samples.map(x=>Math.max(x.w,x.r))),n=Math.max(1,samples.length-1),pt=k=>samples.map((x,i)=>`${i/n*380+10},${110-x[k]/mx*100}`).join(" ");
 $("chart").innerHTML=samples.length>1?`<polyline points="${pt("r")}" fill="none" style="stroke:var(--violet)" stroke-width="2" vector-effect="non-scaling-stroke"/><polyline points="${pt("w")}" fill="none" style="stroke:var(--green)" stroke-width="3" vector-effect="non-scaling-stroke"/>`:"";
 mark();$("res").classList.add("show");setTimeout(()=>$("again").focus(),50);beep(880,.15)}
let ac;function beep(f,d){if(!S.sound)return;try{ac=ac||new AudioContext();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;o.type="triangle";g.gain.value=.04;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(e){}}
function more(){const s=words.length;gen(60).forEach(w=>words.push(w));for(let i=s;i<words.length;i++)addW(i)}
function letter(ch){const w=words[wi],exp=w[cur.length],ok=ch===exp;keys++;
 if(ok)okKeys++;else{flash(codeOf(ch),"err");beep(180,.07);if(S.diff==="master")return finish(true);if(S.stop==="letter"&&exp!==undefined)return}
 if(ok)beep(520,.04);
 if(cur.length>=w.length+15)return;
 cur+=ch;paint(wi);
 if(S.mode!=="time"&&wi===words.length-1&&cur.length>=w.length){typed[wi]=cur;wi++;if(S.diff!=="normal"&&cur!==w)return finish(true);return finish(false)}
 mark()}
function space(){if(!cur)return;const w=words[wi],ok=cur===w;if(S.stop==="word"&&!ok)return;keys++;if(ok)okKeys++;
 if(!ok&&S.diff!=="normal")return finish(true);
 typed[wi]=cur;cur="";wi++;paint(wi-1);if(S.mode==="time"&&wi>words.length-25)more();
 if(S.mode!=="time"&&wi>=words.length)return finish(false);mark()}
function back(){if(cur)cur=cur.slice(0,-1);else if(wi>0&&typed[wi-1]!==words[wi-1]&&S.stop!=="word"){wi--;cur=typed[wi];typed[wi]=undefined;paint(wi+1)}else return;paint(wi);mark()}
document.addEventListener("keydown",e=>{
 if(e.target.tagName==="INPUT")return;
 if(e.key==="Tab"||e.key==="Escape"||(e.key==="Enter"&&done)){e.preventDefault();reset();return}
 flash(e.code,"hit");
 if(e.key===" ")e.preventDefault();
 if(done||e.ctrlKey||e.metaKey||e.altKey)return;
 if(e.key==="Backspace"){e.preventDefault();back();return}
 if(e.key.length!==1)return;e.preventDefault();
 if(!started)begin();
 e.key===" "?space():letter(e.key)});
$("again").onclick=reset;$("box").addEventListener("click",()=>$("box").focus());
window.addEventListener("resize",mark);
build();reset();
