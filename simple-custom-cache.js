const {createResource} = window.simpleCacheProvider

const cache = {}

const loadResource = id => sleep(1000, `${id}-value`)

function read(key) {
  if (cache[key]) {
    return cache[key]
  }
  const suspender = loadResource(key)
  suspender.then(thing => {
    cache[key] = thing
    return thing
  })
  throw suspender
}

function preload(key) {
  loadResource(key).then(thing => (cache[key] = thing))
}

const sleep = (time, resolvedValue = Math.random()) =>
  new Promise(resolve => {
    setTimeout(() => resolve(resolvedValue), time)
  })

function FooBar() {
  const foo = read('foo')
  const bar = read('bar')
  return (
    <div>
      <div>{foo}</div>
      <div>{bar}</div>
    </div>
  )
}

function App() {
  preload('foo')
  preload('bar')
  return (
    <React.Placeholder fallback="loading...">
      <FooBar />
    </React.Placeholder>
  )
}

ReactDOM.render(<App />, document.getElementById('⚛'))
