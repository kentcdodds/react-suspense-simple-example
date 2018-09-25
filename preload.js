const {createCache, createResource} = window.simpleCacheProvider

const cache = createCache()

const sleep = (time, resolvedValue = Math.random()) =>
  new Promise(resolve => {
    setTimeout(() => resolve(resolvedValue), time)
  })

const myResource = createResource(id => sleep(1000, `${id}-value`))

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
