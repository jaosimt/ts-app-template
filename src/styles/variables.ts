export const $codeFontFamily                 = `source-code-pro, Menlo, Monaco, Consolas, "Courier New", "Roboto Mono", monospace`;

export const $textColor                      = `#171515`;
export const $textColorDark                  = `#f3f2f2`;

export const $secondaryTextColor             = `#8b7e7e`;
export const $secondaryTextColorDark         = `#b4adad`;

export const $baseColor                      = `#f3f2f2`;
export const $baseColorDark                  = `#171515`;

export const $secondaryBaseColor             = `#dddada`;
export const $secondaryBaseColorDark         = `#2f2b2b`;

export const $accentColor                    = `rgb(255, 101, 0)`;
export const $accentColorDark                = `rgb(155, 57, 34)`;

export const $primaryColor                   = `rgb(0, 153, 255)`;
export const $primaryColorDark               = `rgb(34, 133, 155)`;

export const $secondaryColor                 = `#ffe500`;
export const $secondaryColorDark             = `#ffc300`;
export const $inputTextColor                 = `#252a2b`;
export const $errorColor                     = `#1c2127`;

export const $secondaryBackgroundColor       = `#f8f5fa`;
export const $secondaryBackgroundColorDark   = `#34283b`;

export const $buttonPrimaryTextColor         = `#ffffff`;
export const $buttonPrimaryDisabledTextColor = `rgba(255, 255, 255, 0.49)`;

export const $buttonDefaultColor             = `#ffffff`;
export const $buttonDefaultDisabledTextColor = `#beb7b7`;

export const $alternatingBackgroundOdd       = `rgba(150, 57, 153, 0.07)`;
export const $alternatingBackgroundEven      = `rgba(97, 218, 251, 0.07)`;
export const $gridBorderColor                = `rgb(212, 167, 212)`;

export const $borderColorDefault             = `#e9e9e9`;
export const $backgroundColorDefault         = `#fefcff`;

/* ******* BELOW IS DEPENDENT ON THE ACCENT COLOR ******* */
export const $buttonPrimaryColor             = `${$accentColor}`;
export const $buttonPrimaryHoverColor        = `rgba(${($buttonPrimaryColor.match(/(\d+[, ]*){3}/)||[])[0]}, 0.3)`;
export const $buttonPrimaryBorderColor       = `${$buttonPrimaryHoverColor}`;
export const $buttonDefaultHoverColor        = `${$buttonPrimaryHoverColor}`;
export const $buttonDefaultTextColor         = `${$buttonPrimaryColor}`;
export const $buttonDefaultBorderColor       = `${$buttonDefaultTextColor}`;
