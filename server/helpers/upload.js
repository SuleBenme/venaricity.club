import cloudinary from 'cloudinary'

//Cloudinary configuration
cloudinary.v2.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
})


const uploads = (file) =>{
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, { resource_type: "auto" }, (err, url) => {
          if (err) return reject(err);
          return resolve(url);
        })
     });
}

export default {uploads}