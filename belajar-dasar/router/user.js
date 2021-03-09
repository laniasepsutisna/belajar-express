const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router.route('/users')
    .get(userController.index)
    .post(userController.store)

router.get('/users/create', userController.create)
router.get('/users/:id/edit', userController.edit)
router.put('/users/:id/update', userController.update)

router.route('/users/:id')
    .get(userController.show)
    // .put(userController.update)
    .delete(userController.delete)

module.exports = router