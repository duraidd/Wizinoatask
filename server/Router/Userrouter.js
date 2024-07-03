import express from "express";

const router = express.Router();
import { signupapi, sheetUpload, signIn, forgetpwd, verifyotp, pwdUpdate, uploadImg,getAllImg ,delImg,upImg} from '../Controller/Userapi.js'
import multer from "multer";



const upload = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }),
    // limits: { fileSize: 50000000000 }
})

router.post('/signup', signupapi);
router.post('/signin', signIn);
router.post('/sheetupload', upload.single('file'), sheetUpload)
router.post('/forgotpwd', forgetpwd);
router.post('/verifyotp', verifyotp);
router.post('/passwordUpdate', pwdUpdate);
router.post('/uploadImg', upload.single('imgfile'), uploadImg);
router.get('/getAllImg',getAllImg);
router.post('/delImg',delImg);
router.post('/upImg',upload.single('imgUp'),upImg);


export default router;