import TabGroup from './TabGroup'
import { Toaster } from 'react-hot-toast'
// import toast from 'react-hot-toast'

function App() {
  return (
    <div className="App text-black">
      <header className="my-8">
        <h1 className="my-4 text-2xl">What would you like to contribute?</h1>
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
