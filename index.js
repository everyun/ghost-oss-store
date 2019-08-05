const fs = require('fs');
const path = require('path');

const moment = require('moment')
const OSS = require('ali-oss');
const randomstring = require('randomstring');
const BaseAdapter = require('ghost-storage-base');

module.exports = class OssAdapter extends BaseAdapter {

    constructor(config) {
        super();

        this.config = config;
        this.store = new OSS(config.aliyun);

    }

    save(file) {


        const fileName = randomstring.generate({
            length: 8,
            charset: 'alphanumeric',
            capitalization: 'lowercase'
        }) + path.extname(file.name).toLowerCase();

        const prefix = this.config.prefix || '';
        const dateDir = this.config.dateDirFormat ? moment().format(this.config.dateDirFormat): '';
        const filePathInOss = path.join(prefix, dateDir, fileName);

        return this.store.put(filePathInOss, file.path, {
                meta: {
                    originName: encodeURI(file.name),
                }
            })
            .then(data => {

                var imageUrl = data.url.replace(/^http/, 'https');

                if (this.config.domain) {
                    imageUrl = imageUrl.replace(/.*aliyuncs.com/, this.config.domain);
                }
                
                return imageUrl + (this.config.subfix || '');
            })
            
    }

  

  
    serve() {
      return function customServe(req, res, next) {
        next();
      }
    }
  
    delete() {}
    read() {}
    exists() {}

}