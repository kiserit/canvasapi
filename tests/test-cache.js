require('dotenv').config()
const headers = { 'authorization': `Bearer ${process.env.CANVAS_TOKEN}`}
const CanvasAPI = require('../lib/canvasapi.cjs')

const Redis = require("ioredis");
const redis = new Redis();

const pageStorage = {
  data: {},
  getItem(key) {
    if (key in pageStorage.data) return pageStorage.data[key]
    else return null
  },
  setItem(key, value) {
    pageStorage.data[key] = value
  },
}

CanvasAPI.defaults.headers = headers
const api = new CanvasAPI('https://canvas.knudging.com')
const cachedApi = api.redis(redis, 60*10)
//const cachedApi = api.storage(pageStorage)

/*
api.v1().users('self').courses().get({per_page: 2, max_pages: 1})
  .then(res => {
    if (res.data) {
      res.data.forEach(c => console.log(c.id, c.course_code, res.statusText))
    }
  })
  */
//api.v1().courses(12).get().then(res => console.log(!!res.cache, res.data.id, res.data.course_code, res.data.name))

setTimeout(async () => {
  try {
    const location = { href: 'https://canvas.knudging.com/courses/1/assignments' }
    const m = /\/courses\/(\d+)/i.exec(location.href)
    if (m && m.length > 1) console.log(m[1])
    /*
    for(let i = 0; i < 2; i++) {
      await cachedApi.v1().courses(12).get()
        .then(res => console.log(!!res.cache, res.data.id, res.data.course_code, res.data.name))
    }
    */
  } catch(err) {
    console.log(err)
  } finally {
    redis.quit()
  }
}, 500)
