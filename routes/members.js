import { Router } from "express";
import { User } from "../models/user.js";
import { Member } from "../models/members.js";
import { comparePassword, hashPassword } from "../helpers.js";
import { query, validationResult, checkSchema, matchedData } from 'express-validator';
import { createMemberCreationValSchema, createUserLoginValSchema, createUserRegValSchema } from "../Validation.js";

const router = Router();
// To get all users
router.get("/api/users", async (req, res) => {
    try{
        const users = await User.find();
       
        if (!users) throw new Error("User not found");
                
        res.status(200).send(users)
    
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Error:", err);
    }
});

       

// To get the user by ID
router.get("/api/users/:id", async (req, res) => {
    const { params: id } = req;
    try{
        console.log(id);
        const findUser = await User.findOne({ _id: id.id }); //Find user by the ID
        if (!findUser) return res.redirect('/error'); //When user isn't found
    
        res.status(200).send(findUser) //Sends the user response
    
    } catch (err) {
        console.error("error:", err);
        res.redirect('/error').json({ error: err.message || "failed" });
    }
});
// To get all members
router.get("/api/members", async (req, res) => {
    try{
        const member = await Member.find();
       
        if (!member) return res.redirect('/error');
                
        res.status(200).send(member)
    
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Error:", err);
    }
});
//To add family members
router.post("/api/member/add", checkSchema(createMemberCreationValSchema), async (req, res) => {
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
            dateofbirth: body.dateofbirth,
        }).save().then(user => {
            
            console.log('Member created successfully:', user.toJSON());
            return res.redirect('/members')
          }).catch(err => {
            console.error('Error creating user:', err);
          });
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    }
});
// Show members info
router.get("/api/member/:id", async (req, res) => {
    const { params: id } = req;
    try{
        // Find members by id
        const findMember = await Member.findOne({ _id: id.id });
        console.log(findMember._id);
        if (!findMember) return res.redirect('/error');
    
        res.redirect(`/member`, {data: findMember._id});
    
    } catch (err) {
        console.error("error:", err);
        res.redirect('/error')
    }
});
//update a user record
router.post("/api/users/update/:id", async (req, res) => {
    const { body, params: id } = req;
    body.password = hashPassword(body.password); //To hash the updated password
    try{
       
        const UpdateUser = await User.updateOne({ _id: id.id }, {$set: body});  // To get the user by Id and update the body
        
        if (!UpdateUser) throw new Error("User not cannot be updated");
        
        // Response with the user
        res.redirect('/members')
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to update user" });
    }
});

// To delete users
router.delete("/api/users/delete/:id", async (req, res) => {
    const { params: id } = req;
    
    try{
       
        const deleteUser = await User.deleteOne({ _id: id.id }); // Find the user by Id and delete
        
        if (!deleteUser) throw new Error("User not cannot be updated");
        
    
        res.status(200).send(deleteUser)
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to delete user" });
    }
});

// Update Member's record
router.post("/api/member/update/:id", async (req, res) => {
    const { body, params: id } = req;
    
    try{
       
        const UpdateMember = await Member.updateOne({ _id: id.id }, {$set: body});  // To get the user by Id and update the body
        
        if (!UpdateMember) return res.redirect('/error');
        
    
        res.redirect('/members')
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to update user" });
    }
});

// Delete member
router.post("/api/member/delete/:id", async (req, res) => {
    const { params: id } = req;
    
    try{
       
        const deleteMember = await Member.deleteOne({ _id: id.id });
        
        if (!deleteMember) return res.redirect('/error');
        
    
        res.redirect('/members')
    
    } catch (err) {
        console.error("error:", err);
        res.status(500).json({ error: err.message || "failed to delete user" });
    }
});

export default router