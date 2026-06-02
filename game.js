const board = document.getElementById("board");

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const answerInput =
    document.getElementById("answerInput");

const submitAnswerBtn =
    document.getElementById("submitAnswerBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const choicesContainer =
    document.getElementById(
        "choicesContainer"
    );
const resultImage =
    document.getElementById(
        "resultImage"
    );

const resultCaption =
    document.getElementById(
        "resultCaption"
    );
const players = [

    {
        name: "Player 1",
        color: "red",
        position: 0,
        score: 0,
        finished: false
    },

    {
        name: "Player 2",
        color: "blue",
        position: 0,
        score: 0,
        finished: false
    },

    {
        name: "Player 3",
        color: "green",
        position: 0,
        score: 0,
        finished: false
    },

    {
        name: "Player 4",
        color: "purple",
        position: 0,
        score: 0,
        finished: false
    }
];

let gameEnded = false;

const playerTokens = [];

const tiles = [

    {
        name: "START",
        type: "start"
    },

    // ===== PHASE 1 =====

    {
        name: "1890",
        type: "history",

        image:
            "images/hcm_young.jpg",

        caption:
            "Nguyễn Tất Thành thời trẻ. Sinh năm 1890 tại Nghệ An.",

        question:
        "Hồ Chí Minh sinh năm nào?",

        choices: [

            "1880",
            "1890",
            "1900",
            "1910"

        ],

        correctAnswer:
            "1890",

        score: 1
    },

    {
        name: "Event",
        type: "event",

        image:
            "images/nhan_dan_giup.jpg",
        caption:
            "Nhân dân luôn là nguồn động lực to lớn cho cách mạng Việt Nam.",

        effect: "forward",

        value: 1,

        message:
        "Bạn nhận được sự giúp đỡ từ nhân dân! Tiến 1 bước."
    },

    {
        name: "Question",
        type: "history",

        image:
            "images/hcm_hometown.jpg",
        caption:
            "Làng Sen (Kim Liên, Nghệ An), quê hương Chủ tịch Hồ Chí Minh.",
        question:
        "Quê hương của Hồ Chí Minh ở đâu?",

        choices: [

            "Hà Nội",
            "Huế",
            "Nghệ An",
            "Thanh Hóa"

        ],

        correctAnswer:
            "Nghệ An",

        score: 1
    },

    // ===== PHASE 2 =====

    {
        name: "1911",
        type: "history",

        image:
            "images/ben_nha_rong.jpg",

        caption:
            "Bến Nhà Rồng - nơi Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.",

        question:
        "Năm 1911 gắn với sự kiện gì?",

        choices: [

            "Thành lập Đảng",
            "Ra đi tìm đường cứu nước",
            "Tuyên ngôn độc lập",
            "Khởi nghĩa vũ trang"

        ],

        correctAnswer:
            "Ra đi tìm đường cứu nước",

        score: 2
    },

    {
        name: "Penalty",
        type: "event",

        image:
            "images/thuc_dan_theo_doi.jpg",
        caption:
            "Thực dân luôn theo dõi và đàn áp các hoạt động cách mạng của Nguyễn Ái Quốc.",

        effect: "backward",

        value: 2,

        message:
        "Bị thực dân theo dõi! Lùi 2 bước."
    },

    {
        name: "1919",
        type: "history",

        image:
            "images/paris_1919.jpg",
        caption:
            "Nguyễn Ái Quốc gửi Bản yêu sách của nhân dân An Nam tại Paris năm 1919.",

        question:
        "Nguyễn Ái Quốc gửi bản yêu sách ở đâu?",

        choices: [

            "London",
            "Moscow",
            "Paris",
            "Tokyo"

        ],

        correctAnswer:
            "Paris",

        score: 1
    },

    
    {
        name: "Question",
        type: "history",

        question:
        "Ai là người tiếp cận chủ nghĩa Mác - Lênin?",

        choices: [

            "Phan Bội Châu",
            "Nguyễn Ái Quốc",
            "Trần Phú",
            "Võ Nguyên Giáp"

        ],

        correctAnswer:
            "Nguyễn Ái Quốc",

        score: 1
    },

    {
        name: "Bonus",
        type: "event",

        image:
            "images/tai_lieu.jpg",

        caption:
            "Tài liệu cách mạng quý giá giúp bạn tiến nhanh hơn trên con đường cách mạng.",
        effect: "forward",

        value: 2,

        message:
        "Bạn tìm được tài liệu cách mạng! Tiến 2 bước."
    },

    {
        name: "1920",
        type: "history",

        image:
            "images/mln_1920.jpg",

        caption:
            "Năm 1920, Nguyễn Ái Quốc tiếp cận chủ nghĩa Mác - Lênin tại Pháp.",
        question:
        "Năm 1920 đánh dấu điều gì?",

        choices: [

            "Tuyên ngôn độc lập",
            "Tiếp cận chủ nghĩa Mác - Lênin",
            "Thành lập Đảng",
            "Ra đi cứu nước"

        ],

        correctAnswer:
            "Tiếp cận chủ nghĩa Mác - Lênin",

        score: 2
    },

    // ===== PHASE 3 =====

    {
        name: "1930",
        type: "history",

        image:
            "images/thanh_lap_dang.jpg",

        caption:
            "Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng Cộng sản Việt Nam năm 1930.",

        question:
        "Sự kiện quan trọng năm 1930?",

        choices: [

            "Tuyên ngôn độc lập",
            "Khởi nghĩa Bắc Sơn",
            "Thành lập Đảng",
            "Chiến thắng Điện Biên Phủ"

        ],

        correctAnswer:
            "Thành lập Đảng",

        score: 2
    },

    {
        name: "Knowledge",

        type: "history",

        question:
        "Đảng Cộng sản Việt Nam được thành lập ở đâu?",

        choices: [

            "Hà Nội",
            "Huế",
            "Hồng Kông",
            "Paris"

        ],

        correctAnswer:
            "Hồng Kông",

        score: 2
    },

    {
        name: "Penalty",
        type: "event",

        image:
            "images/thieu_tai_lieu.jpg",
        caption:
            "Điềm báo cho những khó khăn sắp tới của cách mạng Việt Nam.",
        effect: "backward",

        value: 1,

        message:
        "Thiếu tài liệu hoạt động! Lùi 1 bước."
    },

    {
        name: "Question",
        type: "history",

        question:
        "Đảng Cộng sản Việt Nam thành lập năm nào?",

        choices: [

            "1911",
            "1920",
            "1930",
            "1945"

        ],

        correctAnswer:
            "1930",

        score: 1
    },

    // ===== PHASE 4 =====

    {
        name: "1945",
        type: "history",

        image:
            "images/tuyen_ngon_1945.jpg",

        caption:
            "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Ba Đình.",
        question:
        "Sự kiện lịch sử năm 1945?",

        choices: [

            "Thành lập Đảng",
            "Ra đi cứu nước",
            "Tuyên ngôn độc lập",
            "Khởi nghĩa Bắc Sơn"

        ],

        correctAnswer:
            "Tuyên ngôn độc lập",

        score: 3
    },

    {
        name: "Knowledge",

        type: "history",

        image:
            "images/quoc_khanh_2_9.jpg",
        caption:
            "Ngày Quốc khánh Việt Nam 2/9 hàng năm.",
        question:
        "Ngày Quốc khánh Việt Nam là ngày nào?",

        choices: [

            "30/4",
            "2/9",
            "19/8",
            "3/2"

        ],

        correctAnswer:
            "2/9",

        score: 1
    },

    {
        name: "Question",
        type: "history",

        image:
            "images/ba_dinh.jpg",
        caption:
            "Quảng trường Ba Đình - nơi diễn ra lễ tuyên ngôn độc lập năm 1945.",
        question:
        "Tuyên ngôn Độc lập được đọc ở đâu?",

        choices: [

            "Dinh Độc Lập",
            "Ba Đình",
            "Huế",
            "Hà Nội Opera House"

        ],

        correctAnswer:
            "Ba Đình",

        score: 1
    },

    {
        name: "Event",
        type: "event",

        image:
            "images/kiem_tra_tai_lieu.jpg",
        caption:
            "Kiểm tra tài liệu và kế hoạch hoạt động để tránh những sai lầm đáng tiếc.",
        effect: "backward",

        value: 1,

        message:
        "Bạn phải quay lại kiểm tra tài liệu và kế hoạch hoạt động. Lùi 1 bước."
    },

    {
        name: "Final Question",
        type: "history",

        question:
        "Tư tưởng Hồ Chí Minh nhấn mạnh điều gì về độc lập dân tộc?",

        choices: [

            "Độc lập kinh tế",
            "Độc lập quân sự",
            "Gắn liền với chủ nghĩa xã hội",
            "Hội nhập quốc tế"

        ],

        correctAnswer:
            "Gắn liền với chủ nghĩa xã hội",

        score: 3
    },

    {
        name: "VICTORY",
        type: "victory"
    }

];

const resultModal =
    document.getElementById(
        "resultModal"
    );

const winnerText =
    document.getElementById(
        "winnerText"
    );
const leader =
    [...players]
    .sort((a,b) => b.score - a.score)[0];
const finalScoreBoard =
    document.getElementById(
        "finalScoreBoard"
    );

const restartBtn =
    document.getElementById(
        "restartBtn"
    );

document
    .getElementById("startGameBtn")
    .addEventListener("click", () => {

        players[0].name =
            document.getElementById(
                "player1Name"
            ).value || "Player 1";

        players[1].name =
            document.getElementById(
                "player2Name"
            ).value || "Player 2";

        players[2].name =
            document.getElementById(
                "player3Name"
            ).value || "Player 3";

        players[3].name =
            document.getElementById(
                "player4Name"
            ).value || "Player 4";

        document.getElementById(
            "playerSetup"
        ).style.display = "none";

        updateTurnText();
        updateScoreText();
    });

for(let i = 0; i < tiles.length; i++){

    const tile = document.createElement("div");

    tile.classList.add("tile");

    tile.classList.add(tiles[i].type);

    // ===== PHASE COLOR =====

    if(i <= 4){

        tile.classList.add("phase1");

    }else if(i <= 9){

        tile.classList.add("phase2");

    }else if(i <= 14){

        tile.classList.add("phase3");

    }else{

        tile.classList.add("phase4");
    }

    tile.id = "tile-" + i;

    tile.innerText = tiles[i].name;
    const row =
        Math.floor(i / 5);

    const col =
        i % 5;

    tile.style.gridRow =
        row + 1;

    if(row % 2 === 0){

        tile.style.gridColumn =
            col + 1;

    }else{

        tile.style.gridColumn =
            5 - col;
    }

    board.appendChild(tile);
}

let currentPlayerIndex = 0;

function getCurrentPlayer(){

    return players[currentPlayerIndex];
}

function createPlayerTokens(){

    players.forEach((player, index) => {

        const token =
            document.createElement("div");

        token.classList.add("playerToken");

        token.style.background =
            player.color;

        document.body.appendChild(token);

        playerTokens.push(token);
    });
}

let isMoving = false;

function renderPlayers(){

    const offsets = [

        { x: -12, y: -12 }, // Player 1
        { x:  12, y: -12 }, // Player 2
        { x: -12, y:  12 }, // Player 3
        { x:  12, y:  12 }  // Player 4

    ];

    document
    .querySelectorAll(".tile")
    .forEach(tile =>
        tile.classList.remove("activeTile")
    );

    const currentTile =
        document.getElementById(
            "tile-" +
            getCurrentPlayer().position
        );

    currentTile.classList.add(
        "activeTile"
    );

    players.forEach((player, index) => {

        const tile =
            document.getElementById(
                "tile-" + player.position
            );

        const rect =
            tile.getBoundingClientRect();

        const offset =
            offsets[index];

        playerTokens[index].style.left =
            rect.left +
            window.scrollX +
            rect.width / 2 -
            15 +
            offset.x +
            "px";

        playerTokens[index].style.top =
            rect.top +
            window.scrollY +
            rect.height / 2 -
            15 +
            offset.y +
            "px";
    });
}

window.addEventListener("resize", () => {

    renderPlayers();
});

window.addEventListener("scroll", () => {

    renderPlayers();
});

const rollBtn = document.getElementById("rollBtn");

const diceInput =
    document.getElementById("diceInput");

rollBtn.addEventListener("click", () => {

    if(isMoving){
        return;
    }

    let dice =
        parseInt(diceInput.value);

    if(
        isNaN(dice) ||
        dice < 1 ||
        dice > 6
    ){
        alert(
            "Vui lòng nhập số từ 1 đến 6"
        );
        return;
    }

    document.getElementById(
        "diceText"
    ).innerText =
        "Kết quả xúc xắc: " + dice;

    movePlayer(dice);

    diceInput.value = "";
});

function updatePositionText(){

    const currentPlayer =
        getCurrentPlayer();

    document.getElementById(
        "positionText"
    ).innerText =

        currentPlayer.name +
        " đang ở: " +
        tiles[currentPlayer.position].name;
}

updatePositionText();

function updateTurnText(){

    document.getElementById(
        "turnText"
    ).innerText =

        "Lượt của: " +
        getCurrentPlayer().name;
}

function triggerTileEvent(){

    const currentPlayer =
        getCurrentPlayer();

    activeQuestionPlayer =
        currentPlayer;

    const tile =
        tiles[currentPlayer.position];

    switch(tile.type){

        case "history":

            showHistoryQuestion(tile);

            break;

        case "event":

            handleEvent(tile);

            break;

        case "victory":

            alert(
                currentPlayer.name +
                " đã tới đích!"
            );

            break;
    }
}

function showHistoryQuestion(tile){

    modalTitle.innerText =
        tile.name;

    modalText.innerText =
        tile.question;

    openModal();

    // Ẩn input cũ
    answerInput.style.display =
        "none";

    submitAnswerBtn.style.display =
        "none";

    // clear choices cũ
    choicesContainer.innerHTML = "";

    resultImage.style.display =
        "none";

    resultImage.src = "";

    resultCaption.innerText = "";
    // tạo button choices
    tile.choices.forEach(choice => {

        const btn =
            document.createElement("button");

        btn.classList.add("choiceBtn");

        btn.innerText = choice;

        btn.onclick = () => {

            if(choice === tile.correctAnswer){

                modalText.innerText =
                    "Chính xác! +" +
                    tile.score +
                    " điểm.";

                const currentPlayer =
                    activeQuestionPlayer;

                currentPlayer.score +=
                    tile.score;
            }else{

                modalText.innerText =
                    "Sai rồi!\nĐáp án đúng: " +
                    tile.correctAnswer;
            }

            renderPlayers();

            updatePositionText();

            updateScoreText();

            resultImage.src =
                tile.image;

            resultImage.style.display =
                "block";

            resultCaption.innerText =
                tile.caption;

            choicesContainer.innerHTML = "";

            closeModalBtn.style.display =
            "inline-block";
        };

        choicesContainer.appendChild(btn);
    });

    closeModalBtn.onclick = () => {

        choicesContainer.innerHTML = "";

        closeModal();

        nextTurn();
    };
}

function handleEvent(tile){

    const currentPlayer =
        getCurrentPlayer();

    openModal();

    modalTitle.innerText =
        tile.name;

    modalText.innerText =
        tile.message;
        
    resultImage.src =
        tile.image;

    resultImage.style.display =
        "block";

    resultCaption.innerText =
        tile.caption;

    closeModalBtn.onclick = () => {

        switch(tile.effect){

            case "forward":

                currentPlayer.position +=
                    tile.value;

                break;

            case "backward":

                currentPlayer.position -=
                    tile.value;

                break;
        }

        if(currentPlayer.position < 0){

            currentPlayer.position = 0;
        }

        if(
            currentPlayer.position >=
            tiles.length - 1
        ){

            currentPlayer.position =
                tiles.length - 1;
        }

        renderPlayers();

        updatePositionText();

        closeModal();

        if(
            currentPlayer.position ===
            tiles.length - 1
        ){

            handlePlayerFinish(
                currentPlayer
            );

            return;
        }

        nextTurn();
    };
}

function updateScoreText(){

    const scoreBoard =
        document.getElementById(
            "playerScores"
        );

    scoreBoard.innerHTML = "";

    players.forEach(player => {

        scoreBoard.innerHTML +=
        `
        <div class="scoreCard">

            <div style="
                font-size:22px;
                font-weight:bold;
                color:${player.color};
            ">
                ${player.name}
            </div>

            <div style="
                font-size:30px;
                font-weight:bold;
            ">
                ${player.score}
            </div>

            <div>
                điểm
            </div>

        </div>
        `;
    });
}

function nextTurn(){

    console.log("NEXT TURN");
    if(gameEnded){
        return;
    }

    do{

        currentPlayerIndex++;

        if(currentPlayerIndex >= players.length){

            currentPlayerIndex = 0;
        }

    }while(players[currentPlayerIndex].finished);

    updateTurnText();
    updatePositionText();

    isMoving = false;
}

function checkGameEnd(){

    return players.every(
        player => player.finished
    );
}

function handlePlayerFinish(player){

    player.finished = true;

    if(checkGameEnd()){

        gameEnded = true;

        let winner = players[0];

        players.forEach(p => {

            if(p.score > winner.score){

                winner = p;
            }
        });

        endGame(winner);

        return true;
    }

    return false;
}
function endGame(winner){

    rollBtn.disabled = true;

    showResultModal(winner);
}

function showResultModal(winner){

    winnerText.innerText =
        "🎉 Người chiến thắng là: " +
        winner.name;

    let html = "";

    players.forEach(player => {

        html +=
            "<p>" +
            player.name +
            " : " +
            player.score +
            " điểm</p>";
    });

    finalScoreBoard.innerHTML =
        html;

    resultModal.classList.remove(
        "hidden"
    );
}
async function movePlayer(stepCount){

    const currentPlayer =
        getCurrentPlayer();

    isMoving = true;

    for(let i = 0; i < stepCount; i++){

        currentPlayer.position++;

        if(
            currentPlayer.position >=
            tiles.length - 1
        ){

            currentPlayer.position =
                tiles.length - 1;
        }

        renderPlayers();

        updatePositionText();

        await sleep(500);
    }

    // win check
    if(
        currentPlayer.position >=
        tiles.length - 1
    ){
        handlePlayerFinish(currentPlayer);

        nextTurn();

        return;
    }

    triggerTileEvent();

    if(gameEnded){

        endGame(currentPlayer);

        return;
    }
}

function sleep(ms){

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}

function openModal(){

    modal.classList.remove("hidden");

    answerInput.style.display =
        "none";

    submitAnswerBtn.style.display =
        "none";

    choicesContainer.innerHTML = "";
}

function closeModal(){

    modal.classList.add("hidden");

    answerInput.value = "";
}

closeModalBtn.addEventListener("click", () => {

    closeModal();
});

window.onload = () => {

    createPlayerTokens();

    renderPlayers();

    updateTurnText();

    updatePositionText();
    
    updateScoreText();
};