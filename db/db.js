const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false
})


mongoose.connection.on('connected', () => {
  console.log(`connected to database`);
})

mongoose.connection.on('disconnected', () => {
  console.log(`disconnected from database`);
})

mongoose.connection.on('error', (err) => {
  console.log(`error with database connection:`);
  console.log(err)
})
