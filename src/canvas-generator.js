const fs = require('fs')
const fetch = require('node-fetch-commonjs')
const CACHE_PATH = './.cache'

async function json(url) {
  const paths = url.pathname.split('/')
  const fileName = `${CACHE_PATH}/${paths[paths.length-1]}`
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  }
  return fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8')
      }
      return data
    })
}

function writeBaseClass(stream) {
  stream.write(`class base {\n`)
  stream.write(`\t_path = null\n`)
  stream.write(`\t_cache = null\n`)

  stream.write(`\tconstructor(cache, path) {\n`)
  stream.write(`\t\tthis._cache = cache \n`)
  stream.write(`\t\tthis._path = path\n`)
  stream.write(`\t}\n`)

  stream.write(`\tstorage(webStorage) { \n`)
  stream.write(`\t\tthis._cache = { storage: webStorage }; \n`)
  stream.write(`\t\treturn this; \n`)
  stream.write(`\t} \n`)  

  stream.write(`\tredis(client, ttl) { \n`)
  stream.write(`\t\tthis._cache = { redis: client, ttl}; \n`)
  stream.write(`\t\treturn this; \n`)
  stream.write(`\t} \n`)  

  stream.write(`\ttoString() { \n`)
  stream.write(`\t\treturn this._path; \n`)
  stream.write(`\t} \n`)  

  stream.write(`}\n\n`)

}

function writeClass(stream, key, fnlist) {
  // these are reserved words that need re-named
  const badlist = {'import': 'imports', 'export': 'exports', 'new': 'newitem'}
  const item = fnlist[key]

  let className = item.path
  if (key in badlist) {
    className = badlist[key]
  }

  stream.write(`class ${className} extends base {\n`)
  //stream.write(`\t#path = null\n`)
  //stream.write(`\t#cache = null\n`)

  stream.write(`\tconstructor(cache, path`)
  // write path params
  for(let p of item.params.path) {
    stream.write(`, ${p}`)
  }
  stream.write(`) {\n`)
  stream.write(`\t\tsuper(cache, \`\${path}/${item.path}\`)\n`)
  //stream.write(`\t\tthis.#cache = cache \n`)
  //stream.write(`\t\tthis.#path = \`\${path}/${item.path}\`\n`)
  // add path params to path
  for(let p of item.params.path) {
    stream.write(`\t\tif (id) this._path += \`/\${${p}}\`\n`)
  }
  stream.write(`\t}\n`)

  // write children paths 
  for(let childkey of item.children) {
    const child = fnlist[childkey]
    let methodName = child.path
    if (childkey in badlist) {
      methodName = badlist[childkey]
    }

    stream.write(`\t${methodName}(`)
    // write child params
    let count = 0
    for(let p of child.params.path) {
      stream.write(count == 0 ? `${p}` : `, ${p}`)
      count++
    }
    
    stream.write(`) {\n`)

    stream.write(`\t\treturn new ${methodName}(this._cache, this._path`)
    for(let p of child.params.path) {
      stream.write(`, ${p}`)
    }
    stream.write(')\n')

    stream.write(`\t}\n`)

  }
  //stream.write(`\tcache(cacheOrStorage) { \n`)
  //stream.write(`\t\tthis.#cache=cacheOrStorage; \n`)
  //stream.write(`\t\treturn this; \n`)
  //stream.write(`\t} \n`)

  // write methods
  for(let method of item.methods) {
    stream.write(`\tasync ${method}({`)
    if (method == 'get') {
      for(let p of item.params.query) {
        stream.write(`${p}, `)
      }
      stream.write(`page, per_page, max_pages, headers} = {}) {\n`)
      //stream.write(`\t\tlet {["headers"]: _, ...api_query} = arguments[0] || {} \n`)
      stream.write(`\t\tconst api_query = arguments[0] || {}  \n`)
      stream.write(`\t\tdelete api_query.headers \n`)
      stream.write(`\t\treturn CanvasAPI.${method}(this._path, { method: 'GET', query: api_query, headers }, this._cache)\n`)
    } else if (method == 'delete') {
      stream.write(`headers} = {}) {\n`)  
      stream.write(`\t\treturn CanvasAPI.${method}(this._path, { method: 'DELETE', headers }, this._cache)\n`)
    } else {
      for(let p of item.params.form) {
        if (p.startsWith('http')) {
          stream.write(`${p.split('/').pop()}, `)
        } else {
          stream.write(`${p}, `)
        }
      }
      stream.write(`headers} = {}) {\n`)  
      stream.write(`\t\tconst api_body = arguments[0] || {}  \n`)
      stream.write(`\t\tdelete api_body.headers \n`)
      //stream.write(`\t\tlet {["headers"]: _, ...api_body} = arguments[0] || {}\n`)
      stream.write(`\t\treturn CanvasAPI.${method}(this._path, { method: '${method.toUpperCase()}', body: api_body, headers }, this._cache)\n`)

    }
  
    stream.write(`\t}\n`)
  }

  //stream.write(`\ttoString() { \n`)
  //stream.write(`\t\treturn this.#path; \n`)
  //stream.write(`\t} \n`)

  stream.write(`}\n\n`)
}

