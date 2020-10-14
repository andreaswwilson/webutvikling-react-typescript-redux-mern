import { Router } from "express";

const router = Router();

router.get("/", async (rec, res) => {
  res.json({ foo: "bar" });
});

export default router;
