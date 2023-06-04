import CanvasAPI from './canvas-api'

CanvasAPI.fetch = window.fetch

class WebCanvasAPI extends CanvasAPI {
  constructor(origin, cache) { 
    super(origin, cache)
  }

  get courseId() {
    if (typeof ENV !== 'undefined') {
      if (ENV.COURSE_ID) return ENV.COURSE_ID;
      if (ENV.course && ENV.course.id) {
        return ENV.course.id;
      }
    }
    if (typeof location !== 'undefined') {
      const m = /\/courses\/(\d+)/i.exec(location.href)
      if (m && m.length > 1) return m[1];
    }
    return ''
  }

  get userId() {
    if (typeof ENV !== 'undefined') {
      if (ENV.current_user_id) return current_user_id;
      if (ENV.current_user && ENV.current_user.id) {
        return ENV.current_user.id;
      }
    }
    return 'self'
  }

}

export default WebCanvasAPI