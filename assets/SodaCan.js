import React, { useEffect, useRef, useState } from "react"
import { Html, useCursor, useGLTF, useTexture } from "@react-three/drei"
import { useFilePicker } from "use-file-picker"
import { activeModel } from "../zustand/states"
import { setHexFromMaterial } from "../utils/setHexFromMaterial"
import { MaterialObj } from "../utils/materialObj"

export default function SodaCan(props) {
   const group = useRef()
   const { nodes, materials } = useGLTF("/glbs/SodaCan.glb")

   const colors = activeModel((state) => state.colors)
   const setColors = activeModel((state) => state.setColors)
   const roughness = activeModel((state) => state.roughness)
   const setRoughness = activeModel((state) => state.setRoughness)
   const metalness = activeModel((state) => state.metalness)
   const setMetalness = activeModel((state) => state.setMetalness)

   useEffect(() => {
      setColors(setHexFromMaterial(materials))
      setRoughness(MaterialObj(materials).roughness)
      setMetalness(MaterialObj(materials).metalness)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const [hover, setHover] = useState(false)
   const [openFileSelector, { filesContent, loading }] = useFilePicker({
      accept: ".png",
      readAs: "DataURL",
      multiple: false,
   })
   const [imagePath, setImagePath] = useState("/CanWrap.png")
   const [texture] = useTexture([imagePath])
   texture.flipY = false

   useCursor(hover)

   useEffect(() => {
      if (filesContent[0]?.content) {
         setImagePath(filesContent[0]?.content)
      }
   }, [filesContent])

   if (loading) {
      return <Html>Loading...</Html>
   }

   return (
      <>
         <Html center as='div' position={[0, 3.75, 0]}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "300px",
                  opacity: 0.5,
                  userSelect: "none",
               }}
            >
               <h1>Click the can to change the image!</h1>
               {/* <br /> */}
               <h2>Dimensions: 1012 x 575</h2>
            </div>
         </Html>

         <group ref={group} {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} material={nodes.Cylinder.material}>
               <meshStandardMaterial color={colors.Grey} roughness={roughness.Grey} metalness={metalness.Grey} />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Cylinder_1.geometry} material={materials.Wrap}>
               <meshStandardMaterial color={colors.Wrap} roughness={roughness.Wrap} metalness={metalness.Wrap} />
            </mesh>
            <mesh
               castShadow
               receiveShadow
               geometry={nodes.Tab.geometry}
               material={nodes.Tab.material}
               // scale={[0.12, 0.12, 0.12]}
            />
            <mesh castShadow receiveShadow geometry={nodes.TabClip.geometry} material={nodes.TabClip.material} />
            <mesh
               castShadow
               receiveShadow
               onClick={() => openFileSelector()}
               onPointerOver={(e) => {
                  e.stopPropagation()
                  setHover(true)
               }}
               onPointerOut={(e) => {
                  //   e.stopPropagation()
                  setHover(false)
               }}
               geometry={nodes.AlphaWrap.geometry}
               // material={nodes.AlphaWrap.material}
               // scale={[1, 2, 1]}
            >
               <meshStandardMaterial map={texture} transparent={true} opacity={hover ? 0.5 : 1} roughness={0.5} />
            </mesh>
         </group>
      </>
   )
}

// useGLTF.preload("/glbs/SodaCan.glb")
