var lz11 = require('lz11')
var CwavKind = require('./CWAVKind.js')
var TextureKind = require('./TextureKind.js')
var textureKinds = Object.keys(TextureKind)

function define (name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  })
}

/**
 * The ThemeInfo constructor.
 * @constructor
 * @param  {Buffer} bodyBuffer The body_LZ.bin buffer to parse
 */
function ThemeInfo (bodyBuffer) {
  this._body = bodyBuffer
}

/**
 * This is the main function, it will parse the body_LZ.bin data and output a javascript object.
 * @param  {Function} [callback] An optional node.js style callback
 * @return {Promise<ThemeInfoObject>} The theme info
 */
ThemeInfo.prototype.getData = function (callback) {
  if (typeof callback !== 'function') {
    callback = function () {}
  }
  if (this._body.readUInt8(0) === 0x11) { // lz11 compressed
    return new Promise(function (resolve, reject) {
      lz11.decompress(this._body).then(function (data) {
        this._body = Buffer.from(data)
      }.bind(this)).then(function (data) {
        resolve(this.getData(callback))
      }.bind(this)).catch(function (err) {
        callback(err)
        reject(err)
      })
    }.bind(this))
  } else {
    return new Promise(function (resolve, reject) {
      this._getData().then(function (data) {
        callback(null, data)
        resolve(data)
      }).catch(function (err) {
        callback(err)
        reject(err)
      })
    }.bind(this))
  }
}

/**
 * This is a private function that fetches the body_LZ data object.
 * @private
 * @return {Promise<ThemeInfoObject>} The theme info
 */
