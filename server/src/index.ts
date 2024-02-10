import express, { Request, Response, response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send(`"/" endpoint.`);
});

app.listen(5000);
