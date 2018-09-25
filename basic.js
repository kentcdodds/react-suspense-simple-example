const {createCache, createResource} = window.simpleCacheProvider

const cache = createCache()

const sleep = (time, resolvedValue = Math.random()) =>
  new Promise(resolve => {
    setTimeout(() => resolve(resolvedValue), time)
  })

const myResource = createResource(id => sleep(1000, `${id}-value`))

const Foo = () => <div>{myResource.read(cache, 'foo')}</div>

function App() {
  return (
    <React.Placeholder fallback="loading...">
      <Foo />
    </React.Placeholder>
  )
}

ReactDOM.render(<App />, document.getElementById('⚛'))
