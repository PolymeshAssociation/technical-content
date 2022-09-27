require('dotenv').config();
var cloudinary = require('cloudinary').v2;

class CloudinaryHelper {
    constructor(cloudName, apiKey, apiSecret) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;

        this._setup();
    }

    uploadResource(path, id, options) {
        console.log('Cloudinary helper: upload resource ', id);

        if (!options) options = {};
        options.public_id = id;
        this._upload(path, options);
    }

    _upload(path, options) {
        console.log('Cloudinary helper: resource upload started');
        cloudinary.uploader.upload(path, options, (err, resource) => {
            if (err) console.error(err);
            console.log('Cloudinary helper: resource upload completed, public ID: ', resource.public_id);
        });
    }

    _find(id) {
        return new Promise((resolve) => {
            cloudinary.search.expression(`public_id=${id}`).execute().then(result => {
                if (!result || result.total_count == 0) resolve(null);
                resolve(result.resources[0]);
            }).catch(err => {
                console.error(err);
                resolve(null);
            });
        });
    }

    _setup() {
        cloudinary.config({
            cloud_name: this.cloudName, 
            api_key: this.apiKey, 
            api_secret: this.apiSecret,
        });
    }
}

const cloudName = process.env.CLOUDINARY_NAME, 
    apiKey = process.env.CLOUDINARY_API_KEY,
    apiSecret = process.env.CLOUDINARY_API_SECRET,
    id = process.env.CLOUDINARY_IMAGE_ID;

const cloudinaryHelper = new CloudinaryHelper(cloudName, apiKey, apiSecret);
// check social background image
cloudinaryHelper.uploadResource('./src/gatsby-theme-apollo-docs/assets/polymesh-social-bg.png', id);
// check font
cloudinaryHelper.uploadResource('node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2', 'poppins.woff2', {resource_type: 'raw', type: 'authenticated'});
