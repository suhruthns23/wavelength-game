/* ================= WAVELENGTH V3 ================= */

const topics=[
["Hot","Cold"],["Healthy","Unhealthy"],["Popular","Unpopular"],["Good movie","Bad movie"],
["Easy to cook","Difficult to cook"],["Overrated","Underrated"],["For kids","For adults"],
["Legal","Illegal"],["Good habit","Bad habit"],["Cheap","Expensive"],["Safe","Dangerous"],
["Fast","Slow"],["Easy","Hard"],["Loud","Quiet"],["Cute","Scary"],["Useful","Useless"],
["Soft","Hard"],["Sweet","Sour"],["Light","Heavy"],["Strong","Weak"],["Simple","Complex"],
["Boring","Exciting"],["Bright","Dark"],["Smells good","Smells bad"],["Small","Huge"],
["Old","New"],["Modern","Traditional"],["Fun","Unfun"],["High quality","Low quality"],
["Comfortable","Uncomfortable"],["Common","Rare"],["High effort","Low effort"],
["Rich","Poor"],["Polite","Rude"],["Fair","Unfair"],["Important","Unimportant"],
["Normal","Weird"],["Real","Fake"],["True","False"],["Temporary","Permanent"],
["Natural","Artificial"],["Smooth","Rough"],["Short","Long"],["Near","Far"],
["Early","Late"],["Dry","Wet"],["Fresh","Stale"],["Good smell","Bad smell"],
["Good music","Bad music"],["Good superpower","Bad superpower"],["Good gift","Bad gift"],
["Good pet","Bad pet"],["Good advice","Bad advice"],["High risk","Low risk"],
["Early morning","Late night"],["Indoor","Outdoor"],["Public","Private"],
["Overdressed","Underdressed"],["Healthy snack","Unhealthy snack"],
["Easy sport","Hard sport"],["Useful talent","Useless talent"],
["Useful subject","Useless subject"],["Essential item","Luxury item"],
["Solitary activity","Social activity"],["Physical activity","Mental activity"],
["Urban","Rural"],["Modern music","Old music"],["Sad","Happy"],
["Friendly","Unfriendly"],["Harmless","Harmful"],["Relaxing","Stressful"],
["Serious","Playful"],["Traditional food","Modern food"],["Messy","Neat"],
["Predictable","Unpredictable"],["Ethical","Unethical"],["Skill-based","Luck-based"],
["Tastes good","Tastes bad"],["Feels good","Feels bad"],["Looks good","Looks bad"],
["Sounds good","Sounds bad"],["Best season","Worst season"],
["Best day of the week","Worst day of the week"],["Best day of the year","Worst day of the year"],
["Best feeling","Worst feeling"]
];

const extraTopics=[
["Day","Night"],["Big","Small"],["Fast","Slow"],["Near","Far"],["Hot","Cold"],
["Young","Old"],["Cheap","Expensive"],["Easy","Difficult"],["Happy","Sad"],
["Funny","Serious"],["Beautiful","Ugly"],["Strong","Weak"],["Heavy","Light"],
["Wet","Dry"],["Bright","Dark"],["Open","Closed"],["Full","Empty"],
["Clean","Dirty"],["Safe","Dangerous"],["Good","Bad"],["Like","Dislike"],
["Love","Hate"],["Useful","Useless"],["Quiet","Noisy"],["Soft","Hard"],
["Simple","Complicated"],["Healthy","Unhealthy"],["Relaxing","Stressful"],
["Popular","Unknown"],["Funny movie","Serious movie"],["Good food","Bad food"],
["Good place","Bad place"],["Easy game","Hard game"],["Easy subject","Hard subject"],
["Good phone","Bad phone"],["Good app","Bad app"],["Good weather","Bad weather"],
["Good smell","Bad smell"],["Good sound","Bad sound"],["Fun activity","Boring activity"],
["Good holiday","Bad holiday"],["Good trip","Bad trip"],["Good teacher","Bad teacher"],
["Good student","Bad student"],["Easy decision","Difficult decision"],
["Useful invention","Useless invention"],["Good superpower","Bad superpower"],
["Good gift","Bad gift"],["Good morning","Bad morning"],["Good night","Bad night"],
["Good pet","Bad pet"],["Good job","Bad job"],["Good advice","Bad advice"],
["Good choice","Bad choice"],["Good habit","Bad habit"]
];

const allTopics=[...topics,...extraTopics];
const SAVE_KEY="wavelength_v3";

let game={
rounds:5,currentRound:1,sides:[],currentSideIndex:0,
targetAngle:0,topic:null,topicIndex:-1,
topicHistory:[],targetHistory:[],revealed:false,roundFinished:false,
screen:"homeScreen",guessers:[]
};

