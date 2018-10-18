import express from "express";
import fetch, { Response as FetchResponse } from "node-fetch";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: any) => {
    const apiResponse: FetchResponse = await fetch("http://localhost:3000/data/top.json");
    const data: any = await apiResponse.json();
    res.render("index", data);
});

export default router;
