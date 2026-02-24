/**
 * hsl(hue, saturation, lightness)
 * hsla(hue, saturation, lightness, alpha)
 *
 * HUE is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, and 240 is blue.
 * SATURATION is a percentage value. 0% means a shade of gray, and 100% is the full color.
 * LIGHTNESS is also a percentage value. 0% is black, and 100% is white.
 * ALPHA is a number between 0.0 (fully transparent) and 1.0 (not transparent at all):
 */
export type HSLString = `hsl(${number},${number}%,${number}%)` | `hsla(${number},${number}%,${number}%,${number})`;
export type RGBString =
    `rgb(${number},${number},${number})`
    | `rgba(${number},${number},${number},${number})`
    | '';
export type HEXString = `#${string}`;

export type CSSUnit = number | `${number}${string}`;

export type CSSColors = HSLString|RGBString|HEXString|'transparent'|'aliceblue'|'antiquewhite'|'aqua'|'aquamarine'|'azure'|'beige'|'bisque'|'black'|'blanchedalmond'|'blue'|'blueviolet'|'brown'|'burlywood'|'cadetblue'|'chartreuse'|'chocolate'|'coral'|'cornflowerblue'|'cornsilk'|'crimson'|'cyan'|'darkblue'|'darkcyan'|'darkgoldenrod'|'darkgray'|'darkgrey'|'darkgreen'|'darkkhaki'|'darkmagenta'|'darkolivegreen'|'darkorange'|'darkorchid'|'darkred'|'darksalmon'|'darkseagreen'|'darkslateblue'|'darkslategray'|'darkslategrey'|'darkturquoise'|'darkviolet'|'deeppink'|'deepskyblue'|'dimgray'|'dimgrey'|'dodgerblue'|'firebrick'|'floralwhite'|'forestgreen'|'fuchsia'|'gainsboro'|'ghostwhite'|'gold'|'goldenrod'|'gray'|'grey'|'green'|'greenyellow'|'honeydew'|'hotpink'|'indianred'|'indigo'|'ivory'|'khaki'|'lavender'|'lavenderblush'|'lawngreen'|'lemonchiffon'|'lightblue'|'lightcoral'|'lightcyan'|'lightgoldenrodyellow'|'lightgray'|'lightgrey'|'lightgreen'|'lightpink'|'lightsalmon'|'lightseagreen'|'lightskyblue'|'lightslategray'|'lightslategrey'|'lightsteelblue'|'lightyellow'|'lime'|'limegreen'|'linen'|'magenta'|'maroon'|'mediumaquamarine'|'mediumblue'|'mediumorchid'|'mediumpurple'|'mediumseagreen'|'mediumslateblue'|'mediumspringgreen'|'mediumturquoise'|'mediumvioletred'|'midnightblue'|'mintcream'|'mistyrose'|'moccasin'|'navajowhite'|'navy'|'oldlace'|'olive'|'olivedrab'|'orange'|'orangered'|'orchid'|'palegoldenrod'|'palegreen'|'paleturquoise'|'palevioletred'|'papayawhip'|'peachpuff'|'peru'|'pink'|'plum'|'powderblue'|'purple'|'red'|'rosybrown'|'royalblue'|'saddlebrown'|'salmon'|'sandybrown'|'seagreen'|'seashell'|'sienna'|'silver'|'skyblue'|'slateblue'|'slategray'|'slategrey'|'snow'|'springgreen'|'steelblue'|'tan'|'teal'|'thistle'|'tomato'|'turquoise'|'violet'|'wheat'|'white'|'whitesmoke'|'yellow'|'yellowgreen';
export type LabelPositionType = 'top-left'|'top-center'|'top-right'|'bottom-left'|'bottom-center'|'bottom-right';