let sideId=0,draggingNeedle=null;


/* ================= SAVE / LOAD ================= */

function saveState(){
    try{
        localStorage.setItem(SAVE_KEY,JSON.stringify({game,sideId}));
    }catch(e){}
}

function loadState(){
    try{
        const saved=JSON.parse(localStorage.getItem(SAVE_KEY));
        if(!saved?.game)return false;
        game={...game,...saved.game};
        sideId=saved.sideId||0;
        return true;
    }catch(e){return false}
}

function clearSave(){
    try{localStorage.removeItem(SAVE_KEY)}catch(e){}
}


/* ================= BASIC ================= */

document.addEventListener("DOMContentLoaded",()=>{
    const restored=loadState();

    if(restored){
        showScreen(game.screen||"homeScreen");

        if(game.screen==="setupScreen")renderSides();
        if(game.screen==="clueScreen")setTimeout(drawClueCanvas,100);
        if(game.screen==="guessScreen")setTimeout(setupGuessers,100);
        if(game.screen==="resultScreen")setTimeout(drawResultCanvas,100);
        if(game.screen==="gameOverScreen")showGameOver();
    }else{
        showScreen("homeScreen");
    }
});

function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    const e=document.getElementById(id);
    if(e)e.classList.add("active");
    game.screen=id;
    saveState();
}

function setText(id,v){
    const e=document.getElementById(id);
    if(e)e.textContent=v;
}

function escapeHTML(v){
    return String(v)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}


/* ================= SETUP ================= */

function showSetup(){
    showScreen("setupScreen");

    if(!game.sides.length){
        game.sides=[createSide(),createSide()];
    }

    renderSides();
    setText("roundDisplay",game.rounds);
}

function createSide(){
    return{
        id:++sideId,
        players:[""],
        teamName:"",
        score:0
    };
}

function addSide(){
    game.sides.push(createSide());
    renderSides();
    saveState();
}

function removeSide(i){
    if(game.sides.length<=2)
        return alert("You need at least 2 teams.");

    game.sides.splice(i,1);
    renderSides();
    saveState();
}

function changePlayerCount(i,change){
    const s=game.sides[i];

    /* MAXIMUM 2 PLAYERS PER TEAM */
    const n=Math.max(1,Math.min(2,s.players.length+change));

    while(s.players.length<n)s.players.push("");
    while(s.players.length>n)s.players.pop();

    if(n===1)s.teamName="";

    renderSides();
    saveState();
}

function renderSides(){
    const c=document.getElementById("sidesContainer");
    if(!c)return;

    c.innerHTML="";

    game.sides.forEach((s,i)=>{
        const card=document.createElement("div");
        card.className="side-card";

        const players=s.players.map((p,j)=>`
            <input class="player-input" type="text"
            placeholder="Player ${j+1} name"
            value="${escapeHTML(p)}"
            onchange="updatePlayer(${i},${j},this.value)">
        `).join("");

        const team=s.players.length===2?`
            <div class="team-name-label">TEAM NAME</div>
            <input class="team-name-input" type="text"
            placeholder="Example: AS"
            value="${escapeHTML(s.teamName)}"
            onchange="updateTeamName(${i},this.value)">
        `:"";

        card.innerHTML=`
            <div class="side-header">
                <span class="side-number">TEAM ${i+1}</span>
                <button class="remove-side"
                onclick="removeSide(${i})">✕</button>
            </div>

            <div class="player-count">
                <button onclick="changePlayerCount(${i},-1)">−</button>
                <span>${s.players.length}
                ${s.players.length===1?"PLAYER":"PLAYERS"}</span>
                <button onclick="changePlayerCount(${i},1)">+</button>
            </div>

            ${team}${players}
        `;

        c.appendChild(card);
    });

    setText("sideCount",`${game.sides.length} teams`);
}

function updatePlayer(i,j,v){
    game.sides[i].players[j]=v.trim();
    saveState();
}

function updateTeamName(i,v){
    game.sides[i].teamName=v.trim();
    saveState();
}

function selectRounds(n){
    game.rounds=Math.max(1,Math.min(100,Number(n)));
    setText("roundDisplay",game.rounds);

    document.querySelectorAll("[data-round]").forEach(b=>
        b.classList.toggle("selected",Number(b.dataset.round)===game.rounds)
    );

    const c=document.getElementById("customRounds");
    if(c)c.value="";

    saveState();
}

