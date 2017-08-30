# 3ds-theme-parser
Parses and extracts 3DS body_LZ.bin theme files.

# CLI
```
Usage: 3ds-theme-parser body_lz_bin [output_directory] [options]

Options:
  --save-body, -B        Save the extracted body.bin                   [boolean]
  --pretty-json, -p      Format the JSON with indents                  [boolean]
  --save-json, -j, -A    Write JSON of the body_LZ data to data.json   [boolean]
  --output-json, -J      Write JSON of the body_LZ data to STDOUT      [boolean]
  --save-images, -i, -A  Save the images                               [boolean]
  --save-cwavs, -c, -A   Save the CWAV sound effects                   [boolean]
  --apply-alpha, -a      Apply alpha masks to the folder images        [boolean]
  --process-borders, -b  Process the icon border into a complete image [boolean]
  --json-textures        Include the textures in the output JSON
                         WARNING: RESULTS IN LARGE JSON!               [boolean]
  --json-cwavs           Include the CWAVs in the output JSON
                         WARNING: RESULTS IN LARGE JSON!               [boolean]
```

# API Reference
## Classes

<dl>
<dt><a href="#ThemeInfo">ThemeInfo</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ThemeInfoObject">ThemeInfoObject</a> : <code>Object</code></dt>
<dd><p>This is the top-level object containing the theme information</p>
</dd>
<dt><a href="#TopScreenObject">TopScreenObject</a> : <code>Object</code></dt>
<dd><p>Contains various information about the top screen</p>
</dd>
<dt><a href="#TopScreenBackgroundObject">TopScreenBackgroundObject</a> : <code>Object</code></dt>
<dd><p>Contains information about the top screen background</p>
</dd>
<dt><a href="#BottomScreenObject">BottomScreenObject</a> : <code>Object</code></dt>
<dd><p>Contains information about the bottom screen</p>
</dd>
<dt><a href="#BottomScreenBackgroundObject">BottomScreenBackgroundObject</a> : <code>Object</code></dt>
<dd><p>Information about the bottom screen background</p>
</dd>
<dt><a href="#ColorsObject">ColorsObject</a> : <code>Object</code></dt>
<dd><p>This contains all of the colors used in the theme</p>
</dd>
<dt><a href="#CursorColor">CursorColor</a> : <code>Object</code></dt>
<dd><p>Four RGB colors that affect the cursor as it expands and contracts.</p>
</dd>
<dt><a href="#Folder3DModelColor">Folder3DModelColor</a> : <code>Object</code></dt>
<dd><p>This contains colors for the 3D folder model.</p>
</dd>
<dt><a href="#CartridgeColor">CartridgeColor</a> : <code>Object</code></dt>
<dd><p>This contains colors that affect both the cart icon that appears for DSiWare, and the file graphic that appears in folders.</p>
</dd>
<dt><a href="#PagerObject">PagerObject</a> : <code>Object</code></dt>
<dd><p>This contains colors that affect the the pager.</p>
</dd>
<dt><a href="#PagerButtonColor">PagerButtonColor</a> : <code>Object</code></dt>
<dd><p>This contains colors that affect the buttons of the pager.</p>
</dd>
<dt><a href="#PagerArrowColor">PagerArrowColor</a> : <code>Object</code></dt>
<dd><p>This contains colors that affect the arrows of the pager.</p>
</dd>
<dt><a href="#OpenCloseButtonObject">OpenCloseButtonObject</a> : <code>Object</code></dt>
<dd><p>Contains RGB data for the open and close buttons that appear on the bottom screen.</p>
</dd>
<dt><a href="#OpenCloseButtonColor">OpenCloseButtonColor</a> : <code>Object</code></dt>
<dd><p>Contains three colors that are used for the open/close button color</p>
</dd>
<dt><a href="#OpenCloseButtonTextColor">OpenCloseButtonTextColor</a> : <code>Object</code></dt>
<dd><p>Contains three colors that are used for the open/close button text color</p>
</dd>
<dt><a href="#ZoomedTextObject">ZoomedTextObject</a> : <code>Object</code></dt>
<dd><p>Contains color data that affects the text that appears above game icons when zoomed to the maximum level.</p>
</dd>
<dt><a href="#BottomScreenIconAreaObject">BottomScreenIconAreaObject</a> : <code>Object</code></dt>
<dd><p>Contains information related to the bottom screen icon area. Used when the draw-type is set to solid color.</p>
</dd>
<dt><a href="#FolderBackgroundObject">FolderBackgroundObject</a> : <code>Object</code></dt>
<dd><p>Contains information related to the background of folders.</p>
</dd>
<dt><a href="#SettingsAndResizeObject">SettingsAndResizeObject</a> : <code>Object</code></dt>
<dd><p>Contains colors that affect the bottom screen icon-resize and settings buttons.</p>
</dd>
<dt><a href="#ActivateCameraOverlayObject">ActivateCameraOverlayObject</a> : <code>Object</code></dt>
<dd><p>Contains colors for the &quot;press to activate camera&quot; overlay.</p>
</dd>
<dt><a href="#DemoUsesRemainingObject">DemoUsesRemainingObject</a> : <code>Object</code></dt>
<dd><p>Contains colors for the message that tells you how many demo uses you have remaining.</p>
</dd>
<dt><a href="#BottomScreenOuterAreaObject">BottomScreenOuterAreaObject</a> : <code>Object</code></dt>
<dd><p>Contains colors related to the bottom screen outer area. Used when the draw-type is set to solid color.</p>
</dd>
<dt><a href="#TexturesObject">TexturesObject</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CWAVSObject">CWAVSObject</a> : <code>Object</code></dt>
<dd><p>Contains buffers of CWAV data for all of the sound effects.</p>
</dd>
<dt><a href="#RGBObject">RGBObject</a> : <code>Object</code></dt>
<dd><p>This describes a RGB color</p>
</dd>
<dt><a href="#RGBAObject">RGBAObject</a> : <code>Object</code></dt>
<dd><p>This describes a RGBA color</p>
</dd>
<dt><a href="#TiledImageObject">TiledImageObject</a> : <code>Object</code></dt>
<dd><p>An object with the tiled image bitmap data, size, and crop dimensions.</p>
</dd>
</dl>

