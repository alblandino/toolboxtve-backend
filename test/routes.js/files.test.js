import { describe, it, beforeEach, afterEach } from 'node:test'
import { expect } from 'chai'
import sinon from 'sinon'
import * as fileService from '../../src/services/files.js'
import { getAll, getAvailableFiles } from '../../src/routes/files.js'

describe('Rutas API', () => {
  let req, res

  beforeEach(() => {
    // Mockear el request y la respuesta
    req = { query: {} }
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    }
  })

  afterEach(() => sinon.restore()) // Restaurar los mocks

  describe('getAll', () => {
    it('debe retornar datos de un archivo específico cuando se proporciona fileName', async () => {
      req.query.fileName = 'file1.csv'

      const contenidoMockeado = 'id,text,number,hex\n1,sample,123,#FF0000\n'
      const lineasTransformadas = [{ text: 'sample', number: 123, hex: '#FF0000' }]

      sinon.stub(fileService, 'getFile').resolves(contenidoMockeado)

      await getAll(req, res) // Obtener los datos del archivo

      expect(res.status.calledWith(200)).to.equal(true) // Verificar que se envió un 200
      expect(res.json.calledWith({ file: 'file1.csv', lines: lineasTransformadas })).to.equal(true)
    })

    it('debe retornar un 404 si el archivo especificado no tiene datos válidos', async () => {
      req.query.fileName = 'file2.csv'
      sinon.stub(fileService, 'getFile').resolves('id,text,number,hex\n')

      await getAll(req, res) // Obtener los datos del archivo

      expect(res.status.calledWith(404)).to.equal(true) // Verificar que se envió un 404
      expect(res.json.calledWith({ success: false, message: 'Archivo no encontrado o vacío' })).to.equal(true)
    })

    it('debe retornar datos de todos los archivos cuando no se proporciona fileName', async () => {
      req.query.fileName = undefined

      const archivosMockeados = ['file1.csv', 'file2.csv'] //
      const contenidoMockeado1 = 'id,text,number,hex\n1,sample1,123,#FF0000\n'
      const contenidoMockeado2 = 'id,text,number,hex\n2,sample2,456,#00FF00\n'
      const dataTransformada1 = [{ text: 'sample1', number: 123, hex: '#FF0000' }]
      const dataTransformada2 = [{ text: 'sample2', number: 456, hex: '#00FF00' }]

      sinon.stub(fileService, 'getAllFiles').resolves({ files: archivosMockeados })
      sinon.stub(fileService, 'getFile')
        .onCall(0).resolves(contenidoMockeado1)
        .onCall(1).resolves(contenidoMockeado2) // Simulo la respuesta de los archivos

      await getAll(req, res) // Obtener los datos de todos los archivos

      expect(res.status.calledWith(200)).to.equal(true)
      expect(res.json.calledWith([
        { file: 'file1.csv', lines: dataTransformada1 },
        { file: 'file2.csv', lines: dataTransformada2 }
      ])).to.equal(true)
    })

    it('debe retornar 404 si ningún archivo tiene datos válidos', async () => {
      req.query.fileName = undefined
      sinon.stub(fileService, 'getAllFiles').resolves({ files: ['file1.csv', 'file2.csv'] })
      sinon.stub(fileService, 'getFile').resolves('id,text,number,hex\n')

      await getAll(req, res)

      expect(res.status.calledWith(404)).to.equal(true)
      expect(res.json.calledWith({ success: false, message: 'Error al obtener los archivos' })).to.equal(true)
    })
  })

  describe('getAvailableFiles', () => {
    it('debe retornar un listado de archivos disponibles', async () => {
      const archivosMockeados = { files: ['file1.csv', 'file2.csv'] }
      sinon.stub(fileService, 'getAllFiles').resolves(archivosMockeados)

      await getAvailableFiles(req, res)

      expect(res.status.calledWith(200)).to.equal(true)
      expect(res.json.calledWith(archivosMockeados.files)).to.equal(true)
    })

    it('debe retornar un 404 si no se encuentran archivos', async () => {
      sinon.stub(fileService, 'getAllFiles').resolves({ files: [] })

      await getAvailableFiles(req, res)

      expect(res.status.calledWith(404)).to.equal(true)
      expect(res.json.calledWith({ success: false, message: 'No se encontraron archivos' })).to.equal(true)
    })
  })
})
