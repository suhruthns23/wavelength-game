/* =========================================================
   WAVELENGTH
   FINAL SCRIPT.JS
   ========================================================= */


/* =========================================================
   TOPICS
   ========================================================= */

const allTopics = [

    ["Hot", "Cold"],
    ["Healthy", "Unhealthy"],
    ["Popular", "Unpopular"],
    ["Good movie", "Bad movie"],
    ["Easy to cook", "Difficult to cook"],
    ["Overrated", "Underrated"],
    ["For kids", "For adults"],
    ["Legal", "Illegal"],
    ["Good habit", "Bad habit"],
    ["Cheap", "Expensive"],
    ["Safe", "Dangerous"],
    ["Fast", "Slow"],
    ["Easy", "Hard"],
    ["Loud", "Quiet"],
    ["Clean", "Dirty"],
    ["Cute", "Scary"],
    ["Useful", "Useless"],
    ["Soft", "Hard"],
    ["Sweet", "Sour"],
    ["Light", "Heavy"],
    ["Strong", "Weak"],
    ["Simple", "Complex"],
    ["Boring", "Exciting"],
    ["Bright", "Dark"],
    ["Smells good", "Smells bad"],
    ["Small", "Huge"],
    ["Old", "New"],
    ["Modern", "Traditional"],
    ["Fun", "Unfun"],
    ["High quality", "Low quality"],
    ["Comfortable", "Uncomfortable"],
    ["Common", "Rare"],
    ["High effort", "Low effort"],
    ["Rich", "Poor"],
    ["Polite", "Rude"],
    ["Fair", "Unfair"],
    ["Important", "Unimportant"],
    ["Normal", "Weird"],
    ["Real", "Fake"],
    ["True", "False"],
    ["Temporary", "Permanent"],
    ["Natural", "Artificial"],
    ["Smooth", "Rough"],
    ["Short", "Long"],
    ["Near", "Far"],
    ["Early", "Late"],
    ["Dry", "Wet"],
    ["Fresh", "Stale"],
    ["Good smell", "Bad smell"],
    ["Good music", "Bad music"],
    ["Good superpower", "Bad superpower"],
    ["Good gift", "Bad gift"],
    ["Good pet", "Bad pet"],
    ["Good advice", "Bad advice"],
    ["Good idea", "Bad idea"],
    ["Early morning", "Late night"],
    ["Indoor", "Outdoor"],
    ["Public", "Private"],
    ["Overdressed", "Underdressed"],
    ["Healthy snack", "Unhealthy snack"],
    ["Easy chore", "Hard chore"],
    ["Easy sport", "Hard sport"],
    ["Useful talent", "Useless talent"],
    ["Useful subject", "Useless subject"],
    ["Essential item", "Luxury item"],
    ["Solitary activity", "Social activity"],
    ["Physical activity", "Mental activity"],
    ["Urban", "Rural"],
    ["Modern music", "Old music"],
    ["Sad", "Happy"],
    ["Friendly", "Unfriendly"],
    ["Harmless", "Harmful"],
    ["Relaxing", "Stressful"],
    ["Serious", "Playful"],
    ["Traditional food", "Modern food"],
    ["Messy", "Neat"],
    ["Predictable", "Unpredictable"],
    ["Ethical", "Unethical"],
    ["Skill-based", "Luck-based"],
    ["Tastes good", "Tastes bad"],
    ["Feels good", "Feels bad"],
    ["Looks good", "Looks bad"],
    ["Sounds good", "Sounds bad"],
    ["Best season", "Worst season"],
    ["Best day of the week", "Worst day of the week"],
    ["Best day of the year", "Worst day of the year"],
    ["Best feeling", "Worst feeling"],

    ["Big", "Small"],
    ["Fast", "Slow"],
    ["Near", "Far"],
    ["Hot", "Cold"],
    ["Young", "Old"],
    ["Cheap", "Expensive"],
    ["Easy", "Difficult"],
    ["Happy", "Sad"],
    ["Funny", "Serious"],
    ["Beautiful", "Ugly"],
    ["Strong", "Weak"],
    ["Heavy", "Light"],
    ["Wet", "Dry"],
    ["Bright", "Dark"],
    ["Open", "Closed"],
    ["Full", "Empty"],
    ["Clean", "Dirty"],
    ["Safe", "Dangerous"],
    ["Good", "Bad"],
    ["Like", "Dislike"],
    ["Love", "Hate"],
    ["Useful", "Useless"],
    ["Quiet", "Noisy"],
    ["Soft", "Hard"],
    ["Simple", "Complicated"],
    ["Old-fashioned", "Modern"],
    ["Healthy", "Unhealthy"],
    ["Relaxing", "Stressful"],
    ["Popular", "Unknown"],

    ["Funny movie", "Serious movie"],
    ["Good food", "Bad food"],
    ["Good place", "Bad place"],
    ["Good friend", "Bad friend"],
    ["Easy game", "Hard game"],
    ["Easy subject", "Hard subject"],
    ["Good phone", "Bad phone"],
    ["Good app", "Bad app"],
    ["Good day", "Bad day"],
    ["Good weather", "Bad weather"],
    ["Good smell", "Bad smell"],
    ["Good sound", "Bad sound"],
    ["Good photo", "Bad photo"],
    ["Good idea", "Bad idea"],
    ["Fun activity", "Boring activity"],
    ["Good holiday", "Bad holiday"],
    ["Good trip", "Bad trip"],
    ["Good teacher", "Bad teacher"],
    ["Good student", "Bad student"],
    ["Easy decision", "Difficult decision"],
    ["Useful invention", "Useless invention"],
    ["Good superpower", "Bad superpower"],
    ["Good gift", "Bad gift"],
    ["Good pet", "Bad pet"],
    ["Good advice", "Bad advice"],
    ["Good choice", "Bad choice"],
    ["Good habit", "Bad habit"]

];


