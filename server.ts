import app from './src/app'

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`[SERVER] ⚡ Running on port ${PORT}`)
})

export default server
