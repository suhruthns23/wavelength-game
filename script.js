/* =========================================================
   WAVELENGTH V2 — COMPACT SCRIPT
   ========================================================= */

const topics=[
["Hot","Cold"],["Healthy","Unhealthy"],["Popular","Unpopular"],
["Good movie","Bad movie"],["Easy to cook","Difficult to cook"],
["Overrated","Underrated"],["For kids","For adults"],["Legal","Illegal"],
["Good habit","Bad habit"],["Cheap","Expensive"],["Safe","Dangerous"],
["Fast","Slow"],["Easy","Hard"],["Loud","Quiet"],["Clean","Dirty"],
["Cute","Scary"],["Useful","Useless"],["Soft","Hard"],["Sweet","Savory"],
["Sweet","Sour"],["Light","Heavy"],["Strong","Weak"],["Simple","Complex"],
["Boring","Exciting"],["Bright","Dark"],["Smells good","Smells bad"],
["Small","Huge"],["Old","New"],["Modern","Traditional"],["Fun","Unfun"],
["High quality","Low quality"],["Comfortable","Uncomfortable"],
["Common","Rare"],["High effort","Low effort"],["High stress","Low stress"],
["Rich","Poor"],["Polite","Rude"],["Fair","Unfair"],
["Important","Unimportant"],["Normal","Weird"],["Real","Fake"],
["True","False"],["Temporary","Permanent"],["Natural","Artificial"],
["Smooth","Rough"],["Short","Long"],["Near","Far"],["Early","Late"],
["Dry","Wet"],["Fresh","Stale"],["Clean job","Dirty job"],
["Good smell","Bad smell"],["Good music","Bad music"],
["Good superpower","Bad superpower"],["Good gift","Bad gift"],
["Good pet","Bad pet"],["Good advice","Bad advice"],["Good idea","Bad idea"],
["High tech","Low tech"],["High risk","Low risk"],
["Early morning","Late night"],["Indoor","Outdoor"],["Public","Private"],
["Fragile","Unbreakable"],["Calm","Chaotic"],["Mainstream","Niche"],
["Overpaid","Underpaid"],["Overplayed","Underplayed"],
["Overcooked","Undercooked"],["Overdressed","Underdressed"],
["Healthy snack","Unhealthy snack"],["Easy chore","Hard chore"],
["Easy job","Hard job"],["Easy language","Hard language"],
["Easy sport","Hard sport"],["Useful talent","Useless talent"],
["Useful subject","Useless subject"],["Essential item","Luxury item"],
["Solitary activity","Social activity"],["Physical activity","Mental activity"],
["Urban","Rural"],["Modern music","Old music"],["Sad","Happy"],
["Friendly","Unfriendly"],["Harmless","Harmful"],["Relaxing","Stressful"],
["Serious","Playful"],["Traditional food","Modern food"],["Messy","Neat"],
["Predictable","Unpredictable"],["Ethical","Unethical"],
["Skill-based","Luck-based"],["Tastes good","Tastes bad"],
["Feels good","Feels bad"],["Looks good","Looks bad"],
["Sounds good","Sounds bad"],["Best decade","Worst decade"],
["Best season","Worst season"],
["Best day of the week","Worst day of the week"],
["Best feeling","Worst feeling"]
];

const extraTopics=[
["Day","Night"],["Big","Small"],["Fast","Slow"],["Near","Far"],
["Hot","Cold"],["Young","Old"],["Cheap","Expensive"],["Easy","Difficult"],
["Happy","Sad"],["Funny","Serious"],["Beautiful","Ugly"],["Strong","Weak"],
["Heavy","Light"],["Wet","Dry"],["Bright","Dark"],["Open","Closed"],
["Full","Empty"],["Clean","Dirty"],["Safe","Dangerous"],["Good","Bad"],
["Like","Dislike"],["Love","Hate"],["Useful","Useless"],["Quiet","Noisy"],
["Soft","Hard"],["Simple","Complicated"],["Old-fashioned","Modern"],
["Healthy","Unhealthy"],["Relaxing","Stressful"],["Popular","Unknown"],
["Funny movie","Serious movie"],["Good food","Bad food"],
["Good place","Bad place"],["Good friend","Bad friend"],
["Easy game","Hard game"],["Easy subject","Hard subject"],
["Good phone","Bad phone"],["Good app","Bad app"],["Good day","Bad day"],
["Good weather","Bad weather"],["Good smell","Bad smell"],
["Good sound","Bad sound"],["Good design","Bad design"],
["Good photo","Bad photo"],["Good idea","Bad idea"],
["Fun activity","Boring activity"],["Good holiday","Bad holiday"],
["Good trip","Bad trip"],["Good teacher","Bad teacher"],
["Good student","Bad student"],["Easy decision","Difficult decision"],
["Useful invention","Useless invention"],
["Good superpower","Bad superpower"],["Good gift","Bad gift"],
["Good pet","Bad pet"],["Good job","Bad job"],["Good advice","Bad advice"],
["Good choice","Bad choice"],["Good habit","Bad habit"],
["Good morning","Bad morning"],["Good night","Bad night"]
];