/* =========================================================
   GAME STATE
   ========================================================= */

let game = {
    rounds: 5,
    currentRound: 1,

    sides: [],
    currentSideIndex: 0,

    targetAngle: 0,
    guessAngle: 0,

    topic: null,
    topicIndex: -1,

    topicHistory: [],
    targetHistory: [],

    revealed: false,
    roundFinished: false,

    roundPoints: 0,
    roundZone: "OUTSIDE"
};

let sideId = 0;
let draggingNeedle = false;


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});

function initializeGame() {
    showScreen("homeScreen");
}


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }
}


/* =========================================================
   HOME
   ========================================================= */

function playGame() {
    showSetup();
}

function showSetup() {

    showScreen("setupScreen");

    if (game.sides.length === 0) {
        game.sides = [
            createSide(),
            createSide()
        ];
    }

    renderSides();

    if (!game.rounds) {
        selectRounds(5);
    }
}

function goHome() {

    showScreen("homeScreen");

}


/* =========================================================
   SIDES
   ========================================================= */

function createSide() {

    sideId++;

    return {
        id: sideId,
        players: [""],
        teamName: "",
        score: 0
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

    game.sides.splice(index, 1);

    renderSides();
}


function changePlayerCount(index, change) {

    const side = game.sides[index];

    let count =
        side.players.length + change;

    count = Math.max(
        1,
        Math.min(10, count)
    );

    while (side.players.length < count) {
        side.players.push("");
    }

    while (side.players.length > count) {
        side.players.pop();
    }

    if (count === 1) {
        side.teamName = "";
    }

    renderSides();
}


/* =========================================================
   RENDER SIDES
   ========================================================= */

function renderSides() {

    const container =
        document.getElementById("sidesContainer");

    if (!container) return;

    container.innerHTML = "";

    game.sides.forEach((side, index) => {

        const card =
            document.createElement("div");

        card.className = "side-card";

        let playersHTML = "";

        side.players.forEach((player, playerIndex) => {

            playersHTML += `
                <input
                    class="player-input"
                    type="text"
                    placeholder="Player ${playerIndex + 1} name"
                    value="${escapeHTML(player)}"
                    onchange="updatePlayer(${index}, ${playerIndex}, this.value)"
                >
            `;
        });


        let teamHTML = "";

        if (side.players.length > 1) {

            teamHTML = `
                <div class="team-name-label">
                    TEAM NAME
                </div>

                <input
                    class="team-name-input"
                    type="text"
                    placeholder="Example: AS"
                    value="${escapeHTML(side.teamName)}"
                    onchange="updateTeamName(${index}, this.value)"
                >
            `;
        }


        card.innerHTML = `

            <div class="side-header">

                <span class="side-number">
                    SIDE ${index + 1}
                </span>

                <button
                    class="remove-side"
                    onclick="removeSide(${index})"
                >
                    ✕
                </button>

            </div>

            <div class="player-count">

                <button
                    onclick="changePlayerCount(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${side.players.length}
                    ${side.players.length === 1
                        ? "PLAYER"
                        : "PLAYERS"}
                </span>

                <button
                    onclick="changePlayerCount(${index}, 1)"
                >
                    +
                </button>

            </div>

            ${teamHTML}

            ${playersHTML}

        `;

        container.appendChild(card);

    });


    const count =
        document.getElementById("sideCount");

    if (count) {
        count.textContent =
            `${game.sides.length} sides`;
    }
}


/* =========================================================
   UPDATE PLAYER / TEAM
   ========================================================= */

function updatePlayer(
    sideIndex,
    playerIndex,
    value
) {

    game.sides[sideIndex]
        .players[playerIndex] =
        value.trim();
}


function updateTeamName(
    sideIndex,
    value
) {

    game.sides[sideIndex]
        .teamName =
        value.trim();
}


/* =========================================================
   ROUNDS
   ========================================================= */

function selectRounds(number) {

    number = Math.max(
        1,
        Math.min(100, Number(number))
    );

    game.rounds = number;

    setText(
        "roundDisplay",
        number
    );

    document
        .querySelectorAll("[data-round]")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                Number(button.dataset.round) === number
            );

        });

    const custom =
        document.getElementById("customRounds");

    if (custom) {
        custom.value = "";
    }
}


