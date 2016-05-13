import { getMuiTheme } from 'material-ui/styles'
import {
  yellow500, yellow700,
  indigoA200,
  grey100, grey300, grey500,
  white, lightBlack, darkBlack
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

const themeConfig = {
  palette: {
    primary1Color: yellow500,
    primary2Color: yellow700,
    primary3Color: lightBlack,
    accent1Color: indigoA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: yellow500
  },
  fontFamily: 'Roboto, "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif',
  avatar: {
    borderColor: null
  }
}

export default ({
  headers = {
    'user-agent': navigator.userAgent
  }
}) => getMuiTheme(
  {
    ...themeConfig,
    userAgent: headers['user-agent']
  }
)
