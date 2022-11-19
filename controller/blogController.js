const authorModel = require("../model/authorModel")
const blogModel = require("../model/blogModel")
const mongoose = require("mongoose")


//*===============================================================CreateBlog================================================================*/

const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
}

const isArray = function (value) {  // this is a function to check if the input is an array or not
    if (typeof (value) === "object") {  // if the input is an object then it will check if it is an array or not
        value = value.filter(x => x.trim())
        if (value.length == 0) return false
        else return true
    }
}

const isValidId = function (authorId) {
    return mongoose.Types.ObjectId.isValid(authorId);  
};

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
};



//===============================================================CreateBlog================================================================/

exports.createBlog = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Data is required" });
        };

        const { title, body, authorId, category, subcategory, tags } = data;
        if (!isValid(title)) {
            return res.status(400).send({ status: false, msg: "Title must be present" });
        };
        if (!isValid(body)) {
            return res.status(400).send({ status: false, msg: "Body must be present" });
        };
        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "Category must be present" });
        };
        if (!isValid(authorId)) {
            return res.status(400).send({ status: false, msg: "authorId must be presnt" });
        };
        if (!isValidId(authorId)) {
            return res.status(400).send({ status: false, msg: "Invalid authorId" });
        };
        if (!isValidName(title)) {
            return res.status(400).send({ status: false, msg: "title should include alphabets only" });
        };
        if (!isValidName(category)) {
            return res.status(400).send({ status: false, msg: "category should include alphabets only" });
        };
        if (tags || tags == "") {
            if (!isArray(tags)) {
                return res.status(400).send({ status: false, msg: "tags must be presnt" });
            };
        };
        if (subcategory || subcategory == "") {
            if (!isArray(subcategory)) {
                return res.status(400).send({ status: false, msg: "subcategory must be presnt" });
            };
        };
        let getAuthorData = await authorModel.findById(authorId);
        if (!getAuthorData) {
            return res.status(404).send({ status: false, msg: `No author present by this ${authorId}` });
        };
        if (data["isPublished"] == true) {
            data["publishedAt"] = Date.now();
        };
        let createBlogs = await blogModel.create(data);
        res.status(201).send({ status: true, msg: "Blogs created successfully", data: createBlogs });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    };
};


