import { createRouter, createWebHistory } from "vue-router";
import StartingMenu from './pages/StartingMenu.vue';
import GamePage from "./pages/GamePage.vue";
const router = createRouter({
    history: createWebHistory(),

    routes: [
      {
        path: '/',
        component: StartingMenu
      },
        {
          path: '/game',
          component: GamePage
        },
        {
          path: '/menu',
          component: StartingMenu
        },
    ]
})

export default router