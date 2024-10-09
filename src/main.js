import express from 'express'
import 'dotenv/config'
import { getAll, getAvailableFiles } from './routes/files.js'

const app = express()
const router = express.Router()

app.use(cors({
  origin: '*', // Permitir todos los orígenes
  methods: ['GET'],
}));

// Rutas habilitadas
router.get('/files/list', getAvailableFiles)
router.get('/files/data', getAll)

// Versionamiento de los endpoints
app.use('/v1', router)

// Middleware para manejar los errores 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Recurso no encontrado' }))

// Iniciar el servidor
app.listen(process.env.PORT, () => {
  console.log(`> Servidor iniciado en la url: http://${process.env.DOMAIN}:${process.env.PORT}/`)
})

export default app
