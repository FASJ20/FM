import { Router } from "express";
import { Member } from "../models/members.js";
import { validationResult, checkSchema } from 'express-validator';
import { createMemberCreationValSchema} from "../Validation.js";

const router = Router();


//To show all members
router.get('/members', (req, res, next)=>{
    if(!req.session.user){
        return res.render("./auth/login.ejs", {error: null} );
    }
    next()
}, async (req, res) => {
    let Data = await Member.find()
    res.render("./members/index.ejs", {data: Data} );
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


//To route to the add members page
router.get('/member/add', (req, res) => {
    res.render("./members/addmember.ejs");
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

// Show just one member
router.get('/member/:id', async (req, res) => {
    let data = await Member.findOne({_id: req.params.id});
    res.render('./members/show', { item: data })
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

//To update members
router.post('/member/update', async (req, res) => {
    let data = await Member.findOne({_id: req.body.id});
    res.render("./members/edit.ejs", { item: data });
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