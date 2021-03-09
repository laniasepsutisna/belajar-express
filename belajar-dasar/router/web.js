const express = require('express')
app = express();
const router = express.Router()

const routerUser = require('../router/user')
router.use(routerUser);

router.get('/', function (req, res){
    res.render('pages/index')
})

router.get('/about', function (req, res){
    res.render('pages/about')
})

router.get('/main', function (req, res){
    res.render('components/main')
})

module.exports = router