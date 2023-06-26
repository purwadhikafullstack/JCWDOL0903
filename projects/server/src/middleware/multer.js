const multer = require('multer');
const {nanoid} = require("nanoid")

const fileUploader = ({
    destinationFolder = '',
    prefix = 'Avatar',
    fileType = 'image'
   }) => {
    const storageConfig = multer.diskStorage({
     destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../public/${destinationFolder}`);
     },
   
     filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split('/')[1];
        console.log(file)
      const filename = `${prefix}_${nanoid()}.${fileExtension}`;
      cb(null, filename);
     }
    });

    const uploader = multer({
     storage: storageConfig,
     limits: {fileSize: 1048576},
      
     fileFilter: (req, file, cb) => {
      if (file.mimetype.split('/')[0] != fileType) {
       return cb(null, false);
      }
      cb(null, true);
     }
    });
    return uploader;
   };
   
   module.exports = {fileUploader}