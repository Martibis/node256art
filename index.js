const fs = require("fs");
const path = require("path");

const TwoFiveSix = {
  getJsonFromId: getJsonFromId,
  getBase64JsonFromId: getBase64JsonFromId,
  getSeedFromFirstColorForId: getSeedFromFirstColorForId,
  getBlockColorsForId: getBlockColorsForId,
  getBackgroundColorForId: getBackgroundColorForId,
  getBorderColorForId: getBorderColorForId,
  getTotalBlocksForId: getTotalBlocksForId,
  hexToRgb: hexToRgb,
};

module.exports = TwoFiveSix;

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(color) {
  if (typeof color !== "string") {
    // throw error of input isn't typeof string
    throw new Error("color has to be type of `string`");
  } else if (color.substr(0, 1) === "#") {
    // or return if already rgb color
    return {
      hex: color,
      alpha: 1,
    };
  }

  /**
   * strip spaces
   */
  var strippedColor = color.replace(/\s+/g, "");

  /**
   * parse input
   */
  var digits =
    /(.*?)rgb(a)??\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([01]|1.0*|0??\.([0-9]{0,})))??\)/.exec(
      strippedColor
    );

  if (!digits) {
    // or throw error if input isn't a valid rgb(a) color
    throw new Error(
      "given color (" + color + ") isn't a valid rgb or rgba color"
    );
  }

  var red = parseInt(digits[3], 10);
  var green = parseInt(digits[4], 10);
  var blue = parseInt(digits[5], 10);

  var rgb = (blue | (green << 8) | (red << 16) | (1 << 24))
    .toString(16)
    .slice(1);

  return "#" + rgb.toString(16);
}

function getJsonFromId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  return json;
}

function getBase64JsonFromId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let buff = Buffer.from(rawJson);
  let base64data = buff.toString("base64");

  return base64data;
}

function getSeedFromFirstColorForId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  let seed = "";
  for (let i = 0; i < json.attributes.length; i++) {
    if ("trait_type" in json.attributes[i]) {
      if (json.attributes[i]["trait_type"] === "block-color") {
        let rgb = hexToRgb(json.attributes[i]["value"]);
        seed += rgb.r.toString() + rgb.g.toString() + rgb.b.toString();
        break;
      }
    }
  }
  return parseInt(seed);
}

function getBlockColorsForId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  let blockColors = [];
  for (let i = 0; i < json.attributes.length; i++) {
    if ("trait_type" in json.attributes[i]) {
      if (json.attributes[i]["trait_type"] === "block-color") {
        blockColors.push(json.attributes[i]["value"]);
      }
    }
  }
  return blockColors;
}

function getBackgroundColorForId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  let backgroundColor;
  for (let i = 0; i < json.attributes.length; i++) {
    if ("trait_type" in json.attributes[i]) {
      if (json.attributes[i]["trait_type"] === "Background") {
        let ogBackgroundColor = json.attributes[i]["value"];

        switch (ogBackgroundColor) {
          case "black":
            backgroundColor = "#000000";
            break;
          case "white":
            backgroundColor = "#ffffff";
            break;
          case "bronze":
            backgroundColor = "#cd7f32";
            break;
          case "silver":
            backgroundColor = "#c0c0c0";
            break;
          case "gold":
            backgroundColor = "#ffd700";
            break;
          default:
            backgroundColor = ogBackgroundColor;
        }

        if (backgroundColor.includes("random")) {
          let bgData = backgroundColor.split(" ");
          backgroundColor = rgbToHex(bgData[2]);
        }
      }
    }
  }
  return backgroundColor;
}

function getBorderColorForId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  let borderColor;
  for (let i = 0; i < json.attributes.length; i++) {
    if ("trait_type" in json.attributes[i]) {
      if (json.attributes[i]["trait_type"] === "Border") {
        let ogBorderColor = json.attributes[i]["value"];

        switch (ogBorderColor) {
          case "black":
            borderColor = "#000000";
            break;
          case "white":
            borderColor = "#ffffff";
            break;
          case "bronze":
            borderColor = "#cd7f32";
            break;
          case "silver":
            borderColor = "#c0c0c0";
            break;
          case "gold":
            borderColor = "#ffd700";
            break;
          default:
            borderColor = ogBorderColor;
        }

        if (borderColor.includes("random")) {
          let borderData = borderColor.split(" ");
          borderColor = rgbToHex(borderData[2]);
        }
      }
    }
  }
  return borderColor;
}

function getTotalBlocksForId(id) {
  let rawJson = fs.readFileSync(
    path.resolve(__dirname, "256art/" + id.toString() + ".json")
  );
  let json = JSON.parse(rawJson);
  let totalBlocks;
  for (let i = 0; i < json.attributes.length; i++) {
    if ("trait_type" in json.attributes[i]) {
      if (json.attributes[i]["trait_type"] === "TotalBlocks") {
        totalBlocks = json.attributes[i]["value"];
      }
    }
  }
  return totalBlocks;
}
