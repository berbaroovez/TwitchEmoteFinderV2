export const getUserId = async (username)=>{
   const response = await fetch(`https://api.twitch.tv/v5/users?login=${username}&client_id=xu66f5pxfyx4o4wh9nofrcodnvh5dg`)
    return response.json()
 
 }



//  .then(response=>response.json())
//  .then(response=>{  
//      console.log(response)
//          response._total===1?setTwitchID(response['users'][0]['_id']):setTwitchID(null)