/* =========================================================
   WAVELENGTH — FINAL SCRIPT
   ========================================================= */

/* ================= TOPICS ================= */

const topics = [
    ["Hot","Cold"],
    ["Healthy","Unhealthy"],
    ["Popular","Unpopular"],
    ["Good movie","Bad movie"],
    ["Easy to cook","Difficult to cook"],
    ["Overrated","Underrated"],
    ["For kids","For adults"],
    ["Legal","Illegal"],
    ["Good habit","Bad habit"],
    ["Cheap","Expensive"],
    ["Safe","Dangerous"],
    ["Fast","Slow"],
    ["Easy","Hard"],
    ["Loud","Quiet"],
    ["Clean","Dirty"],
    ["Cute","Scary"],
    ["Useful","Useless"],
    ["Soft","Hard"],
    ["Sweet","Sour"],
    ["Light","Heavy"],
    ["Strong","Weak"],
    ["Simple","Complex"],
    ["Boring","Exciting"],
    ["Bright","Dark"],
    ["Smells good","Smells bad"],
    ["Small","Huge"],
    ["Old","New"],
    ["Modern","Traditional"],
    ["Fun","Unfun"],
    ["High quality","Low quality"],
    ["Comfortable","Uncomfortable"],
    ["Common","Rare"],
    ["High effort","Low effort"],
    ["Rich","Poor"],
    ["Polite","Rude"],
    ["Fair","Unfair"],
    ["Important","Unimportant"],
    ["Normal","Weird"],
    ["Real","Fake"],
    ["True","False"],
    ["Temporary","Permanent"],
    ["Natural","Artificial"],
    ["Smooth","Rough"],
    ["Short","Long"],
    ["Near","Far"],
    ["Early","Late"],
    ["Dry","Wet"],
    ["Fresh","Stale"],
    ["Good smell","Bad smell"],
    ["Good music","Bad music"],
    ["Good superpower","Bad superpower"],
    ["Good gift","Bad gift"],
    ["Good pet","Bad pet"],
    ["Good advice","Bad advice"],
    ["Good idea","Bad idea"],
    ["Early morning","Late night"],
    ["Indoor","Outdoor"],
    ["Public","Private"],
    ["Overdressed","Underdressed"],
    ["Healthy snack","Unhealthy snack"],
    ["Easy chore","Hard chore"],
    ["Easy sport","Hard sport"],
    ["Useful talent","Useless talent"],
    ["Useful subject","Useless subject"],
    ["Essential item","Luxury item"],
    ["Solitary activity","Social activity"],
    ["Physical activity","Mental activity"],
    ["Urban","Rural"],
    ["Modern music","Old music"],
    ["Sad","Happy"],
    ["Friendly","Unfriendly"],
    ["Harmless","Harmful"],
    ["Relaxing","Stressful"],
    ["Serious","Playful"],
    ["Traditional food","Modern food"],
    ["Messy","Neat"],
    ["Predictable","Unpredictable"],
    ["Ethical","Unethical"],
    ["Skill-based","Luck-based"],
    ["Tastes good","Tastes bad"],
    ["Feels good","Feels bad"],
    ["Looks good","Looks bad"],
    ["Sounds good","Sounds bad"],
    ["Best season","Worst season"],
    ["Best day of the week","Worst day of the week"],
    ["Best day of the year","Worst day of the year"],
    ["Best feeling","Worst feeling"],

    /* EXTRA EASY TOPICS */
    ["Big","Small"],
    ["Fast","Slow"],
    ["Near","Far"],
    ["Hot","Cold"],
    ["Young","Old"],
    ["Cheap","Expensive"],
    ["Easy","Difficult"],
    ["Happy","Sad"],
    ["Funny","Serious"],
    ["Beautiful","Ugly"],
    ["Strong","Weak"],
    ["Heavy","Light"],
    ["Wet","Dry"],
    ["Bright","Dark"],
    ["Open","Closed"],
    ["Full","Empty"],
    ["Clean","Dirty"],
    ["Safe","Dangerous"],
    ["Good","Bad"],
    ["Like","Dislike"],
    ["Love","Hate"],
    ["Useful","Useless"],
    ["Quiet","Noisy"],
    ["Soft","Hard"],
    ["Simple","Complicated"],
    ["Old-fashioned","Modern"],
    ["Healthy","Unhealthy"],
    ["Relaxing","Stressful"],
    ["Popular","Unknown"],
    ["Funny movie","Serious movie"],
    ["Good food","Bad food"],
    ["Good place","Bad place"],
    ["Good friend","Bad friend"],
    ["Easy game","Hard game"],
    ["Easy subject","Hard subject"],
    ["Good phone","Bad phone"],
    ["Good app","Bad app"],
    ["Good day","Bad day"],
    ["Good weather","Bad weather"],
    ["Good smell","Bad smell"],
    ["Good sound","Bad sound"],
    ["Good photo","Bad photo"],
    ["Good idea","Bad idea"],
    ["Fun activity","Boring activity"],
    ["Good holiday","Bad holiday"],
    ["Good trip","Bad trip"],
    ["Good teacher","Bad teacher"],
    ["Good student","Bad student"],
    ["Easy decision","Difficult decision"],
    ["Useful invention","Useless invention"],
    ["Good superpower","Bad superpower"],
    ["Good gift","Bad gift"],
    ["Good pet","Bad pet"],
    ["Good advice","Bad advice"],
    ["Good choice","Bad choice"],
    ["Good habit","Bad habit"]
];


