import React, { useState } from "react"
import Select from "react-select"
import Colors from "./charactersettings/Colors"
import Transforms from "./charactersettings/Transforms"
import { useRouter } from "next/router"
import {modelImage, modelTransforms} from "../../zustand/states"
import ImageSettings from "./charactersettings/ImageSettings"

const SELECTOPTIONS = [
   { label: "Low Poly Rocket", path: "/glbs/LowPolyRocket.glb" },
   { label: "Low Poly Rocket No Smoke", path: "/glbs/LowPolyRocket_NoSmoke.glb" },
   { label: "Phone", path: "/glbs/Phone.glb" },
   { label: "Coin", path: "/glbs/CryptoCoin.glb" },
   { label: "Soda Can", path: "/glbs/SodaCan.glb" },
   { label: "Low Poly Spaceman", path: "/glbs/LowPolySpaceman.glb" },
   { label: "Macbook", path: "/glbs/M1Pro14.glb" },
]

function CharacterSettings() {
   // ZUSTAND
   const router = useRouter()
   const {pid} = router.query
   const showTransforms = modelTransforms((state) => state.show)
   const showImageSettings = modelImage((state) => state.showImageSettings)

   return (
      <div className='flex flex-col flex-grow space-y-3 w-full py-2 dark:text-white'>
         <h1 className='font-bold'>Active Model</h1>
         <Select
            className='my-react-select-container'
            classNamePrefix='my-react-select'
            options={SELECTOPTIONS}
            placeholder={pid}
            value={{ value: pid, label: pid }}
            onChange={(option) => router.push(encodeURIComponent(option.label), undefined, { shallow: true })}
         />

         {showImageSettings && <ImageSettings />}

         <Colors />

         {showTransforms && <Transforms />}
      </div>
   )
}

export default CharacterSettings