function setCustomRounds() {

    const input =
        document.getElementById("customRounds");

    if (!input) return;

    let value = Number(input.value);

    if (!value || value < 1) return;

    value = Math.min(
        100,
        Math.floor(value)
    );

    game.rounds = value;

    setText(
        "roundDisplay",
        value
    );

    document
        .querySelectorAll("[data-round]")
        .forEach(button => {
            button.classList.remove("selected");
        });
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

    if (game.sides.length < 2) {
        alert("Add at least 2 sides.");
        return;
    }


    for (const side of game.sides) {

        for (const player of side.players) {

            if (!player.trim()) {
                alert("Please enter every player name.");
                return;
            }
        }


        if (
            side.players.length > 1 &&
            !side.teamName.trim()
        ) {

            alert(
                "A side with multiple players needs a team name."
            );

            return;
        }
    }


    game.currentRound = 1;
    game.currentSideIndex = 0;

    game.topicHistory = [];
    game.targetHistory = [];

    game.topic = null;
    game.topicIndex = -1;

    game.sides.forEach(side => {
        side.score = 0;
    });

    startRound();
}


/* =========================================================
   START ROUND
   ========================================================= */

function startRound() {

    game.revealed = false;
    game.roundFinished = false;

    game.guessAngle = 0;
    game.roundPoints = 0;
    game.roundZone = "OUTSIDE";

    chooseRandomTopic();
    chooseRandomTarget();

    const side =
        game.sides[game.currentSideIndex];

    updateTurnInformation(side);

    showScreen("clueScreen");

    setTimeout(() => {
        drawClueCanvas();
    }, 50);
}


/* =========================================================
   TOPIC
   ========================================================= */

