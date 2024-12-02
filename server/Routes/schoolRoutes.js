const express=require('express');
const router=express.Router();
const schoolController=require('../Controllers/schoolControllers')
router.get('/getallschools',schoolController.getAllSchools);
router.post('/addschool',schoolController.addSchool);
module.exports=router