ThemeInfo.prototype._getData = function () {
  return new Promise(function (resolve, reject) {
    var data = {
      topScreen: { background: {} },
      bottomScreen: { background: {} },
      colors: {},
      textures: {},
      cwavs: {}
    }

    // temporary variables for use later on
    var offset
    var colors

    data.enableBGM = this._body.readUIntLE(0x5, 0x1) > 0
    data.customSFX = false

    switch (data.topScreen.drawType = this._body.readUIntLE(0xC, 0x4)) {
      case 2: // Solid color with pattern(s)
        if (this._body.readUIntLE(0x18, 0x4) > 0) {
          data.textures[textureKinds[5]] = this.getTexture(5)
        }
        if (this._body.readUIntLE(0x1c, 0x4) > 0) {
          data.textures[textureKinds[6]] = this.getTexture(6)
        }
        break

      case 3: // Background texture
        switch (data.topScreen.frameType = this._body.readUIntLE(0x10, 0x4)) {
          case 0: // texture1
            data.topScreen.background.texture = data.textures[textureKinds[1]] = this.getTexture(1)
            break

          case 1: // texture0
            data.topScreen.background.texture = data.textures[textureKinds[0]] = this.getTexture(0)
            break

          case 3: // texture1
            data.topScreen.background.texture = data.textures[textureKinds[1]] = this.getTexture(1)
            break
        }
        break
    }

    data.customTopScreenBackground = typeof data.topScreen.background.texture !== 'undefined'

    if (data.topScreen.drawType >= 1 && data.topScreen.drawType <= 2) {
      offset = this._body.readUIntLE(0x14, 0x4)
      if (data.topScreen.drawType === 1) {
        data.topScreen.background.color = this.getRGBColors(offset, 1)[0]
        data.colors.topScreenBackground = this.getRGBColors(offset, 1)[0]
        data.topScreen.background.gradient = this._body.readUIntLE(offset + 3, 0x1)
        data.topScreen.background.squareOpacity = (this._body.readUIntLE(offset + 4, 0x1) / 255)
      }
    }

    switch (data.bottomScreen.drawType = this._body.readUIntLE(0x20, 0x4)) {
      case 1: // solid colors

        break

      case 3: // texture
        switch (data.bottomScreen.frameType = this._body.readUIntLE(0x24, 0x4)) {
          case 0: // texture4
            data.bottomScreen.background.texture = data.textures[textureKinds[4]] = this.getTexture(4)
            break

          case 1: // texture2
            data.bottomScreen.background.texture = data.textures[textureKinds[2]] = this.getTexture(2)
            break

          case 2: // texture3
            data.bottomScreen.background.texture = data.textures[textureKinds[3]] = this.getTexture(3)
            break

          case 3: // texture4
            data.bottomScreen.background.texture = data.textures[textureKinds[4]] = this.getTexture(4)
            break

          case 4: // texture3
            data.bottomScreen.background.texture = data.textures[textureKinds[3]] = this.getTexture(3)
            break
        }
        break
    }

    data.customBottomScreenBackground = typeof data.bottomScreen.background.texture !== 'undefined'

    if (this._body.readUIntLE(0x2c, 0x4) === 1) {
      var _0x30 = this.getRGBColors(this._body.readUIntLE(0x30, 0x4), 4)
      data.colors.cursor = {
        border: _0x30[0],
        main: _0x30[1],
        unknown: _0x30[2],
        expandedGlow: _0x30[3]
      }
    }

    if (this._body.readUIntLE(0x34, 0x4) === 1) {
      var _0x38 = this.getRGBColors(this._body.readUIntLE(0x38, 0x4), 2)
      data.colors.folder3DModel = {
        shadowed: _0x38[0],
        main: _0x38[1]
      }
    }

    if ((data.customFolders = (this._body.readUIntLE(0x3c, 0x4)) === 1)) {
      data.textures[textureKinds[7]] = this.getTexture(7)
      data.textures[textureKinds[8]] = this.getTexture(8)
    }

    if ((data.customCartridgeColors = (this._body.readUIntLE(0x48, 0x4)) === 1)) {
      var _0x4c = this.getRGBColors(this._body.readUIntLE(0x4c, 0x4), 3)
      data.colors.cartridge = {
        bottomShadow: _0x4c[0],
        main: _0x4c[1]
      }
      data.colors.folderTopHighlight = _0x4c[2]
    }

    if ((data.customBorders = (this._body.readUIntLE(0x50, 0x4)) === 1)) {
      data.textures[textureKinds[9]] = this.getTexture(9)
      data.textures[textureKinds[10]] = this.getTexture(10)
    }

    if (this._body.readUIntLE(0x5c, 0x4) === 1) {
      var _0x60 = this.getRGBColors(this._body.readUIntLE(0x60, 0x4), 3)
      data.colors.pager = {}
      data.colors.pager.button = {
        downwardSheen: _0x60[0],
        main: _0x60[1],
        leftwardSheen: _0x60[2]
      }
    }

    if (this._body.readUIntLE(0x64, 0x4) === 1) {
      var _0x68 = this.getRGBColors(this._body.readUIntLE(0x68, 0x4), 3)
      if (!data.colors.pager) {
        data.colors.pager = {}
      }
      data.colors.pager.arrow = {
        edge: _0x68[0],
        unpressed: _0x68[1],
        pressed: _0x68[2]
      }
    }

    if (this._body.readUIntLE(0x6C, 0x4) === 1) {
      offset = this._body.readUIntLE(0x70, 4)

      // open button that appears when an app is under the cursor
      // on the bottom screen
      offset += 4 // first 4 bytes are unknown

      // read the next 9 bytes into 3 RGB colors
      colors = this.getRGBColors(offset, 3).concat(this.getRGBColors(offset + 16, 3))

      data.colors.openButton = {
        button: {
          pressed: colors[0],
          unpressed: colors[1],
          border: colors[2]
        },
        text: {
          shadow: colors[3],
          unpressed: colors[4],
          pressed: colors[5]
        }
      }

      offset = this._body.readUIntLE(0x74, 4)

      // close button that appears when home button pressed from
      // within a app
      offset += 4 // first 4 bytes are unknown

      // read the next 9 bytes into 3 RGB colors
      colors = this.getRGBColors(offset, 3).concat(this.getRGBColors(offset + 16, 3))

      data.colors.closeButton = {
        button: {
          pressed: colors[0],
          unpressed: colors[1],
          border: colors[2]
        },
        text: {
          shadow: colors[3],
          unpressed: colors[4],
          pressed: colors[5]
        }
      }
    }

    if (this._body.readUIntLE(0x78, 0x4) === 1) {
      offset = this._body.readUIntLE(0x7c, 4)
      data.colors.zoomedText = {
        background: this.getRGBColors(offset, 1)[0],
        text: this.getRGBColors(offset + 10, 1)[0]
      }
    }

    if (this._body.readUIntLE(0x80, 0x4) === 1) {
      // bottom screen icon area
      offset = this._body.readUIntLE(0x84, 4)
      colors = this.getRGBColors(offset, 3)
      colors[3] = this.getRGBAColors(offset + 9, 1)[0]

      data.colors.bottomScreenIconArea = {
        emptySlotShadow: colors[0],
        background: colors[1],
        emptySlotBorder: colors[2],
        folderGlow: colors[3]
      }
    }

    if (this._body.readUIntLE(0x88, 0x4) === 1) {
      // bottom screen outer area
      offset = this._body.readUIntLE(0x8c, 4)
      colors = this.getRGBColors(offset, 3)
      data.colors.bottomScreenOuterArea = {
        striped: colors[0],
        background: colors[1],
        edgeGlow: colors[2]
      }
    }

    if (this._body.readUIntLE(0x90, 0x4) === 1) {
      // related to the background of folders
      offset = this._body.readUIntLE(0x94, 4)
      colors = this.getRGBColors(offset, 3)

      data.colors.folderBackground = {
        emptySlotShadow: colors[0],
        background: colors[1],
        border: colors[2]
      }
    }

    if (this._body.readUIntLE(0x98, 0x4) === 1) {
      offset = this._body.readUIntLE(0x9c, 4)
      // colors = this.getRGBColors(offset, 3)
      // TODO: 0x9c - Offset to a 0x20-byte block. Related to the colour of the back arrow in folders.
    }

    if (this._body.readUIntLE(0xa0, 0x4) === 1) {
      offset = this._body.readUIntLE(0xa4, 4)
      colors = this.getRGBColors(offset, 7)

      data.colors.settingsAndResize = {
        leftBoxShadow: colors[0],
        background: colors[1],
        border: colors[2],
        iconGradient: [
          colors[3],
          colors[4]
        ],
        pressed: colors[5],
        rightBoxShadow: colors[6]
      }
    }

    if (this._body.readUIntLE(0xA8, 0x4) === 1) {
      offset = this._body.readUIntLE(0xAC, 4)
      colors = this.getRGBColors(offset, 4)

      data.colors.activateCameraOverlay = {
        background: colors[0],
        text: colors[3]
      }
    }

    if (this._body.readUIntLE(0xB0, 0x4) === 1) {
      offset = this._body.readUIntLE(0xB4, 4)
      colors = this.getRGBColors(offset, 2)

      data.colors.demoUsesRemaining = {
        background: colors[0],
        text: colors[1]
      }
    }

    if (this._body.readUIntLE(0xB8, 0x4) === 1 && this._body.readUIntLE(0xBC, 0x4) > 0) {
      var cwavBlockSize = this._body.readUIntLE(0xBC, 0x4)
      var cwavOffset = this._body.readUIntLE(0xC0, 0x4)
      var cwavBlock = this._body.slice(cwavOffset, cwavOffset + cwavBlockSize)
      cwavOffset = 8

      data.customSFX = true

      if (cwavBlockSize > 0) {
        for (var i = 0; i <= 7; i++) {
          var kind = i

          if (kind === CwavKind.frame0) {
            cwavOffset += 44 // ExtData
          }

          var size = cwavBlock.readUIntLE(cwavOffset, 0x4)
          cwavOffset += 0x4

          var volume = cwavBlock.readUIntLE(cwavOffset, 0x4)
          cwavOffset += 0x4

          if (size === 0) continue

          // console.log(cwavOffset, size, cwavBlock.length)

          if (cwavOffset + size > cwavBlock.length) {
            size = cwavBlock.length - size
          }

          var magic = cwavBlock.toString('utf8', cwavOffset, cwavOffset + 4)

          // console.log(magic, cwavBlock.slice(cwavOffset, cwavOffset + 4))

          if (magic !== 'CWAV') {
            break
          }

          data.cwavs[Object.keys(CwavKind)[i + 1]] = cwavBlock.slice(cwavOffset, cwavOffset + size)

          cwavOffset += size
        }
      }
    }

    resolve(data)
  }.bind(this))
}

