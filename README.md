# 256ART

Gives generative artists easy access to data from 256ART pieces.

```
npm install --save 256art
```

```
const TwoFiveSix = require("256art");
```

# EXAMPLES

```
//GET JSON WITH ALL DATA FOR ONE PIECE
let json = TwoFiveSix.getJsonFromId(1);
```

```
//GET JSON IN BASE64 FORMAT FOR ONE PIECE
let base64 = TwoFiveSix.getBase64JsonFromId(1);
```

```
//GET A SEED FROM ALL COLORS IN ONE PIECE
let seedFromColors = TwoFiveSix.getSeedFromColorsForId(1);
```

```
//GET ALL BLOCKCOLORS AS HEX FOR ONE PIECE
let blockColors = TwoFiveSix.getBlockColorsForId(1);
```

```
//GET BACKGROUND COLOR AS HEX FOR ONE PIECE
let bgColor = TwoFiveSix.getBackgroundColorForId(1);
```

```
//GET BORDER COLOR AS HEX FOR ONE PIECE
let borderColor = TwoFiveSix.getBorderColorForId(1);
```

```
//GET TOTALBLOCKS FOR ONE PIECE
let totalBlocks = TwoFiveSix.getTotalBlocksForId(1);
```
