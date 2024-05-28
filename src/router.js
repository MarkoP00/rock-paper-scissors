import { createRouter, createWebHashHistory } from "vue-router";
import StartingMenu from './pages/StartingMenu.vue';
import GamePage from "./pages/GamePage.vue";
const router = createRouter({
    history: createWebHashHistory(),

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
