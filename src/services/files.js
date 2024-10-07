import axios from 'axios'

// Configuracion de axios
// Aquí se configura una instancia de Axios con una base URL y los headers necesarios para la autorizacion.
// La URL base se utiliza para todas las peticiones a la API
const apiClient = axios.create({
  baseURL: process.env.ENDPOINT, // URL base de la API
  headers: {
    Authorization: process.env.ENDPOINT_TOKEN
  }
})

// Metodo para obtener la lista de archivos
// Este metodo realiza una solicitud GET a la ruta '/files' para obtener todos los archivos disponibles.
// Si esta ok, devuelve los datos del archivo. Si falla, lanza el error.
export const getAllFiles = async () => {
  const response = await apiClient.get('/files') // Solicitud GET a la API para obtener todos los archivos
  return response.data
}

// Metodo para obtener los datos de un archivo específico
// Este metodo toma el nombre del archivo como parametro y realiza una solicitud GET a la ruta `/file/{fileName}`.
// Si esta ok, devuelve los datos del archivo. Si falla, lanza el error.
export const getFile = async (fileName) => {
  const response = await apiClient.get(`/file/${fileName}`)
  return response.data
}