function setCustomRounds(){
    const e=document.getElementById("customRounds");
    if(!e)return;

    const n=Number(e.value);
    if(!n||n<1)return;

    game.rounds=Math.min(100,Math.floor(n));
    setText("roundDisplay",game.rounds);

    document.querySelectorAll("[data-round]")
    .forEach(b=>b.classList.remove("selected"));

    saveState();
}


/* ================= GAME START ================= */

function startGame(){
    if(game.sides.length<2)
        return alert("Add at least 2 teams.");

    for(const s of game.sides){
        if(s.players.some(p=>!p.trim()))
            return alert("Please enter every player name.");

        if(s.players.length===2&&!s.teamName.trim())
            return alert("A 2-player team needs a team name.");
    }

    game.currentRound=1;
    game.currentSideIndex=0;
    game.topicHistory=[];
    game.targetHistory=[];
    game.topic=null;
    game.topicIndex=-1;

    game.sides.forEach(s=>{
        s.score=0;
        s.players.forEach(p=>p.score=0);
    });

    startRound();
}

function startRound(){
    game.revealed=false;
    game.roundFinished=false;
    game.guessers=[];
    chooseRandomTopic();
    chooseRandomTarget();
    updateTurnInformation();
    showScreen("clueScreen");
    setTimeout(drawClueCanvas,80);
}


/* ================= TOPIC / TARGET ================= */

function chooseRandomTopic(){
    let available=allTopics
    .map((_,i)=>i)
    .filter(i=>!game.topicHistory.includes(i));

    if(!available.length){
        game.topicHistory=[];
        available=allTopics.map((_,i)=>i);
    }

    game.topicIndex=
        available[Math.floor(Math.random()*available.length)];

    game.topic=allTopics[game.topicIndex];
    game.topicHistory.push(game.topicIndex);

    saveState();
}

function chooseRandomTarget(){
    let n;

    do{
        n=Math.floor(Math.random()*161)-80;
    }while(game.targetHistory.includes(n));

    game.targetHistory.push(n);
    game.targetAngle=n;
}


/* ================= TURN ================= */

function getTeamName(s){
    return s.players.length===2?s.teamName:s.players[0];
}

function getAllPlayers(){
    return game.sides.flatMap(s=>
        s.players.map((name,index)=>({
            name,
            team:getTeamName(s),
            teamId:s.id,
            playerIndex:index
        }))
    );
}

function updateTurnInformation(){
    const side=game.sides[game.currentSideIndex];
    const clueMaster=side.players[0];

    setText("clueTeamName",clueMaster);
    setText("cluePlayers",`${getTeamName(side)} • CLUE MASTER`);

    setText("guessTeamName",getTeamName(side));

    const guessers=getAllPlayers()
        .filter(p=>!(p.teamId===side.id&&p.playerIndex===0));

    setText(
        "guessInfo",
        guessers.map(p=>p.name).join(" • ")
    );

    setText("clueRound",game.currentRound);
    setText("guessRound",game.currentRound);
    setText("totalRounds",game.rounds);
    setText("guessTotal",game.rounds);

    const[a,b]=game.topic;

    setText("topicText",`${a}  ↔  ${b}`);

    ["leftTopic","guessLeftTopic","resultLeftTopic"]
    .forEach(id=>setText(id,a));

    ["rightTopic","guessRightTopic","resultRightTopic"]
    .forEach(id=>setText(id,b));
}


/* ================= SKIP TOPIC ================= */

/*
   IMPORTANT:
   Skip Topic changes ONLY the topic.
   Round, target, players and chance remain the same.
*/

function skipTopic(){
    if(game.roundFinished)return;

    chooseRandomTopic();
    updateTurnInformation();
    drawClueCanvas();
}


/* ================= CANVAS ================= */

function setupCanvas(canvas){
    const r=canvas.getBoundingClientRect();
    const d=devicePixelRatio||1;
    const w=r.width;
    const h=w*.55;

    canvas.width=w*d;
    canvas.height=h*d;

    const ctx=canvas.getContext("2d");
    ctx.setTransform(d,0,0,d,0,0);

    return{ctx,width:w,height:h};
}

function angleToPoint(cx,cy,r,a){
    a=(a-90)*Math.PI/180;
    return{
        x:cx+r*Math.cos(a),
        y:cy+r*Math.sin(a)
    };
}

function normalizeAngle(a){
    while(a>180)a-=360;
    while(a<-180)a+=360;
    return a;
}

