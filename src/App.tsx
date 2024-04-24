import TabGroup from './TabGroup'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy GitHub Contributor</h1>
      </header>
      <div>
        <h2>Where would you like to contribute?</h2>
        <div>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
           
          </ul>
        </div>
      </div>
      <h2>What would you like to contribute?</h2>
      <TabGroup />
    </div>
  )
}

export default App
