function combineRGB(r, g, b) {
  return (r << 16) | (g << 8) | b;
}

module.exports = function (color) {

    // Convert to Number
    if (typeof color === "string") {

        // Module
        const tinycolor = require("tinycolor2");

        // Prepare Color
        try {

            // Get Color Manager
            color = tinycolor(color);

            // Validate
            if(color.isValid()){

                // Convert
                color = color.toRgb();
                color = combineRGB(color.r, color.g, color.b);

            }

            // NOpe
            else {
                color = 0;
            }
        
        } catch (err) {
            console.log(err);
            color = 0;
        }

    }

    // Fix Color Number
    if (typeof color !== "number" || isNaN(color) || color < 0) {
        color = 0;
    }

    // Return the Color Value
    return color;

};