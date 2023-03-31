const express = require('express');
const router = express.Router()
module.exports = router;
const modeloTarefa = require('../models/tarefa');

const backupid = "64262567b6b3a1d705294dac";

let backupAll = {
    acao: "vazio",
    edit: {}
}

router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
    descricao: req.body.descricao,
    statusRealizada: req.body.statusRealizada
    })
    try {
    const tarefaSalva = await objetoTarefa.save();
    res.status(200).json(tarefaSalva)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
   })

   
router.get('/getAll', async (req, res) => {
    try {
    const resultados = await modeloTarefa.find();
    res.json(resultados)
    }
    catch (error) {
    res.status(500).json({ message: error.message })
    }
   })

router.get('/getParteDaDescricao/:teste', async (req, res) => {
    try {
    const abc = req.params.teste;
    const resultados = await modeloTarefa.find({descricao: { $regex: abc }});
    res.json(resultados)
    }
    catch (error) {
    res.status(500).json({ message: error.message })
    }
   })
 
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await modeloTarefa.findByIdAndDelete(req.params.id)
        res.json(resultado)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
   })

router.delete('/deleteAll',async (req, res) =>{
    try{
        const resultado = await modeloTarefa.deleteMany();
    res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        }
   })

   router.delete('/deleteAllDone',async (req, res) =>{
    try{
        const resultado = await modeloTarefa.deleteMany({statusRealizada: true})
    res.json(resultado)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        }
   })

router.patch('/undo', async (req, res) =>{
    try {
        const id = backupid;
        const backupObj = await modeloTarefa.findById(id);
        const desc = backupObj.descricao;
        const status = backupObj.statusRealizada
        const newObj = new modeloTarefa({
            descricao: desc,
            statusRealizada : status
        })
        const backup = await modeloTarefa.findByIdAndUpdate(backupid, {descricao: 'BACKUP'}, {statusRealizada: false})
        const result = await newObj.save()
        res.json(result)
        }
        catch (error) {
        res.status(400).json({ message: error.message })
        }
})
   
router.patch('/update/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const novaTarefa = req.body;
    const options = { new: true };
    const result = await modeloTarefa.findByIdAndUpdate(
    id, novaTarefa, options
    )
    res.json(result)
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }
   })
   