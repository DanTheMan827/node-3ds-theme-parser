/**
* This is the top-level object containing the theme information
* @typedef ThemeInfoObject
* @type {Object}
* @property {Boolean} enableBGM If background music is enabled
* @property {Boolean} customSFX If custom sound effects are used
* @property {Boolean} customFolders If custom folder images are used
* @property {Boolean} customCartridgeColors If custom cartridge colors are used
* @property {Boolean} customBorders If custom border images are used
* @property {Boolean} customTopScreenBackground If the top screen has a custom background image
* @property {Boolean} customBottomScreenBackground If the bottom screen has a custom background image
* @property {TopScreenObject} topScreen An object containing information about the top screen
* @property {BottomScreenObject} bottomScreen An object containing information about the bottom screen
* @property {ColorsObject} colors An object containing information about all of the theme colors
* @property {TexturesObject} textures An object containing all of the theme textures
* @property {CWAVSObject} cwavs An object containing all of the theme sound effects
*/
/**
* Contains various information about the top screen
* @typedef TopScreenObject
* @type {Object}
* @property {Integer} drawType Top screen draw type: 0 = none, 1 = solid color, 2 = solid color with textured squares, 3 = texture.
* @property {Integer|undefined} frameType Top screen frame type, when draw-type is 3: 0 = texture1 (regular scrolling speed), 1 = texture0 (no scroll), 3 = texture1 (slow scrolling speed).
* @property {TopScreenBackgroundObject} topScreen.background Contains information about the top screen background
* @property {Float} topScreen.squareOpacity Controls the opacity of the squares that float in front of the background, ranges from 0 - 1.
*/
/**
* Contains information about the top screen background
* @typedef TopScreenBackgroundObject
* @type {Object}
* @property {TiledImageObject|undefined} texture The top screen texture when drawType allows it.
* @property {RGBObject|undefined} color The top screen background color if drawType is set to either 1 or 2.
* @property {Integer|undefined} gradient The top screen background gradient (0=none, 255=fade all the way to white at the top)
*/
/**
* Contains information about the bottom screen
* @typedef BottomScreenObject
* @type {Object}
* @property {BottomScreenBackgroundObject} background Information about the bottom screen background
* @property {Integer} drawType The bottom screen draw type: 0 = none, 1 = solid color(see below), 2 = invalid, 3 = texture.
* @property {Integer} framType The bottom screen frame type when draw-type is 3: 0 = texture4 (regular scroll), 1 = texture2 (no scroll), 2 = texture3 (flipbook scroll, 0 > 1 > 2 > 0), 3 = texture4 (slow scroll), 4 = texture3 (flipbook scroll, 0 > 1 > 2 > 1 > 0).
*/
/**
* Information about the bottom screen background
* @typedef BottomScreenBackgroundObject
* @type {Object}
* @property {TiledImageObject|undefined} texture The bottom screen background image
*/
/**
* This contains all of the colors used in the theme
* @typedef ColorsObject
* @type {Object}
* @property {CursorColor|undefined} cursor Four RGB colors that affect the cursor as it expands and contracts.
* @property {Folder3DModelColor|undefined} folder3DModel This contains colors for the 3D folder model.
* @property {CartridgeColor|undefined} cartridge This contains colors that affect both the cart icon that appears for DSiWare, and the file graphic that appears in folders.
* @property {RGBObject|undefined} folderTopHighlight The highlight used at the top of a folder icon
* @property {PagerObject|undefined} pager This contains colors that affect the the pager.
* @property {OpenCloseButtonObject|undefined} openButton Contains RGB data for the open button that appears on the bottom screen when an app is under the cursor.
* @property {OpenCloseButtonObject|undefined} closeButton Contains RGB data for the close button that appears when home button pressed from within a app.
* @property {ZoomedTextObject|undefined} zoomedText Contains color data that affects the text that appears above game icons when zoomed to the maximum level.
* @property {BottomScreenIconAreaObject|undefined} bottomScreenIconArea Contains colors related to the bottom screen icon area. Used when the draw-type is set to solid color.
* @property {BottomScreenOuterAreaObject|undefined} bottomScreenOuterArea Contains colors releated to the bottom screen outer area. Used when the draw-type is set to solid color.
* @property {FolderBackgroundObject|undefined} folderBackground Contains information related to the background of folders.
* @property {SettingsAndResizeObject|undefined} settingsAndResize Contains colors that affect the bottom screen icon-resize and settings buttons.
* @property {ActivateCameraOverlayObject|undefined} activateCameraOverlay Contains colors for the "press to activate camera" overlay.
* @property {DemoUsesRemainingObject|undefined} demoUsesRemaining Contains colors for the message that tells you how many demo uses you have remaining.
* @property {RGBObject|undefined} topScreenBackground The top screen background color if drawType is set to either 1 or 2.
*/
/**
* Four RGB colors that affect the cursor as it expands and contracts.
* @typedef CursorColor
* @type {Object}
* @property {RGBObject} border The cursor border color
* @property {RGBObject} main The cursor main color
* @property {RGBObject} unknown An unknown color
* @property {RGBObject} expandedGlow The glow of the expanded cursor
*/
/**
* This contains colors for the 3D folder model.
* @typedef Folder3DModelColor
* @type {Object}
* @property {RGBObject} main The main color
* @property {RGBObject} shadowed The shadowed color
*/

