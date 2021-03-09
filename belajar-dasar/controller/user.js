const User = require('../model/user')

module.exports = {
    index: function (req, res) {
        let keyword = {}
        if(req.query.keyword){
            keyword = {name: {$regex: req.query.keyword}}
        }

        const query = User.find(keyword)
        query.select('name _id')
        query.exec(function (err, data) {
            if(err) console.log(err)
            console.log(data.length)

            res.render('pages/user/index', {users: data})
        })

    },

    create: function (req, res){
        res.render('pages/user/create')
    },

    store: function (req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, function (err, data) {
            if(err) console.log(err)
            console.log(data)

            res.redirect('/users')
        })
    },

    show: function (req, res){
        const id = req.params.id
        User.findById(id, function (err, data) {
            if(err) console.log(err)
            console.log(data)
            res.render('pages/user/show', {user: data})
        })
    },
    edit: function (req, res){
        const id = req.params.id
        User.findById(id, function (err, data) {
            if(err) console.log(err)
            console.log(data)
            res.render('pages/user/edit', {user: data})
        })
    },
    update: function (req, res) {
        // is sent as
        // User.update(query, { $set: { name: 'jason bourne' }}, options, function(err, res));
        User.findOneAndUpdate(req.params.id, function (err, data) {
            if (!data)
                return next(new Error('Could not load Document'));
            else {
                // do your updates here
                data.name = req.body.name
                data.email = req.body.email
                data.password = req.body.password

                data.save(function(err) {
                    if (err)
                        console.log('error')
                    else
                        console.log('success')
                });

                res.redirect('/users')
            }
        })
    },

    delete: function (req, res) {
        let id = req.params.id
        users = users.filter(users => users.id != id)
        res.send({
            status: true,
            method: req.method,
            url: req.url,
            message: "Data user berhasil dihapus",
            data: users,
        })
    }
}