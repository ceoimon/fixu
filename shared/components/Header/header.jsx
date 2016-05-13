import React from 'react'
import { Link } from 'react-router'
import { colors } from 'material-ui/styles'
import TextField from 'material-ui/TextField/TextField'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'
import IconButton from 'material-ui/IconButton/IconButton'
import styles from './header.css'

function Header (props) {
  const {
    container,
      content,
        content_left,
          logo,
            logo_img,
            logo_text,
          search,
            search_text_field,
            search_button,
              search_button_icon,
        content_right,
          login,
    offset
  } = styles

  const logoElement = (
    <Link to='/' className={logo} >
      <img src='/img/Logo.svg' alt='' className={logo_img} />
      <span className={logo_text} >
        IXU
      </span>
    </Link>
  )

  const searchIconElement = (
    <IconButton
      className={search_button}
      style={{
        width: '50px',
        height: '50px',
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: '13px'
      }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' className={search_button_icon}>
        <path d='M 21 3 C 11.623004 3 4 10.623004 4 20 C 4 29.376996 11.623004 37 21 37 C 24.709505 37 28.140329 35.803849 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460556 28.087561 38 24.221313 38 20 C 38 10.623004 30.376996 3 21 3 z M 21 5 C 29.296116 5 36 11.703884 36 20 C 36 28.296116 29.296116 35 21 35 C 12.703884 35 6 28.296116 6 20 C 6 11.703884 12.703884 5 21 5 z'></path>
      </svg>
    </IconButton>
  )

  const searchElement = (
    <div className={search} >
      <TextField
        id='home-search'
        hintText='Search about Title, Genre, IMDb ID'
        className={search_text_field}
        underlineStyle={{
          width: 'calc(100% - 13px)'
        }}
        />
        {searchIconElement}
    </div>
  )

  const loginElement = (
    <div className={login} >
      <RaisedButton label='Login' secondary={true} />
    </div>
  )

  return (
    <header>
      <header className={container} >
        <div className={content} >
          <div className={content_left} >
            {logoElement}
            {searchElement}
          </div>
          <div className={content_right} >
            {loginElement}
          </div>
        </div>
      </header>
      <header className={offset}></header>
    </header>
  )
}

export default Header
