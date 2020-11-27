import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})
function checkFileType(file, cb){
  const filetypes =/jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = filetypes.test(file.mimeType)
  if(extname && mimeType){
    return cb(null, true)
  }else{
    cb('Images Only')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('image'), (req, res) =>{
  res.send(`/${req.file.path}`)
})

export default router