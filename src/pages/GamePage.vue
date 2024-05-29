<template> 
<div class="container">
    <video :src="videoSrc" autoplay loop muted></video>
</div>

<GamePopup v-if="title" :title="title" :message="message" :buttonText="'Play again!'" @close-event="closePopup"></GamePopup>
    <section v-else>
        <main>
            <!-- computer view -->
        <div class="pcView">
            <div class="gameTop">
                <div class="text">
                    <h3>You</h3>
                </div>
                <div class="text">
                    <h3>Computer</h3>
                </div>
            </div>
            <div class="gameUi">
                <!-- user choice image -->
                <div class="userSide">
                    <img :src="rockImage" alt="" style="transform: rotateY(180deg);" loading="lazy">
                </div>
                <div class="score">
                    <p>{{ userScore }} : {{ computerScore }}</p>
                </div>
                <!-- computer choice image -->
                <div class="opponentSide">
                    <img :src="rockImage" alt="" loading="lazy">
                </div>
            </div>
                <!-- options -->
                <div class="options">
                    <img :src="rockImage" alt="Rock" @click="selectChoice(0)" loading="lazy">
                    <img :src="scissorsImage" alt="Scissors" @click="selectChoice(1)" loading="lazy">
                    <img :src="paperImage" alt="Paper" @click="selectChoice(2)"  loading="lazy">
                </div>
            </div>

            <!-- mobile view -->
            <div class="mobileView">
                <!-- computer choice image -->
                <div class="topElements"> 
                    <h3>Computer</h3>
                    <img :src="rockImage" alt="" loading="lazy">
                </div>
                <div class="score" style="text-align: center;">
                    <p>{{ userScore }} : {{ computerScore }}</p>
                </div>
                <!-- user choice image -->
                <div class="bottomElements"> 
                    <img :src="rockImage" alt="" loading="lazy">
                    <h3>User</h3>
                </div>
                <!-- options -->
                <div class="options">
                    <img :src="rockImage" alt="Rock" @click="selectChoice(0)" loading="lazy">
                    <img :src="scissorsImage" alt="Scissors" @click="selectChoice(1)" loading="lazy">
                    <img :src="paperImage" alt="Paper" @click="selectChoice(2)" loading="lazy">
                </div>
            </div>
        </main>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import GamePopup from './global/GamePopup.vue';
    import fetchService from '../services/fetchService';

    const title = ref('');
    const message = ref('');

    const baseUrl = process.env.BASE_URL || '/';
    const videoSrc = `${baseUrl}images/video/bgvid.mp4`; 
    const rockImage = `${baseUrl}images/rock.png`;
    const scissorsImage = `${baseUrl}images/scissors.png`;
    const paperImage = `${baseUrl}images/paper.png`;

    let userScore = ref(0);
    let userChoice = ref('');
    let computerScore = ref(0);
    let computerChoice = ref('');
    let choices = ['rock', 'scissors', 'paper'];

    // handling images and computer choice
    function selectChoice(index){
        //user choice
        const userChoiceImage = document.querySelector('.userSide img');
        const userMobileChoice = document.querySelector('.bottomElements img')
        //adding shaking animation
        userChoiceImage.classList.remove('.shaking');
        userChoiceImage.classList.add('.shaking');

        userMobileChoice.classList.remove('.shaking');
        userMobileChoice.classList.add('.shaking');

        //changing user's choice image
        userChoice.value = choices[index];
        userChoiceImage.src = `${baseUrl}images/${userChoice.value}.png`;
        userMobileChoice.src = `${baseUrl}images/${userChoice.value}.png`;

        // computer choice
        const computerChoiceImage = document.querySelector('.opponentSide img');
        const computerMobileChoice = document.querySelector('.topElements img')
        computerChoice.value = choices[Math.floor(Math.random() * 3)];
        computerChoiceImage.src = `${baseUrl}images/${computerChoice.value}.png`;
        computerMobileChoice.src = `${baseUrl}images/${computerChoice.value}.png`;
        roundWinner()
        checkWinner()
    }

    // simple game logic
    function roundWinner() {
    if (userChoice.value === computerChoice.value) {
        return;
    }

    const winningCombinations = {
        rock: 'scissors',
        scissors: 'paper',
        paper: 'rock'
    };

    if (winningCombinations[userChoice.value] === computerChoice.value) {
        userScore.value += 1;
    } else {
        computerScore.value += 1;
    }
}


    // showing popup message
    async function checkWinner(){
    
    let today = new Date().toLocaleDateString()
    let randomMessageNumber = Math.floor(Math.random() * 3);

    const messagesData = [
        {
            win: [
                "Congratulations! You've emerged victorious in this epic battle!",
                "Victory is yours! You've conquered the game with skill and strategy!",
                "You're the ultimate champion! Your triumph is celebrated across the digital realm!"
            ],
            defeat: [
                "Defeat is bitter, but fear not! The next victory awaits your comeback!",
                "The machine prevails this time, but the battle rages on. Stay resilient!",
                "The computer may have won this round, but your resilience knows no bounds! Keep striving for victory!"
            ]
        }
    ];

    if (userScore.value === 5) {
        title.value = 'YOU WON!';
        message.value = messagesData[0].win[randomMessageNumber];

        //submiting data for history check
        const body = {
            userScore: userScore.value,
            computerScore: computerScore.value,
            date: today
        }
        const response = fetchService.post('results.json', body);
        if(response){
            console.log('Round finished');
        }

    } else if (computerScore.value === 5) {
        title.value = 'Game over!';
        message.value = messagesData[0].defeat[randomMessageNumber];
        //submiting data for history check
        const body = {
            userScore: userScore.value,
            computerScore: computerScore.value,
            date: today

        }
        const response = fetchService.post('results.json', body);
        if(response){
            console.log('Round finished');
        }
    }
}
    //closing popup message and reseting the game
    function closePopup(){
        title.value = '';
        userScore.value = 0;
        computerScore.value = 0;
    }
