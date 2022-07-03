const {User,Folder,File} = require('../db/models')

class UserController{
    async getAll(req,res){
        await User.findAll(
         /*  {
            where:{type:req.params.type}
          } */
        )
        .then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getOne(req,res){
      await User.findOne({where:{id:req.params.id}})
      .then(function(data){
          res.status(200).send(data)
        })
        .catch(error => {
          res.status(400).send(error)
        })
    }
    async createUser(req,res){
        await User.create(
            {
                name: req.body.name,
                surname: req.body.surname,
                type: req.body.type
            }
        ).then(function(data){
            res.status(201).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async modifiyUser(req,res){
        await User.update(
            {
                name:req.body.name
            },{where: {id : req.params.id}}
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async eliminar(req,res){
        await User.destroy({where:{id : req.params.id}}
        ).then(function(){
            const resultado = {mensaje:"Usuario borrado id nro "+req.params.id}
            res.status(200).send(resultado)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getfoldersByUserId(req,res){
        await User.findOne(
            {
                where:{
                    id : req.params.id
                },include:{model:Folder,where:{id:req.params.folderId}}
            }//traigo un solo registro del otro modelo
        ).then(function(data){
            res.status(200).send(data)
          })
          .catch(error => {
            res.status(400).send(error)
          })
    }
    async getfilesByUserId(req,res){
      await User.findOne(
          {
              where:{
                  id : req.params.id
              },include:{model:File}
          }//traigo un solo registro del otro modelo
      ).then(function(data){
          res.status(200).send(data)
        })
        .catch(error => {
          res.status(400).send(error)
        })
  }
}

module.exports = UserController;