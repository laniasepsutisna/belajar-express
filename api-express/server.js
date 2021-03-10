const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const app = express()

//TODO Pembuatan update produk
//TODO Pembuatan delete produk
//TODO Transkaksi Pembelian
//TODO Reporting invoice pembelian

// set middleware form
app.use(express.urlencoded({
    extended: true
}));

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
/* Get List Product */
app.get('/product', function(req, res) {
    const products = getProductData()
    res.render('pages/product/index', {
        products: products
    });
});

/* Get List Product */
const getProductData = () => {
    const jsonData = fs.readFileSync('data/product.json')
    return JSON.parse(jsonData)
}

/* Add Product */
app.post('/product/add', (req, res) => {
    //get the existing user data
    const existProducts = getProductData()

    //get the new user data from post request
    const productData = {
        id : uuidv4(),
        name : req.body.name,
        desc : req.body.desc,
        price : req.body.price,
    };

    //append the user data
    existProducts.push(productData)
    //save the new user data
    saveProductData(existProducts);
    res.redirect('/product');
});

//save data product to json file
const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data/product.json', stringifyData)
}

/* Edit Product */
app.get('/product/edit/:id', (req, res) => {
    //get the username from url
    const id_product = req.params.id
    // //get the existing user data
    const existProducts = getProductData()
    //check if the username exist or not
    const findExist = existProducts.find( product => product.id === id_product )
    console.log(findExist);

    res.render('pages/product/edit', {
        product: findExist,
        products: existProducts
    });
})

/*END PRODUCT*/

/* util functions ends */
//configure the app port
app.listen(3000, () => {
    console.log('app runs on port 3000')
})