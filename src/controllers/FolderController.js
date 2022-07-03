const {Folder,File} = require('../db/models')

class FolderController{
    async getAll(req,res){
        await Folder.findAll()
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getOne(req,res){
      await Folder.findOne({where:{id:req.params.id}})
      .then(function(data){
          res.status(200).send(data)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    }
    async createFolder(req,res){

      let newFolder = await Folder.findOne({where:{name:req.body.name}})
      if(newFolder === null ){
        await Folder.create(
          {
              name: req.body.name,
              userId: req.body.userId
          }
      ).then(function(data){
          res.status(201).send(data)
        })
        .catch(error => {
          res.status(400).send(error)
        })
      }else{
        let resultado = {mensaje:"No puede crear otra carpeta con el mismo nombre"}
        res.status(400).send(resultado)
      }
    }
    async modifiyFolder(req,res){
        await Folder.update(
            {
                name:req.body.name
            },{where: {id : req.params.id}}//poner id : re.params.id para q modifique por id
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async eliminar(req,res){
        await Folder.destroy({where:{id : req.params.id}}
        ).then(function(){
            const resultado = {mensaje:"carpeta borrada id nro "+req.params.id}
            res.status(200).send(resultado)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getFileIdByFolderId(req,res){
        await Folder.findOne(
            {
                where:{
                    id : req.params.id
                },include:{model:File,where:{id:req.params.fileId}}
            }//traigo el archivo pedido de la carpeta pedida
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getFilesByFolderId(req,res){
      await Folder.findOne(
          {
              where:{
                  id : req.params.id
              },include:{model:File}
          }//traigo todos los archivos de la carpeta
      ).then(function(data){
          res.status(200).send(data)
        })
        .catch(error => {
          res.status(400).send(error)
        })
  }
}

module.exports = FolderController;