function writeApiClass(stream) {
  stream.write(`class CanvasAPI extends base {  \n`)
  stream.write(`\tconstructor(origin, cache) {  \n`)
  stream.write(`\t\tsuper(cache, new URL('api', origin).href) \n`)
  stream.write(`\t} \n`)
  stream.write(`\tv1() {  \n`)
  stream.write(`\t\treturn new v1(this._cache, this._path)  \n`)
  stream.write(`\t}  \n`)

  stream.write(`\tstatic defaults = { headers: { } } \n`)

  /*
  stream.write(`\tstatic async fetch(url, options) { \n`)

  stream.write(`\t\turl = new URL(url)  \n`)
  stream.write(`\t\tif (options.query) {  \n`)
  stream.write(`\t\t\tfor (const [name, value] of Object.entries(options.query)) {  \n`)
  
  stream.write(`\t\t\t\tif (Array.isArray(value)) {\n`)

  stream.write(`\t\t\t\t\tfor(let v of value) {\n`)
  stream.write(`\t\t\t\t\t\turl.searchParams.append(\`\${name}[]\`, v); \n`)
  stream.write(`\t\t\t\t\t}\n`)

  stream.write(`\t\t\t\t} `)

  stream.write(`else { \n`)
  stream.write(`\t\t\t\t\turl.searchParams.set(name, value); \n`)
  stream.write(`\t\t\t\t} \n`)
    
  stream.write(`\t\t\t}  \n`)
  stream.write(`\t\t\tdelete options.query  \n`)

  stream.write(`\t\t}  \n`)

  stream.write(`\t\tif (options.body) { \n`)
  stream.write(`\t\t\toptions.body = JSON.stringify(options.body); \n`)
  stream.write(`\t\t\toptions.headers['content-type'] = 'application/json; charset=utf8;'  \n`)
  stream.write(`\t\t} \n`)

  stream.write(`\t\toptions.headers = { ...CanvasAPI.defaults.headers, ...options.headers } \n`)

  stream.write(`\t\tconsole.log('FETCH', {url: url.href, options}) \n`)

  stream.write(`\t}  \n`)
  */
  stream.write(`}\n\n`)
  stream.write(`export default CanvasAPI\n`)

}

