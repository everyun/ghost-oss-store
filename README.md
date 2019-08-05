# Ghost Aliyun OSS Storage

This [Ghost custom storage module](https://github.com/TryGhost/Ghost/wiki/Using-a-custom-storage-module) allows you to store media file at [Aliyun OSS](https://www.aliyun.com/product/oss) instead of storing at local machine. It requires Ghost greater than `2.x`!

## Installation


### Via Git

- Create a new folder inside `/content/adapters` called `/storage`

- Clone this repo to `/storage`

  ```
  cd [path/to/ghost]/content/adapters/storage
  git clone https://github.com/everyun/ghost-oss-store.git oss
  ```

- Install dependencies

  ```
  cd oss
  npm install
  ```

## Configuration

In your `config.[env].json` file, you'll need to add a new `storage` block to whichever environment you want to change:

```json
{
  "storage": {
    "active": "oss",
    "oss": {
      "aliyun": {
        "region": "<Bucket region>",
        "accessKeyId": "<Aliyun access key id>",
        "accessKeySecret": "<Aliyun access key secret>",
        "bucket": "<Bucket>"
      },
      "prefix": "<dir prefix>",
      "subfix": "<url subfix, such as image process string>",
      "dateDirFormat": "data schema of moment js, like YYYY/MM"
    }
  }
}
```