function drawWave(canvas,target,needles,showTarget){
    if(!canvas)return;

    const{ctx,width,height}=setupCanvas(canvas);

    ctx.clearRect(0,0,width,height);

    const cx=width/2;
    const cy=height-15;
    const r=Math.min(width*.46,height*1.55);

    drawBaseWave(ctx,cx,cy,r);

    if(showTarget)
        drawTargetZones(ctx,cx,cy,r,target);

    if(needles){
        if(Array.isArray(needles)){
            needles.forEach(n=>
                drawNeedle(ctx,cx,cy,r,n.angle,n.color)
            );
        }else{
            drawNeedle(ctx,cx,cy,r,needles);
        }
    }

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


/* ================= TARGET ZONES ================= */

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
    ctx.arc(
        cx,cy,r,
        (a1-90)*Math.PI/180,
        (a2-90)*Math.PI/180
    );
    ctx.closePath();
    ctx.fillStyle=color;
    ctx.fill();
}

function drawNeedle(ctx,cx,cy,r,a,color="#FF3F52"){
    const p=angleToPoint(cx,cy,r*.96,a);

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(p.x,p.y);
    ctx.lineWidth=6;
    ctx.lineCap="round";
    ctx.strokeStyle=color;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fillStyle=color;
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


/* ================= CLUE ================= */

function drawClueCanvas(){
    drawWave(
        document.getElementById("waveCanvas"),
        game.targetAngle,
        null,
        true
    );
}

function hideTarget(){
    game.revealed=false;
    setupGuessers();
    showScreen("guessScreen");
}


/* ================= MULTIPLE GUESSERS ================= */

function setupGuessers(){
    const container=document.getElementById("guessersContainer");
    if(!container)return;

    container.innerHTML="";

    const clueSide=game.sides[game.currentSideIndex];

    const players=getAllPlayers()
        .filter(p=>
            !(p.teamId===clueSide.id&&p.playerIndex===0)
        );

    game.guessers=players.map(p=>({
        ...p,
        angle:0,
        points:0
    }));

    players.forEach((p,i)=>{
        const card=document.createElement("div");
        card.className="guesser-card";

        card.innerHTML=`
            <div class="guesser-header">
                <span class="guesser-name">
                    ${i+1}. ${escapeHTML(p.name)}
                </span>
                <span class="guesser-team">
                    ${escapeHTML(p.team)}
                </span>
            </div>

            <div class="guesser-wave">
                <canvas id="guesserCanvas${i}"></canvas>
            </div>
        `;

        container.appendChild(card);

        setTimeout(()=>{
            drawGuesser(i);
            enableGuesserDragging(i);
        },30);
    });

    saveState();
}

function drawGuesser(i){
    const g=game.guessers[i];
    const c=document.getElementById(`guesserCanvas${i}`);

    if(!g||!c)return;

    drawWave(c,game.targetAngle,g.angle,false);
}

function enableGuesserDragging(i){
    const c=document.getElementById(`guesserCanvas${i}`);
    if(!c)return;

    c.onpointerdown=e=>{
        if(game.roundFinished)return;

        draggingNeedle=i;

        try{c.setPointerCapture(e.pointerId)}catch(_){}

        updateGuesserPointer(i,e);
    };

    c.onpointermove=e=>{
        if(draggingNeedle===i)
            updateGuesserPointer(i,e);
    };

    c.onpointerup=()=>{
        if(draggingNeedle===i)draggingNeedle=null;
    };

    c.onpointercancel=()=>{
        if(draggingNeedle===i)draggingNeedle=null;
    };
}

function updateGuesserPointer(i,e){
    const c=document.getElementById(`guesserCanvas${i}`);
    if(!c)return;

    const r=c.getBoundingClientRect();
    const x=e.clientX-r.left;
    const y=e.clientY-r.top;

    const cx=r.width/2;
    const cy=r.height-15;

    let a=Math.atan2(x-cx,-(y-cy))*180/Math.PI;
    a=Math.max(-89,Math.min(89,a));

    game.guessers[i].angle=a;

    drawGuesser(i);
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
    draggingNeedle=null;

    const messages={
        4:"🎯 PERFECT HIT!",
        3:"🔥 AMAZING GUESS!",
        2:"👍 NICE GUESS!",
        1:"😅 JUST INSIDE!",
        0:"💀 OUTSIDE THE TARGET!"
    };

    game.guessers.forEach(g=>{
        g.points=calculatePoints(game.targetAngle,g.angle);

        const player=game.sides
            .find(s=>s.id===g.teamId)
            ?.players[g.playerIndex];

        if(player){
            if(typeof player.score!=="number")
                player.score=0;

            player.score+=g.points;
        }

        const side=game.sides.find(s=>s.id===g.teamId);

        if(side)
            side.score+=g.points;
    });

    setText(
        "resultTeam",
        `🎯 ${game.guessers.length} GUESSER${game.guessers.length===1?"":"S"}`
    );

    setText(
        "resultMessage",
        "Points awarded to every player!"
    );

    renderResultPlayers();
    showScreen("resultScreen");

    setTimeout(drawResultCanvas,80);
    saveState();
}


/* ================= RESULT ================= */

function renderResultPlayers(){
    const c=document.getElementById("resultPlayerScores");
    if(!c)return;

    c.innerHTML="";

    game.guessers.forEach((g,i)=>{
        const row=document.createElement("div");
        row.className="result-player-row";

        row.innerHTML=`
            <span class="player-result-name">
                ${i+1}. ${escapeHTML(g.name)}
                <small>(${escapeHTML(g.team)})</small>
            </span>
            <span class="player-result-points">
                +${g.points}
            </span>
        `;

        c.appendChild(row);
    });
}

function drawResultCanvas(){
    const c=document.getElementById("resultCanvas");
    if(!c)return;

    drawWave(
        c,
        game.targetAngle,
        game.guessers.map((g,i)=>({
            angle:g.angle,
            color:getNeedleColor(i)
        })),
        true
    );
}

function getNeedleColor(i){
    const colors=[
        "#FF3F52","#7A62E8","#00A6A6",
        "#F28E2B","#D14D72","#4C8FE8",
        "#39A852","#A45EE5"
    ];

    return colors[i%colors.length];
}


/* ================= NEXT ROUND ================= */

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


/* ================= SCOREBOARDS ================= */

function getAllPlayerScores(){
    return game.sides.flatMap(s=>
        s.players.map((name,i)=>({
            name,
            team:getTeamName(s),
            score:typeof s.players[i].score==="number"
                ?s.players[i].score:0
        }))
    );
}

function renderScores(){
    const players=getAllPlayerScores()
        .sort((a,b)=>b.score-a.score);

    const c=document.getElementById("finalScoreList");
    if(!c)return;

    c.innerHTML=players.map((p,i)=>`
        <div class="final-score-row">
            <span>
                ${i+1}. ${escapeHTML(p.name)}
                <small>${escapeHTML(p.team)}</small>
            </span>
            <strong>${p.score}</strong>
        </div>
    `).join("");
}


/* ================= GAME OVER ================= */

function getWinners(){
    const players=getAllPlayerScores();
    const high=Math.max(...players.map(p=>p.score));

    return players.filter(p=>p.score===high);
}

function showGameOver(){
    const winners=getWinners();

    if(!winners.length)return;

    setText(
        "winnerName",
        winners.map(w=>w.name).join(" & ")
    );

    setText(
        "winnerScore",
        winners[0].score
    );

    renderScores();
    showScreen("gameOverScreen");
}


/* ================= PLAY AGAIN ================= */

function playAgain(){
    /*
       SAME teams
       SAME players
       SAME number of rounds
       ONLY scores/game progress reset
    */

    game.currentRound=1;
    game.currentSideIndex=0;
    game.topicHistory=[];
    game.targetHistory=[];
    game.topic=null;
    game.topicIndex=-1;
    game.guessAngle=0;
    game.guessers=[];
    game.revealed=false;
    game.roundFinished=false;

    game.sides.forEach(s=>{
        s.score=0;
        s.players.forEach(p=>p.score=0);
    });

    startRound();
}


/* ================= NEW GAME ================= */

function newGame(){
    clearSave();

    game={
        rounds:5,currentRound:1,sides:[],
        currentSideIndex:0,targetAngle:0,
        topic:null,topicIndex:-1,
        topicHistory:[],targetHistory:[],
        revealed:false,roundFinished:false,
        screen:"setupScreen",guessers:[]
    };

    sideId=0;
    draggingNeedle=null;

    showSetup();
}


/* ================= NAVIGATION ================= */

function goHome(){
    showScreen("homeScreen");
}

function backToSetup(){
    showSetup();
}


/* ================= RESIZE ================= */

window.addEventListener("resize",()=>{
    const active=id=>
        document.getElementById(id)?.classList.contains("active");

    if(active("clueScreen"))
        setTimeout(drawClueCanvas,50);

    if(active("guessScreen"))
        setTimeout(()=>{
            game.guessers.forEach((_,i)=>drawGuesser(i));
        },50);

    if(active("resultScreen"))
        setTimeout(drawResultCanvas,50);
});


/* ================= INPUT / TOUCH ================= */

document.addEventListener("keydown",e=>{
    if(e.key==="Enter"&&e.target.matches("input"))
        e.preventDefault();
});

document.addEventListener("touchmove",e=>{
    if(draggingNeedle!==null&&e.target.closest("canvas"))
        e.preventDefault();
},{passive:false});
