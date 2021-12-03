import app from './src/app'

const PORT = 8000

const server = app.listen(PORT, () => {
  console.log(`[SERVER] ⚡ Running on port ${PORT}`)
})

export default server
