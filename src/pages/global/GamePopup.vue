<template>
    <section @click="closeEvent">
    <transition name="fade">
        <main v-if="popupVisible" @click.stop>
            <div class="title">
                <h3>{{ props.title }}</h3>
            </div>
            <div class="message" v-html="styledMessage"></div>
                
            <div class="actionButton">
                <button class="button" @click="closeEvent">
                        <span class="button-content">{{ props.buttonText }}</span>
                </button>
            </div>
        </main>
    </transition>

    </section>
</template>

<script setup>
import { defineProps, computed, onMounted, ref, defineEmits } from 'vue';
const props = defineProps({
    title: String,
    message: String,
    buttonText: {
        type: String,
        default: 'Okay!'
    }
});
const emits = defineEmits(['close-event']);

const popupVisible = ref(null);
const styledMessage = computed(() => {
    return props.message.replace(/<strong>(.*?)<\/strong>/g, '<strong class="highlighted" style="color: #66fcf1;">$1</strong>');
});

function showEvent(){
    popupVisible.value = true
}

function closeEvent(){
    popupVisible.value = false;

    setTimeout(() => {
        emits('close-event')
    }, 400);
}

onMounted(() => {
    showEvent()
})
</script>


<style scoped>
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
        background: rgba(0,0,0,0.4);
        border: 1px solid #66fcf1;
        padding: 20px;
        border-radius: 20px;
        color:#fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }
    .title{
        margin: 10px 0;
    }
    .title h3{
        color:#66fcf1;
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

    @media(max-width: 450px){
        main{
            max-width: 255px;
            font-size: 17px;
        }
    }

    /* popup animation */

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