import Usermodal from '../Model/Userdetail.js';
import nodemailer from 'nodemailer';
const SECRET_KEY = 'asdgasdgHGHSGFDFSD';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";
import xlsx from 'node-xlsx';
import Imgaemodal from '../Model/Imagedetails.js';


cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});



export const signupapi = async (req, res) => {
    try {
        let info = req.body;
        let obj = {
            email: info.email,
            password: info.password
        }

        Usermodal.find({ email: info.email, password: info.password }).then((resdata1) => {
            if (resdata1.length == 0) {
                Usermodal.create(obj).then(() => {
                    res.json({ status: 200, msg: "Registered Successfully" });
                })
            } else {
                res.json({ status: 400, msg: "User Already Exist" });
            }
        });
    } catch (error) {
        res.json({ status: 401, msg: "Something Went Wrong" });
    }
}


export const forgetpwd = (req, res) => {
    try {
        console.log(req.body);
        Usermodal.find({ email: req.body.email }).then((resData) => {
            if (resData.length > 0) {
                let otpData = Math.floor(1000 + Math.random() * 9000);
                let mailAddress = req.body.email;
                sendMail(mailAddress, otpData);
                Usermodal.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otpData } }).then(() => {
                    res.json({ status: 200, msg: "OTP has been sent to your email" });
                })
            } else {
                res.json({ status: 400, msg: "Please enter registered email" });
            }
        });

    } catch (error) {

    }
}



async function sendMail(datamail, otpdata) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'duraiessakimuthu@gmail.com',
        to: datamail,
        subject: 'OTP',
        text: "Your OTP : " + otpdata.toString()
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}


export const signIn = (req, res) => {
    let info = req.body;
    let obj = {
        email: info.email,
        password: info.password
    }
    var now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    now = Math.floor(now.getTime() / 1000 / 60) * 60;
    const token = jwt.sign(
        { email: info.email },
        SECRET_KEY,
        { expiresIn: '300s' });


    Usermodal.find({ email: info.email, password: info.password }).then((resdata1) => {

        if (resdata1.length != 0) {
            res.json({ status: 200, token: token });
        } else {
            res.json({ status: 400, msg: "Invalid User" });
        }
    })
}


export const sheetUpload = (req, res) => {
    try {
        let file = req.file.path;

        const workSheetFromFile = xlsx.parse(req.file.path);
        const emails = workSheetFromFile[0].data.reduce((acc, cur) =>
            acc.concat(cur)
        );

        cloudinary.uploader.upload(file, { resource_type: 'auto' }, (error, result) => {
            // console.log(req.body.email,"EEEEE");
            console.log(result.secure_url)
            if (result.secure_url) {
                Usermodal.findOneAndUpdate({ email: req.body.email }, { $set: { xldataUrl: result.secure_url } }).then(() => { })
            }
        });

        emails.forEach((txt) => {
            sendEmail(txt)
        });

        res.json({ status: 200, msg: "Email has been sent" })

    } catch (error) {
        console.log("error", error)
    }
}


async function sendEmail(datamail) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'duraiessakimuthu@gmail.com',
        to: datamail,
        subject: 'Message',
        text: "Hi ,Have a nice day"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


}


export const verifyotp = (req, res) => {
    try {
        Usermodal.find({ email: req.body.email, otp: Number(req.body.otp) }).then((resdata) => {
            if (resdata.length > 0) {
                res.json({ status: 200, msg: "Otp matched" });
            } else {
                res.json({ status: 400, msg: "Please enter the valid otp" });
            }
        })
    } catch (error) {
        res.json({ status: 401, msg: "Something Went Wrong" });
    }
}


export const pwdUpdate = (req, res) => {
    try {
        Usermodal.find({ email: req.body.email }).then((resdat) => {
            if (resdat.length > 0) {
                Usermodal.findOneAndUpdate({ email: req.body.email }, { $set: { password: req.body.password } }).then((resdat) => {
                    res.json({ status: 200, msg: "Password has been updated" });
                });
            }
        })
    } catch (err) { }
}


export const uploadImg = (req, res) => {
    try {
        let file = req.file.path;
        Imgaemodal.findOne({ image_name: req.file.originalname }).then((imgdata) => {
            if (!imgdata) {
                cloudinary.uploader.upload(file, { resource_type: 'image' }, (error, result) => {
                    console.log("result", result);
                    let obj = {
                        image_name: req.file.originalname,
                        image_url: result.secure_url
                    }
                    Imgaemodal.create(obj).then((resdata) => {
                        if (resdata) {
                            res.json({ status: 200, msg: "Image has been uploaded successfully" });
                        }
                    });
                });
            } else {
                res.json({ status: 400, msg: "Image is already exist in Database" });
            }
        });
    } catch (error) {

    }
}


export const getAllImg = (req, res) => {
    try {
        Imgaemodal.find().then((imgdata) => {
            res.json({ status: 200, msg: "Image Details", data: imgdata });
        })
    } catch (error) {

    }
}

export const delImg = (req, res) => {
    try {
        Imgaemodal.findOneAndDelete({ _id: req.body._id }).then((imgdata) => {
            res.json({ status: 200, msg: "Deleted Successfully" });
        })
    } catch (error) {

    }
}


export const upImg = (req, res) => {
    try {

        Imgaemodal.findOne({ _id: req.body._id }).then((rseData) => {
            if (rseData) {
                let file = req.file.path;
                let orgName = req.file.originalname;
                Imgaemodal.findOne({ image_name: req.file.originalname }).then((imgdata) => {
                    if (!imgdata) {
                        imageUpLoading(file, orgName, (cb) => {
                            console.log(cb)
                            if (cb) {
                                Imgaemodal.findOneAndUpdate({ _id: req.body._id }, { $set:  cb  }).then((imgdata) => {
                                    res.json({ status: 200, msg: "Image updated successfully" });
                                })
                            }
                        });

                    } else {
                        res.json({ status: 400, msg: "This Image is already exist in Database" });
                    }
                });
            }
        });
    } catch (error) {

    }
}

async function imageUpLoading(file, orgName, cb) {
    cloudinary.uploader.upload(file, { resource_type: 'image' }, (error, result) => {
        console.log("result", result);
        let obj = {
            image_name: orgName,
            image_url: result.secure_url
        }
        cb(obj)
    });
}