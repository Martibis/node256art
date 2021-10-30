# 256ART

Gives generative artists easy access to data in 256ART pieces.

```
npm install --save 256art
```

```
const TwoFiveSix = require("256art");
```

# Examples

Get metadata for one piece

```
let json = TwoFiveSix.getJsonFromId(1);
```

Get metadata in base64 format for one piece

```
let base64 = TwoFiveSix.getBase64JsonFromId(1);
```

Get a seed for pseudorandomization by combining the RGB values from the first color in a piece

```
let seedFromColors = TwoFiveSix.getSeedFromFirstColorForId(1);
```

Get all block colors as seeds by combining the RGB value from each color in a piece

```
let seedsFromColors = TwoFiveSix.getSeedsFromAllBlockColorsForId(1);
```

Get all block colors for one piece (hex)

```
let blockColors = TwoFiveSix.getBlockColorsForId(1);
```

Get background color for one piece (hex)

```
let bgColor = TwoFiveSix.getBackgroundColorForId(1);
```

Get border color for one piece (hex)

```
let borderColor = TwoFiveSix.getBorderColorForId(1);
```

Get total amount of blocks for one piece

```
let totalBlocks = TwoFiveSix.getTotalBlocksForId(1);
```
