get git version== git -version

add directory to git===git add .

add email id to git ==git config --global user.email "sachinjain526@gmail.com"

commit first in git===git commit -m "initail commit"

to check modified file ---git status

to clean git --git clean -d -x -f
/////////////////////////

check heroku in system====heroku -v

login in heroku===heroku login
Create new project ===heroku create

add project in heroku--git remote add heroku https://whispering-stream-30329.herokuapp.com/
then run this commond-- git push heroku master

run code in browser--- heroku open
check log----heroku logs
/////////////////////////
to install passport-npm install --save passport passport-google-oauth20
////////////////////////
to restart server autometically insatll nodemon

to run nodemon in project === npm run "key name"

install mongoose
////////////////////////////

create react js installaion=---------npm install -g create-react-app
creating app=========create-react-app client

clear all js inside src folder except ragister service wrker.js

move to client directoy and run command to install redux

npm install --save redux react-redux react-router-dom
/////////

npm install --save concurrently

/// to build project----npm run build


// to get data async way

const fetchAl=async ()=>{
    const res=await fetch('https://rallycoding.herokuapp.com/api/music_albums')
const json=await res.json();

    console.log(json);
}
fetchAl();

// install css in project

npm install --save materialize-css
 and import in our project atleast once using import materializeCSS from 'materialize-css/dist/css/materialize.min.css'

 // update npm =================================
 npm i -g npm
 // install redux and axios to hadle the request 

 npm install --save axios redux-thunk

 // added stripe checkou for react is used to store credit card and form to display user.

 npm install --save react-stripe-checkout
 // install stipr to handle token after successfuly transiction

 npm install --save stripe

 // for taken handle of request param in ajax 

 npm install --save body-parser