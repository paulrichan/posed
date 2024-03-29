import React, { useState } from "react"
import IconButton from "./shared/IconButton"
import RenderSettings from "./SidebarTabs/RenderSettings"
import CharacterSettings from "./SidebarTabs/CharacterSettings"
import { PhotographIcon, CameraIcon, CogIcon } from "@heroicons/react/outline"
import { saveAs } from "file-saver"
import Link from "next/link"
import { useRouter } from "next/router"

function Sidebar() {
   const [tab, setTab] = useState({
      render: true,
      character: false,
      settings: false,
   })
   const router = useRouter()
   const {pid: label} = router.query

   function Screenshot() {
      const canvas = document.getElementsByTagName("canvas")[0].toDataURL("image/png")
      const downloadTitle = label.replace(/\s/g, "") + ".png"

      saveAs(canvas, downloadTitle)
   }

   return (
      <div className="flex flex-col w-1/4">
         <div className='flex flex-grow flex-col h-screen overflow-y-auto space-y-4 items-center p-3 font-montserrat font-medium dark:text-white'>
            <Link href='/' passHref>
               <h1 className='font-bold text-3xl font-gugi cursor-pointer select-none hover:bg-neutral-200 dark:hover:bg-neutral-600 p-2 rounded-lg duration-150'>
                  Posed
               </h1>
            </Link>
            <div className='flex flex-row justify-evenly w-full'>
               <IconButton
                  active={tab.render}
                  text={<CameraIcon className='h-8 w-8' />}
                  onClick={() => setTab({ render: true, character: false, settings: false })}
               />
               <IconButton
                  active={tab.character}
                  text={<PhotographIcon className='h-8 w-8' />}
                  onClick={() => setTab({ render: false, character: true, settings: false })}
               />
               {/* <IconButton
               active={tab.settings}
               text={<CogIcon className='h-8 w-8'/>}
               onClick={() => setTab({ render: false, character: false, settings: true })}
            /> */}
            </div>

            {tab.render && <RenderSettings />}
            {tab.character && <CharacterSettings />}
         </div>
         <button
            onClick={() => Screenshot()}
            className='p-3 rounded-full m-3 font-bold bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:-translate-x-1 hover:-translate-y-1 duration-150 hover:shadow-lg'
         >
            Screenshot
         </button>
      </div>
   )
}

export default Sidebar
