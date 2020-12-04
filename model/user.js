const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    collection: 'users'
}
)

userSchema.pre('save', async function (next) {
    // check if the password has not been modified
    if (!this.isModified('password')) {
      // call our next middleware function
      next()
    } else {
      // if it has been modified encrypt password using bcrypt like below
      this.password = await bcrypt.hash(this.password, 10)
    }
    next()
  })


const user = mongoose.model('userSchema', userSchema)

module.exports = user