const allTopics=[...topics,...extraTopics];

let game={
 rounds:5,currentRound:1,sides:[],currentSideIndex:0,
 targetAngle:0,guessAngle:0,topic:null,topicIndex:-1,
 topicHistory:[],targetHistory:[],revealed:false,roundFinished:false
};

let sideId=0,draggingNeedle=false;

document.addEventListener("DOMContentLoaded",()=>showScreen("homeScreen"));

function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 const e=document.getElementById(id);
 if(e)e.classList.add("active");
}

function playGame(){showSetup()}

function showSetup(){
 showScreen("setupScreen");
 if(!game.sides.length)game.sides=[createSide(),createSide()];
 renderSides();selectRounds(5);
}

function createSide(){
 return{id:++sideId,players:[""],teamName:"",score:0};
}

function addSide(){
 game.sides.push(createSide());renderSides();
}

function removeSide(i){
 if(game.sides.length<=2)return alert("You need at least 2 sides.");
 game.sides.splice(i,1);renderSides();
}

function changePlayerCount(i,change){
 const s=game.sides[i];
 let n=Math.max(1,Math.min(10,s.players.length+change));
 while(s.players.length<n)s.players.push("");
 while(s.players.length>n)s.players.pop();
 if(n===1)s.teamName="";
 renderSides();
}

function renderSides(){
 const c=document.getElementById("sidesContainer");
 if(!c)return;
 c.innerHTML="";

 game.sides.forEach((s,i)=>{
  const card=document.createElement("div");
  card.className="side-card";

  let players=s.players.map((p,j)=>`
    <input class="player-input" type="text"
    placeholder="Player ${j+1} name"
    value="${escapeHTML(p)}"
    onchange="updatePlayer(${i},${j},this.value)">
  `).join("");

  let team=s.players.length>1?`
    <div class="team-name-label">TEAM NAME</div>
    <input class="team-name-input" type="text"
    placeholder="Example: AS"
    value="${escapeHTML(s.teamName)}"
    onchange="updateTeamName(${i},this.value)">
  `:"";

  card.innerHTML=`
    <div class="side-header">
      <span class="side-number">SIDE ${i+1}</span>
      <button class="remove-side" onclick="removeSide(${i})">✕</button>
    </div>
    <div class="player-count">
      <button onclick="changePlayerCount(${i},-1)">−</button>
      <span>${s.players.length} ${s.players.length===1?"PLAYER":"PLAYERS"}</span>
      <button onclick="changePlayerCount(${i},1)">+</button>
    </div>
    ${team}${players}
  `;
  c.appendChild(card);
 });

 const count=document.getElementById("sideCount");
 if(count)count.textContent=`${game.sides.length} sides`;
}

function updatePlayer(i,j,v){game.sides[i].players[j]=v.trim()}
function updateTeamName(i,v){game.sides[i].teamName=v.trim()}

function selectRounds(n){
 game.rounds=Math.max(1,Math.min(100,Number(n)));
 setText("roundDisplay",game.rounds);
 document.querySelectorAll("[data-round]").forEach(b=>
  b.classList.toggle("selected",Number(b.dataset.round)===game.rounds)
 );
 const c=document.getElementById("customRounds");
 if(c)c.value="";
}

function setCustomRounds(){
 const e=document.getElementById("customRounds");
 if(!e)return;
 const n=Number(e.value);
 if(!n||n<1)return;
 game.rounds=Math.min(100,Math.floor(n));
 setText("roundDisplay",game.rounds);
 document.querySelectorAll("[data-round]").forEach(b=>b.classList.remove("selected"));
}

