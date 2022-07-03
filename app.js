const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const FolderController = require('./src/controllers/FolderController')
const UserController = require('./src/controllers/UserController')
const FileController = require('./src/controllers/FileController')
const ImageController = require('./src/controllers/ImageController')

let Folder = new FolderController
let User = new UserController
let File = new FileController
let Image = new ImageController

app.get('/users',User.getAll)
app.get('/users/:id',User.getOne)
app.get('/users/:id/folders/:folderId',User.getfoldersByUserId)
app.get('/users/:id/files',User.getfilesByUserId)
app.post('/users',User.createUser)
app.patch('/users/:id',User.modifiyUser)
app.delete('/users/:id',User.eliminar)

app.get('/folders',Folder.getAll)
app.get('/folders/:id',Folder.getOne)
app.get('/folders/:id/files/:fileId',Folder.getFilesByFolderId)
app.post('/folders',Folder.createFolder)
app.patch('/folders/:id',Folder.modifiyFolder)
app.delete('/folders/:id',Folder.eliminar)

app.get('/files',File.getAll)
app.get('/files/:id',File.getFileById)
app.get('/files/:id/images',File.getImageByFileId)
app.post('/files',File.createFile)
app.patch('/files/:id',File.modifiyFile)
app.delete('/files/:id',File.eliminar)

app.get('/images',Image.getAll)
app.get('/images/:id',Image.getImageById)
app.post('/images',Image.createImage)
app.patch('/images/:id',Image.modifiyImage)
app.delete('/images/:id',Image.eliminar)


app.listen(3000)