import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import Editor from './Editor'
import Modal from './Modal'
import { Props } from './utils'
import { SubmissionType } from './utils'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function Title({ value, setValue }: Props) {
  return (
    <>
      <label htmlFor="titleInput">Title</label>
      <input
        id="titleInput"
        type="text"
        placeholder={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
    </>
  )
}

function Contact({ value, setValue }: Props) {
  //   const [contact, setContact] = useState('')

  return (
    <>
      <label htmlFor="contactInput">Contact information</label>
      <p>For clarifications or follow up.</p>
      <input
        id="contactInput"
        type="email"
        onChange={(event) => {
          setValue(event.target.value)
        }}
        placeholder="email@example.com"
      />
    </>
  )
}

function TabGroup() {
  const [title, setTitle] = useState('')
  const [contact, setContact] = useState('')
  const [body, setBody] = useState('')
  const [tab, setTab] = useState(0)

  let [categories] = useState({
    Issue: [
      { component: Title, value: title, setValue: setTitle },
      { component: Editor, value: body, setValue: setBody },
      { component: Contact, value: contact, setValue: setContact },
      //   Editor,
      //   Contact,
      //   Modal,
    ],
    'Pull Requests': [
      { component: Title, value: title, setValue: setTitle },
      { component: Editor, value: body, setValue: setBody },
      { component: Contact, value: contact, setValue: setContact },
    ],
  })

  return (
    <div className="mx-auto w-full px-2 py-16 sm:px-0">
      <Tab.Group
        onChange={(index) => {
          setTab(index)
          //   console.log('Changed selected tab to:', index)
        }}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-violet-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-violet-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-violet-700 shadow'
                    : 'text-violet-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
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