/* ================= GAME STATE ================= */

let game = {
    rounds: 5,
    currentRound: 1,
    sides: [],
    currentSideIndex: 0,
    targetAngle: 0,
    guessAngle: 0,
    topic: null,
    topicHistory: [],
    targetHistory: [],
    roundFinished: false
};

let sideId = 0;
let draggingNeedle = false;


/* ================= STARTUP ================= */

document.addEventListener("DOMContentLoaded", () => {
    showScreen("homeScreen");
});


/* ================= HELPERS ================= */

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s =>
        s.classList.remove("active")
    );

    const screen = document.getElementById(id);
    if (screen) screen.classList.add("active");
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;");
}


/* ================= HOME / SETUP ================= */

function playGame() {
    showSetup();
}

function showSetup() {
    showScreen("setupScreen");

    if (!game.sides.length) {
        game.sides = [createSide(), createSide()];
    }

    renderSides();
    selectRounds(game.rounds || 5);
}

function goHome() {
    showScreen("homeScreen");
}

function createSide() {
    return {
        id: ++sideId,
        players: [""],
        teamName: "",
        score: 0,
        roundPoints: 0
    };
}

function addSide() {
    game.sides.push(createSide());
    renderSides();
}

function removeSide(index) {
    if (game.sides.length <= 2) {
        alert("You need at least 2 sides.");
        return;
    }

    game.sides.splice(index,1);
    renderSides();
}

function changePlayerCount(index, change) {
    const side = game.sides[index];
    const count = Math.max(
        1,
        Math.min(10, side.players.length + change)
    );

    while (side.players.length < count)
        side.players.push("");

    while (side.players.length > count)
        side.players.pop();

    if (count === 1) side.teamName = "";

    renderSides();
}

function renderSides() {
    const container = document.getElementById("sidesContainer");
    if (!container) return;

    container.innerHTML = "";

    game.sides.forEach((side,index) => {
        let players = side.players.map((p,pi) => `
            <input
                class="player-input"
                type="text"
                placeholder="Player ${pi+1} name"
                value="${escapeHTML(p)}"
                onchange="updatePlayer(${index},${pi},this.value)"
            >
        `).join("");

        const team = side.players.length > 1 ? `
            <div class="team-name-label">TEAM NAME</div>
            <input
                class="team-name-input"
                type="text"
                placeholder="Example: AS"
                value="${escapeHTML(side.teamName)}"
                onchange="updateTeamName(${index},this.value)"
            >
        ` : "";

        container.insertAdjacentHTML("beforeend",`
            <div class="side-card">
                <div class="side-header">
                    <span class="side-number">SIDE ${index+1}</span>
                    <button class="remove-side"
                        onclick="removeSide(${index})">✕</button>
                </div>

                <div class="player-count">
                    <button onclick="changePlayerCount(${index},-1)">−</button>
                    <span>
                        ${side.players.length}
                        ${side.players.length === 1 ? "PLAYER":"PLAYERS"}
                    </span>
                    <button onclick="changePlayerCount(${index},1)">+</button>
                </div>

                ${team}
                ${players}
            </div>
        `);
    });

    setText("sideCount",`${game.sides.length} sides`);
}