function startGame(){
 if(game.sides.length<2)return alert("Add at least 2 sides.");

 for(const s of game.sides){
  if(s.players.some(p=>!p.trim()))
   return alert("Please enter every player name.");
  if(s.players.length>1&&!s.teamName.trim())
   return alert("A side with multiple players needs a team name.");
 }

 game.currentRound=1;
 game.currentSideIndex=0;
 game.topicHistory=[];
 game.targetHistory=[];
 game.topic=null;
 game.topicIndex=-1;
 game.sides.forEach(s=>s.score=0);
 startRound();
}

function startRound(){
 game.revealed=false;
 game.roundFinished=false;
 game.guessAngle=0;
 chooseRandomTopic();
 chooseRandomTarget();

 const s=game.sides[game.currentSideIndex];
 updateTurnInformation(s);
 showScreen("clueScreen");
 setTimeout(drawClueCanvas,80);
}

function chooseRandomTopic(){
 let available=allTopics.map((_,i)=>i)
  .filter(i=>!game.topicHistory.includes(i));

 if(!available.length){
  game.topicHistory=[];
  available=allTopics.map((_,i)=>i);
 }

 game.topicIndex=available[Math.floor(Math.random()*available.length)];
 game.topic=allTopics[game.topicIndex];
 game.topicHistory.push(game.topicIndex);
}

function chooseRandomTarget(){
 let n;
 do{n=Math.floor(Math.random()*161)-80}
 while(game.targetHistory.includes(n));
 game.targetHistory.push(n);
 game.targetAngle=n;
}

function updateTurnInformation(s){
 const name=getSideDisplayName(s);
 setText("clueTeamName",name);
 setText("cluePlayers",s.players.join(" • "));
 setText("guessTeamName",name);

 ["clueRound","guessRound"].forEach(id=>setText(id,game.currentRound));
 ["totalRounds","guessTotal"].forEach(id=>setText(id,game.rounds));

 const [a,b]=game.topic;
 setText("topicText",`${a}  ↔  ${b}`);
 ["leftTopic","guessLeftTopic","resultLeftTopic"].forEach(id=>setText(id,a));
 ["rightTopic","guessRightTopic","resultRightTopic"].forEach(id=>setText(id,b));

 setText("clueRole","CLUE MASTER");
 setText("guessRole","GUESSER");
}

function getSideDisplayName(s){
 return s.players.length===1?s.players[0]:s.teamName;
}

function setText(id,value){
 const e=document.getElementById(id);
 if(e)e.textContent=value;
}

function escapeHTML(v){
 return String(v)
  .replace(/&/g,"&amp;")
  .replace(/</g,"&lt;")
  .replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;")
  .replace(/'/g,"&#039;");
}


/* ================= CANVAS ================= */

function setupCanvas(canvas){
 const r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;
 const w=r.width,h=w*.55;
 canvas.width=w*d;canvas.height=h*d;
 const ctx=canvas.getContext("2d");
 ctx.setTransform(d,0,0,d,0,0);
 return{ctx,width:w,height:h};
}

function angleToPoint(cx,cy,r,a){
 a=(a-90)*Math.PI/180;
 return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};
}

function normalizeAngle(a){
 while(a>180)a-=360;
 while(a<-180)a+=360;
 return a;
}

function drawWave(canvas,target,needle,showTarget,showNeedle){
 if(!canvas)return;
 const {ctx,width,height}=setupCanvas(canvas);
 ctx.clearRect(0,0,width,height);

 const cx=width/2,cy=height-15;
 const r=Math.min(width*.46,height*1.55);

 drawBaseWave(ctx,cx,cy,r);

 if(showTarget)drawTargetZones(ctx,cx,cy,r,target);
 if(showNeedle)drawNeedle(ctx,cx,cy,r,needle);

 drawCenterHub(ctx,cx,cy);
}

function drawBaseWave(ctx,cx,cy,r){
 ctx.beginPath();
 ctx.moveTo(cx-r,cy);
 ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
 ctx.closePath();
 ctx.fillStyle="#AAB5C4";
 ctx.fill();
}

