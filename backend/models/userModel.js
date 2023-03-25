const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 Characters long"],
        // maxLength: [23, "Password not more than 23 Characters long"]
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default : "https://scontent.fdac8-1.fna.fbcdn.net/v/t39.30808-1/319510614_635997608323100_7765184291606923409_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHhnuVdkak6Rrc6FzaGDYV-i_Dlot9HGFWL8OWi30cYVeC1U7nDuEA1xqxp_8kcXaf5yxyKVI1L2cRWG6TNS1jZ&_nc_ohc=Y4qxW3fKTzYAX-akbrw&_nc_ht=scontent.fdac8-1.fna&oh=00_AfCH94ZmZVBFHDDwtN9nbrPREEa9WyCw5VFQU1nyJM-WjA&oe=6421AC1C"
    },
    phone: {
        type: String,
        default : "+880"
    },
    bio: {
        type: String,
        maxLength: [250, "Password not more than 250 Characters long"],
        default : "bio"
    },
},
{
    timestamps: true,
}
)

 //encrypt password before saving to DB
 userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next();
 })

const User = mongoose.model("User", userSchema)
module.exports = User