<a name="ThemeInfo"></a>

## ThemeInfo
**Kind**: global class  

* [ThemeInfo](#ThemeInfo)
    * [new ThemeInfo(bodyBuffer)](#new_ThemeInfo_new)
    * [.getData([callback])](#ThemeInfo+getData) ⇒ [<code>Promise.&lt;ThemeInfoObject&gt;</code>](#ThemeInfoObject)

<a name="new_ThemeInfo_new"></a>

### new ThemeInfo(bodyBuffer)
The ThemeInfo constructor.


| Param | Type | Description |
| --- | --- | --- |
| bodyBuffer | <code>Buffer</code> | The body_LZ.bin buffer to parse |

<a name="ThemeInfo+getData"></a>

### themeInfo.getData([callback]) ⇒ [<code>Promise.&lt;ThemeInfoObject&gt;</code>](#ThemeInfoObject)
This is the main function, it will parse the body_LZ.bin data and output a javascript object.

**Kind**: instance method of [<code>ThemeInfo</code>](#ThemeInfo)  
**Returns**: [<code>Promise.&lt;ThemeInfoObject&gt;</code>](#ThemeInfoObject) - The theme info  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | An optional node.js style callback |

<a name="ThemeInfoObject"></a>

## ThemeInfoObject : <code>Object</code>
This is the top-level object containing the theme information

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| enableBGM | <code>Boolean</code> | If background music is enabled |
| customSFX | <code>Boolean</code> | If custom sound effects are used |
| customFolders | <code>Boolean</code> | If custom folder images are used |
| customCartridgeColors | <code>Boolean</code> | If custom cartridge colors are used |
| customBorders | <code>Boolean</code> | If custom border images are used |
| customTopScreenBackground | <code>Boolean</code> | If the top screen has a custom background image |
| customBottomScreenBackground | <code>Boolean</code> | If the bottom screen has a custom background image |
| topScreen | [<code>TopScreenObject</code>](#TopScreenObject) | An object containing information about the top screen |
| bottomScreen | [<code>BottomScreenObject</code>](#BottomScreenObject) | An object containing information about the bottom screen |
| colors | [<code>ColorsObject</code>](#ColorsObject) | An object containing information about all of the theme colors |
| textures | [<code>TexturesObject</code>](#TexturesObject) | An object containing all of the theme textures |
| cwavs | [<code>CWAVSObject</code>](#CWAVSObject) | An object containing all of the theme sound effects |

<a name="TopScreenObject"></a>

## TopScreenObject : <code>Object</code>
Contains various information about the top screen

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| drawType | <code>Integer</code> | Top screen draw type: 0 = none, 1 = solid color, 2 = solid color with textured squares, 3 = texture. |
| frameType | <code>Integer</code> \| <code>undefined</code> | Top screen frame type, when draw-type is 3: 0 = texture1 (regular scrolling speed), 1 = texture0 (no scroll), 3 = texture1 (slow scrolling speed). |
| topScreen.background | [<code>TopScreenBackgroundObject</code>](#TopScreenBackgroundObject) | Contains information about the top screen background |
| topScreen.squareOpacity | <code>Float</code> | Controls the opacity of the squares that float in front of the background, ranges from 0 - 1. |

<a name="TopScreenBackgroundObject"></a>

## TopScreenBackgroundObject : <code>Object</code>
Contains information about the top screen background

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| texture | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | The top screen texture when drawType allows it. |
| color | [<code>RGBObject</code>](#RGBObject) \| <code>undefined</code> | The top screen background color if drawType is set to either 1 or 2. |
| gradient | <code>Integer</code> \| <code>undefined</code> | The top screen background gradient (0=none, 255=fade all the way to white at the top) |

<a name="BottomScreenObject"></a>

## BottomScreenObject : <code>Object</code>
Contains information about the bottom screen

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| background | [<code>BottomScreenBackgroundObject</code>](#BottomScreenBackgroundObject) | Information about the bottom screen background |
| drawType | <code>Integer</code> | The bottom screen draw type: 0 = none, 1 = solid color(see below), 2 = invalid, 3 = texture. |
| framType | <code>Integer</code> | The bottom screen frame type when draw-type is 3: 0 = texture4 (regular scroll), 1 = texture2 (no scroll), 2 = texture3 (flipbook scroll, 0 > 1 > 2 > 0), 3 = texture4 (slow scroll), 4 = texture3 (flipbook scroll, 0 > 1 > 2 > 1 > 0). |

<a name="BottomScreenBackgroundObject"></a>

## BottomScreenBackgroundObject : <code>Object</code>
Information about the bottom screen background

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| texture | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | The bottom screen background image |

<a name="ColorsObject"></a>

## ColorsObject : <code>Object</code>
This contains all of the colors used in the theme

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cursor | [<code>CursorColor</code>](#CursorColor) \| <code>undefined</code> | Four RGB colors that affect the cursor as it expands and contracts. |
| folder3DModel | [<code>Folder3DModelColor</code>](#Folder3DModelColor) \| <code>undefined</code> | This contains colors for the 3D folder model. |
| cartridge | [<code>CartridgeColor</code>](#CartridgeColor) \| <code>undefined</code> | This contains colors that affect both the cart icon that appears for DSiWare, and the file graphic that appears in folders. |
| folderTopHighlight | [<code>RGBObject</code>](#RGBObject) \| <code>undefined</code> | The highlight used at the top of a folder icon |
| pager | [<code>PagerObject</code>](#PagerObject) \| <code>undefined</code> | This contains colors that affect the the pager. |
| openButton | [<code>OpenCloseButtonObject</code>](#OpenCloseButtonObject) \| <code>undefined</code> | Contains RGB data for the open button that appears on the bottom screen when an app is under the cursor. |
| closeButton | [<code>OpenCloseButtonObject</code>](#OpenCloseButtonObject) \| <code>undefined</code> | Contains RGB data for the close button that appears when home button pressed from within a app. |
| zoomedText | [<code>ZoomedTextObject</code>](#ZoomedTextObject) \| <code>undefined</code> | Contains color data that affects the text that appears above game icons when zoomed to the maximum level. |
| bottomScreenIconArea | [<code>BottomScreenIconAreaObject</code>](#BottomScreenIconAreaObject) \| <code>undefined</code> | Contains colors related to the bottom screen icon area. Used when the draw-type is set to solid color. |
| bottomScreenOuterArea | [<code>BottomScreenOuterAreaObject</code>](#BottomScreenOuterAreaObject) \| <code>undefined</code> | Contains colors releated to the bottom screen outer area. Used when the draw-type is set to solid color. |
| folderBackground | [<code>FolderBackgroundObject</code>](#FolderBackgroundObject) \| <code>undefined</code> | Contains information related to the background of folders. |
| settingsAndResize | [<code>SettingsAndResizeObject</code>](#SettingsAndResizeObject) \| <code>undefined</code> | Contains colors that affect the bottom screen icon-resize and settings buttons. |
| activateCameraOverlay | [<code>ActivateCameraOverlayObject</code>](#ActivateCameraOverlayObject) \| <code>undefined</code> | Contains colors for the "press to activate camera" overlay. |
| demoUsesRemaining | [<code>DemoUsesRemainingObject</code>](#DemoUsesRemainingObject) \| <code>undefined</code> | Contains colors for the message that tells you how many demo uses you have remaining. |
| topScreenBackground | [<code>RGBObject</code>](#RGBObject) \| <code>undefined</code> | The top screen background color if drawType is set to either 1 or 2. |

<a name="CursorColor"></a>

## CursorColor : <code>Object</code>
Four RGB colors that affect the cursor as it expands and contracts.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| border | [<code>RGBObject</code>](#RGBObject) | The cursor border color |
| main | [<code>RGBObject</code>](#RGBObject) | The cursor main color |
| unknown | [<code>RGBObject</code>](#RGBObject) | An unknown color |
| expandedGlow | [<code>RGBObject</code>](#RGBObject) | The glow of the expanded cursor |

<a name="Folder3DModelColor"></a>

## Folder3DModelColor : <code>Object</code>
This contains colors for the 3D folder model.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main | [<code>RGBObject</code>](#RGBObject) | The main color |
| shadowed | [<code>RGBObject</code>](#RGBObject) | The shadowed color |

<a name="CartridgeColor"></a>

## CartridgeColor : <code>Object</code>
This contains colors that affect both the cart icon that appears for DSiWare, and the file graphic that appears in folders.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| main | [<code>RGBObject</code>](#RGBObject) | The main color |
| bottomShadow | [<code>RGBObject</code>](#RGBObject) | The bottom shadow color |

<a name="PagerObject"></a>

## PagerObject : <code>Object</code>
This contains colors that affect the the pager.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| button | [<code>PagerButtonColor</code>](#PagerButtonColor) \| <code>undefined</code> | This contains colors that affect the button of the pager |
| arrow | [<code>PagerArrowColor</code>](#PagerArrowColor) \| <code>undefined</code> | This contains colors that affect the arrows of the pager |

<a name="PagerButtonColor"></a>

## PagerButtonColor : <code>Object</code>
This contains colors that affect the buttons of the pager.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| downwardSheen | [<code>RGBObject</code>](#RGBObject) | The downward sheen color |
| main | [<code>RGBObject</code>](#RGBObject) | The main color |
| leftwardSheen | [<code>RGBObject</code>](#RGBObject) | The leftward sheen color |

<a name="PagerArrowColor"></a>

## PagerArrowColor : <code>Object</code>
This contains colors that affect the arrows of the pager.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| edge | [<code>RGBObject</code>](#RGBObject) | The edge color |
| unpressed | [<code>RGBObject</code>](#RGBObject) | The unpressed color |
| pressed | [<code>RGBObject</code>](#RGBObject) | The pressed color |

<a name="OpenCloseButtonObject"></a>

## OpenCloseButtonObject : <code>Object</code>
Contains RGB data for the open and close buttons that appear on the bottom screen.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| button | [<code>OpenCloseButtonColor</code>](#OpenCloseButtonColor) | The colors for the button |
| text | [<code>OpenCloseButtonTextColor</code>](#OpenCloseButtonTextColor) | The colors for the button text |

<a name="OpenCloseButtonColor"></a>

## OpenCloseButtonColor : <code>Object</code>
Contains three colors that are used for the open/close button color

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pressed | [<code>RGBObject</code>](#RGBObject) | The button background when pressed |
| unpressed | [<code>RGBObject</code>](#RGBObject) | The button background when not pressed |
| border | [<code>RGBObject</code>](#RGBObject) | The button border color |

<a name="OpenCloseButtonTextColor"></a>

## OpenCloseButtonTextColor : <code>Object</code>
Contains three colors that are used for the open/close button text color

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pressed | [<code>RGBObject</code>](#RGBObject) | The pressed text color |
| unpressed | [<code>RGBObject</code>](#RGBObject) | The unpressed text color |
| shadoow | [<code>RGBObject</code>](#RGBObject) | The text shadow color |

<a name="ZoomedTextObject"></a>

## ZoomedTextObject : <code>Object</code>
Contains color data that affects the text that appears above game icons when zoomed to the maximum level.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| text | [<code>RGBObject</code>](#RGBObject) | The text color |

<a name="BottomScreenIconAreaObject"></a>

## BottomScreenIconAreaObject : <code>Object</code>
Contains information related to the bottom screen icon area. Used when the draw-type is set to solid color.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| emptySlotShadow | [<code>RGBObject</code>](#RGBObject) | The shadow color at the top of an empty slot |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| emptySlotBorder | [<code>RGBObject</code>](#RGBObject) | The empty slot border color |
| folderGlow | [<code>RGBAObject</code>](#RGBAObject) | The shadow / glow around the folder area |

<a name="FolderBackgroundObject"></a>

## FolderBackgroundObject : <code>Object</code>
Contains information related to the background of folders.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| emptySlotShadow | [<code>RGBObject</code>](#RGBObject) | The empty slot shadow color |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| border | [<code>RGBObject</code>](#RGBObject) | The border color |

<a name="SettingsAndResizeObject"></a>

## SettingsAndResizeObject : <code>Object</code>
Contains colors that affect the bottom screen icon-resize and settings buttons.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| leftBoxShadow | [<code>RGBObject</code>](#RGBObject) | The left box shadow (subtle) |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| border | [<code>RGBObject</code>](#RGBObject) | The border color |
| iconGradient | [<code>Array.&lt;RGBObject&gt;</code>](#RGBObject) | A two value array that contains the color values for the icon gradient. |
| pressed | [<code>RGBObject</code>](#RGBObject) | The pressed color |
| rightBoxShadow | [<code>RGBObject</code>](#RGBObject) | The color right shadow (subtle) |

<a name="ActivateCameraOverlayObject"></a>

## ActivateCameraOverlayObject : <code>Object</code>
Contains colors for the "press to activate camera" overlay.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| text | [<code>RGBObject</code>](#RGBObject) | The text color |

<a name="DemoUsesRemainingObject"></a>

## DemoUsesRemainingObject : <code>Object</code>
Contains colors for the message that tells you how many demo uses you have remaining.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| text | [<code>RGBObject</code>](#RGBObject) | The text color |

<a name="BottomScreenOuterAreaObject"></a>

## BottomScreenOuterAreaObject : <code>Object</code>
Contains colors related to the bottom screen outer area. Used when the draw-type is set to solid color.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| striped | [<code>RGBObject</code>](#RGBObject) | The striped color |
| background | [<code>RGBObject</code>](#RGBObject) | The background color |
| edgeGlow | [<code>RGBObject</code>](#RGBObject) | The edge glow color |

<a name="TexturesObject"></a>

## TexturesObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| topBackground | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is the texture used for the top-screen background when topScreen.frameType = 1, Used for backgrounds that don't scroll. |
| topScrollingBackground | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is the texture used for the top-screen background when topScreen.frameType = 0 or 3, Used for backgrounds that scroll. |
| bottomBackground | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is the texture used for the bottom-screen background when bottomScreen.frameType = 1, Used for backgrounds that don't scroll. |
| bottomFlipbookBackground | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is the texture used for the bottom-screen background when bottomScreen.frameType = 2 or 4, Split into three separate 320x240 textures that it jumps through like a flipbook. |
| bottomScrollingBackground | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is the texture used for the bottom-screen background when bottomScreen.frameType = 0 or 3, Used for backgrounds that scroll. |
| movingPattern | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is used with the top screen when topScreen.drawType = 2, see above. Used to tile the top screen in much the same way as the white squares that appear when no theme is selected, this is the moving pattern, it is rotated 90 degrees. |
| stillPattern | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | textures.movingPattern This is used with the top screen when topScreen.drawType = 2, see above. Used to tile the top screen in much the same way as the white squares that appear when no theme is selected, this is the still pattern, it is rotated 90 degrees. |
| closedFolder | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is used for closed folders on the main menu. |
| openFolder | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is used for open folders on the main menu. |
| largeIconBorder | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is used for 48x48 icon borders on the main menu. |
| smallIconBorder | [<code>TiledImageObject</code>](#TiledImageObject) \| <code>undefined</code> | This is used for 24x24 icon borders on the main menu. |

<a name="CWAVSObject"></a>

## CWAVSObject : <code>Object</code>
Contains buffers of CWAV data for all of the sound effects.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cursor | <code>Buffer</code> \| <code>undefined</code> | The sound for cusor movement |
| Launch | <code>Buffer</code> \| <code>undefined</code> | The sound for application launch |
| folder | <code>Buffer</code> \| <code>undefined</code> | The sound for folder buttons |
| cancel | <code>Buffer</code> \| <code>undefined</code> | The sound for cancel buttons |
| frame0 | <code>Buffer</code> \| <code>undefined</code> |  |
| frame1 | <code>Buffer</code> \| <code>undefined</code> |  |
| frame2 | <code>Buffer</code> \| <code>undefined</code> |  |
| openLid | <code>Buffer</code> \| <code>undefined</code> | The sound for when the lid is opened |

<a name="RGBObject"></a>

## RGBObject : <code>Object</code>
This describes a RGB color

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| r | <code>Integer</code> | Red channel from 0 - 255 |
| g | <code>Integer</code> | Green channel from 0 - 255 |
| b | <code>Integer</code> | Blue channel from 0 - 255 |

<a name="RGBAObject"></a>

## RGBAObject : <code>Object</code>
This describes a RGBA color

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| r | <code>Integer</code> | Red channel from 0 - 255 |
| g | <code>Integer</code> | Green channel from 0 - 255 |
| b | <code>Integer</code> | Blue channel from 0 - 255 |
| a | <code>Integer</code> | Alpha channel from 0 - 255 |

<a name="TiledImageObject"></a>

## TiledImageObject : <code>Object</code>
An object with the tiled image bitmap data, size, and crop dimensions.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Buffer</code> | The image bitmap data buffer |
| width | <code>Integer</code> | The image width |
| height | <code>Integer</code> | The image height |
| cropWidth | <code>Integer</code> | The image crop width |
| cropHeight | <code>Integer</code> | The image crop height |
| type | <code>String</code> | The image type, one of the following: rgb565, bgr888, a8 |
| tag | <code>String</code> | A string identifying the image, see TextureKind.js |

