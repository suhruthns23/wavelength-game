/* =========================================================
   WAVELENGTH V2
   SCRIPT.JS — PART 1 OF 4
   ========================================================= */


/* =========================================================
   TOPICS
   ========================================================= */

const topics = [

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
    ["Sweet", "Savory"],
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
    ["High stress", "Low stress"],
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
    ["Clean job", "Dirty job"],
    ["Good smell", "Bad smell"],
    ["Good music", "Bad music"],
    ["Good superpower", "Bad superpower"],
    ["Good gift", "Bad gift"],
    ["Good pet", "Bad pet"],
    ["Good advice", "Bad advice"],
    ["Good idea", "Bad idea"],
    ["High tech", "Low tech"],
    ["High risk", "Low risk"],
    ["Early morning", "Late night"],
    ["Indoor", "Outdoor"],
    ["Public", "Private"],
    ["Fragile", "Unbreakable"],
    ["Calm", "Chaotic"],
    ["Mainstream", "Niche"],
    ["Overpaid", "Underpaid"],
    ["Overplayed", "Underplayed"],
    ["Overcooked", "Undercooked"],
    ["Overdressed", "Underdressed"],
    ["Healthy snack", "Unhealthy snack"],
    ["Easy chore", "Hard chore"],
    ["Easy job", "Hard job"],
    ["Easy language", "Hard language"],
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
    ["Best decade", "Worst decade"],
    ["Best season", "Worst season"],
    ["Best day of the week", "Worst day of the week"],
    ["Best feeling", "Worst feeling"]

];


/* =========================================================
   EXTRA EASY TOPICS
   ========================================================= */

const extraTopics = [

    ["Day", "Night"],
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
    ["Good design", "Bad design"],
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
    ["Good job", "Bad job"],
    ["Good advice", "Bad advice"],
    ["Good choice", "Bad choice"],
    ["Good habit", "Bad habit"],
    ["Good morning", "Bad morning"],
    ["Good night", "Bad night"]

];


const allTopics = [
    ...topics,
    ...extraTopics
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

    roundFinished: false

};


let sideId = 0;

let draggingNeedle = false;


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeGame();

});


function initializeGame() {

    showScreen("homeScreen");

}


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const target = document.getElementById(screenId);

    if (target) {

        target.classList.add("active");

    }

}


/* =========================================================
   PLAY BUTTON
   ========================================================= */

function playGame() {

    showSetup();

}


/* =========================================================
   SETUP
   ========================================================= */

function showSetup() {

    showScreen("setupScreen");


    if (game.sides.length === 0) {

        game.sides = [

            createSide(),

            createSide()

        ];

    }


    renderSides();

    selectRounds(5);

}


/* =========================================================
   CREATE SIDE
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


/* =========================================================
   ADD SIDE / TEAM
   ========================================================= */

function addSide() {

    game.sides.push(createSide());

    renderSides();

}


/* =========================================================
   REMOVE SIDE
   ========================================================= */

function removeSide(index) {

    if (game.sides.length <= 2) {

        alert("You need at least 2 sides.");

        return;

    }


    game.sides.splice(index, 1);

    renderSides();

}


/* =========================================================
   PLAYER COUNT
   ========================================================= */

