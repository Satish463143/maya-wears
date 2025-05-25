const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/aws.config");
const path = require("path");
const { randomStringGenerator } = require("../utilies/helper");
const { FileFilterType } = require("../config/constants.config");


const generateFileName = (file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const generatedCode = randomStringGenerator(20); // Reduced length since we're adding prefix
    return `maya-wears-${generatedCode}${ext}`;
};

// Create a more resilient S3 storage function
const getS3Storage = () => {
    try {
        return multerS3({
            s3,
            bucket: process.env.S3_BUCKET_NAME || 'mayawears-uploads',
            // acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                try {
                    const folder = req.uploadPath || 'uploads';
                    const filename = generateFileName(file);
                    const fullPath = `${folder}/${filename}`;
                    cb(null, fullPath);
                } catch (error) {
                    console.error("Error generating S3 key:", error);
                    cb(error);
                }
            },
        });
    } catch (error) {
        console.error("Error creating S3 storage:", error);
        throw error;
    }
};

const fileFilterByType = (allowed) => {
    return (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File format not supported'));
        }
    };
};

const uplaodFile = (fileType = FileFilterType.IMAGE) => {
    let allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (fileType === FileFilterType.DOCUMENT) {
        allowed = ['pdf', 'txt', 'docs'];
    } else if (fileType === FileFilterType.VIDEO) {
        allowed = ['mp4', 'mov', 'mkv'];
    }

    return multer({
        storage: getS3Storage(),
        limits: { fileSize: 300000000 },
        fileFilter: fileFilterByType(allowed),
    });
};

const uploadImageAndVideo = () => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const videoExtensions = ['mp4', 'mov', 'mkv'];

    return multer({
        storage: getS3Storage(),
        limits: { fileSize: 100000000 },
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
            if (
                (['desktopImage', 'mobileImage'].includes(file.fieldname) && imageExtensions.includes(ext)) ||
                (['desktopVideo', 'mobileVideo'].includes(file.fieldname) && videoExtensions.includes(ext))
            ) {
                cb(null, true);
            } else {
                cb(new Error(`File type not supported for ${file.fieldname}`), false);
            }
        },
    }).fields([
        { name: 'desktopImage', maxCount: 1 },
        { name: 'mobileImage', maxCount: 1 },
        { name: 'desktopVideo', maxCount: 1 },
        { name: 'mobileVideo', maxCount: 1 }
    ]);
};

const setPath = (path) => {
    return (req, res, next) => {
        req.uploadPath = path;
        next();
    };
};

module.exports = {
    uplaodFile,
    setPath,
    uploadImageAndVideo,
};
