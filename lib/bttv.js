
let myTwitchid = process.env.NEXT_PUBLIC_MY_ID


export const  getBTTV=   async ()=>{
    var fullList = []

     const response = await fetch(`https://api.betterttv.net/3/cached/users/twitch/403602221`)
      return response.json()

    }