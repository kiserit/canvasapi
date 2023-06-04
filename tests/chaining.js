
async function chaining(CanvasAPI, modName) {


  async function courses() {
    const api = new CanvasAPI('https://canvas.instructure.com')
    return api.v1().courses(12).assignments(1234).submissions('24').toString() == 
          'https://canvas.instructure.com/api/v1/courses/12/assignments/1234/submissions/24'
  }
  
  async function users() {
    const api = new CanvasAPI('https://canvas.instructure.com')
    return api.v1().users('self').activity_stream().summary().toString() == 
          'https://canvas.instructure.com/api/v1/users/self/activity_stream/summary'
  }

  for(let fn of [courses, users]) {
    try {
      if (fn()) {
        console.log(modName, fn.name, "chaining", "OK")
      } else {
        console.log(modName, fn.name, "chaining", "Failed")
      }
    } catch (error) {
      console.log(modName, fn.name, "chaining", "Failed", error.message)
    }
  }

}



module.exports = chaining