"use server"

import mongoose from "mongoose"

const connection: { isConnected?: number } = {}

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected")
    return
  }
  const db = await mongoose.connect(process.env.MONGODB_URI!)

  connection.isConnected = db.connections[0].readyState
  console.log("Connected")
}

export default dbConnect
