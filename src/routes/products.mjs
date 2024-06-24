import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);

  if (req.cookies.token && req.cookies.token === "123456789")
    return res.send([
      { id: 1, name: "Laptop", price: 1000.0 },
      { id: 2, name: "Tablet", price: 280.99 },
      { id: 3, name: "Smartphone", price: 350.75 },
      { id: 4, name: "Monitor", price: 480.0 },
      { id: 5, name: "Mouse", price: 665.99 },
    ]);

  return res.sendStatus(403).send({ message: "Not authorized" });
});

export default router;
