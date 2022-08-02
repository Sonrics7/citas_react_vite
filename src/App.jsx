import { useState, useEffect } from "react"
import Header from "./components/header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  //Props, pasan a componentes, reutilizar codigo del padre al hijo son los props
  //Padre es app.jsx y lo pasa al header
  const[pacientes, setPacientes] = useState([]);
  const[paciente, setPaciente] = useState({});

  //Cargue cuando el componente este listo si hay en localstorage
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [] ;
      //console.log(typeof pacientesLS);
      setPacientes(pacientesLS)
    }
    obtenerLS();
  }, []);

  //Localstorage no guarda arreglos,solo strings, se deben convertir,
  //Aqui ya deteto que hay algo, importa el order del useefects
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
    <Header 
      //Pasar un prop
      //numeros={ 1 }
    />
    <div className="mt-12 md:flex">
    <Formulario 
      pacientes={pacientes}
      setPacientes={setPacientes}
      paciente={paciente}
      setPaciente={setPaciente}
    />
    <ListadoPacientes 
    pacientes={pacientes}
    setPaciente={setPaciente}
    eliminarPaciente={eliminarPaciente}
    />
    </div>
    </div>
  )
}

export default App
