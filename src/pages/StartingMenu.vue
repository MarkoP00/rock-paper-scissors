<template>
    <HistoryPage v-if="historyVisible" @close-history="closePopup"></HistoryPage>
    <div class="container">
         <video :src="videoSrc" autoplay loop muted></video>
    </div>
    <GamePopup v-if="title" :title="title" :message="message" @close-event="closePopup"></GamePopup>
    <section v-if="!title && !historyVisible">
        <main>
                <div class="title">
                    <h3>Rock, Paper, Scissors!</h3>
                </div>
                <div class="menuButtons">
                    <button class="button" @click="navigate">
                        <span class="button-content">Play Game </span>
                    </button>

                    <button class="button" @click="showHistory">
                        <span class="button-content" >History </span>
                    </button>

                      <button class="button" @click="openPopup">
                        <span class="button-content" >Rules </span>
                    </button>

                </div>
                <div class="info">
                    <p>Game is made by: MarkoP00</p>
                </div>
        </main>
        <div class="copyRights">
            <p>&copy; 2024 Rock, Paper, Scissors Game. All rights reserved.</p>
        </div>
    </section>
</template>

<script setup>
    import GamePopup from './global/GamePopup.vue';
    import HistoryPage from './HistoryPage.vue'
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const title = ref('');
    const message = ref('');
    const historyVisible = ref(false)

    const baseUrl = process.env.BASE_URL || '/';
    const videoSrc = `${baseUrl}images/video/menugif.mp4`; 
    
    function navigate(){
        router.push('/game')
    }

    function showHistory(){
        historyVisible.value = true;
    }
    function openPopup(){
        title.value = 'Game Rules';
        message.value = 'The game is played with three possible hand signals that represent a rock, paper, and scissors. The rock is a closed fist; paper is a flat hand with fingers and thumb extended and the palm facing downward; and scissors is a fist with the index and middle fingers fully extended toward the opposing player. <strong>Rock wins against scissors; paper wins against rock; and scissors wins against paper.</strong> If both players throw the same hand signal, it is considered a tie, and play resumes until one of the players wins 5 rounds!' 
    }
    function closePopup(){
        title.value = '';
        historyVisible.value = false;

    }
</script>

<style scoped>
    section {
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        text-align: center;
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        padding: 40px 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border: 1px solid #66fcf1;
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
    .title h3 {
        font-size: 32px;
        color: #fff;
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
    }

    .menuButtons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 15px 30px;
        font-size: 20px;
    }

    .button {
  position: relative;
  overflow: hidden;
  height: 3rem;
  font-size: 20px;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;
}

.button:hover::before {
  transform: scaleX(1);
}

.button-content {
  position: relative;
  z-index: 1;
}

.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: 0 50%;
  width: 100%;
  height: inherit;
  border-radius: inherit;
  background: linear-gradient(
    82.3deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  transition: all 0.475s;
}

    .info p {
        font-size: 16px;
        color: #fff;
        margin-top: 20px;
    }

    .copyRights {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #fff;
        font-size: 12px;
    }

    @media (min-width: 310px) {
        main {
            max-width: 300px;
            padding: 40px 0;
        }
    }
    @media (min-width: 760px) {
        main {
            max-width: 400px;
            padding: 40px 0;
        }
    }
</style>
