const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const createRoomID = () => {
  const length = 10
  let id = ''

  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * alphaNumeric.length)
    id += alphaNumeric[index]
  }

  return id
}

module.exports = {
  createRoomID
}