function changePlayerCount(index, change) {

    const side = game.sides[index];

    let count =
        side.players.length + change;


    count =
        Math.max(
            1,
            Math.min(10, count)
        );


    while (side.players.length < count) {

        side.players.push("");

    }


    while (side.players.length > count) {

        side.players.pop();

    }


    /*
       If it becomes a single-player side,
       team name is no longer required.
    */

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


        card.className =
            "side-card";


        let playerInputs = "";


        side.players.forEach(
            (player, playerIndex) => {

                playerInputs += `

                    <input
                        class="player-input"
                        type="text"
                        placeholder="Player ${playerIndex + 1} name"
                        value="${escapeHTML(player)}"
                        onchange="updatePlayer(${index}, ${playerIndex}, this.value)"
                    >

                `;

            }
        );


        let teamHTML = "";


        /*
           TEAM NAME APPEARS ONLY
           WHEN THERE ARE 2 OR MORE PLAYERS.
        */

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
                    aria-label="Remove side"
                >
                    ✕
                </button>

            </div>


            <div class="player-count">

                <button
                    type="button"
                    onclick="changePlayerCount(${index}, -1)"
                >
                    −
                </button>

                <span>

                    ${side.players.length}

                    ${
                        side.players.length === 1
                        ? "PLAYER"
                        : "PLAYERS"
                    }

                </span>

                <button
                    type="button"
                    onclick="changePlayerCount(${index}, 1)"
                >
                    +
                </button>

            </div>


            ${teamHTML}

            ${playerInputs}

        `;


        container.appendChild(card);

    });


    const sideCount =
        document.getElementById("sideCount");


    if (sideCount) {

        sideCount.textContent =
            `${game.sides.length} sides`;

    }

}


/* =========================================================
   UPDATE PLAYER
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


/* =========================================================
   UPDATE TEAM NAME
   ========================================================= */

function updateTeamName(
    sideIndex,
    value
) {

    game.sides[sideIndex]
        .teamName =
        value.trim();

}


/* =========================================================
   ROUND SELECTION
   ========================================================= */

function selectRounds(number) {

    number =
        Math.max(
            1,
            Math.min(100, Number(number))
        );


    game.rounds = number;


    const display =
        document.getElementById("roundDisplay");


    if (display) {

        display.textContent =
            number;

    }


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


/* =========================================================
   CUSTOM ROUND COUNT
   ========================================================= */

function setCustomRounds() {

    const input =
        document.getElementById("customRounds");


    if (!input) return;


    const value =
        Number(input.value);


    if (!value || value < 1) {

        return;

    }


    game.rounds =
        Math.min(
            100,
            Math.floor(value)
        );


    const display =
        document.getElementById("roundDisplay");


    if (display) {

        display.textContent =
            game.rounds;

    }


    document
        .querySelectorAll("[data-round]")
        .forEach(button => {

            button.classList.remove("selected");

        });

}
/* =========================================================
   WAVELENGTH V2
   SCRIPT.JS — PART 2 OF 4
   CONTINUED
   ========================================================= */


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

    if (game.sides.length < 2) {

        alert("Add at least 2 sides.");

        return;

    }


    /*
       Validate every player.
    */

    for (let side of game.sides) {

        for (let player of side.players) {

            if (!player.trim()) {

                alert(
                    "Please enter every player name."
                );

                return;

            }

        }


        /*
           Team name is required only when
           there are multiple players.
        */

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


    /*
       Reset game.
    */

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


    chooseRandomTopic();

    chooseRandomTarget();


    const side =
        game.sides[
            game.currentSideIndex
        ];


    updateTurnInformation(side);


    showScreen("clueScreen");


    setTimeout(() => {

        drawClueCanvas();

    }, 80);

}


/* =========================================================
   RANDOM TOPIC
   ========================================================= */

function chooseRandomTopic() {

    /*
       Use indexes instead of object references.
       This prevents duplicate topics such as
       Hot/Cold appearing incorrectly in history.
    */

    let availableIndexes = [];


    for (
        let i = 0;
        i < allTopics.length;
        i++
    ) {

        if (
            !game.topicHistory.includes(i)
        ) {

            availableIndexes.push(i);

        }

    }


    /*
       Once every topic has been used,
       start a fresh topic cycle.
    */

    if (availableIndexes.length === 0) {

        game.topicHistory = [];

        availableIndexes =
            allTopics.map(
                (_, index) => index
            );

    }


    const randomPosition =
        Math.floor(
            Math.random() *
            availableIndexes.length
        );


    const selectedIndex =
        availableIndexes[randomPosition];


    game.topicIndex =
        selectedIndex;


    game.topic =
        allTopics[selectedIndex];


    game.topicHistory.push(
        selectedIndex
    );

}


/* =========================================================
   RANDOM TARGET
   ========================================================= */

function chooseRandomTarget() {

    /*
       Target is an angle between
       -80° and +80°.

       This keeps it comfortably inside
       the semicircle.
    */

    let target;


    do {

        target =
            Math.floor(
                Math.random() * 161
            ) - 80;


    } while (
        game.targetHistory.includes(target)
    );


    game.targetHistory.push(target);

    game.targetAngle =
        target;

}


/* =========================================================
   TURN INFORMATION
   ========================================================= */

function updateTurnInformation(side) {

    const displayName =
        getSideDisplayName(side);


    /*
       CLUE MASTER
    */

    setText(
        "clueTeamName",
        displayName
    );


    setText(
        "cluePlayers",
        side.players.join(" • ")
    );


    /*
       GUESSER
    */

    setText(
        "guessTeamName",
        displayName
    );


    /*
       ROUND NUMBERS
    */

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


    /*
       TOPIC
    */

    const topicLeft =
        game.topic[0];


    const topicRight =
        game.topic[1];


    setText(
        "topicText",
        `${topicLeft}  ↔  ${topicRight}`
    );


    setText(
        "leftTopic",
        topicLeft
    );


    setText(
        "rightTopic",
        topicRight
    );


    setText(
        "guessLeftTopic",
        topicLeft
    );


    setText(
        "guessRightTopic",
        topicRight
    );


    setText(
        "resultLeftTopic",
        topicLeft
    );


    setText(
        "resultRightTopic",
        topicRight
    );


    /*
       Role labels.

       If your HTML has these IDs,
       they will automatically update.
    */

    setText(
        "clueRole",
        "CLUE MASTER"
    );


    setText(
        "guessRole",
        "GUESSER"
    );

}


/* =========================================================
   SIDE DISPLAY NAME
   ========================================================= */

function getSideDisplayName(side) {

    /*
       ONE PLAYER:
       Player's name is displayed.

       MULTIPLE PLAYERS:
       Team name is displayed.
    */

    if (
        side.players.length === 1
    ) {

        return side.players[0];

    }


    return side.teamName;

}


/* =========================================================
   TEXT HELPER
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

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


/* =========================================================
   CANVAS SETUP
   ========================================================= */

function setupCanvas(canvas) {

    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    const width =
        rect.width;


    const height =
        width * 0.55;


    canvas.width =
        width * dpr;


    canvas.height =
        height * dpr;


    const ctx =
        canvas.getContext("2d");


    /*
       Reset transform first.
       This prevents blurry / incorrectly
       scaled drawings after redraws.
    */

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    return {

        ctx,

        width,

        height

    };

}


/* =========================================================
   ANGLE → POINT
   ========================================================= */

function angleToPoint(
    cx,
    cy,
    radius,
    angle
) {

    const radians =
        (angle - 90) *
        Math.PI / 180;


    return {

        x:
            cx +
            radius *
            Math.cos(radians),

        y:
            cy +
            radius *
            Math.sin(radians)

    };

}


/* =========================================================
   NORMALIZE ANGLE
   ========================================================= */

function normalizeAngle(angle) {

    while (angle > 180) {

        angle -= 360;

    }


    while (angle < -180) {

        angle += 360;

    }


    return angle;

}


/* =========================================================
   WAVE DRAWING
   ========================================================= */

function drawWave(
    canvas,
    targetAngle,
    needleAngle,
    showTarget,
    showNeedle
) {

    if (!canvas) return;


    const {
        ctx,
        width,
        height
    } =
        setupCanvas(canvas);


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const cx =
        width / 2;


    const cy =
        height - 15;


    const radius =
        Math.min(
            width * 0.46,
            height * 1.55
        );


    /*
       Base semicircle.
    */

    drawBaseWave(
        ctx,
        cx,
        cy,
        radius
    );


    /*
       Target zones.
    */

    if (showTarget) {

        drawTargetZones(
            ctx,
            cx,
            cy,
            radius,
            targetAngle
        );

    }


    /*
       Guess needle.
    */

    if (showNeedle) {

        drawNeedle(
            ctx,
            cx,
            cy,
            radius,
            needleAngle
        );

    }


    /*
       Center hub.
    */

    drawCenterHub(
        ctx,
        cx,
        cy
    );

}


/* =========================================================
   BASE WAVE
   ========================================================= */

function drawBaseWave(
    ctx,
    cx,
    cy,
    radius
) {

    ctx.beginPath();


    ctx.moveTo(
        cx - radius,
        cy
    );


    ctx.arc(
        cx,
        cy,
        radius,
        Math.PI,
        2 * Math.PI
    );


    ctx.closePath();


    ctx.fillStyle =
        "#AAB5C4";


    ctx.fill();


}


/* =========================================================
   TARGET ZONES
   ========================================================= */

function drawTargetZones(
    ctx,
    cx,
    cy,
    radius,
    targetAngle
) {

    /*
       Wavelength scoring:

       GREEN  = 4
       YELLOW = 3
       ORANGE = 2
       RED    = 1

       Each zone is symmetrical
       around the target centre.

       Green:
       ±4.5°

       Yellow:
       4.5° → 13.5°

       Orange:
       13.5° → 22.5°

       Red:
       22.5° → 31.5°
    */


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        targetAngle,
        0,
        2.5,
        "#39D98A"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        targetAngle,
        2.5,
        7.5,
        "#FFD34E"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        targetAngle,
        7.5,
        12.5,
        "#FF9F43"
    );


    drawAngleBand(
        ctx,
        cx,
        cy,
        radius,
        targetAngle,
        12.5,
        17.5,
        "#FF5B63"
    );

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
        centerAngle -
        outerAngle;


    const rightOuter =
        centerAngle +
        outerAngle;


    const leftInner =
        centerAngle -
        innerAngle;


    const rightInner =
        centerAngle +
        innerAngle;


    /*
       Draw left half.
    */

    drawWedge(
        ctx,
        cx,
        cy,
        radius,
        leftOuter,
        leftInner,
        color
    );


    /*
       Draw right half.
    */

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
    startAngle,
    endAngle,
    color
) {

    const startRadians =
        (startAngle - 90) *
        Math.PI / 180;


    const endRadians =
        (endAngle - 90) *
        Math.PI / 180;


    ctx.beginPath();


    ctx.moveTo(
        cx,
        cy
    );


    ctx.arc(
        cx,
        cy,
        radius,
        startRadians,
        endRadians
    );


    ctx.closePath();


    ctx.fillStyle =
        color;


    ctx.fill();

}
/* =========================================================
   WAVELENGTH V2
   SCRIPT.JS — PART 3 OF 4
   CONTINUED
   ========================================================= */


/* =========================================================
   DRAW NEEDLE
   ========================================================= */

function drawNeedle(
    ctx,
    cx,
    cy,
    radius,
    angle
) {

    /*
       This is the actual guessing needle.
       It is NOT a 🎯 symbol.
    */

    const tip =
        angleToPoint(
            cx,
            cy,
            radius * 0.96,
            angle
        );


    /*
       Main needle line.
    */

    ctx.beginPath();


    ctx.moveTo(
        cx,
        cy
    );


    ctx.lineTo(
        tip.x,
        tip.y
    );


    ctx.lineWidth =
        7;


    ctx.lineCap =
        "round";


    ctx.strokeStyle =
        "#FF3F52";


    ctx.stroke();


    /*
       Needle tip.
    */

    ctx.beginPath();


    ctx.arc(
        tip.x,
        tip.y,
        5,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#FF3F52";


    ctx.fill();

}


/* =========================================================
   CENTER HUB
   ========================================================= */

function drawCenterHub(
    ctx,
    cx,
    cy
) {

    ctx.beginPath();


    ctx.arc(
        cx,
        cy,
        9,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#FF3F52";


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        cx,
        cy,
        3,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#FFFFFF";


    ctx.fill();

}


/* =========================================================
   CLUE PHASE
   ========================================================= */

function drawClueCanvas() {

    const canvas =
        document.getElementById(
            "waveCanvas"
        );


    if (!canvas) return;


    /*
       Clue Master can see:
       - topic
       - target
       - scoring zones

       No guessing needle yet.
    */

    drawWave(
        canvas,
        game.targetAngle,
        0,
        true,
        false
    );

}


/* =========================================================
   HIDE TARGET
   ========================================================= */

function hideTarget() {

    /*
       Move to guessing screen.
    */

    game.revealed =
        false;


    game.guessAngle =
        0;


    showScreen(
        "guessScreen"
    );


    setTimeout(() => {

        drawGuessCanvas();

        enableNeedleDragging();

    }, 80);

}


/* =========================================================
   DRAW GUESS CANVAS
   ========================================================= */

function drawGuessCanvas() {

    const canvas =
        document.getElementById(
            "guessCanvas"
        );


    if (!canvas) return;


    /*
       Target is completely hidden.
       Only the grey semicircle and needle
       are visible.
    */

    drawWave(
        canvas,
        game.targetAngle,
        game.guessAngle,
        false,
        true
    );

}


/* =========================================================
   ENABLE NEEDLE DRAGGING
   ========================================================= */

function enableNeedleDragging() {

    const canvas =
        document.getElementById(
            "guessCanvas"
        );


    if (!canvas) return;


    /*
       Remove previous listeners by
       assigning fresh handlers.
    */

    canvas.onpointerdown =
        function (event) {

            if (game.roundFinished) {

                return;

            }


            draggingNeedle =
                true;


            try {

                canvas.setPointerCapture(
                    event.pointerId
                );

            } catch (error) {

                /* Ignore */

            }


            updateNeedleFromPointer(
                event
            );

        };


    canvas.onpointermove =
        function (event) {

            if (!draggingNeedle) {

                return;

            }


            updateNeedleFromPointer(
                event
            );

        };


    canvas.onpointerup =
        function () {

            draggingNeedle =
                false;

        };


    canvas.onpointercancel =
        function () {

            draggingNeedle =
                false;

        };


    canvas.onpointerleave =
        function () {

            /*
               Do NOT stop dragging here.
               On mobile, pointer capture handles it.
            */

        };

}


/* =========================================================
   UPDATE NEEDLE FROM POINTER
   ========================================================= */

function updateNeedleFromPointer(event) {

    const canvas =
        document.getElementById(
            "guessCanvas"
        );


    if (!canvas) return;


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
        rect.height - 15;


    /*
       Calculate angle from center.
    */

    let angle =
        Math.atan2(
            x - cx,
            -(y - cy)
        ) *
        180 /
        Math.PI;


    /*
       Keep needle inside
       the semicircle.
    */

    angle =
        Math.max(
            -89,
            Math.min(
                89,
                angle
            )
        );


    game.guessAngle =
        angle;


    drawGuessCanvas();

}


/* =========================================================
   REVEAL TARGET
   ========================================================= */

function revealTarget() {

    if (game.roundFinished) {

        return;

    }


    game.roundFinished =
        true;


    draggingNeedle =
        false;


    /*
       Calculate score.
    */

    const points =
        calculatePoints(
            game.targetAngle,
            game.guessAngle
        );


    const side =
        game.sides[
            game.currentSideIndex
        ];


    side.score +=
        points;


    /*
       Store result information.
    */

    setText(
        "resultTeam",
        getSideDisplayName(side)
    );


    setText(
        "pointsEarned",
        points
    );


    /*
       Result message.
    */

    let message;


    if (points === 4) {

        message =
            "🎯 PERFECT HIT!";

    }

    else if (points === 3) {

        message =
            "🔥 AMAZING GUESS!";

    }

    else if (points === 2) {

        message =
            "👍 NICE GUESS!";

    }

    else if (points === 1) {

        message =
            "😅 JUST INSIDE!";

    }

    else {

        message =
            "💀 OUTSIDE THE TARGET!";

    }


    setText(
        "resultMessage",
        message
    );


    /*
       Show score board if
       the HTML contains one.
    */

    renderScores(
        "resultScores"
    );


    showScreen(
        "resultScreen"
    );


    setTimeout(() => {

        drawResultCanvas();

    }, 80);

}


/* =========================================================
   CALCULATE POINTS
   ========================================================= */

function calculatePoints(
    target,
    guess
) {

    const distance =
        Math.abs(
            normalizeAngle(
                target - guess
            )
        );


    /*
       4 POINTS
       Green
       ±4.5°
    */

    if (distance <= 2.5) {

        return 4;

    }


    /*
       3 POINTS
       Yellow
    */

    if (distance <= 7.5) {

        return 3;

    }


    /*
       2 POINTS
       Orange
    */

    if (distance <= 12.5) {

        return 2;

    }


    /*
       1 POINT
       Red
    */

    if (distance <= 17.5) {

        return 1;

    }


    /*
       Outside target.
    */

    return 0;

}


/* =========================================================
   DRAW RESULT CANVAS
   ========================================================= */

function drawResultCanvas() {

    const canvas =
        document.getElementById(
            "resultCanvas"
        );


    if (!canvas) return;


    /*
       Result screen shows:
       - target
       - all scoring zones
       - player's needle
    */

    drawWave(
        canvas,
        game.targetAngle,
        game.guessAngle,
        true,
        true
    );

}


/* =========================================================
   SKIP QUESTION
   ========================================================= */

function skipQuestion() {

    if (game.roundFinished) {

        return;

    }


    /*
       Skip means:
       - no points
       - no repeated target
       - move directly to next round
    */

    game.roundFinished =
        true;


    const side =
        game.sides[
            game.currentSideIndex
        ];


    setText(
        "resultTeam",
        getSideDisplayName(side)
    );


    setText(
        "pointsEarned",
        "0"
    );


    setText(
        "resultMessage",
        "⏭️ QUESTION SKIPPED"
    );


    renderScores(
        "resultScores"
    );


    showScreen(
        "resultScreen"
    );


    setTimeout(() => {

        drawResultCanvas();

    }, 80);

}


/* =========================================================
   NEXT ROUND
   ========================================================= */

function nextRound() {

    /*
       If all rounds are completed,
       show final winner.
    */

    if (
        game.currentRound >=
        game.rounds
    ) {

        showGameOver();

        return;

    }


    game.currentRound++;


    /*
       Automatically rotate sides.

       Example:

       Side 1
       Side 2
       Side 3
       Side 4
       Side 1
       ...

       No manual selection.
    */

    game.currentSideIndex =
        (
            game.currentSideIndex + 1
        ) %
        game.sides.length;


    startRound();

}


/* =========================================================
   SCOREBOARD
   ========================================================= */

function renderScores(
    containerId
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /*
       Sort only for display.
       Actual side order is not changed.
    */

    const sorted =
        [...game.sides].sort(
            (a, b) =>
                b.score - a.score
        );


    sorted.forEach(
        (side, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "score-row";


            row.innerHTML = `

                <span class="score-rank">
                    ${index + 1}
                </span>

                <span class="score-name">
                    ${escapeHTML(
                        getSideDisplayName(side)
                    )}
                </span>

                <span class="score-points">
                    ${side.score}
                </span>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   RENDER MAIN SCOREBOARD
   ========================================================= */

function renderMainScores() {

    renderScores(
        "gameScores"
    );


    renderScores(
        "resultScores"
    );

}


/* =========================================================
   GET WINNERS
   ========================================================= */

function getWinners() {

    const highestScore =
        Math.max(
            ...game.sides.map(
                side => side.score
            )
        );


    return game.sides.filter(
        side =>
            side.score ===
            highestScore
    );

}


/* =========================================================
   GET WINNER TEXT
   ========================================================= */

function getWinnerText() {

    const winners =
        getWinners();


    if (winners.length === 1) {

        return getSideDisplayName(
            winners[0]
        );

    }


    return winners
        .map(
            winner =>
                getSideDisplayName(winner)
        )
        .join(" & ");

}
/* =========================================================
   WAVELENGTH V2
   SCRIPT.JS — PART 4 OF 4
   CONTINUED / FINAL
   ========================================================= */


/* =========================================================
   GAME OVER
   ========================================================= */

function showGameOver() {

    const winners =
        getWinners();


    const winnerText =
        getWinnerText();


    /*
       Main winner text.
    */

    setText(
        "winnerName",
        winnerText
    );


    setText(
        "gameWinner",
        winnerText
    );


    setText(
        "finalWinner",
        winnerText
    );


    /*
       Winner score.
    */

    if (winners.length === 1) {

        setText(
            "winnerScore",
            winners[0].score
        );

    }

    else {

        setText(
            "winnerScore",
            winners[0].score
        );

    }


    /*
       Total rounds.
    */

    setText(
        "gameOverRounds",
        game.rounds
    );


    /*
       Render final scoreboard.
    */

    renderScores(
        "finalScores"
    );


    renderScores(
        "gameOverScores"
    );


    showScreen(
        "gameOverScreen"
    );

}


/* =========================================================
   RESTART SAME GAME
   ========================================================= */

function playAgain() {

    /*
       Keep teams and player names,
       but reset scores and round number.
    */

    game.currentRound =
        1;


    game.currentSideIndex =
        0;


    game.topicHistory =
        [];


    game.targetHistory =
        [];


    game.topic =
        null;


    game.topicIndex =
        -1;


    game.guessAngle =
        0;


    game.revealed =
        false;


    game.roundFinished =
        false;


    game.sides.forEach(
        side => {

            side.score =
                0;

        }
    );


    startRound();

}


/* =========================================================
   NEW GAME
   ========================================================= */

function newGame() {

    game = {

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

        roundFinished: false

    };


    sideId = 0;

    draggingNeedle =
        false;


    showSetup();

}


/* =========================================================
   HOME
   ========================================================= */

function goHome() {

    /*
       Do not destroy current game.
       This simply takes the user back
       to the title screen.
    */

    showScreen(
        "homeScreen"
    );

}


/* =========================================================
   BACK TO SETUP
   ========================================================= */

function backToSetup() {

    showScreen(
        "setupScreen"
    );


    renderSides();

}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
           Redraw the currently visible
           canvas after screen rotation
           or browser resize.
        */

        const clueScreen =
            document.getElementById(
                "clueScreen"
            );


        const guessScreen =
            document.getElementById(
                "guessScreen"
            );


        const resultScreen =
            document.getElementById(
                "resultScreen"
            );


        if (
            clueScreen &&
            clueScreen.classList.contains(
                "active"
            )
        ) {

            setTimeout(
                drawClueCanvas,
                50
            );

        }


        if (
            guessScreen &&
            guessScreen.classList.contains(
                "active"
            )
        ) {

            setTimeout(
                drawGuessCanvas,
                50
            );

        }


        if (
            resultScreen &&
            resultScreen.classList.contains(
                "active"
            )
        ) {

            setTimeout(
                drawResultCanvas,
                50
            );

        }

    }
);