function drawTargetZones(ctx,cx,cy,r,target){
 drawAngleBand(ctx,cx,cy,r,target,0,2.5,"#39D98A");
 drawAngleBand(ctx,cx,cy,r,target,2.5,7.5,"#FFD34E");
 drawAngleBand(ctx,cx,cy,r,target,7.5,12.5,"#FF9F43");
 drawAngleBand(ctx,cx,cy,r,target,12.5,17.5,"#FF5B63");
}

function drawAngleBand(ctx,cx,cy,r,c,inner,outer,color){
 drawWedge(ctx,cx,cy,r,c-outer,c-inner,color);
 drawWedge(ctx,cx,cy,r,c+inner,c+outer,color);
}

function drawWedge(ctx,cx,cy,r,a1,a2,color){
 ctx.beginPath();
 ctx.moveTo(cx,cy);
 ctx.arc(cx,cy,r,(a1-90)*Math.PI/180,(a2-90)*Math.PI/180);
 ctx.closePath();
 ctx.fillStyle=color;
 ctx.fill();
}

function drawNeedle(ctx,cx,cy,r,a){
 const p=angleToPoint(cx,cy,r*.96,a);
 ctx.beginPath();
 ctx.moveTo(cx,cy);
 ctx.lineTo(p.x,p.y);
 ctx.lineWidth=7;
 ctx.lineCap="round";
 ctx.strokeStyle="#FF3F52";
 ctx.stroke();

 ctx.beginPath();
 ctx.arc(p.x,p.y,5,0,Math.PI*2);
 ctx.fillStyle="#FF3F52";
 ctx.fill();
}

function drawCenterHub(ctx,cx,cy){
 ctx.beginPath();
 ctx.arc(cx,cy,9,0,Math.PI*2);
 ctx.fillStyle="#FF3F52";
 ctx.fill();

 ctx.beginPath();
 ctx.arc(cx,cy,3,0,Math.PI*2);
 ctx.fillStyle="#FFF";
 ctx.fill();
}


/* ================= CLUE / GUESS ================= */

function drawClueCanvas(){
 const c=document.getElementById("waveCanvas");
 drawWave(c,game.targetAngle,0,true,false);
}

function hideTarget(){
 game.revealed=false;
 game.guessAngle=0;
 showScreen("guessScreen");
 setTimeout(()=>{
  drawGuessCanvas();
  enableNeedleDragging();
 },80);
}

function drawGuessCanvas(){
 const c=document.getElementById("guessCanvas");
 drawWave(c,game.targetAngle,game.guessAngle,false,true);
}

function enableNeedleDragging(){
 const c=document.getElementById("guessCanvas");
 if(!c)return;

 c.onpointerdown=e=>{
  if(game.roundFinished)return;
  draggingNeedle=true;
  try{c.setPointerCapture(e.pointerId)}catch(_){}
  updateNeedleFromPointer(e);
 };

 c.onpointermove=e=>{
  if(draggingNeedle)updateNeedleFromPointer(e);
 };

 c.onpointerup=()=>draggingNeedle=false;
 c.onpointercancel=()=>draggingNeedle=false;
}

function updateNeedleFromPointer(e){
 const c=document.getElementById("guessCanvas");
 if(!c)return;

 const r=c.getBoundingClientRect();
 const x=e.clientX-r.left,y=e.clientY-r.top;
 const cx=r.width/2,cy=r.height-15;

 let a=Math.atan2(x-cx,-(y-cy))*180/Math.PI;
 a=Math.max(-89,Math.min(89,a));

 game.guessAngle=a;
 drawGuessCanvas();
}


/* ================= SCORING ================= */

function calculatePoints(target,guess){
 const d=Math.abs(normalizeAngle(target-guess));
 if(d<=2.5)return 4;
 if(d<=7.5)return 3;
 if(d<=12.5)return 2;
 if(d<=17.5)return 1;
 return 0;
}

function revealTarget(){
 if(game.roundFinished)return;

 game.roundFinished=true;
 draggingNeedle=false;

 const points=calculatePoints(game.targetAngle,game.guessAngle);
 const s=game.sides[game.currentSideIndex];
 s.score+=points;

 setText("resultTeam",getSideDisplayName(s));
 setText("pointsEarned",points);

 const messages={
  4:"🎯 PERFECT HIT!",
  3:"🔥 AMAZING GUESS!",
  2:"👍 NICE GUESS!",
  1:"😅 JUST INSIDE!",
  0:"💀 OUTSIDE THE TARGET!"
 };

 setText("resultMessage",messages[points]);
 renderScores("resultScores");
 showScreen("resultScreen");
 setTimeout(drawResultCanvas,80);
}

