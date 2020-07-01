const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Clear Code

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    caption:{
        type: String
    },
    image:{
        type: String,
        required:true
    },
    name:{
        type: String
    },
    profileImage: {
        type: String
    },
    hashtags: {
        type: [String]
    },
    location:{
        type: String
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String
            },
            profileImage: {
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);