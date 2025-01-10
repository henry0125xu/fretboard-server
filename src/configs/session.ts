import { Store } from "express-session";
import expressSession from "express-session";

const TTL = 3600;
const SECRET = process.env.SESSION_SECRET || "__my_secret_pg_13__";

const session = (store: Store) =>
  expressSession({
    store: store,
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * TTL,
      secure: false,
    },
  });

export default session;
