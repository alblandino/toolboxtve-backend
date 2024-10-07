import { getAllFiles, getFile } from '../services/files.js'

// Función para transformar las líneas del archivo en el formato requerido
const transformLines = (lines) => {
  const result = []
  const line = lines.split('\n') // Dividir las líneas del archivo

  // Omitir la primera línea que contiene los encabezados
  for (let i = 1; i < line.length; i++) {
    const columns = line[i].split(',') // Columnas del archivo CSV

    // Verificar si hay suficientes columnas para extraer los datos
    if (columns.length >= 4) {
        const [file, text, number, hex] = columns
        if (text && number && hex) result.push({ text, number: Number(number), hex }) // Agregamos a la respuesta
    }
  }
  return result
}

export const getAll = async (req, res) => {
  try {
    // Obtener la lista de archivos
    const { files } = await getAllFiles()

    // Hacer una solicitud para cada archivo y obtener su contenido
    const filesDetailsPromise = files.map(async (fileName) => {
      try {
        const lines = await getFile(fileName)
        
        // Transformar las líneas del archivo al formato requerido
        const transformedLines = transformLines(lines)

        // Si el archivo tiene contenido válido, retornarlo, de lo contrario omitirlo
        if (transformedLines.length > 0) {
          return { file: fileName, lines: transformedLines }
        }

        // Si no tiene contenido, retornar null
        return null
      } catch (error) {
        console.error(`Error al obtener los datos del archivo: ${fileName}`)
        return null
      }
    })

    // Esperar a que todas las promesas se resuelvan
    const fileDetails = await Promise.all(filesDetailsPromise)

    // Filtrar los archivos vacíos o con errores (null)
    const filteredDetails = fileDetails.filter(detail => detail !== null)

    // Retornar la respuesta con los detalles de cada archivo
    res.status(200).json([...filteredDetails])
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los archivos' })
  }
}
