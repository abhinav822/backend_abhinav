const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile = async (file) => {  //file is the file object
    return new Promise(function (resolve, reject) {  //this line can be wr
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });  // this line means we are using s3 service
        
        var uploadParams= {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  //HERE
            Key: "abc/" + file.originalname, //HERE 
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {  // this function is used to upload the file to s3 bucket
            if (err) {
                return reject({ "error": err })
            }
            console.log(data)
            console.log("File Uploaded Succesfully")
            return resolve(data.Location)
        })
    })
}




exports.awsrequest = async (req, res) => {

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )  // this line means we are calling the function uploadFile and passing the file object 
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
}


// to undo last commit use this command in git bash  git reset --soft HEAD~1 // head is the last commit and ~1 means one commit before head

// another way to undo last commit is to use git revert HEAD 

