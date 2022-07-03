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
     /*  if(req.body.name===''){
          res.status(400).send({mensaje:'El nombre no puede ser vacio'})
      }  else{  */
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
    //  }
    }
    async modifiyFolder(req,res){
        await Folder.update(
            {
                name:req.body.name
            },{where: {id : req.params.id}}
        ).then(function(data){
          console.log(data)
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
    async getFilesByFolderId(req,res){
        await Folder.findOne(
            {
                where:{
                    id : req.params.id
                },include:{model:File,where:{id:req.params.fileId}}
            }//traigo un solo registro del otro modelo
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
}

module.exports = FolderController;