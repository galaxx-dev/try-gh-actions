import app from './src/app'

const server = app.listen(8000, () => {
  console.log(`This is running on port 8000`)
})

export default server
