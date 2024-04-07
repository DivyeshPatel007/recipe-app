// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Name is Required"]
//     },
//     email: {
//         type: String,
//         required: [true, "Email is Required"],
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Password is Required"]
//     },

// },
//     {
//         timestamps: true
//     }
// )

// const User = mongoose.models.users || mongoose.model("Users", userSchema)


// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },

},
    {
        timestamps: true
    }
)


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
