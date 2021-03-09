const mongoose = require("mongoose")

const karyawanSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    npp: {
        type: Number,
        required: true
    },
    jabatan: {
        type: String,
        required: true
    },
    entitas: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Karyawan", karyawanSchema);