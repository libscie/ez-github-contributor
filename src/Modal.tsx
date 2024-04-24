import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Submission, SubmissionType } from './utils'
import toast from 'react-hot-toast'

function Modal({ title, body, contact, type }: Submission) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="mb-8 rounded-md bg-violet-700 px-4 py-2 text-base font-medium text-white hover:bg-violet-950 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 focus-visible:ring-2 focus-visible:ring-white/75 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-violet-700"
        disabled={!!title && !!body}
      >
        Submit{' '}
        {SubmissionType[type] === 'Issue' ? 'problem report' : 'new page'}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-normal leading-6 text-gray-900"
                  >
                    Confirm submission
                  </Dialog.Title>
                  <div className="mt-2 font-normal">
                    We look at all submissions and will process them as best we
                    can. We cannot guarantee that all submitted{' '}
                    {SubmissionType[type] === 'Issue'
                      ? 'problems will be resolved'
                      : 'pages will be included'}
                    .
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={async () => {
                        const tmpFn = async () => {
                          const response = await fetch(
                            `/.netlify/functions/${SubmissionType[type] === 'Issue' ? 'issue' : 'pr'}`,
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                title: title,
                                body: body,
                                contact: contact,
                              }),
                            }
                          )
                          const jsonBody = await response.json()
                          console.log(jsonBody)
                          return jsonBody
                        }

                        toast.promise(tmpFn(), {
                          loading: 'Submitting...',
                          success: (res) => {
                            return (
                              <>
                                <a
                                  href={res.html_url}
                                  target="_blank"
                                  className="underline"
                                >
                                  View{' '}
                                  {SubmissionType[type] === 'Issue'
                                    ? 'issue'
                                    : 'submission'}
                                </a>
                                .
                              </>
                            )
                          },
                          error: <>Could not do this right now. Sorry!</>,
                        })
                        closeModal()
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
