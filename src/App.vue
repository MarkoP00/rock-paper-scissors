<template>
   <router-view >
    </router-view>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
    body{
        background: #161616;
    }
    *{
        margin: 0;
        padding: 0;
        font-family: 'Pixelify Sans', sans-serif;
    }
    .fade-enter-from{
        opacity: 0;
        transform: scale(0.6);
    }
    .fade-enter-active{
        transition: all 0.2s ease;
    }
    .fade-enter-to{
        opacity: 1;
        transform: scale(1);
    }
</style>