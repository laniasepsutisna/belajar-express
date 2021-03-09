const express = require('express')
const fs = require('fs')
const app = express()

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

//this line is required to parse the request body
app.use(express.json())

/*USER*/
app.get('/', (req, res) => {
    const users = getUserData()
    res.render('pages/index', {
        users: users
    });
})

/* Create - POST method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()

    //get the new user data from post request
    const userData = req.body
    //check if the userData fields are missing
    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }

    //check if the username exist already
    const findExist = existUsers.find( user => user.username === userData.username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})

/* Read - GET method */
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

/* Update - Patch method */
app.patch('/user/update/:username', (req, res) => {
    //get the username from url
    const username = req.params.username
    //get the update data
    const userData = req.body
    //get the existing user data
    const existUsers = getUserData()
    //check if the username exist or not
    const findExist = existUsers.find( user => user.username === username )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }
    //filter the userdata
    const updateUser = existUsers.filter( user => user.username !== username )
    //push the updated data
    updateUser.push(userData)
    //finally save it
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})

/* Delete - Delete method */
app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.username !== username )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
    //save the filtered data
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})

})

/* util functions */
//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data/users.json', stringifyData)
}

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('data/users.json')
    return JSON.parse(jsonData)
}
/*END USER*/

/*PRODUCT*/
//get data product.ejs
/* Read - GET method */
app.get('/product/list', (req, res) => {
    const products = getProductData()
    res.send(products)
})

app.get('/product', function(req, res) {
    const products = getProductData()
    res.render('pages/product', {
        products: products
    });
});

const getProductData = () => {
    const jsonData = fs.readFileSync('data/product.json')
    return JSON.parse(jsonData)
}

/*ENDP RODUCT*/

/* util functions ends */
//configure the app port
app.listen(3000, () => {
    console.log('app runs on port 3000')
})