# This is just a meme
 I am by all means not supporting the Chinese Communist Party in it's mission to oppress the hard-working wonderful Chinese people. This is just to spread awareness of the terrible government atrocities that are happening in China. Free speach is one of the most important factors in having a working democracy (something that the Chinese government directly opposes).

# SocialCredit
 A discord bot that provides admins with the tools they'll need to create a working social credit system. #StandWithHongKong #FreeTibet #TaiwanIsACountry
 
# How to set this up yourself.
- Clone the repo
- Create a `.env` file in the project directory.
- The `.env` should have these variables: TOKEN, PREFIX, DEBUG, FAUNA_KEY, and KEYWORDS_JSON_PATH 
- Set the `TOKEN` to the auth token of your discord bot, the `PREFIX` to your desired prefix, if you want the bot to start in debug mode, set `DEBUG` to true, and set the `FAUNA_KEY` to the secret key you got from your fauna user. The `KEYWORDS_JSON_PATH` variable should be set to the path to your keywords.json for the suggestion system.
- Then just start the app with npm, yarn or whatever you want to use.
- Enjoy the tyranny this bot brings to your discord servers.

### Example `.env`
```env
TOKEN=sssshhhh it is a secret!
PREFIX=cpc?
DEBUG=false
KEYWORDS_JSON_PATH=./src/Analyzers/keywords.json
FAUNA_KEY=faunadb for funzzziez
```