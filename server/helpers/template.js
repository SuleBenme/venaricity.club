import React from 'react'

const bodyStyle = {
  width: '100%',
  margin: 0,
  padding: 0,
  WebkitTextSizeAdjust: '100%',
  MsTextSizeAdjust: '100%',
}
const footerContainer = {
  backgroundColor: '#ebe6df',
  padding: '1.25rem',
}
const social = {
  textAlign: 'center',
  width: '100%'
}
const icon = {
  marginRight: '5px'
}
const background = {
  position: 'absolute',
  top: 0,
  height: '50px',
  width: '100%',
  zIndex: '-1',
  backgroundColor: '#006cc4',
}

const wrapper = {
  position: 'relative',
  zIndex: 0,
  maxWidth: '600px',
  margin: 'auto',
  borderRadius: '2px',
  border: '1px solid gray',
  backgroundColor: '#fff'
}

const container = {
  padding: '1rem'
}

const titleStyle =  {
  textAlign: 'center',
}

const logo = {
  margin: 'auto',
  display: 'block',
  width: 100,
}


const Layout = (title, content, image) => (
  <html lang="fr">
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Venari City</title>
  </head>
  <body style={bodyStyle}>
  <div style={background}></div>
  <div style={wrapper}>
    <div style={container}>
        <img style={logo}  src="https://res.cloudinary.com/difnpzowu/image/upload/v1612273632/Venari-City-Logo-2.0.png_1132_1460_ko9blx.png"></img>
        <h1 style={titleStyle}>{title}</h1>
        {image && <img style={{width: '100%'}} src={image}></img>}
        {!Array.isArray(content) && <p>{content}</p>}
        {Array.isArray(content) && content.map((value, index) => {
          return(
          <span key={index} style={{display: 'table-row'}}>
            <p style={{display: 'table-cell', textTransform: 'uppercase'}}> {value[0]} :</p>
            <p> {value[1]} </p>
          </span>)
        })}
    </div>
    <div style={footerContainer}>
      <div style={social}>
        <a href='https://www.facebook.com/VenariCity' target="_blank"><img alt="Facebook page" src="https://res.cloudinary.com/difnpzowu/image/upload/v1607557333/001-facebook_ps52bp.png" style={icon}/></a>
        <a href='https://www.youtube.com/channel/UCaeqGRZcLoQDHi1jN55hWHA' target="_blank"><img alt="Youtube channel" src="https://res.cloudinary.com/difnpzowu/image/upload/v1607557333/002-youtube_tl5rqs.png"/></a>
      </div>
    </div>
  </div>
  </body>
  </html>
)


export default Layout