function updatePlayer(side,player,value) {
    game.sides[side].players[player] = value.trim();
}

function updateTeamName(side,value) {
    game.sides[side].teamName = value.trim();
}


/* ================= ROUNDS ================= */

function selectRounds(number) {
    game.rounds = Math.max(1,Math.min(100,Number(number)));

    setText("roundDisplay",game.rounds);

    document.querySelectorAll("[data-round]").forEach(btn =>
        btn.classList.toggle(
            "selected",
            Number(btn.dataset.round) === game.rounds
        )
    );

    const custom = document.getElementById("customRounds");
    if (custom) custom.value = "";
}

function setCustomRounds() {
    const input = document.getElementById("customRounds");
    if (!input || !input.value) return;

    selectRounds(Math.floor(Number(input.value)));
}


/* ================= START GAME ================= */

function startGame() {
    if (game.sides.length < 2) {
        alert("Add at least 2 sides.");
        return;
    }

    for (const side of game.sides) {
        if (side.players.some(p => !p.trim())) {
            alert("Please enter every player name.");
            return;
        }

        if (side.players.length > 1 && !side.teamName.trim()) {
            alert("A side with multiple players needs a team name.");
            return;
        }
    }

    game.currentRound = 1;
    game.currentSideIndex = 0;
    game.topicHistory = [];
    game.targetHistory = [];

    game.sides.forEach(s => {
        s.score = 0;
        s.roundPoints = 0;
    });

    startRound();
}


/* ================= ROUND ================= */

function startRound() {
    game.roundFinished = false;
    game.guessAngle = 0;

    chooseTopic();
    chooseTarget();

    const side = game.sides[game.currentSideIndex];

    updateTurn(side);
    showScreen("clueScreen");

    setTimeout(drawClueCanvas,60);
}

function chooseTopic() {
    let available = [];

    for (let i=0;i<topics.length;i++) {
        if (!game.topicHistory.includes(i))
            available.push(i);
    }

    if (!available.length) {
        game.topicHistory = [];
        available = topics.map((_,i) => i);
    }

    const index =
        available[Math.floor(Math.random()*available.length)];

    game.topicHistory.push(index);
    game.topic = topics[index];
}

function chooseTarget() {
    let target;

    if (game.targetHistory.length >= 160)
        game.targetHistory = [];

    do {
        target = Math.floor(Math.random()*161)-80;
    } while (game.targetHistory.includes(target));

    game.targetHistory.push(target);
    game.targetAngle = target;
}

function getSideName(side) {
    return side.players.length === 1
        ? side.players[0]
        : side.teamName;
}

function updateTurn(side) {
    const name = getSideName(side);

    setText("clueTeamName",name);
    setText("cluePlayers",side.players.join(" • "));
    setText("guessTeamName",name);

    setText("clueRound",game.currentRound);
    setText("totalRounds",game.rounds);
    setText("guessRound",game.currentRound);
    setText("guessTotal",game.rounds);

    const [left,right] = game.topic;

    setText("topicText",`${left}  ↔  ${right}`);

    ["leftTopic","guessLeftTopic","resultLeftTopic"]
        .forEach(id => setText(id,left));

    ["rightTopic","guessRightTopic","resultRightTopic"]
        .forEach(id => setText(id,right));
}


/* ================= CANVAS ================= */

function canvasInfo(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width*dpr;
    canvas.height = rect.width*.55*dpr;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);

    return {
        ctx,
        width:rect.width,
        height:rect.width*.55
    };
}

