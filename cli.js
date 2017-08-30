#!/usr/bin/env node
var yargs = require('yargs')
  .usage('Usage: $0 body_lz_bin [output_directory] [options]')
  .option('save-body', {
    alias: ['B'],
    describe: 'Save the extracted body.bin',
    boolean: true
  })
  .option('pretty-json', {
    alias: ['p'],
    describe: 'Format the JSON with indents',
    boolean: true
  })
  .option('save-json', {
    alias: ['j'],
    describe: 'Write JSON of the body_LZ data to data.json',
    boolean: true
  })
  .option('output-json', {
    alias: ['J'],
    describe: 'Write JSON of the body_LZ data to STDOUT',
    boolean: true
  })
  .option('save-images', {
    alias: ['i'],
    describe: 'Save the images',
    boolean: true
  })
  .option('save-cwavs', {
    alias: ['c'],
    describe: 'Save the CWAV sound effects',
    boolean: true
  })
  .option('apply-alpha', {
    alias: ['a'],
    describe: 'Apply alpha masks to the folder images',
    boolean: true
  })
  .option('process-borders', {
    alias: ['b'],
    describe: 'Process the icon border into a complete image',
    boolean: true
  })
  .option('json-textures', {
    describe: 'Include the textures in the output JSON\n\x1b[371m\x1b[41mWARNING: RESULTS IN LARGE JSON!\x1b[0m',
    boolean: true
  })
  .option('json-cwavs', {
    describe: 'Include the CWAVs in the output JSON\n\x1b[37m\x1b[41mWARNING: RESULTS IN LARGE JSON!\x1b[0m',
    boolean: true
  })
var argv = yargs.argv

var TextureKind = require('./TextureKind.js')
var CwavKind = require('./CWAVKind.js')
var fs = require('fs')
var lz11 = require('lz11')
var process = require('process')
var path = require('path')
var tileUtils = require('tiled-image-tools')
const Jimp = require('jimp')
var ThemeInfo = require('./index.js').ThemeInfo
var folderAlpha = require('./folderAlphaMask.json')
var borderAlpha = require('./borderAlpha.json')
var input
var statusLog = (argv.outputJson ? console.error : console.log)
var willWrite = (argv.saveBody || argv.saveJson || argv.saveImages || argv.saveCwavs)

if (argv['_'].length < 1) {
  yargs.showHelp()
  process.exit(0b1)
} else {
  if (willWrite) {
    if (argv['_'].length < 2) {
      statusLog('An output path must be specified when a file would be written')
      yargs.showHelp()
      process.exit(0b1)
    }
  } else {
    if (argv['_'].length < 1) {
      statusLog('An input file must be specified')
      yargs.showHelp()
      process.exit(0b1)
    }
  }
}

function makeDirIfNeeded() {
  if (!fs.existsSync(outputPath)) {
    statusLog(`mkdir: ${outputPath}`)
    try {
      fs.mkdirSync(outputPath)
    } catch (err) {
      console.error(err)
      process.exit(0b100)
    }
  }
}

var inputFile = path.resolve(argv['_'][0])
var outputPath = path.resolve(argv['_'][1] || '')

if (fs.existsSync(inputFile)) {
  input = fs.readFileSync(inputFile)
} else {
  console.error('Input file not found')
  process.exit(0b10)
}
if (willWrite) {
  statusLog(`Output directory: ${outputPath}`)
}

if (!willWrite && !argv.outputJson) {
  statusLog('Nothing to do')
  process.exit()
}

if (argv.saveBody) {
  lz11.decompress(input).then(function (body) {
    makeDirIfNeeded()
    statusLog('Wrote body.bin')
    fs.writeFileSync(path.join(outputPath, 'body.bin'), body)
  }).catch(function (err) {
    console.error(err)
    process.exit(0b1000)
  })
}

var theme = new ThemeInfo(input)
theme.getData().then(function (data) {
  var textures = data.textures

  Object.keys(textures).forEach(function (key, index, a) {
    var e = textures[key]
    var i = TextureKind[key]
    if (!e) {
      return
    }

    tileUtils.convertFromTiled(e).then(function (bitmap) {
      var jimp = new Jimp(bitmap.width, bitmap.height, function (err, jimp) {
        if (err) {
          console.error(err)
          process.exit(0b10000 << 8 | index)
          return
        }
        jimp.bitmap.data = bitmap.data
        if (i === 5 || i === 6) {
          jimp.rotate(270)
        }

        if (argv.applyAlpha) {
          switch (i) {
            case 7:
              for (var a7 = 0; a7 < folderAlpha.closed.length; a7++) {
                jimp.bitmap.data[(a7 * 4) + 3] = folderAlpha.closed[a7]
              }
              break

            case 8:
              for (var a8 = 0; a8 < folderAlpha.open.length; a8++) {
                jimp.bitmap.data[(a8 * 4) + 3] = folderAlpha.open[a8]
              }
              break

            case 9:
              for (var a9 = 0; a9 < borderAlpha.large.length; a9++) {
                jimp.bitmap.data[(a9 * 4) + 3] = borderAlpha.large[a9]
              }
              break

            case 10:
              for (var a10 = 0; a10 < borderAlpha.small.length; a10++) {
                jimp.bitmap.data[(a10 * 4) + 3] = borderAlpha.small[a10]
              }
              break
          }
        }

        if (argv.processBorders && (i === 9 || i === 10)) {
          var tmpJimp = new Jimp(jimp.bitmap.width * 2, jimp.bitmap.height)
          tmpJimp.composite(jimp, jimp.bitmap.width, 0)
          jimp.flip(true, false)
          tmpJimp.composite(jimp, 0, 0)
          jimp.bitmap = tmpJimp.bitmap
        }

        if (argv.saveImages) {
          try {
            makeDirIfNeeded()
            statusLog(`Texture ${i} written to ${key}.png`)
            jimp.write(path.join(outputPath, `${key}.png`))
          } catch (err) {
            console.error(err)
            process.exit(0b100000 << 8 | index)
          }
        }
      })
    })
  })

  if (argv.saveCwavs && data.cwavs) {
    var cwavs = data.cwavs

    Object.keys(cwavs).forEach(function (e, i, a) {
      try {
        makeDirIfNeeded()
        statusLog(`CWAV ${CwavKind[e]} written to ${e}.bcwav`)
        fs.writeFileSync(path.join(outputPath, `${e}.bcwav`), cwavs[e])
      } catch (err) {
        console.error(err)
        process.exit(0b1000000 << 8 | i)
      }
    })
  }
  if (!argv.jsonTextures) {
    data.topScreen.background.texture = data.topScreen.background.texture.tag
    data.bottomScreen.background.texture = data.bottomScreen.background.texture.tag
    var textureKeys = Object.keys(data.textures)

    for (var i = 0; i < textureKeys.length; i++) {
      data.textures[textureKeys[i]] = true
    }
  }
  if (!argv.jsonCwavs) {
    var textureKeys = Object.keys(data.cwavs)

    for (var i = 0; i < textureKeys.length; i++) {
      data.cwavs[textureKeys[i]] = true
    }
  }
  var json = JSON.stringify(data, null, (argv.prettyJson ? '  ' : null))
  if (argv.saveJson) {
    try {
      makeDirIfNeeded()
      statusLog('Wrote data.json')
      fs.writeFileSync(path.join(outputPath, 'data.json'), json)
    } catch (err) {
      console.error(err)
      process.exit(0b10000000)
    }
  }
  if (argv.outputJson) {
    console.log(json)
  }
}).catch(function (err) {
  console.error(err)
  process.exit(0b11111111)
})
