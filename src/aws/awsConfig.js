const AWS = require('aws-sdk')

AWS.config.update(
    {
        accessKeyId: "AKIATZ326YKBGWEDLPEA",
        secretAccessKey: "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",
        region: "ap-south-1" // if i want to acces
    }
)

let uploadFile = async (file) => {  //file is the file object
    return new Promise(function (resolve, reject) {  //this line can be wr
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });  // this line means we are using s3 service

        var uploadParams = {
            ACL: "private",  
            Bucket: "swabuckets",
            Key:  file.originalname,
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
            let uploadedFileURL= await uploadFile( files[0] )
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