ThemeInfo.prototype.getRGBColors = function (offset, count) {
  var colors = []
  for (var i = 0; i < count; i++) {
    colors.push({
      r: this._body.readUInt8((i * 3) + offset),
      g: this._body.readUInt8((i * 3) + offset + 1),
      b: this._body.readUInt8((i * 3) + offset + 2)
    })
  }
  return colors
}

ThemeInfo.prototype.getRGBAColors = function (offset, count) {
  var colors = []
  for (var i = 0; i < count; i++) {
    colors.push({
      r: this._body.readUInt8((i * 4) + offset),
      g: this._body.readUInt8((i * 4) + offset + 1),
      b: this._body.readUInt8((i * 4) + offset + 2),
      a: this._body.readUInt8((i * 4) + offset + 3)
    })
  }
  return colors
}

ThemeInfo.prototype.sliceTextureBytes = function (offsetLocation, length) {
  var offset = this._body.readUIntLE(offsetLocation, 4)
  return this._body.slice(offset, offset + length)
}

function getTextureObject(buffer, width, height, cropWidth, cropHeight, type, tag) {
  return {
    data: buffer,
    width: width,
    height: height,
    cropWidth: cropWidth,
    cropHeight: cropHeight,
    type: type,
    tag: tag
  }
}

ThemeInfo.prototype.getTexture = function (textureID) {
  /*
    For a description of the textures, please visit
    https://3dbrew.org/wiki/Home_Menu/Themes#Textures
  */
  switch (textureID) {
    case 0: // 512x256 Tiled RGB565
      return getTextureObject(this.sliceTextureBytes(0x18, 0x40000), 512, 256, 412, 240, 'rgb565', textureKinds[textureID])

    case 1: // 1024x256 Tiled RGB565
      return getTextureObject(this.sliceTextureBytes(0x18, 0x80000), 1024, 256, 1008, 240, 'rgb565', textureKinds[textureID])

    case 2: // 512x256 Tiled RGB565
      return getTextureObject(this.sliceTextureBytes(0x28, 0x40000), 512, 256, 320, 240, 'rgb565', textureKinds[textureID])

    case 3: // 1024x256 Tiled RGB565
      return getTextureObject(this.sliceTextureBytes(0x28, 0x80000), 1024, 256, 960, 240, 'rgb565', textureKinds[textureID])

    case 4: // 1024x256 Tiled RGB565
      return getTextureObject(this.sliceTextureBytes(0x28, 0x80000), 1024, 256, 1008, 240, 'rgb565', textureKinds[textureID])

    case 5: // 64x64 Tiled A8
      return getTextureObject(this.sliceTextureBytes(0x18, 0x1000), 64, 64, 64, 64, 'a8', textureKinds[textureID])

    case 6: // 64x64 Tiled A8
      return getTextureObject(this.sliceTextureBytes(0x1c, 0x1000), 64, 64, 64, 64, 'a8', textureKinds[textureID])

    case 7: // 128x64 Tiled BG888, This is used for folder's on the main menu.
      return getTextureObject(this.sliceTextureBytes(0x40, 0x6000), 128, 64, 74, 64, 'bgr888', textureKinds[textureID])

    case 8: // 128x64 Tiled BGR888, This is used for open folder's on the main menu.
      return getTextureObject(this.sliceTextureBytes(0x44, 0x6000), 128, 64, 82, 64, 'bgr888', textureKinds[textureID])

    case 9: // 64x128 Tiled BGR888, This is used for 48x48 icon borders on the main menu.
      return getTextureObject(this.sliceTextureBytes(0x54, 0x6000), 64, 128, 36, 72, 'bgr888', textureKinds[textureID])

    case 10: // 32x64 Tiled BGR888, This is used for 24x24 icon borders on the main menu.
      return getTextureObject(this.sliceTextureBytes(0x58, 0x1800), 32, 64, 25, 50, 'bgr888', textureKinds[textureID])
  }
}

module.exports = exports = {
  ThemeInfo: ThemeInfo
}
