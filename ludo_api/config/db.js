import mysql from 'mysql'

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ludo"
});

const connectDB = async () => {
  return await new Promise((resolve, reject) => {
    if (conn.state === 'disconnected') {
      conn.connect(function (err) {
        if (err) resolve({error: err})
        resolve({status: 'connected'})
      })
    }
    resolve({status: 'connected'})
  })
}
 
export { conn, connectDB } 