import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { fetchAllBranches, setSelectedBranch } from '../../reducers/branchSlice.js'
import { useSelector, useDispatch } from "react-redux"
import api from "../../api/api.js"


export default function ListBox() {
  const dispatch = useDispatch()
  const branchGlobal = useSelector((state) => state.branch) 
  
  useEffect(() => {
    dispatch(fetchAllBranches())
  }, [])

  return (
    <div className="w-full mx-5">
      <Listbox value={branchGlobal.selectedBranch} onChange={(selectedBranch) => dispatch(setSelectedBranch(selectedBranch))}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-10 pr-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <span className="block">{branchGlobal.selectedBranch.kota}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {branchGlobal.allBranches.map((person) => (             
             <Listbox.Option
                key={person.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-red-100 text-red-800' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block  ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.kota}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
