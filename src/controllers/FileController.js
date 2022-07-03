const {File,Image} = require('../db/models')

class FileController{
    async getAll(req,res){
        await File.findAll()
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async createFile(req,res){
        await File.create(
            {
            title:req.body.title,
            folderId: req.body.folderId
            }
        ).then(function(data){
            res.status(201).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async modifiyFile(req,res){
        await File.update(
            {
                title:req.body.title
            },{where: {id : req.params.id}}
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async eliminar(req,res){
        await File.destroy({where:{id : req.params.id}}
        ).then(function(){
            const resultado = {mensaje:"Archivo borrado id nro "+req.params.id}
            res.status(200).send(resultado)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getFileById(req,res){
        await File.findByPk(req.params.id)
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getImageByFileId(req,res){
        await File.findOne(
            {
                where:{
                    id : req.params.id
                },include:{model:Image}
            }//traigo un solo registro del otro modelo
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
}

module.exports = FileController;