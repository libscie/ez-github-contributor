import TabGroup from './TabGroup'
import { classNames } from './utils'

import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState<any[]>([])

  // useEffect(() => {
  //   fetch('/.netlify/functions/retrieve-installed-apps')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       setData(data)
  //     })
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Easy GitHub Contributor</h1>
      </header>
      <div>
        <h2>Where would you like to contribute?</h2>
        <div>
          <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {!!data
              ? data.map((project) => (
                  <li
                    key={project.repo}
                    className="col-span-1 flex rounded-md shadow-sm"
                  >
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                      <img
                        className={classNames(
                          project.bgColor,
                          'contain flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                        )}
                        src={project.avatar}
                        alt={`Avatar of ${project.handle}, the group behind ${project.repo}`}
                      />
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a
                          href={project.href}
                          className="font-medium text-gray-900 hover:text-gray-600"
                        >
                          {project.repo}
                        </a>
                        {/* <p className="text-gray-500">{project.description}</p> */}
                      </div>
                    </div>
                  </li>
                ))
              : ''}
          </ul>
        </div>
      </div>
      <h2>What would you like to contribute?</h2>
      <TabGroup />
    </div>
  )
}

export default App