function chooseRandomTopic() {

    let available = [];

    for (
        let i = 0;
        i < allTopics.length;
        i++
    ) {

        if (!game.topicHistory.includes(i)) {
            available.push(i);
        }
    }


    if (available.length === 0) {

        game.topicHistory = [];

        available =
            allTopics.map((_, i) => i);
    }


    const index =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    game.topicIndex = index;

    game.topic =
        allTopics[index];

    game.topicHistory.push(index);
}


/* =========================================================
   TARGET
   ========================================================= */

function chooseRandomTarget() {

    let target;

    do {

        target =
            Math.floor(
                Math.random() * 121
            ) - 60;

    } while (
        game.targetHistory.includes(target)
    );


    game.targetHistory.push(target);

    game.targetAngle = target;
}


/* =========================================================
   TURN INFORMATION
   ========================================================= */

function updateTurnInformation(side) {

    const name =
        getSideDisplayName(side);

    setText(
        "clueTeamName",
        name
    );

    setText(
        "cluePlayers",
        side.players.join(" • ")
    );

    setText(
        "guessTeamName",
        name
    );


    setText(
        "clueRound",
        game.currentRound
    );

    setText(
        "totalRounds",
        game.rounds
    );

    setText(
        "guessRound",
        game.currentRound
    );

    setText(
        "guessTotal",
        game.rounds
    );


    const left =
        game.topic[0];

    const right =
        game.topic[1];


    setText(
        "topicText",
        `${left} ↔ ${right}`
    );

    setText(
        "leftTopic",
        left
    );

    setText(
        "rightTopic",
        right
    );

    setText(
        "guessLeftTopic",
        left
    );

    setText(
        "guessRightTopic",
        right
    );

    setText(
        "resultLeftTopic",
        left
    );

    setText(
        "resultRightTopic",
        right
    );
}


function getSideDisplayName(side) {

    if (side.players.length === 1) {
        return side.players[0];
    }

    return side.teamName;
}


/* =========================================================
   HIDE TARGET
   ========================================================= */

function hideTarget() {

    showScreen("guessScreen");

    game.guessAngle = 0;

    setTimeout(() => {
        drawGuessCanvas();
    }, 50);
}


/* =========================================================
   SKIP
   ========================================================= */

function skipRound() {

    game.roundPoints = 0;
    game.roundZone = "SKIPPED";

    game.roundFinished = true;

    showResult();
}


/* =========================================================
   REVEAL TARGET
   ========================================================= */

function revealTarget() {

    if (game.roundFinished) return;

    game.roundFinished = true;
    game.revealed = true;

    const difference =
        Math.abs(
            game.guessAngle -
            game.targetAngle
        );


    /*
       SCORING

       0 - 3° GREEN = 3
       3 - 6° YELLOW = 2
       6 - 9° ORANGE = 1
       9 - 12° RED = 0

       Outside 12° = 0
    */

    if (difference <= 3) {

        game.roundPoints = 3;
        game.roundZone = "GREEN";

    } else if (difference <= 6) {

        game.roundPoints = 2;
        game.roundZone = "YELLOW";

    } else if (difference <= 9) {

        game.roundPoints = 1;
        game.roundZone = "ORANGE";

    } else if (difference <= 12) {

        game.roundPoints = 0;
        game.roundZone = "RED";

    } else {

        game.roundPoints = 0;
        game.roundZone = "OUTSIDE";
    }


    game.sides[
        game.currentSideIndex
    ].score += game.roundPoints;


    showResult();
}


/* =========================================================
   RESULT
   ========================================================= */

