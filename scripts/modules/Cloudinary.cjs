const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const { Readable } = require("stream");
const { catchAsync } = require('./CatchAsync.cjs');

exports.default = cloudinary;

exports.ping = catchAsync(async function () {
    let res = await cloudinary.api.ping();
    console.log(`Cloudinary connection ${res.status}`);
});

exports.usage = catchAsync(async function () {
    let res = await cloudinary.api.usage();
    console.log(res)
});

exports.uploadStream = async buffer => {
    return new Promise((resolve, reject) => {
        const writeStream = cloudinary.uploader.upload_stream({ folder: 'pawper.dev', width: 500 }, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        });
        const readStream = new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            }
        });
        readStream.pipe(writeStream);
    })
}

exports.deleteImages = async () => {
    return new Promise((resolve, reject) => {
        cloudinary.api.delete_resources_by_prefix('pawper.dev/', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        });
    });
}