import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/bookpage',
    name: 'bookpage',
    meta: { login: true },
    component: () => import('../views/BookPage.vue')
  },
  {
    path: '/moviepage',
    name: 'moviepage',
    meta: { login: true },
    component: () => import('../views/MoviePage.vue')
  },
  {
    path: '/songpage',
    name: 'songpage',
    meta: { login: true },
    component: () => import('../views/SongPage.vue')
  },
  {
    path: '/catbook',
    name: 'catpage',
    meta: { login: true },
    component: () => import('../views/Cat_book.vue')
  },
  {
    path: '/catmovie',
    name: 'catmoviepage',
    meta: { login: true },
    component: () => import('../views/Cat_Movie.vue')
  },
  {
    path: '/catsong',
    name: 'catsongpage',
    meta: { login: true },
    component: () => import('../views/Cat_Song.vue')
  },
  {
    path: '/createbook',
    name: 'createbook',
    meta: { login: true },
    component: () => import('../views/Createbook.vue')
  },
  {
    path: '/editbook/:book_id',
    name: 'editbook',
    meta: { login: true },
    component: () => import('../views/Editbook.vue')
  },
  {
    path: '/editmovie/:movie_id',
    name: 'editmovie',
    meta: { login: true },
    component: () => import('../views/Editmovie.vue')
  },
  {
    path: '/editsong/:song_id',
    name: 'editsong',
    meta: { login: true },
    component: () => import('../views/Editsong.vue')
  },
  {
    path: '/createmov',
    name: 'createmov',
    meta: { login: true },
    component: () => import('../views/Createmovie.vue')
  },
  {
    path: '/createsong',
    name: 'createsong',
    meta: { login: true },
    component: () => import('../views/Createsong.vue')
  },
  {
    path: '/book/detail/:book_id',
    name: 'bookdetail',
    meta: { login: true },
    component: () => import('../views/DetailBook.vue')
  },
  {
    path: '/movie/detail/:movie_id',
    name: 'moviedetail',
    meta: { login: true },
    component: () => import('../views/DetailMovie.vue')
  },
  {
    path: '/song/detail/:song_id',
    name: 'songdetail',
    meta: { login: true },
    component: () => import('../views/DetailSong.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: { guess: true },
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { login: true },
    component: () => import('../views/TestPage.vue')
  },
  {
    path: '/bookchat',
    name: 'bookchat',
    meta: { login: true },
    component: () => import('../views/BookChat.vue')
  },
  {
    path: '/musicchat',
    name: 'musicchat',
    meta: { login: true },
    component: () => import('../views/MusicChat.vue')
  },
  {
    path: '/moviechat',
    name: 'moviechat',
    meta: { login: true },
    component: () => import('../views/MovieChat.vue')
  },
]

const router = new VueRouter({
  mode:'history',
  routes,
  
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/login'})
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/'})
  }

  next()
})

export default router