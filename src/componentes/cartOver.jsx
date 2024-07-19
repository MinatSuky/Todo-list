import { app } from "../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import '../App.css';

export const Card = () => {
  const [productos, setProductos] = useState(null);
  const [producto, setProducto] = useState({});
  const [recargar, setRecargar] = useState(false);
  const db = getFirestore(app); // Conectarse a la base de datos

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Ropa"));
      const productosArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductos(productosArray);
    };

    fetchData();
  }, [recargar]);

  const agregarDocumento = async () => {
    await addDoc(collection(db, "Ropa"), producto);
    setRecargar(!recargar);
  };

  const eliminar = async (idBorrado) => {
    const docRef = doc(db, "Ropa", idBorrado);
    await deleteDoc(docRef); // Asegúrate de esperar la promesa
    setRecargar(!recargar);
  };
  const [tarea, setTarea] = useState(true)

  return (

    <div className="flex flex-col">
      <div className="cont4 flex flex-col justify-center items-center mb-10">
        <p className="text-center text-5xl font-semibold text-[#db2777] fonn mb-3">Todo-list</p>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="px-3 py-2 rounded-xl"
            placeholder="Nombre..."
            onChange={(e) => setProducto({ ...producto, Nombre: e.target.value })}
          />
          <input
            type="date"
            className="px-3 py-2 rounded-xl"
            placeholder="Fecha de Entrega..."
            onChange={(e) => setProducto({ ...producto, Color: e.target.value })}
          />

          <input
            type="text"
            className="px-3 py-2 rounded-xl"
            placeholder="Notas..."
            onChange={(e) => setProducto({ ...producto, Precio: e.target.value })}
          />
        </div>
        <div className="flex justify-center">
          <p
            className="text-black cursor-pointer py-3 px-6 mt-6 rounded-xl bg-lime-300 font-medium"
            onClick={agregarDocumento}
          >
            Agregar
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-10 flex-wrap mb-20 ">
        {productos && productos.length > 0 ? (
          productos.map((elemento) => (
            <div className="flex flex-col justify-between gap-1 bg-violet-900 rounded-xl p-3 w-[95%]" key={elemento.id}>
              <p className="text-white text-3xl font-bold">
                <span className="text-white capitalize">{elemento.Nombre}</span>
              </p>
              <p className="text-neutral-400 font-medium text-xl">
                <span className="text-2xl">Entrega: </span>
                <span className="text-white">{elemento.Color}</span>
              </p>
              <p className="text-neutral-400 font-medium text-xl">
                <span className="text-2xl">Estado: </span>
                <input
                  onClick={() => setTarea(!tarea)}
                  type="checkbox"
                  name="completado"
                  id="completado"
                  className="form-checkbox h-4 w-4 text-green-500 rounded transition duration-150 ease-in-out"
                 
                />        
              </p>
              <p className="text-neutral-400 font-medium text-xl flex items-center gap-1 flex-wrap">
                <span className="text-2xl">Notas: </span>
                <span className="text-white capitalize">{elemento.Precio}</span>
              </p>
              <div>
                <p
                  className="text-white cursor-pointer py-3 px-6 mt-6 rounded-xl bg-red-700 text-center font-medium"
                  onClick={() => eliminar(elemento.id)}
                >
                  Eliminar
                </p>
              </div>
            </div>
          ))
        ) : (
         <div className="flex flex-col items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path fill="#db2777" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path fill="#db2777" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
           <p className="text-[#db2777] font-semibold">No Hay Taras</p>
         </div>
        )}
      </div>


    </div>

  );
};
