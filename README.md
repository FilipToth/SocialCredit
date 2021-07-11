# This is just a meme
 I am by all means not supporting the Chinese Communist Party in it's mission to oppress the hard-working wonderful Chinese people. This is just to spread awareness of the terrible government atrocities that are happening in China. Free speach is one of the most important factors in having a working democracy (something that the Chinese government directly opposes).

# SocialCredit
 A discord bot that provides admins with the tools they'll need to create a working social credit system. #StandWithHongKong #FreeTibet #TaiwanIsACountry
 
# How to set this up yourself.
- Clone the repo
- Create a `config.json` file in the `./src` folder
- the `config.json` should have these properties: token, prefix, debug, faunaKey. 
- If you want to change the property names, remove or add some properties, edit the `Config.ts` file inside the `./Interfaces` folder.
- Set the `token` to the auth token of your discord bot, the `prefix` to your desired prefix, if you want the bot to start in debug mode, set `debug` to true, and set the `faunaKey` to the secret key you got from your fauna user. 
- You will then also have to create a `package.json` file.
- Then just start the app with npm, yarn or whatever you want to use.
- Enjoy the tyranny this bot brings to your discord servers.

### Example `Config.json`
```json
{
    "token": "adsSADASDADADAadasdadasdadsadsasasas",
    "prefix": "cpc?",
    "debug": false,

    "faunaKey": "sdsdsdsdadsdadsads"
}
```
