import '../model/connection.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import userSchemaModel from '../model/user.model.js';
import { randomUUID } from 'crypto';

export var save =async(req,res)=>{
    var userList = await userSchemaModel.find();
    // console.log(userList);
    

    var userDetail = req.body;
    //console.log(userDetail);
    userDetail ={...userDetail,"role":"user","status":1,"info":Date()};
    //console.log(userDetail);
    try{
     const users = await userSchemaModel.create(userDetail)
    res.status(201).json({"status":"Resourse created successfully"});
    }

catch(err){
    console.error("Save Error:", err); // This will show real error in console
    res.status(500).json({ "status": "false", "error": err.message });
}
}

export const fetch = async(req,res)=>{
    var condition_obj = url.parse(req.url,true).query;
    //console.log(condition_obj);
    var user = await userSchemaModel.find(condition_obj);
    
    if(user.length!=0){
        res.status(200).json(user);

    }
    else{
        res.status(404).json({"result":"user not found in database"});
    }
}
export const update = async(req,res)=>{
   
     var condition_obj = req.body.condition_obj;
   //console.log(condition_obj);
   var user = await userSchemaModel.findOne(condition_obj);
   // console.log(user);
  if(user){
          var update_user = await userSchemaModel.updateOne(
  req.body.condition_obj,
  { $set: req.body.content_obj }
);
        if(update_user){
             res.status(200).json({"result":"updated successfully"});
         }
    else{
          res.status(500).json({"result":"not updated successfully"});
          }
 }
    else{
     res.status(404).json({"result":"user not found in database"});
    }
}
export const deleteUser = async(req,res)=>{
    var user = await userSchemaModel.findOne(req.body);
    //console.log(user);
    if(user){
        var delete_user = await userSchemaModel.deleteOne((req.body));
        if(delete_user){
            res.status(200).json({"result":"user  deleted successfully"});
        }
        else{
            res.status(500).json({"result":"user not deleted successfully"});
        }
        }
    
    else{
         res.status(404).json({"result":"user not found in database"});
    }
}
export const login = async(req,res)=>{
     //console.log("h");
     var userDetail  = {...req.body,"status":1};
     //console.log(userDetail);
     var userList = await userSchemaModel.find(userDetail);
     //console.log(userList);
     if(userList.length!=0){
         const payload = {"subject":userList[0].email};
         const key = rs.generate();
         const token = jwt.sign(payload,key);
         res.status(200).json({"token":token,"userList":userList[0]});

     }
     else{
         res.status(500).json({"token":"token error"});
     }
} 