function anglePoint(cx,cy,radius,angle) {
    const rad = (angle-90)*Math.PI/180;

    return {
        x:cx+radius*Math.cos(rad),
        y:cy+radius*Math.sin(rad)
    };
}

function drawWave(canvas,target,needle,showTarget,showNeedle) {
    const {ctx,width,height} = canvasInfo(canvas);

    ctx.clearRect(0,0,width,height);

    const cx = width/2;
    const cy = height-15;
    const radius = Math.min(width*.46,height*1.55);

    /* Base */
    ctx.beginPath();
    ctx.moveTo(cx-radius,cy);
    ctx.arc(cx,cy,radius,Math.PI,Math.PI*2);
    ctx.closePath();
    ctx.fillStyle="#aab5c4";
    ctx.fill();

    /* Target */
    if (showTarget) {
        drawBand(ctx,cx,cy,radius,target,4.5,"#39d98a");
        drawBand(ctx,cx,cy,radius,target,13.5,"#ffd84d",4.5);
        drawBand(ctx,cx,cy,radius,target,22.5,"#ff9f43",13.5);
        drawBand(ctx,cx,cy,radius,target,31.5,"#ff5c65",22.5);
    }

    /* Needle */
    if (showNeedle) {
        const p = anglePoint(cx,cy,radius*.97,needle);

        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(p.x,p.y);
        ctx.lineWidth=7;
        ctx.lineCap="round";
        ctx.strokeStyle="#ff3f52";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx,cy,8,0,Math.PI*2);
        ctx.fillStyle="#ff3f52";
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(cx,cy,6,0,Math.PI*2);
    ctx.fillStyle="#ff5864";
    ctx.fill();
}

function drawBand(ctx,cx,cy,radius,target,outer,color,inner=0) {
    const half=outer;
    const a=(target-half-90)*Math.PI/180;
    const b=(target+half-90)*Math.PI/180;

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,radius,a,b);
    ctx.closePath();

    ctx.fillStyle=color;
    ctx.fill();
}

function drawClueCanvas() {
    drawWave(
        document.getElementById("waveCanvas"),
        game.targetAngle,
        0,
        true,
        false
    );
}


/* ================= HIDE TARGET ================= */

function hideTarget() {
    showScreen("guessScreen");

    game.guessAngle=0;

    setTimeout(() => {
        drawGuessCanvas();
        enableNeedleDragging();
    },60);
}

function drawGuessCanvas() {
    drawWave(
        document.getElementById("guessCanvas"),
        game.targetAngle,
        game.guessAngle,
        false,
        true
    );
}


/* ================= NEEDLE ================= */

function enableNeedleDragging() {
    const canvas=document.getElementById("guessCanvas");

    canvas.onpointerdown=e=>{
        draggingNeedle=true;
        canvas.setPointerCapture(e.pointerId);
        moveNeedle(e);
    };

    canvas.onpointermove=e=>{
        if(draggingNeedle) moveNeedle(e);
    };

    canvas.onpointerup=()=>{
        draggingNeedle=false;
    };

    canvas.onpointercancel=()=>{
        draggingNeedle=false;
    };
}

function moveNeedle(e) {
    const canvas=document.getElementById("guessCanvas");
    const rect=canvas.getBoundingClientRect();

    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const cx=rect.width/2;
    const cy=rect.height-15;

    let angle=
        Math.atan2(x-cx,-(y-cy))*180/Math.PI;

    angle=Math.max(-89,Math.min(89,angle));

    game.guessAngle=angle;
    drawGuessCanvas();
}


/* ================= SCORING ================= */

function calculatePoints(target,guess) {
    const distance=Math.abs(target-guess);

    if(distance<=4.5) return 4;
    if(distance<=13.5) return 3;
    if(distance<=22.5) return 2;
    if(distance<=31.5) return 1;

    return 0;
}


/* ================= REVEAL ================= */

