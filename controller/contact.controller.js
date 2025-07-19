import '../model/connection.js';
import url from 'url';

import contactSchemaModel from '../model/contact.model.js';


export var save =async(req,res)=>{
    var contactList = await contactSchemaModel.find();
    // console.log(contactList);
    var len = contactList.length;
    
    var _id = (len==0)?1:contactList[len-1]._id+1;

    var contactDetail = req.body;
   // console.log(contactDetail);
    contactDetail = {
  ...contactDetail,
  _id: _id,
 
 
  info: new Date() // Use ISO format
};
    //console.log(contactDetail);
    try{
     
     const contacts = await contactSchemaModel.create(contactDetail)
    res.status(201).json({"status":"Resourse created successfully"});
    }

catch(err){
    res.status(500).json({"status":"false"});
}
}
// export const fetch = async(req,res)=>{
   
   
//      var contact = await contactSchemaModel.find();
    
//      if(contact.length!=0){
        
//          res.status(201).json(contact);

//      }
//      else{
        
//          res.status(404).json({"result":"contact not found in database"});
//     }
// }
