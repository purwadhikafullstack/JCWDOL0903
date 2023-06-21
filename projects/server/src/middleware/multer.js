const multer = require('multer');
const {nanoid} = require("nanoid")

const fileUploader = ({
    destinationFolder = '',
    prefix = 'Avatar',
    fileType = 'image'
   }) => {
    const storageConfig = multer.diskStorage({
     destination: (req, file, cb) => {
      console.log('sadsadada');
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
   
     fileFilter: (req, file, cb) => {
      if (file.mimetype.split('/')[0] != fileType) {
      console.log(file);
        console.log("error");
       return cb(null, false);
      }

      console.log("masuk");
   
      cb(null, true);
     }
    });
    return uploader;
   };
   
   module.exports = {fileUploader}