function showResult() {

    const side =
        game.sides[game.currentSideIndex];

    setText(
        "resultTeam",
        getSideDisplayName(side)
    );

    setText(
        "pointsEarned",
        game.roundPoints
    );


    let message = "";

    if (game.roundZone === "GREEN") {

        message =
            "🟢 PERFECT! Exactly in the green zone!";

    } else if (game.roundZone === "YELLOW") {

        message =
            "🟡 Great guess! You landed in yellow.";

    } else if (game.roundZone === "ORANGE") {

        message =
            "🟠 Close! You landed in orange.";

    } else if (game.roundZone === "RED") {

        message =
            "🔴 You were close, but missed the scoring zones.";

    } else if (game.roundZone === "SKIPPED") {

        message =
            "⏭️ Round skipped. No points.";

    } else {

        message =
            "⚫ Outside the target. No points.";
    }


    /*
       Show round scoreboard
       directly on result screen.
    */

    let roundBoard =
        "<strong>ROUND SCOREBOARD</strong><br><br>";

    game.sides.forEach((s, index) => {

        const isCurrent =
            index === game.currentSideIndex;

        roundBoard += `
            <div style="
                display:flex;
                justify-content:space-between;
                margin:5px 0;
                font-weight:${isCurrent ? "900" : "700"};
            ">
                <span>
                    ${escapeHTML(
                        getSideDisplayName(s)
                    )}
                </span>

                <span>
                    ${s.score}
                </span>
            </div>
        `;
    });


    setText(
        "resultMessage",
        message
    );


    const messageElement =
        document.getElementById("resultMessage");

    if (messageElement) {

        messageElement.innerHTML =
            `${message}<br><br>${roundBoard}`;
    }


    showScreen("resultScreen");


    setTimeout(() => {

        drawResultCanvas();

    }, 50);
}
/* =========================================================
   NEXT ROUND
   ========================================================= */

function nextRound() {

    if (
        game.currentRound >=
        game.rounds
    ) {

        showGameOver();

        return;
    }


    game.currentRound++;

    game.currentSideIndex++;

    if (
        game.currentSideIndex >=
        game.sides.length
    ) {

        game.currentSideIndex = 0;
    }


    startRound();
}


/* =========================================================
   GAME OVER
   ========================================================= */

function showGameOver() {

    let winner =
        game.sides[0];

    game.sides.forEach(side => {

        if (side.score > winner.score) {
            winner = side;
        }
    });


    setText(
        "winnerName",
        getSideDisplayName(winner)
    );

    setText(
        "winnerScore",
        winner.score
    );


    /*
       Sort a copy only for display.
       Original side order stays unchanged.
    */

    const ranking =
        [...game.sides].sort(
            (a, b) =>
                b.score - a.score
        );


    const list =
        document.getElementById(
            "finalScoreList"
        );


    if (!list) return;


    list.innerHTML = "";


    ranking.forEach((side, index) => {

        const row =
            document.createElement("div");

        row.className =
            "final-score-row";


        let medal = "";

        if (index === 0) medal = "👑 ";
        else if (index === 1) medal = "🥈 ";
        else if (index === 2) medal = "🥉 ";


        row.innerHTML = `
            <span>
                ${medal}${escapeHTML(
                    getSideDisplayName(side)
                )}
            </span>

            <strong>
                ${side.score} pts
            </strong>
        `;


        list.appendChild(row);
    });


    showScreen("gameOverScreen");
}


/* =========================================================
   PLAY AGAIN
   ========================================================= */

function restartGame() {

    /*
       IMPORTANT:
       Keep the same players and sides.
       Only reset scores and game progress.
    */

    game.currentRound = 1;
    game.currentSideIndex = 0;

    game.topicHistory = [];
    game.targetHistory = [];

    game.topic = null;
    game.topicIndex = -1;

    game.targetAngle = 0;
    game.guessAngle = 0;

    game.revealed = false;
    game.roundFinished = false;

    game.roundPoints = 0;
    game.roundZone = "OUTSIDE";


    game.sides.forEach(side => {
        side.score = 0;
    });


    startRound();
}


/* =========================================================
   CLUE CANVAS
   ========================================================= */

