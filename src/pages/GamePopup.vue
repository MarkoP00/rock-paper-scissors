<template>
    <section>
        <main>
            <div class="title">
                    <h3>{{props.title}}</h3>
            </div>
            <div class="description">
                <p>{{ props.message }}</p>
            </div>
            <div class="navigate">
                <span>Close</span> 
                <!-- sa emitom ugasi history i rules visible -->
            </div>
        </main>
    </section>
</template>

<script setup>
    import {defineProps} from 'vue';

    const props = defineProps({
        tilte: String,
        message: String,
        link: String
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
        margin: 0 auto;
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
    }
    .title{
        margin: 10px 0;
    }
    .title h3{
        color:#66fcf1;
    }
    strong{
        color:#66fcf1;
    }
    @media(max-width: 450px){
        main{
        max-width: 255px;

        }
    }
</style>