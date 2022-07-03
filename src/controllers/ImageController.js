const {Image} = require('../db/models')

class ImageController{
    async getAll(req,res){
        await Image.findAll()
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async createImage(req,res){
        await Image.create(
            {
            name:req.body.name,
            fileId: req.body.fileId
            }
        ).then(function(data){
            res.status(201).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async modifiyImage(req,res){
        await Image.update(
            {
                name:req.body.title
            },{where: {id : req.params.id}}
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async eliminar(req,res){
        await Image.destroy({where:{id : req.params.id}}
        ).then(function(){
            const resultado = {mensaje:"Imagen borrado id nro "+req.params.id}
            res.status(200).send(resultado)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getImageById(req,res){
        await Image.findByPk(req.params.id)
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
   
}

module.exports = ImageController;