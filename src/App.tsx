import TabGroup from './TabGroup'
import './App.css'
import { Toaster } from 'react-hot-toast'
// import toast from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <header className="App-header min-h-32 mb-8">
        <h1 className='text-4xl'>Easy GitHub Contributor</h1>
      </header>
      <TabGroup />
      <Toaster
  position="bottom-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    // style: {
    //   background: '#363636',
    //   color: '#fff',
    // },

    // Default options for specific types
    success: {
      duration: 5000,
    },
  }}
/>
    </div>
  )
}

export default App