/* =========================================================
   PREVENT ACCIDENTAL FORM SUBMISSION
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Enter inside a player/team input
           should not accidentally submit/start
           the entire game.
        */

        if (
            event.key === "Enter" &&
            event.target.matches(
                "input"
            )
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   PREVENT PAGE SCROLL WHILE DRAGGING
   ========================================================= */

document.addEventListener(
    "touchmove",
    function (event) {

        if (
            draggingNeedle &&
            event.target.closest(
                "#guessCanvas"
            )
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   DEBUG / SAFETY HELPER
   ========================================================= */

function getCurrentSide() {

    return game.sides[
        game.currentSideIndex
    ];

}


/* =========================================================
   OPTIONAL: MANUAL SCORE VIEW
   ========================================================= */

function showScores() {

    renderMainScores();


    const scoreScreen =
        document.getElementById(
            "scoreScreen"
        );


    if (scoreScreen) {

        showScreen(
            "scoreScreen"
        );

    }

}


/* =========================================================
   OPTIONAL: CLOSE SCORE VIEW
   ========================================================= */

function closeScores() {

    /*
       Return to whichever phase
       is currently appropriate.
    */

    if (
        game.roundFinished
    ) {

        showScreen(
            "resultScreen"
        );

        return;

    }


    if (
        draggingNeedle
    ) {

        showScreen(
            "guessScreen"
        );

        return;

    }


    showScreen(
        "clueScreen"
    );

}


/* =========================================================
   FINAL INITIALIZATION
   ========================================================= */

(function finalInitialization() {

    /*
       If the HTML loads this script before
       DOMContentLoaded, wait for it.

       If it has already loaded, setup will
       still work through the event listener
       at the top of this file.
    */

    if (
        document.readyState ===
        "interactive" ||
        document.readyState ===
        "complete"
    ) {

        /*
           Nothing else is required here.
        */

    }

})();
