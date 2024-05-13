const { default: mongoose } = require("mongoose")

// manage the connection to the database by checking, creating, and updating 
const connection = {}

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection")
      return // if already connected, use the existing connection
    }
    // if no connection, create a new connection to the database, and update the connection object
    const db = await mongoose.connect(process.env.MONGO)
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log(error)
    throw new Error("Failed to connect to the database")
  }
}