function revealTarget() {
    if(game.roundFinished) return;

    game.roundFinished=true;

    const side=game.sides[game.currentSideIndex];
    const points=calculatePoints(
        game.targetAngle,
        game.guessAngle
    );

    side.roundPoints=points;
    side.score+=points;

    setText("resultTeam",getSideName(side));
    setText("pointsEarned",points);

    const messages={
        4:"🎯 PERFECT HIT!",
        3:"🔥 Amazing guess!",
        2:"👍 Nice one!",
        1:"😅 Just inside!",
        0:"💀 Outside the target!"
    };

    setText("resultMessage",messages[points]);

    showRoundScoreboard();

    showScreen("resultScreen");

    setTimeout(drawResultCanvas,60);
}


/* ================= ROUND SCOREBOARD ================= */

function showRoundScoreboard() {
    let box=document.getElementById("roundScoreboard");

    if(!box) {
        box=document.createElement("div");
        box.id="roundScoreboard";
        box.className="final-scores";

        const breakdown=document.querySelector(".score-breakdown");

        if(breakdown)
            breakdown.parentNode.insertBefore(box,breakdown);
    }

    const sorted=[...game.sides].sort(
        (a,b)=>b.score-a.score
    );

    box.innerHTML=`
        <h3>📊 SCOREBOARD</h3>
        ${sorted.map((side,index)=>`
            <div class="final-score-row">
                <span>
                    ${index===0 && side.score>0 ? "🏆 ":""}
                    ${escapeHTML(getSideName(side))}
                </span>
                <span>
                    <b>+${side.roundPoints}</b>
                    &nbsp; ${side.score} pts
                </span>
            </div>
        `).join("")}
    `;
}


/* ================= RESULT CANVAS ================= */

function drawResultCanvas() {
    drawWave(
        document.getElementById("resultCanvas"),
        game.targetAngle,
        game.guessAngle,
        true,
        true
    );
}


/* ================= SKIP ================= */

function skipRound() {
    if(game.roundFinished) return;

    game.roundFinished=true;

    const side=game.sides[game.currentSideIndex];

    side.roundPoints=0;

    setText("resultTeam",getSideName(side));
    setText("pointsEarned",0);
    setText("resultMessage","⏭️ Question skipped!");

    showRoundScoreboard();
    showScreen("resultScreen");

    setTimeout(drawResultCanvas,60);
}


/* ================= NEXT ROUND ================= */

function nextRound() {
    if(game.currentRound>=game.rounds) {
        showGameOver();
        return;
    }

    game.currentRound++;

    game.currentSideIndex=
        (game.currentSideIndex+1)%game.sides.length;

    startRound();
}


/* ================= GAME OVER ================= */

function showGameOver() {
    const sorted=[...game.sides].sort(
        (a,b)=>b.score-a.score
    );

    const winner=sorted[0];

    setText("winnerName",getSideName(winner));
    setText("winnerScore",winner.score);

    const list=document.getElementById("finalScoreList");

    if(list) {
        list.innerHTML=sorted.map((side,index)=>`
            <div class="final-score-row"
                 style="${index===0 ? "border:3px solid #ffd84d;":""}">
                <span>
                    ${index===0 ? "👑 ":""}
                    ${escapeHTML(getSideName(side))}
                </span>
                <span>${side.score} ⭐</span>
            </div>
        `).join("");
    }

    showScreen("gameOverScreen");
}


/* ================= PLAY AGAIN ================= */

function restartGame() {
    /*
       Keep the existing sides and names,
       but completely reset scores and rounds.
       This lets PLAY AGAIN work immediately.
    */

    game.currentRound=1;
    game.currentSideIndex=0;
    game.topicHistory=[];
    game.targetHistory=[];
    game.targetAngle=0;
    game.guessAngle=0;
    game.roundFinished=false;

    game.sides.forEach(side=>{
        side.score=0;
        side.roundPoints=0;
    });

    showSetup();
}


/* ================= RESIZE ================= */

window.addEventListener("resize",()=>{
    const active=document.querySelector(".screen.active");

    if(!active) return;

    if(active.id==="clueScreen")
        drawClueCanvas();

    if(active.id==="guessScreen")
        drawGuessCanvas();

    if(active.id==="resultScreen")
        drawResultCanvas();
});