exports.getBlogs = async (req, res) => {
    try {
        let data = req.query;
        // if (Object.keys(data).length == 0) {
        //     return res.status(400).send({ status: false, msg: "Provide atleast one Query to fetch blog details" });
        // };

        let { category, authorId, tags, subcategory } = data;
        let filter = { isDeleted: false, isPublished: true };

        if (category || category == "") {
            if (!isValid(category)) {
                return res.status(400).send({ status: false, msg: "category must be present" });
            };
            filter.category = category;
        };
        if (authorId || authorId == "") {
            if (!isValid(authorId)) {
                return res.status(400).send({ status: false, msg: "authorId must be present" });
            };
            if (!isValidId(authorId)) {
                return res.status(400).send({ status: false, msg: "Invalid blogId" });
            };
            filter.authorId = authorId;
        };
        if (tags) {
            if (tags.trim().length == 0) {
                return res.status(400).send({ status: false, msg: "Enter valid tags" });
            };
            tags = tags.split(",")  // tags.split(",") will convert the string into array
            filter.tags = { $in: tags }  // $in is a mongoDB operator which will check if the tags are present in the array or not so if the tags are present in the array then it will return the data else it will not return the data
        };
        if (subcategory) {
            if (subcategory.trim().length == 0) {  // if the subcategory is empty then it will return the error 
                return res.status(400).send({ status: false, msg: "Enter valid subcategory" });
            };
            subcategory = subcategory.split(",")  // subcategory.split(",") will convert the string into array then it will check if the subcategory is present in the array or not so if the subcategory is present in the array then it will return the data else it will not return the data but why we are checking 
            filter.subcategory = { $in: subcategory }  
        };
        let fetchBlogs = await blogModel.find(filter);  // we are using this 
        if (fetchBlogs.length == 0) {
            return res.status(404).send({ status: false, msg: "Such Blogs Not Available" })
        }
        return res.status(200).send({ status: true, data: fetchBlogs });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};


exports.updateBlog = async(req, res)=> {
    try {
      let blogId = req.params.blogId;
      let data = req.body;
      if (!isValidId(blogId)) {
        return res.status(400).send({status: false, msg: "Invalid blogId"});
      };

      let {title, body, tags, subcategory} = data;
  
      if (Object.keys(data).length==0){
        return res.status(400).send({status:false, msg: "body Must be filled"});
      };
      if(title || title==""){  
        if (!isValid(title)){
            return res.status(400).send({status:false, msg:"title must be presnt"});
        };
        if(!isValidName(title)){
            return res.status(400).send({status:false,msg:"title should include alphabets only"});
        };
      };
      if(body || body==""){  
        if (!isValid(body)){
            return res.status(400).send({status:false, msg:"body must be presnt"});
        };
      };
      if(tags || tags==""){  
        if (!isValid(tags)){
            return res.status(400).send({status:false, msg:"tags must be presnt"});
        };
        if(!isValidName(tags)){
            return res.status(400).send({status:false,msg:"tags should include alphabets only"});
        };
      };
      if(subcategory || subcategory==""){  
        if (!isValid(subcategory)){
            return res.status(400).send({status:false, msg:"subcategory must be presnt"});
        };
        if(!isValidName(subcategory)){
            return res.status(400).send({status:false,msg:"subcategory should include alphabets only"});
        };
      };
    let updateQuery = {title:title, body: body};
    let addQuery = {tags:tags, subcategory:subcategory};

      const filterBlogs = await blogModel.findOne({$and: [{isDeleted: false}, {isPublished: true}]});
      if (!filterBlogs){
        return res.status(404).send({status: false,msg:"No filter possible are available"});
      };  
  
      // WE ARE FINDING ONE BY BLOG ID AND UPDATING //
      let updatedblog = await blogModel.findOneAndUpdate({_id:blogId},{$set:updateQuery, $push:addQuery,publishedAt:Date.now()},{new:true});

        res.status(200).send({status:true,msg:"Blog is Updated Successfully",data: updatedblog});
    } 
    catch (err) {
      res.status(500).send({status:false, msg:err.message });
    };
};


exports.deleted = async function (req, res) {
    try {
        //Validate: The blogId is present in request path params or not.
        let blog_Id = req.params.blogId
        if (!blog_Id) return res.status(400).send({ status: false, msg: "Blog Id is required" })

        //Validate: The blogId is valid or not.
        let blog = await blogModel.findById(blog_Id)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exists" })

        //Validate: If the blogId is not deleted (must have isDeleted false)
        let is_Deleted = blog.isDeleted
        if (is_Deleted == true) return res.status(404).send({ status: false, msg: "Blog is already deleted" })

        //Delete a blog by changing the its isDeleted to true.
        let deletedBlog = await blogModel.findOneAndUpdate({ _id: blog_Id },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        //Sending the Deleted response after updating isDeleted : true
        return res.status(200).send({ status: true, msg: "Blog deleted succesfully" })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ status: false, msg: " Server Error", error: err.message })
    }
}


exports.deleteByQuery = async function (req, res) {
    try {
        const data = req.query   // data means query params
        const category = req.query.category
        const authorId = req.query.authorId
        const tagName = req.query.tags
        const subcategory = req.query.subcategory
        const isPublished = req.query.isPublished


        //check if the query field is empty
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Enter the details of blog that you would like to delete" })

        //check if data already deleted or not
        const findDeleted = await blogModel.findOne(data)
        if (findDeleted.isDeleted == true) return res.status(404).send({ status: false, message: "blog is already deleted" })

        //finding document using query params
        const deletingBlog = await blogModel.updateMany({ $or: [{ category: category }, { authorId: authorId }, { tags: tagName }, { subcategory: subcategory }, { isPublished: isPublished }] },
            { $set: { isDeleted: true, deletedAt: new Date() } })  // updateMany is used to update multiple documents


        if (deletingBlog == null) return res.status(404).send({ status: false, message: "Blog not found" })


        return res.status(200).send({ status: true, message: "Blog has been deleted" })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

