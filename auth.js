const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1]
        const decodedToken=jwt.verify(token,'secretKey')
        
        next()
    } catch (error) {
       if(error.name=="TokenExpiredError"){
        return res.status(401).send({
            message:"Canım Tokenin'nin Süresi Dolmuş. Bi Değişitirde Gel...",
            status:-1
        })
       }else if(error.name=="JsonWebTokenError"){
        return res.status(401).send({
            message:"Canım Kardeşim Geçersiz Bir Token&İmza Deniyorsun. Seni Bulursam Ağzına Sıçarım",
            status:-1
        })
       }else{
        return res.status(401).send({
            message:'Yetkisiz Erişim Kardeşim',
            status:-1
        })
       }
    }
}