import { Router } from "express";
import { Member } from "../models/members.js";
import { validationResult, checkSchema } from 'express-validator';
import { createMemberCreationValSchema} from "../utils/Validation.js";
import { checkToken } from "../utils/middlewares.js";

const router = Router()


//Get all members
router.get("/api/members", checkToken, async (req, res) => {
    try{
        const members = await Member.find();
       
        if (!members) return res.redirect('/error');
                
        res.status(200).json(members)
    
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Error:", err);
    }
});


//Get members by Id
router.get("/api/member/:id", checkToken, async (req, res) => {
    const { params: id } = req;
    try{
        // Find members by id
        const findMember = await Member.findOne({ _id: id.id });
        console.log(findMember._id);
        if (!findMember) return res.redirect('/error');
    
        res.status(201).json(findMember);
    
    } catch (err) {
        console.error("error:", err);
        res.redirect('/error')
    }
});


//POST METHODS

//Create members
router.post("/api/member", checkToken, checkSchema(createMemberCreationValSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const { body } = req;
   
    try {
        // To get a members record
        new Member({
            firstname: body.firstname,
            lastname: body.lastname,
            age: body.age,
            gender: body.gender,
            placeofresidence: body.placeofresidence,
            dateofbirth: body.dateofbirth,
            createdat: new Date().getTime(),
            updatedat: new Date().getTime(),
            mother: body.mother,
            father: body.father
        }).save().then(user => {
            
            console.log('Member created successfully:', user.toJSON());
            return res.json(Member);
          }).catch(err => {
            console.error('Error creating user:', err);
          });
          res.get('/api/members');
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    }
});

//PATCH UPDATE

// Update Member's record
router.patch("/api/member/update/:id", checkToken, async (req, res) => {
    const { body, params: id } = req;
    
    try{
       
        const UpdateMember = await Member.updateOne({ _id: id.id }, {$set: body}, {updatedat: new Date()});  // To get the user by Id and update the body
        
        if (!UpdateMember) return res.redirect('/error');
        
    
        res.json(UpdateMember)
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to update user" });
    }
});

// Delete member
router.delete("/api/member/delete/:id", checkToken, async (req, res) => {
    const { params: id } = req;
    
    try{
       
        const deleteMember = await Member.deleteOne({ _id: id.id });
        
        if (!deleteMember) return res.send("Successfuly deleted")
        
    
        
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to delete user" });
    }
});


export default router