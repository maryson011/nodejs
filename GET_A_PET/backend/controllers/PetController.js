const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

const Pet = require('../models/Pet')
const User = require('../models/User')

module.exports = class PetController{
    // create a pet
    static async create(req, res){
        const { name, age, weight, color } = req.body

        const images = req.files

        const available = true

        // images upload

        // validations
        if(!name){
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
            return
        }
        if(!age){
            res.status(422).json({
                message: 'A idade é obrigatório!'
            })
            return
        }
        if(!weight){
            res.status(422).json({
                message: 'O peso é obrigatório!'
            })
            return
        }
        if(!color){
            res.status(422).json({
                message: 'A cor é obrigatório!'
            })
            return
        }
        if(images.length === 0){
            res.status(422).json({
                message: 'A imagem é obrigatório!'
            })
            return
        }

        // get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            imagens: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            },
        })

        images.map((image)=>{
            pet.imagens.push(image.filename)
        })

        try{
            const newPet = await pet.save()

            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet
            })
        }catch(err){
            res.status(500).json({
                message: err
            })
        }
    }

    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req, res){
        // get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)
        const id = user._id.toString();

        // filter by sub object
        const pets = await Pet.find({'user._id': id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    static async getAllUserAdoptions(req, res){
        // get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)
        const id = user._id.toString();

        // filter by sub object
        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    static async getPetById(req, res){
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: "ID inválido!"
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado!"
            })
            return
        }

        res.status(200).json({
            pet: pet,
        })
    }

    static async removePetById(req, res){
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: "ID inválido!"
            })
            return
        }

        // ckeck if pet exists
        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não existe!"
            })
            return
        }

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: "Houve um problema! Tente novemente mais tarde."
            })
            return
        }

        await Pet.findByIdAndDelete(id)

        res.status(200).json({
            message: "Pet removido com sucesso!"
        })
    }

    static async updatePetById(req, res){
        const id = req.params.id

        const { name, age, weight, color, available } = req.body

        const images = req.files

        const updatedData = {}

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado!"
            })
            return
        }

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: "Houve um problema! Tente novemente mais tarde."
            })
            return
        }

        // validations
        if(!name){
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
            return
        }else{
            updatedData.name = name
        }
        if(!age){
            res.status(422).json({
                message: 'A idade é obrigatório!'
            })
            return
        }else{
            updatedData.age = age
        }
        if(!weight){
            res.status(422).json({
                message: 'O peso é obrigatório!'
            })
            return
        }else{
            updatedData.weight = weight
        }
        if(!color){
            res.status(422).json({
                message: 'A cor é obrigatório!'
            })
            return
        }else{
            updatedData.color = color
        }
        console.log(images)
        if(images.length > 0){
            updatedData.imagens = []
            images.map((image)=>{
                updatedData.imagens.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({
            message: "OK"
        })
    }

    static async schedule(req, res){
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado!"
            })
            return
        }

        // check if user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() === user._id.toString()){
            res.status(422).json({
                message: 'Você não pode marcar visitas para seus propios pets!'
            })
            return
        }

        // check if user has already scheduled a visit
        if(pet.adopter){
            if(pet.adopter._id.toString() === user._id.toString()){
                res.status(404).json({
                    message: 'Você já agendou uma visita para esse pet!'
                })
                return
            }
        }

        // add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            message: `A visita foi agendada com sucesso! Entre em contato com ${pet.user.name}.`
        })
    }

    static async concludeAdoption(req, res){
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if(!pet){
            res.status(404).json({
                message: "Pet não encontrado!"
            })
            return
        }

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: "Houve um problema! Tente novemente mais tarde."
            })
            return
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            message: "Parabéns! Adoção finalizada."
        })
    }
}