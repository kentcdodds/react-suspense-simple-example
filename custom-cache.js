const {createResource} = window.simpleCacheProvider

const cache = {
  map: {},
  $$typeof: 0xcac4e, // <-- hack
  read(resource, key, loadResource) {
    if (cache.map[key]) {
      return cache.map[key]
    }
    const suspender = loadResource(key)
    suspender.then(thing => {
      cache.map[key] = thing
      return thing
    })
    throw suspender
  },
  preload(resource, key, loadResource) {
    loadResource(key).then(thing => (cache.map[key] = thing))
  },
}

const sleep = (time, resolvedValue = Math.random()) =>
  new Promise(resolve => {
    setTimeout(() => resolve(resolvedValue), time)
  })

const myResource = {
  loadResource: id => sleep(1000, `${id}-value`),
  read(cache, key) {
    return cache.read(myResource, key, myResource.loadResource)
  },
  preload(cache, key) {
    return cache.preload(myResource, key, myResource.loadResource)
  },
}

function FooBar() {
  const foo = myResource.read(cache, 'foo')
  const bar = myResource.read(cache, 'bar')
  return (
    <div>
      <div>{foo}</div>
      <div>{bar}</div>
    </div>
  )
}

function App() {
  myResource.preload(cache, 'foo')
  myResource.preload(cache, 'bar')
  return (
    <React.Placeholder fallback="loading...">
      <FooBar />
    </React.Placeholder>
  )
}

ReactDOM.render(<App />, document.getElementById('⚛'))
