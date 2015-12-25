# grunt-jimp

> Grunt wrapper for Jimp, the Javascript Image Manipulation Program

Jimp is a native javascript image manipulation library, and does not require ImageMagick or GraphicsMagick.
All credit for Jimp goes to Oliver Moran, and the original library [can be found here](https://github.com/oliver-moran/jimp).

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jimp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jimp');
```

## The "jimp" task

### Overview
In your project's Gruntfile, add a section named `jimp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jimp: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.suffix
Type: `String`
Default value: `''`

A value appended to the filename of the processed image. For example, providing a suffix of "jimp" will result in a filename "myimage.jimp.jpg".

#### options.actions
Type: `Object`
Default value: `{}`

The Jimp actions to be run against the image. Each key in the object is an action, whilst the value is the argument to be passed in to that action.

- A true `Boolean` will run action without any arguments
e.g. { sepia: true } will call image.sepia()
- An `Integer` or `String` will be passed directly in to the action
e.g. { blur: 10 } will call image.blur(10)
- An `Array` will be passed in to the action as multiple parameters
e.g. { crop: [0, 0, 200, 300] } will call image.crop(0, 0, 200, 300)

### Usage Examples

```js
grunt.initConfig({
  jimp: {
    options: {
      suffix: 'crop',
        actions: {
          blur: 30,
          scale: 0.5,
          greyscale: true,
          crop: [0, 0, 500, 300],
        }
    },
    files: [{
      expand: true,
      cwd: 'test/fixtures/',
      src: ['**/*.{jpg,jpeg,png,bmp}'],
      dest: 'tmp/'
    }],
  },
})
```

This will create a file called `<filename>.crop.<ext>` with the following properties:

- 30px blur
- 0.5 scale of source image
- Greyscale (black and white)
- A 500x300 crop taken from position 0, 0 (top left) of the source image

### Further Usage
For further usage consult the [Jimp documentation and usage examples](https://github.com/oliver-moran/jimp#basic-usage).

## Notes
This package does not support the following Jimp methods, as of initial release:

- blit
- composite
- mask

Basically if multiple Jimp images are required for the action, they are not currently possible in this Grunt task. I'm working on it!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Max Barry. Licensed under the MIT license.
