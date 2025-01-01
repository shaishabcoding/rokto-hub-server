import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: +(process.env.PORT || 3000),
  db_url: process.env.DB_URL || "",
  node_env: process.env.NODE_ENV || "development",
  bcrypt_salt_rounds: +(process.env.BCRYPT_SALT_ROUNDS || 0),
  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || "",
  jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET || "",
  jwt_access_token_expire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "1d",
  jwt_refresh_token_expire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "15d",
  mail: process.env.MAIL || "",
  mail_pass: process.env.MAIL_PASS || "",
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK || "",
  admin_email: process.env.ADMIN_EMAIL || "",
  admin_pass: process.env.ADMIN_PASS || "",
  stripe_sk_key: process.env.STRIPE_SK_KEY || "",
};
