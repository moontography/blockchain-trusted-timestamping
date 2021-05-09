# blockchain-file-timestamping

## Deploy

This site is hosted in AWS S3 at the time of writing.

```sh
$ npm run build
$ aws s3 cp --recursive dist s3://file.moontography.com
```

## Project setup (from Vue CLI)

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
