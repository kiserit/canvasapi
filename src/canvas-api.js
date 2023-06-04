import CanvasAPI from './canvas'
import { parseLinkHeader, md5, getCache, setCache } from './canvas-utils'


CanvasAPI.get = async function(url, options, cache) { 
  let max_pages = 1
  let next = new URL(url)  
  if (options.query) {  
    for (const [name, value] of Object.entries(options.query)) {  
      if (Array.isArray(value)) {
        for(let v of value) {
          next.searchParams.append(`${name}[]`, v); 
        }
      } else if (name == 'max_pages') {
        max_pages = isNaN(value) ? 1 : Number(value)
        next.searchParams.set(name, value); 
      } else { 
        next.searchParams.set(name, value); 
      } 
    }  
    delete options.query  
  }
  options.headers = Object.assign({ accept: 'application/json, text/html, text/plain, */*'}, 
                                    CanvasAPI.defaults.headers, options.headers ) 
  let cacheKey = null
  let result = undefined
  let res = {
    ok: true, 
    url: next.toString(),
    status: 200,
    statusText: 'OK',
  }
  // get from cache
  if (cache) {
    cacheKey = `canvasapi-${md5(url.toString())}`
    result = await getCache(cache, cacheKey)
  }
  if (!result) {
    // need for cache key but remove before fetching
    next.searchParams.delete('max_pages')

    while(next && max_pages > 0) {
      res = await CanvasAPI.fetch(next, options)
      max_pages--
      if (res.ok) {
        const links = parseLinkHeader(res.headers.get('link'))
        next = links && links.next ? links.next.url : null
        const data = await res.json()
        if (Array.isArray(data)) {
          if (!result) result= data 
          else result.push.apply(result, data);
        } else {
          if (!result && !next) {
            result = data
          } else {
            result.push(data)
          }
        }        
      } else {
        next = null
      }
    }

    // save to cache
    if (cache && cacheKey) {
      await setCache(cache, cacheKey, result)
    }  
  } else {
    res.cache = true
  }
  return {
    ok: res.ok, 
    url: res.url,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    cache: res.cache||false,
    data: result
  }    
}

CanvasAPI.delete = async function(url, options) { 
  return CanvasAPI.fetch(url, options)
}

async function putPostPatch(url, options) {
  options.headers = Object.assign({ accept: 'application/json, text/html, text/plain, */*'}, 
                                    CanvasAPI.defaults.headers, options.headers )
  if (typeof options.body === 'object') { 
    options.body = JSON.stringify(options.body); 
    options.headers['content-type'] = 'application/json; charset=utf8;'  
  } 
  return CanvasAPI.fetch(url, options)
}

CanvasAPI.put = putPostPatch
CanvasAPI.post = putPostPatch
CanvasAPI.patch = putPostPatch

export default CanvasAPI