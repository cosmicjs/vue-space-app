function token() {
  const Cosmic = require('cosmicjs')() // empty init
  Cosmic.authenticate({
    email: 'abey.joy21@gmail.com',
    password: 'cCR7_B54*'
  }).then(data => {
    console.log(data.message)
    return data.token
  }).catch(err => {
    console.log(err)
  })
}

export {token}
