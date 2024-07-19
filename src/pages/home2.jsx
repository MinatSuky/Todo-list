

import { setDoc, doc, getFirestore, collection, addDoc } from "firebase/firestore"
import { app } from "../firebase/firebase";
import { useState } from "react";


export const Home2 = () => {
  const db = getFirestore(app);

  const [productos, setProductos] = useState({})

  

 


  return (

    <>
      
      
    </>

  )
}
