# project_pain

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## What is this
This is a web tool used for visualising pain. It uses different graphics and animations to visualise what the user feels.

## How to use
### The startscreen
The application starts off with an option to login or register a new user.

### The homescreen
On the homescreen you can chose between registering a new pain, checking your profile, and logging out.

### Profile
All your previously registered pains are accessible on the history tab on your profile.
You're supposed to be able to change your avatar to better fit your body, change your password, and recalibrate your base pain tolerance. However, this doesn't work right now.

### Pain registry
To register a new pain you place a circle on your avatar where you feel the pain. You can flip the avatar if the pain is on your backside.
When you click next you choose the depth of your pain by clicking on the corresponding depth on the skincube.
Afterwards you can choose how your pain feels, based on a multitude of pain types. You can also select what affects your pain, and how strong it is.
You get to review your pain before saving it to a database which is accessed in the history tab.


## Doesn't work properly

Currently, you need to have CouchDB running on your machine to properly save to the database.
Cookies aren't implemented, so refreshing the page logs you out.
You can't change your avatar/password, or calibrate your base pain tolerance

## Dependencies

The dependencies is listed in package.json and can be installed by running npm install

## Resources used

The resources we have used, if not stated otherwise, is the documentation for the dependencies used, mainly 
* https://bootstrap-vue.org/
* https://getbootstrap.com/docs/5.0/getting-started/introduction/
* https://vuejs.org/v2/api/
* https://pouchdb.com/guides/setup-pouchdb.html
* https://docs.couchdb.org/en/stable/
* https://p5js.org/