function drawClueCanvas() {

    const canvas =
        document.getElementById(
            "waveCanvas"
        );

    if (!canvas) return;


    setupCanvas(canvas);

    const ctx =
        canvas.getContext("2d");


    const size =
        canvas.width;

    const cx =
        size / 2;

    const cy =
        size * 0.92;

    const radius =
        size * 0.43;


    drawBaseArc(
        ctx,
        cx,
        cy,
        radius
    );


    /*
       TARGET ZONES

       Equal intervals:

       GREEN = 0 - 3°
       YELLOW = 3 - 6°
       ORANGE = 6 - 9°
       RED = 9 - 12°

       Each zone is symmetrical
       around targetAngle.
    */

    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        0,
        3,
        "#39D98A"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        3,
        6,
        "#FFD84D"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        6,
        9,
        "#FF9F43"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        9,
        12,
        "#FF5C65"
    );


    /*
       Target centre marker
    */

    drawNeedle(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        "#ff1744"
    );
}


/* =========================================================
   GUESS CANVAS
   ========================================================= */

function drawGuessCanvas() {

    const canvas =
        document.getElementById(
            "guessCanvas"
        );

    if (!canvas) return;


    setupCanvas(canvas);

    const ctx =
        canvas.getContext("2d");

    const size =
        canvas.width;

    const cx =
        size / 2;

    const cy =
        size * 0.92;

    const radius =
        size * 0.43;


    drawBaseArc(
        ctx,
        cx,
        cy,
        radius
    );


    /*
       Guess screen hides target.
       Only the guess needle is visible.
    */

    drawNeedle(
        ctx,
        cx,
        cy,
        radius,
        game.guessAngle,
        "#e53935"
    );
}
/* =========================================================
   RESULT CANVAS
   ========================================================= */

function drawResultCanvas() {

    const canvas =
        document.getElementById(
            "resultCanvas"
        );

    if (!canvas) return;


    setupCanvas(canvas);

    const ctx =
        canvas.getContext("2d");

    const size =
        canvas.width;

    const cx =
        size / 2;

    const cy =
        size * 0.92;

    const radius =
        size * 0.43;


    drawBaseArc(
        ctx,
        cx,
        cy,
        radius
    );


    /*
       Draw all target zones again.
    */

    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        0,
        3,
        "#39D98A"
    );

    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        3,
        6,
        "#FFD84D"
    );

    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        6,
        9,
        "#FF9F43"
    );

    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        9,
        12,
        "#FF5C65"
    );


    /*
       Target
    */

    drawNeedle(
        ctx,
        cx,
        cy,
        radius,
        game.targetAngle,
        "#e53935"
    );


    /*
       Guess needle
    */

    drawNeedle(
        ctx,
        cx,
        cy,
        radius,
        game.guessAngle,
        "#222222"
    );
}


/* =========================================================
   CANVAS SETUP
   ========================================================= */

function setupCanvas(canvas) {

    const rect =
        canvas.getBoundingClientRect();

    const width =
        Math.max(
            300,
            Math.floor(rect.width)
        );

    const height =
        Math.floor(width * 0.55);

    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    /*
       After scaling, use CSS-sized
       coordinates.
    */

    canvas._displayWidth = width;
    canvas._displayHeight = height;
}


/* =========================================================
   BASE ARC
   ========================================================= */

function drawBaseArc(
    ctx,
    cx,
    cy,
    radius
) {

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius,
        Math.PI,
        2 * Math.PI
    );

    ctx.lineTo(
        cx,
        cy
    );

    ctx.closePath();

    ctx.fillStyle =
        "#e4e8f0";

    ctx.fill();


    /*
       Outer border
    */

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius,
        Math.PI,
        2 * Math.PI
    );

    ctx.strokeStyle =
        "#d1d7e2";

    ctx.lineWidth = 2;

    ctx.stroke();
}


/* =========================================================
   ANGLE BAND
   ========================================================= */

function drawAngleBand(
    ctx,
    cx,
    cy,
    radius,
    centerAngle,
    innerAngle,
    outerAngle,
    color
) {

    const leftOuter =
        centerAngle - outerAngle;

    const rightOuter =
        centerAngle + outerAngle;

    const leftInner =
        centerAngle - innerAngle;

    const rightInner =
        centerAngle + innerAngle;


    drawWedge(
        ctx,
        cx,
        cy,
        radius,
        leftOuter,
        leftInner,
        color
    );


    drawWedge(
        ctx,
        cx,
        cy,
        radius,
        rightInner,
        rightOuter,
        color
    );
}


