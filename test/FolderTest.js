const axios = require('axios')
const chai = require('chai');
const { assert } = chai;
const { Folder} = require('../src/db/models')
const { folderController} = require('../src/controllers/FolderController')
const {randWord, randNumber} = require('@ngneat/falso')

describe('TEST DE CARPETAS', function() {

    before('Creo carpeta para test', async function() {
        this.folderAux = await axios.post('http://localhost:3000/folders',
                {
                    name: 'fede',
                    userId: 2 
                });
    }); 

     it('Puedo crear la carpeta', async function() {
        let id = this.folderAux.data.id;
        let resultado = await axios.get('http://localhost:3000/folders/:' + id);
        assert.equal(resultado.status, 200);
    });
    it('Puedo hacer el get de una carpeta', async function() {
        const rta = await axios.get('http://localhost:3000/folders/'+this.folderAux.data.id);
        assert.equal(rta.status, 200)
    });
    it('No tengo que poder poner un nombre vacio', async function() {
        try{
            await axios.post('http://localhost:3000/folders',
            {
                name: '',
                userId: 2 
            });
        }catch(error){
            assert.equal(error.response.status, 400);
        }
    });
    it('debe dar error si no lleva el userId', async function() {
        try{
            await axios.post('http://localhost:3000/folders',
            {
                name: 'fede',
                userId: ''
            });
        }catch(error){
            assert.equal(error.response.status, 400);
        }
    });
    it('Puedo cambiar el nombre de una carpeta',async function(){
        let id = this.folderAux.data.id;
        const rta = await axios.patch('http://localhost:3000/folders/'+id,{name:'carpetaModificada'})
        assert.equal(rta.data, 1)
    });
    it('No puedo cambiar una carpeta que no existe',async function(){
        let id = 200;
        const rta = await axios.patch('http://localhost:3000/folders/'+id,{name:'carpetaModificada'})
        assert.equal(rta.data, 0)
    });
    it('No puedo poner carpeta con nombre HOLA',async function(){
        try{
            await axios.post('http://localhost:3000/folders/',{
                name:'hola',
                userId:3
            })
        }catch(error){
            assert.equal(error.response.status,400,"No podes escribir HOLA")
        }
    });
    it('La carpeta no puede repetir el nombre', async function() {
        try{
            this.folderAux = await axios.post('http://localhost:3000/folders',
                    {
                        name: 'fede',
                        userId: 2 
                    });
        }catch(error){
            assert.equal(error.response.status,400)
        }
    }); 
   
     after('Elimino la carpeta creada para el test', async function() {
        let deleteId = this.folderAux.data.id;
        await axios.delete('http://localhost:3000/folders/' + deleteId);
    }); 

});