/**
* This contains colors that affect both the cart icon that appears for DSiWare, and the file graphic that appears in folders.
* @typedef CartridgeColor
* @type {Object}
* @property {RGBObject} main The main color
* @property {RGBObject} bottomShadow The bottom shadow color
*/
/**
* This contains colors that affect the the pager.
* @typedef PagerObject
* @type {Object}
* @property {PagerButtonColor|undefined} button This contains colors that affect the button of the pager
* @property {PagerArrowColor|undefined} arrow This contains colors that affect the arrows of the pager
*/
/**
* This contains colors that affect the buttons of the pager.
* @typedef PagerButtonColor
* @type {Object}
* @property {RGBObject} downwardSheen The downward sheen color
* @property {RGBObject} main The main color
* @property {RGBObject} leftwardSheen The leftward sheen color
*/
/**
* This contains colors that affect the arrows of the pager.
* @typedef PagerArrowColor
* @type {Object}
* @property {RGBObject} edge The edge color
* @property {RGBObject} unpressed The unpressed color
* @property {RGBObject} pressed The pressed color
*/
/**
* Contains RGB data for the open and close buttons that appear on the bottom screen.
* @typedef OpenCloseButtonObject
* @type {Object}
* @property {OpenCloseButtonColor} button The colors for the button
* @property {OpenCloseButtonTextColor} text The colors for the button text
*/
/**
* Contains three colors that are used for the open/close button color
* @typedef OpenCloseButtonColor
* @type {Object}
* @property {RGBObject} pressed The button background when pressed
* @property {RGBObject} unpressed The button background when not pressed
* @property {RGBObject} border The button border color
*/
/**
* Contains three colors that are used for the open/close button text color
* @typedef OpenCloseButtonTextColor
* @type {Object}
* @property {RGBObject} pressed The pressed text color
* @property {RGBObject} unpressed The unpressed text color
* @property {RGBObject} shadoow The text shadow color
*/
/**
* Contains color data that affects the text that appears above game icons when zoomed to the maximum level.
* @typedef ZoomedTextObject
* @type {Object}
* @property {RGBObject} background The background color
* @property {RGBObject} text The text color
*/
/**
* Contains information related to the bottom screen icon area. Used when the draw-type is set to solid color.
* @typedef BottomScreenIconAreaObject
* @type {Object}
* @property {RGBObject} emptySlotShadow The shadow color at the top of an empty slot
* @property {RGBObject} background The background color
* @property {RGBObject} emptySlotBorder The empty slot border color
* @property {RGBAObject} folderGlow The shadow / glow around the folder area
*/
/**
* Contains information related to the background of folders.
* @typedef FolderBackgroundObject
* @type {Object}
* @property {RGBObject} emptySlotShadow The empty slot shadow color
* @property {RGBObject} background The background color
* @property {RGBObject} border The border color
*/
/**
* Contains colors that affect the bottom screen icon-resize and settings buttons.
* @typedef SettingsAndResizeObject
* @type {Object}
* @property {RGBObject} leftBoxShadow The left box shadow (subtle)
* @property {RGBObject} background The background color
* @property {RGBObject} border The border color
* @property {Array<RGBObject>} iconGradient A two value array that contains the color values for the icon gradient.
* @property {RGBObject} pressed The pressed color
* @property {RGBObject} rightBoxShadow The color right shadow (subtle)
*/
/**
* Contains colors for the "press to activate camera" overlay.
* @typedef ActivateCameraOverlayObject
* @type {Object}
* @property {RGBObject} background The background color
* @property {RGBObject} text The text color
*/
/**
* Contains colors for the message that tells you how many demo uses you have remaining.
* @typedef DemoUsesRemainingObject
* @type {Object}
* @property {RGBObject} background The background color
* @property {RGBObject} text The text color
*/
/**
* Contains colors related to the bottom screen outer area. Used when the draw-type is set to solid color.
* @typedef BottomScreenOuterAreaObject
* @type {Object}
* @property {RGBObject} striped The striped color
* @property {RGBObject} background The background color
* @property {RGBObject} edgeGlow The edge glow color
*/
/**
* @typedef TexturesObject
* @type {Object}
* @property {TiledImageObject|undefined} topBackground This is the texture used for the top-screen background when topScreen.frameType = 1, Used for backgrounds that don't scroll.
* @property {TiledImageObject|undefined} topScrollingBackground This is the texture used for the top-screen background when topScreen.frameType = 0 or 3, Used for backgrounds that scroll.
* @property {TiledImageObject|undefined} bottomBackground This is the texture used for the bottom-screen background when bottomScreen.frameType = 1, Used for backgrounds that don't scroll.
* @property {TiledImageObject|undefined} bottomFlipbookBackground This is the texture used for the bottom-screen background when bottomScreen.frameType = 2 or 4, Split into three separate 320x240 textures that it jumps through like a flipbook.
* @property {TiledImageObject|undefined} bottomScrollingBackground This is the texture used for the bottom-screen background when bottomScreen.frameType = 0 or 3, Used for backgrounds that scroll.
* @property {TiledImageObject|undefined} movingPattern This is used with the top screen when topScreen.drawType = 2, see above. Used to tile the top screen in much the same way as the white squares that appear when no theme is selected, this is the moving pattern, it is rotated 90 degrees.
* @property {TiledImageObject|undefined} stillPattern textures.movingPattern This is used with the top screen when topScreen.drawType = 2, see above. Used to tile the top screen in much the same way as the white squares that appear when no theme is selected, this is the still pattern, it is rotated 90 degrees.
* @property {TiledImageObject|undefined} closedFolder This is used for closed folders on the main menu.
* @property {TiledImageObject|undefined} openFolder This is used for open folders on the main menu.
* @property {TiledImageObject|undefined} largeIconBorder This is used for 48x48 icon borders on the main menu.
* @property {TiledImageObject|undefined} smallIconBorder This is used for 24x24 icon borders on the main menu.
*/
/**
* Contains buffers of CWAV data for all of the sound effects.
* @typedef CWAVSObject
* @type {Object}
* @property {Buffer|undefined} cursor The sound for cusor movement
* @property {Buffer|undefined} Launch The sound for application launch
* @property {Buffer|undefined} folder The sound for folder buttons
* @property {Buffer|undefined} cancel The sound for cancel buttons
* @property {Buffer|undefined} frame0
* @property {Buffer|undefined} frame1
* @property {Buffer|undefined} frame2
* @property {Buffer|undefined} openLid The sound for when the lid is opened
*/
/**
* This describes a RGB color
* @typedef RGBObject
* @type {Object}
* @property {Integer} r Red channel from 0 - 255
* @property {Integer} g Green channel from 0 - 255
* @property {Integer} b Blue channel from 0 - 255
*/
/**
* This describes a RGBA color
* @typedef RGBAObject
* @type {Object}
* @property {Integer} r Red channel from 0 - 255
* @property {Integer} g Green channel from 0 - 255
* @property {Integer} b Blue channel from 0 - 255
* @property {Integer} a Alpha channel from 0 - 255
*/
/**
* An object with the tiled image bitmap data, size, and crop dimensions.
* @typedef TiledImageObject
* @type {Object}
* @property {Buffer} data The image bitmap data buffer
* @property {Integer} width The image width
* @property {Integer} height The image height
* @property {Integer} cropWidth The image crop width
* @property {Integer} cropHeight The image crop height
* @property {String} type The image type, one of the following: rgb565, bgr888, a8
* @property {String} tag A string identifying the image, see TextureKind.js
*/