/* =========================================================
   WEDGE
   ========================================================= */

function drawWedge(
    ctx,
    cx,
    cy,
    radius,
    startDegree,
    endDegree,
    color
) {

    const start =
        degreeToCanvasAngle(
            startDegree
        );

    const end =
        degreeToCanvasAngle(
            endDegree
        );


    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.arc(
        cx,
        cy,
        radius,
        start,
        end
    );

    ctx.closePath();

    ctx.fillStyle =
        color;

    ctx.fill();
}


/* =========================================================
   DEGREE → CANVAS ANGLE
   ========================================================= */

function degreeToCanvasAngle(degree) {

    /*
       0° = straight up
       negative = left
       positive = right
    */

    return (
        -Math.PI / 2 +
        degree *
        Math.PI /
        180
    );
}


/* =========================================================
   NEEDLE
   ========================================================= */

function drawNeedle(
    ctx,
    cx,
    cy,
    radius,
    angle,
    color
) {

    const radians =
        degreeToCanvasAngle(angle);


    const needleLength =
        radius * 0.94;


    const x =
        cx +
        Math.cos(radians) *
        needleLength;

    const y =
        cy +
        Math.sin(radians) *
        needleLength;


    ctx.beginPath();

    ctx.moveTo(
        cx,
        cy
    );

    ctx.lineTo(
        x,
        y
    );

    ctx.strokeStyle =
        color;

    ctx.lineWidth = 6;

    ctx.lineCap =
        "round";

    ctx.stroke();


    /*
       Centre circle
    */

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        9,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        color;

    ctx.fill();
}


/* =========================================================
   GUESS NEEDLE DRAGGING
   ========================================================= */

function getGuessAngle(event) {

    const canvas =
        document.getElementById(
            "guessCanvas"
        );

    if (!canvas) return 0;


    const rect =
        canvas.getBoundingClientRect();

    const x =
        event.clientX -
        rect.left;

    const y =
        event.clientY -
        rect.top;


    const cx =
        rect.width / 2;

    const cy =
        rect.height * 0.92;


    let angle =
        Math.atan2(
            y - cy,
            x - cx
        ) *
        180 /
        Math.PI;


    /*
       Convert canvas angle into
       our Wavelength angle system.
    */

    angle += 90;


    /*
       Keep needle inside semicircle.
    */

    angle =
        Math.max(
            -60,
            Math.min(60, angle)
        );


    return angle;
}


function updateGuess(event) {

    if (!draggingNeedle) return;

    game.guessAngle =
        getGuessAngle(event);

    drawGuessCanvas();
}
/* =========================================================
   POINTER EVENTS
   ========================================================= */

document.addEventListener(
    "pointerdown",
    event => {

        const canvas =
            document.getElementById(
                "guessCanvas"
            );

        if (!canvas) return;

        if (
            !document
                .getElementById(
                    "guessScreen"
                )
                .classList.contains("active")
        ) {
            return;
        }


        draggingNeedle = true;

        canvas.setPointerCapture?.(
            event.pointerId
        );

        game.guessAngle =
            getGuessAngle(event);

        drawGuessCanvas();
    }
);


document.addEventListener(
    "pointermove",
    event => {

        updateGuess(event);
    }
);


document.addEventListener(
    "pointerup",
    () => {

        draggingNeedle = false;
    }
);


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        const clue =
            document.getElementById(
                "clueScreen"
            );

        const guess =
            document.getElementById(
                "guessScreen"
            );

        const result =
            document.getElementById(
                "resultScreen"
            );


        if (
            clue &&
            clue.classList.contains("active")
        ) {
            drawClueCanvas();
        }

        if (
            guess &&
            guess.classList.contains("active")
        ) {
            drawGuessCanvas();
        }

        if (
            result &&
            result.classList.contains("active")
        ) {
            drawResultCanvas();
        }
    }
);


/* =========================================================
   HELPERS
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            value;
    }
}


function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}
