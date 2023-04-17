const { connectToDatabase } = require('../../lib/mongodb');
const { toHash, compare } = require("../../lib/password");
const ObjectId = require('mongodb').ObjectId;
const jwt = require("jsonwebtoken");
const { cookies } = require('next/headers');
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getUser(req, res);
        }

        case 'POST': {
            return getUser(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}



async function getUser(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        const {id,username,password}=req.body
        // console.log(req.body.username)
        // console.log(req.body.password)
        let user = await db
            .collection('users')
            .findOne({username,password})
        // return the posts
        const encpass= await toHash(password)
        const compaenc= await compare(encpass,password)
        console.log(encpass)
        console.log(compaenc)

        const userToken = jwt.sign(
            {id, username},
            process.env.JWT_KEY
          );

        
        console.log(userToken)
        jwt.verify(userToken,process.env.JWT_KEY,(err, user) => {
            console.log(err)
        
            if (err) return res.sendStatus(403)
        
            // req.user = user
        
            // next()
          })


        return res.json({
            message: JSON.parse(JSON.stringify(user)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function addUser(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        const {username,password}=req.body
        let user = await db
            .collection('users')
            .insertOne({username,password})
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(user)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}