</script>

<style scoped>
    section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container {
        position: fixed;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100vh;
    }
    .container video{
        background-repeat: no-repeat;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    main {
        min-width: 80%;
        background: rgba(31, 40, 51, 0.4);
        border: 1px solid #66fcf1;
        border-radius: 20px;
        position: relative;
    }
    .pcView{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 150px;
        padding: 25px;
    }
    .gameTop {
        display: flex;
        width: 90%;
        justify-content: space-between;
        align-items: center;
        font-size: 45px;
        color:#fff;
    }
    .gameUi {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .score p{
        font-size: 70px;
        color:#fff;
        background-color: rgba(255,255,255,0.3);
        padding: 15px;
    }
    .userSide,
    .opponentSide {
        flex: 1; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .options {
        display: flex;
        justify-content: center;
        gap: 50px;
    }
    .options img{
        height: 100px;
        cursor: pointer;
        transition: all 0.3s;
    }
    .options img:hover{
        transform: scale(1.1);
    }

    /* mobile view */
    .mobileView{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        text-align: center;
        padding: 25px;
    }
    .topElements h3, .bottomElements h3{
        font-size: 40px;
        margin: 10px ;
        color:#fff;
    }
    .topElements img, .bottomElements img{
        height: 150px;
    }
    .options img{
        height: 80px;
    }
    .options {
        gap: 15px;
    }
    .shaking {
        animation: tilt-shaking 0.2s infinite;;
    }
    @keyframes tilt-shaking {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(0eg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
    }
    @media(min-width: 319px){
        main{
            min-width: 80%;
        }
        .pcView {
            display: none;
        }
        .mobileView{
            padding: 10px;
        }
    }
    @media(min-width: 420px){
        .mobileView{
            padding: 10px 20px;
        }
        .topElements h3{
            margin-bottom: 15px;
        }
        .bottomElements h3{
            margin-top: 10px;
        }
    }
    @media(min-width: 767px){
        main{
            min-width: 80%;
        } 
    }
    @media(min-width: 1439px){
        .pcView {
            display: flex;
            gap: 150px;
            padding: 25px;
        }
        .mobileView{
            display: none;
        }
        
        .options {
            gap: 50px;
        }
    }
</style>
