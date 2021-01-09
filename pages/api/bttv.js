import { getBTTV } from "../../lib/bttv";

export default async (req, res) => {
  const { twitchUserId } = req.body;
  console.log("Twitch", twitchUserId);
  try {
    await fetch(
      `https://api.betterttv.net/3/cached/users/twitch/${twitchUserId}`
    )
      .then((response) => response.json())
      .then((response) => {
        try {
          let bttvEmotes = [
            ...response.channelEmotes,
            ...response.sharedEmotes,
          ];

          return res.status(200).json({
            bttvEmotes,
          });
        } catch (err) {
          return res.status(400).json({ error: "No BTTV Emotes" });
        }
      });
    //     console.log("Response:" , response.json())
  } catch (err) {
    return res.status(500).json({ error: err.message || err.toString() });
  }
};
