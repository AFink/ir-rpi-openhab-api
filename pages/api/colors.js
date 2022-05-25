const {
    storeColor,
    getColor
} = require('../../libs/database');

const SECRET_KEY = process.env.SECRET_KEY;

//https://stackoverflow.com/a/5624139
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately/54024653#54024653
function HSVtoRGB(h, s = 1, v = 1) {
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return {
        hex: `#${componentToHex(Math.round(r * 255))}${componentToHex(Math.round(g * 255))}${componentToHex(Math.round(b * 255))}`,
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export default async function handler(req, res) {
    if (SECRET_KEY) {
        if (req.body.key !== SECRET_KEY) {
            return res.send(403, 'Permission denied')
        }
    }

    switch (req.method) {
        case 'POST':
            const {
                color
            } = req.body
            let convert = HSVtoRGB(color / 360);
            let store = await storeColor(convert.hex);
            res.status(200).json({
                success: true,
                id: store[0]
            })
            break;
        case 'GET':
            const {
                date = new Date()
            } = req.body;
            let c = await getColor(date);
            res.status(200).json({
                success: true,
                color: c
            })
            break;
        default:
            res.send(405, 'Method Not Allowed');
            break;
    }
}