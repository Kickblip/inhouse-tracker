import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string
const options = {}

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

class Singleton {
  private static _instance: Singleton
  private client: MongoClient
  private clientPromise: Promise<MongoClient>
  private constructor() {
    this.client = new MongoClient(uri, options)
    this.clientPromise = this.client.connect()
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton()
    }
    return this._instance.clientPromise
  }
}
const clientPromise = Singleton.instance

// export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
