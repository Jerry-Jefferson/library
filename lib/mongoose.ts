import mongoose from "mongoose";

const DATABASE_URI = process.env.DATABASE_URI!;

if (!DATABASE_URI) {
  throw new Error("❌ DATABASE_URI не задан");
}

declare global {
  var mongooseConn:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseConn || {
  conn: null,
  promise: null,
};

global.mongooseConn = cached;

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
