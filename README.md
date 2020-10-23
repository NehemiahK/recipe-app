# Recipe App

## Motivation for this project 

- I wanted a super easy way to share recipes and search exisiting recipes. 
- I did not want to have rely on application that would either charge me or have my data subject to their terms.
- I might want to add more custom functionality down the road.

## Additonal Setup: 

- You will need a config folder, insider there is a keys file to put whatever keys are specific to your application. 

```
module.exports = {
    mongodburl:"",
    facebookAppId:,
    facebookAppSecret:'',
}
```
## Deployment
- Be sure to include the exported keys in your configuration vars (Heroku for example).
- Facebook App ID and secret can both be found in the basic settings for your app.
- Remember to change the auth URL on Facebook once you've deployed your app.

## Bugs

- Feel free to open an issue for any bugs or enhancements. 
- If you're interested in contributing, that's wonderful =)
