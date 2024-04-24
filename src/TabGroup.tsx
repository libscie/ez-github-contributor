import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import Editor from './Editor'
import Modal from './Modal'
import { Props } from './utils'
import { classNames, SubmissionType } from './utils'

function Title({ value, setValue }: Props) {
  return (
    <>
      <div className="mt-4 flex justify-between">
        <label
          htmlFor="title"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Title
        </label>
      </div>
      <div className="mt-2">
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
        />
      </div>
    </>
  )
}

function Contact({ setValue }: Props) {
  return (
    <>
      <div className="mt-4 flex justify-between">
        <label
          htmlFor="email"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Contact information
        </label>
        <span className="text-sm leading-6 text-gray-500" id="email-optional">
          Optional
        </span>
      </div>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Drop your name and email here for follow up - note these will be public on GitHub"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          aria-describedby="email-optional"
        />
      </div>
    </>
  )
}

function TabGroup() {
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [body, setBody] = useState('')
  const [tab, setTab] = useState(0)

  let [categories] = useState({
    'Report problem': [
      {
        component: Title,
        value: "Outdated links in the 'Getting Started' section",
        setValue: setTitle,
      },
      { component: Contact, value: contact, setValue: setContact },
      { component: Editor, value: body, setValue: setBody },
    ],
    'Propose new page': [
      { component: Title, value: 'Data Management Plan', setValue: setTitle },
      { component: Contact, value: contact, setValue: setContact },
      { component: Editor, value: body, setValue: setBody },
    ],
  })

  return (
    <div className="mx-auto w-full px-2 sm:px-0">
      <Tab.Group
        onChange={(index) => {
          setTab(index)
        }}
      >
        <Tab.List className="mx-auto flex max-w-2xl space-x-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-base font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-violet-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-violet-700 shadow'
                    : 'hover:bg-white/[0.50] hover:text-gray-800 '
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mx-auto my-4 max-w-2xl">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl',
                'ring-white/60 ring-offset-2 '
              )}
            >
              {posts.map((post, idy) =>
                React.createElement(post.component, {
                  value: post.value,
                  setValue: post.setValue,
                })
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <Modal
        title={title}
        body={body}
        contact={contact}
        type={tab ? SubmissionType.PullRequest : SubmissionType.Issue}
      />
    </div>
  )
}

export default TabGroup
