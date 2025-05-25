const multer = require("multer")
const fs = require('fs')
const { randomStringGenerator } = require("../utilies/helper");
const { FileFilterType } = require("../config/constants.config")


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./public/uploads/" + req.uploadPath
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        const generatedCode = randomStringGenerator(20) // Reduced length since we're adding prefix
        const filename = `maya-wears-${generatedCode}.${ext}`
        cb(null, filename)
    }
})


const uplaodFile = (fileType = FileFilterType.IMAGE) => {
    let allowed = ['jpg','jpeg', 'png', 'webp', 'gif'];
    if (fileType === FileFilterType.DOCUMENT) {
        allowed = ['pdf', 'txt', 'docs'];
    } else if (fileType === FileFilterType.VIDEO) {
        allowed = ['mp4', 'mov', 'mkv'];
    }

    return multer({
        storage: myStorage,
        limits: {
            fileSize: 2000000, // 2MB
        },
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split('.').pop().toLowerCase();
            if (allowed.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error('File format not supported here'));
            }
        },
    });
};

// for both image and video at once with different size limit
const uploadImageAndVideo = () => {
    return multer({
        storage: myStorage,  // Reuse the existing storage config
        limits: {
            fileSize: 2000000  // 100MB limit for both images and videos
        },
        fileFilter: (req, file, cb) => {
            // console.log("Received file:", file);
            const ext = file.originalname.split(".").pop().toLowerCase();
            // console.log("File extension:", ext);
        
            const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
            const videoExtensions = ['mp4', 'mov', 'mkv'];

            if (file.fieldname === 'desktopImage' || file.fieldname === 'mobileImage') {
                if (imageExtensions.includes(ext)) {
                    cb(null, true); // Accept the file
                } else {
                    cb({ code: 400, message: `File type not supported for ${file.fieldname}: ${file.mimetype}` }, false); // Reject the file
                }
            } else if (file.fieldname === 'desktopVideo' || file.fieldname === 'mobileVideo') {
                if (videoExtensions.includes(ext)) {
                    cb(null, true); // Accept the file
                } else {
                    cb({ code: 400, message: `File type not supported for ${file.fieldname}: ${file.mimetype}` }, false); // Reject the file
                }
            } else {
                cb({ code: 400, message: "Unexpected field" }, false); // Reject unexpected fields
            }
        }

    }).fields([
        { name: 'desktopImage', maxCount: 1 },
        { name: 'mobileImage', maxCount: 1 },
        { name: 'desktopVideo', maxCount: 1 },
        { name: 'mobileVideo', maxCount: 1 }
    ]);
};

const setPath = (path) => {
    return (req, res, next) => {
        req.uploadPath = path
        next()
    }
}

module.exports = {
    uplaodFile, setPath, uploadImageAndVideo
}