function skipQuestion(){
 if(game.roundFinished)return;

 game.roundFinished=true;
 const s=game.sides[game.currentSideIndex];

 setText("resultTeam",getSideDisplayName(s));
 setText("pointsEarned","0");
 setText("resultMessage","⏭️ QUESTION SKIPPED");

 renderScores("resultScores");
 showScreen("resultScreen");
 setTimeout(drawResultCanvas,80);
}

function drawResultCanvas(){
 const c=document.getElementById("resultCanvas");
 drawWave(c,game.targetAngle,game.guessAngle,true,true);
}


/* ================= ROUNDS ================= */

function nextRound(){
 if(game.currentRound>=game.rounds){
  showGameOver();
  return;
 }

 game.currentRound++;
 game.currentSideIndex=
  (game.currentSideIndex+1)%game.sides.length;

 startRound();
}


/* ================= SCOREBOARD ================= */

function renderScores(id){
 const c=document.getElementById(id);
 if(!c)return;

 c.innerHTML="";

 [...game.sides]
 .sort((a,b)=>b.score-a.score)
 .forEach((s,i)=>{
  const row=document.createElement("div");
  row.className="score-row";
  row.innerHTML=`
   <span class="score-rank">${i+1}</span>
   <span class="score-name">${escapeHTML(getSideDisplayName(s))}</span>
   <span class="score-points">${s.score}</span>
  `;
  c.appendChild(row);
 });
}

function renderMainScores(){
 renderScores("gameScores");
 renderScores("resultScores");
}

function getWinners(){
 const high=Math.max(...game.sides.map(s=>s.score));
 return game.sides.filter(s=>s.score===high);
}

function getWinnerText(){
 return getWinners().map(getSideDisplayName).join(" & ");
}


/* ================= GAME OVER ================= */

function showGameOver(){
 const winners=getWinners(),text=getWinnerText();

 ["winnerName","gameWinner","finalWinner"]
 .forEach(id=>setText(id,text));

 setText("winnerScore",winners[0].score);
 setText("gameOverRounds",game.rounds);

 renderScores("finalScores");
 renderScores("gameOverScores");

 showScreen("gameOverScreen");
}

function playAgain(){
 game.currentRound=1;
 game.currentSideIndex=0;
 game.topicHistory=[];
 game.targetHistory=[];
 game.topic=null;
 game.topicIndex=-1;
 game.guessAngle=0;
 game.revealed=false;
 game.roundFinished=false;
 game.sides.forEach(s=>s.score=0);
 startRound();
}

function newGame(){
 game={
  rounds:5,currentRound:1,sides:[],currentSideIndex:0,
  targetAngle:0,guessAngle:0,topic:null,topicIndex:-1,
  topicHistory:[],targetHistory:[],revealed:false,roundFinished:false
 };
 sideId=0;
 draggingNeedle=false;
 showSetup();
}

function goHome(){showScreen("homeScreen")}

function backToSetup(){
 showScreen("setupScreen");
 renderSides();
}


/* ================= RESIZE ================= */

window.addEventListener("resize",()=>{
 const active=id=>document.getElementById(id)?.classList.contains("active");

 if(active("clueScreen"))setTimeout(drawClueCanvas,50);
 if(active("guessScreen"))setTimeout(drawGuessCanvas,50);
 if(active("resultScreen"))setTimeout(drawResultCanvas,50);
});


/* ================= OPTIONAL SCORE SCREEN ================= */

function showScores(){
 renderMainScores();
 if(document.getElementById("scoreScreen"))
  showScreen("scoreScreen");
}

function closeScores(){
 if(game.roundFinished)return showScreen("resultScreen");
 if(draggingNeedle)return showScreen("guessScreen");
 showScreen("clueScreen");
}


/* Prevent accidental Enter submission */
document.addEventListener("keydown",e=>{
 if(e.key==="Enter"&&e.target.matches("input"))
  e.preventDefault();
});

/* Prevent page scrolling while moving the needle */
document.addEventListener("touchmove",e=>{
 if(draggingNeedle&&e.target.closest("#guessCanvas"))
  e.preventDefault();
},{passive:false});
