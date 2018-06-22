// CSS Color Names
// Compiled by @bobspace.
//
// A javascript array containing all of the color names listed in the CSS Spec.
// The full list can be found here: http://www.w3schools.com/cssref/css_colornames.asp
// Use it as you please, 'cuz you can't, like, own a color, man.

const CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

function isNumber(n) {
    return !isNaN(n) && isFinite(n);
}

function dec2hex(d){
    if(d>15) {
        return d.toString(16);
    }
    else {
        return "0"+d.toString(16);
    }
}

function rgb(r, g, b){
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    return "#"+dec2hex(r) + dec2hex(g) + dec2hex(b);
}

function nodeToJSObject (node) {
    const nodeObject = {};
    nodeObject.tagName = node.tagName;
    for (let attributeKey of Array.prototype.slice.call(node.attributes)) {
        nodeObject[attributeKey.name] = node.getAttribute(attributeKey.name);
    }
    if (node.childNodes !== null && node.childNodes.length > 0){
        nodeObject.childNodes = [];
        for (let childNode of node.childNodes) {
            nodeObject.childNodes.push(nodeToJSObject(childNode));
        }
    } else {
        nodeObject.childNodes = null;
    }
    return nodeObject;
}

function JSObjectToNode (nodeObject) {
    const node = document.createElement(nodeObject.tagName);
    for (let attributeKey in nodeObject) {
        node.setAttribute(attributeKey, nodeObject[attributeKey]);
    }
    if (nodeObject.childNodes !== null){
        for (let childNode of nodeObject.childNodes) {
            node.appendChild(JSObjectToNode(childNode));
        }
    }
    return node;
}