const mid1= function ( req, res, next) {
    let value = req.headers.isfreeappuser
    if(!value)
    return res.send({msg: "isfreeAppuser is missing"})
    next()
}


module.exports.mid1= mid1