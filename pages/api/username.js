import {getUserId} from "../../lib/username"


export default async (req, res) =>{

    const {username} = req.body;
    
    if(!username) {
        return res.status(400).json({error: 'Username is required'})
    }
    try{
        await fetch(`https://api.twitch.tv/v5/users?login=${username}&client_id=xu66f5pxfyx4o4wh9nofrcodnvh5dg`)
        .then(response=>response.json())
        .then(response=>{  
            
            if (response._total===1){
                // console.log("userfound", response['users'][0]['_id'])
                return res.status(200).json({
                    usernameId : response['users'][0]['_id']
                })
            }
            else{
                return res.status(400).json({error: 'User does not exist'})
        }
        
    })
    //     console.log("Response:" , response.json())
    
  

    }
    catch(err){
        return res.status(500).json({ error: err.message || err.toString() });
    }

}