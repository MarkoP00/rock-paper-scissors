<template>
    <section @click="closeEvent">
        <transition name="fade">
        <main v-if="eventVisible" @click.stop>
            <div class="title">
                <h3>Game History</h3>
            </div>
            <div class="history">
                <ul>
                        <li v-for="element in fetchData" :key="element.date">
                            <span>You: {{ element.userScore }} </span>
                            <small>
                                {{ element.date }}
                            </small>
                            <span>PC: {{ element.computerScore }}</span>
                        </li>
                    </ul>
                <p v-if="fetchData.length === 0">No History yet...</p>
            </div>
            <div class="actionButton">
                <button class="button" @click="closeEvent">
                        <span class="button-content">Close!</span>
                </button>
            </div>
        </main>
    </transition>

    </section>
</template>

<script setup>
    import { reactive, onMounted,ref, defineEmits } from 'vue'; 
    import fetchService from '../services/fetchService';

    const eventVisible = ref(null);
    const fetchData = reactive([]);

    const emits = defineEmits(['close-history']);

    async function getContent() {
        const response = await fetchService.get('results.json');
        console.log(response);

        if (response) {
            Object.keys(response).forEach((key) => {
                const scoreData = response[key].body;
                fetchData.push(scoreData);
            });
            console.log(fetchData);
        }
    }
    function showEvent(){
        eventVisible.value = true;
    }
    function closeEvent(){
        eventVisible.value = false;
        setTimeout(() => {
            emits('close-history')
        }, 400);
    }

    onMounted(() => {
        getContent();
        showEvent()
    });

</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
    section{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
    }
    main{
        max-width: 500px;
        height: 100%;
        min-height: 300px;
        width: 100%;
        line-height: 30px;
        font-size: 20px;
        background: rgba(0,0,0,0.2);
        border: 1px solid #66fcf1;
        padding: 20px;
        border-radius: 20px;
        color:#fff;
        text-align: center;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
    }
    .title{
        margin: 10px 0;
        
    }
    .title h3{
        color:#66fcf1;
    }
    .history{
        width: 100%;
        height: 100%;
    }
    .history ul{
        max-height: 300px;
        overflow-y: auto;
    }
    .history ul::-webkit-scrollbar {
        width: 12px;
    }

    .history ul::-webkit-scrollbar-track {
        background: #1F2833; 
    }

    .history ul::-webkit-scrollbar-thumb {
        background-color: rgba(102, 252, 241, 0.2); 
        border-radius: 6px;
        border: 1px solid rgba(102, 252, 241, 1);
    }
    .history ul li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
	cursor: pointer;
    }

.history ul li {
    background-color: rgba(102, 252, 241, 0.2);
    color:#fff;
    border-radius: 5px;
    margin: 15px;
    border: 1px solid rgba(102, 252, 241, 1);
}
.history ul li:nth-child(even) {
	background-color: rgba(102, 252, 241, 0.4);
}
.history ul li:hover{
    background-color: rgba(102, 252, 241, 0.6);
}
.history ul li span {
	display: block;
	font-size: 1.25rem;
	font-weight: 600;
	margin-right: 1rem;
    font-family: 'Poppins', sans-serif;

}
.history ul li small {
	color: #fff;
	font-style: italic;
    font-family: 'Poppins', sans-serif;
}
/* button styles */
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
        margin: 0.5rem 0;
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
    strong{
        color:#66fcf1;
    }
    @media(max-width: 450px){
        main{
            max-width: 260px;
        }
        .history ul li span{
            margin: 0.2rem;
            width: 100%;
            font-size: 15px;
        }
        .history ul li small{
            font-size: 15px;
        }
    }

    /* event animation */
    .fade-enter-from, .fade-leave-to{
        opacity: 0;
        transform: scale(0.6);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all 0.4s ease;
    }
    .fade-enter-to, .fade-leave-from{
        opacity: 1;
        transform: scale(1);
    }
</style>