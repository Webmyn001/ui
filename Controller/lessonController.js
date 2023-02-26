const Lesson = require("../Models/lessonModels")
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const cloudinary = require("../Cloudinary/cloudinary")







// create new lesson
const createLesson =  async (req, res, next) => {
  const {Title, Subtitle, Body1, Body2, Body3, Body4, image1, } = req.body
  var image = req.body.image1
      try{
          // uploading first image to cloud
          const firstimg = await cloudinary.uploader.upload(image,
            {
              folder:"Images"
            })
          //  uploading second image to cloud
           
         
           
        const lesson = await Lesson.create({
          Title,
          Subtitle,
          Body1,
          Body2,
          Body3,
          image1 :{
           public_id: firstimg.public_id,
           url: firstimg.url
          },
          
          Body4
        })
        res.status(201).json({
          success: true,
          lesson
        })
      }
      catch (error) {
          console.log(error);
          next(error);
      }
  }

    
 // get all lessons

 const getLessons = async (req,res) => {
   const lesson = await Lesson.find({}).sort({createdAt:-1})
   res.status(200).json(lesson)
 }

 // get a single lesson 

 const getLesson = async (req,res) => { 
   const {id} = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   
   const lesson = await Lesson.findById(id)
  if (!lesson) {
   return res.status(404).json({error: "Not found"})
 }
  res.status(200).json(lesson)
 }

 //delete lesson

 const deleteLesson = async (req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   
   const lesson = await Lesson.findOneAndDelete({_id:id})
  if (!lesson) {
   return res.status(400).json({error: "Not found"})
 }
  res.status(200).json(lesson)
 }


// update lesson

const updatelesson = async(req, res) => {
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: "Not found"})
   }
   const lesson = await Lesson.findOneAndUpdate({_id:id}, {...req.body})
   if (!lesson) {
       return res.status(400).json({error: "Not found"})
     }
      res.status(200).json(lesson)
     }


     

module.exports = {
  getLesson,
  getLessons,
  deleteLesson,
  updatelesson,
  createLesson,  
}



















     

    