function formatType(item) {
  const required = item.required ? '' : '?'
  const type = item.type||item['$ref']
  switch(type) {
    case 'integer':
    case 'Integer':
    case 'number':
    case 'numeric':
    case 'Numeric':
    case 'int64':
    case 'Int64':
      return 'Number'+required
    case 'string':
    case 'String':
    case 'Hash':
    case 'hash':
      return 'String'+required
    case 'json':
    case 'JSON':
      return 'String'+required+'|Object'+required
    case 'url':
    case 'URL':
      return 'String'+required+'|URL'+required      
    case 'boolean':
    case 'Boolean':
      return 'Boolean'+required
    case 'void':
    case 'Void':
      return 'Void'+required
    case 'Date':
    case 'date':
    case 'DateTime':
    case 'Datetime':
    case 'datetime':
      return 'Date'+required
    case 'object':
    case 'Object':
      return 'Object'+required
    case 'array':
    case 'Array':
      // get subtype
      try {
        let subtype = 'Any'
        if (item.items) {
          const items = {
            type: (item.items.type||item.items['$ref']).split(' ', 2)[0],
            required: true
          }
          subtype = formatType(items)
        } else if (Array.isArray(item.enum)) {
          if (typeof item.enum[0] === 'string')
            subtype = 'String'
        }
        return 'Array'+required+'<'+subtype+'>'
      } catch (err) {
        console.log(item , err.message)
        return 'Array'+required
      }
    case 'String[]':
      return 'Array'+required+'<String>'
    case '[Answer]':
      return 'Array'+required+'<Answer>'
    case 'array of outcome ids':
    case 'list of content items':
      return 'Array'+required+'<String|Object|Number>'
    case 'GroupMembership | Progress':
      return 'GroupMembership'+required+'|Progress'+required
    case 'multiple BlueprintRestrictions':
      return 'Array'+required+'<BlueprintRestrictions>'
    default: 
      if (type.startsWith('{')) {
        // {"type":"{ \"count\": \"integer\" }"}     
        // {"type":"{success: true}"} 
        // {"type":"{ \"unread_count\": \"integer\" }"}
        return 'Object'
      }
      return type
  }
  /*
  return JSON.stringify({
    type: item.type, 
    //enum: item.enum,
    //items: item.items
  })
  */
}

async function writeApiChain(origin) {
  const url = new URL('/doc/api/api-docs.json', origin)
  const definitions = await json(url)
  const fnlist = {}
  for(let apidef of definitions.apis) {
    const itemUrl = new URL(`/doc/api${apidef.path}`, origin)
    const item = await json(itemUrl)
    for(let [modelName, modelVal] of Object.entries(item.models)) {
      // write out model types?
    }
    for(let api of item.apis) {
      for(let op of api.operations) {
        const paths = api.path.split('/')
        let prev = null
        while(paths.length > 0) {
          const cur = paths.shift()
          if (cur =='') continue;
          if (cur.startsWith('{')||cur.startsWith('*')) {
            const name = cur.replace(/[\{\}\*]/g,'')
            if (name == 'id' || name.endsWith('_id'))
              fnlist[prev].params.path.add('id')
            else
              fnlist[prev].params.path.add(name)
            continue;
          } else {
            if (!(cur in fnlist)) {
              fnlist[cur] = { 
                path: cur, 
                children: new Set(),
                methods: new Set(),
                params: {  
                  path: new Set(), 
                  query: new Set(), 
                  form: new Set()
                } 
              }
            }
            if (prev) {
              fnlist[prev].children.add(cur)
            }
          }
          prev = cur
        }
        fnlist[prev].methods.add(op.method.toLowerCase())
        for(let p of op.parameters) {
          p.name = p.name.replace(/[`]/g, '')
          if (p.name.endsWith(':')) {
            p.name = p.name.slice(0, -1)
          }
          if (p.paramType == 'path') continue;
          const name = p.name.split('[',2)[0]
          if (p.paramType == 'query') {
            fnlist[prev].params.query.add(name)
          }
          else if (p.paramType == 'form') {
            fnlist[prev].params.form.add(name)
          }
        }
      }
    }
  }
  const keys = Object.keys(fnlist).sort()
  const stream = fs.createWriteStream('./src/canvas.js', 'utf-8')
  writeBaseClass(stream)
  for(let key of keys) {
    writeClass(stream, key, fnlist)
  }

  writeApiClass(stream)
  stream.close()
}


writeApiChain('https://canvas.instructure.com')
