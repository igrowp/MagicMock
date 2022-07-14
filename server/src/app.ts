import Koa from "koa";
import bodyparser from "koa-bodyparser";
import { createConnection } from "typeorm";
import path from "path";
import jwt from "koa-jwt";
import { unprotectedRouter, protectedRouter } from "./routes/index";
import { logger as customLogger } from "./logger";
import "reflect-metadata";
import { JWT_SECRET } from "./utils/constants";

createConnection()
  .then(() => {
    // 初始化 koa 实例
    const app = new Koa();

    // middlewares
    app.use(
      bodyparser({
        enableTypes: ["json", "form", "text"],
      })
    );
    let staticPath = path.join(__dirname, "../public"); // 静态地址
    app.use(require("koa-static")(staticPath));

    // logger
    app.use(customLogger());

    // routes
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
    // 注册鉴权JWT中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: "GET" }));
    // 需要JWT才能访问的接口
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // error-handling
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });

    app.listen(8700);
  })
  .catch((err: string) => console.log("TypeORM connection error:", err));
