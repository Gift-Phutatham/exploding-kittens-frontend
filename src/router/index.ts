import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import CreateRoom from '../views/CreateRoomView.vue';
import GameRoom from '../views/GameRoomView.vue';
import PageNotFound from '../views/PageNotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/CreateRoom',
      name: 'Create Room',
      component: CreateRoom,
    },
    {
      path: '/GameRoom',
      name: 'Game Room',
      component: GameRoom,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: PageNotFound,
    },
  ],
});

export default router;
