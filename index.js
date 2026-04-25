const app = require('./app')
const config = require('./src/config')
const PORT = config.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})