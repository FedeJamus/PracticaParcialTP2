const axios = require('axios')
const chai = require('chai');
const { assert } = chai;
const { Folder} = require('../src/db/models')
const {randWord, randNumber} = require('@ngneat/falso')

describe('TEST DE USERS', function() {
    let userAux;
    
        before('Creo carpeta para test', async function() {
            userAux = await axios.post('http://localhost:3000/users',
                    {
                        name: 'fede',
                        surname: 'rosanes',
                        type: 2 
                    });
        }); 
    
        it('Puedo crear un usuario',async function(){
            let id = userAux.data.id;
            let resultado = await axios.get('http://localhost:3000/users/:' + id);
            assert.equal(resultado.status, 200);
        });
        it('No puedo traer usuario que no existe',async function(){
            try{
                await axios.get('http://localhost:3000/users/-1')
            }catch(error){
                assert.equal(error.status, 400);
            }
        });
        it('No puedo crear un usuario sin nombre',async function(){
            try{
                await axios.post('http://localhost:3000/users',
                {
                    name:'',
                    surname:'nuevo',
                    type:1 
                });
            }catch(error){
                assert.equal(error.response.status, 400);
            }
        });
        it('debe dar error si pone otro tipo de name', async function() {
            try{
                await axios.post('http://localhost:3000/users',
                {
                    name: 'agostina',
                    userId: 2
                });
            }catch(error){
                assert.equal(error.response.status, 400);
            }
        });
    
         after('Elimino la carpeta creada para el test', async function() {
            let deleteId = userAux.data.id;
            await axios.delete('http://localhost:3000/users/' + deleteId);
        }); 
    
    });