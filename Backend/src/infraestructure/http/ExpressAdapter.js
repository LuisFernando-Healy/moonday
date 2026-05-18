import express from "express";
import {asyncHandler} from "../middlewares/asyncHandler.js";
import cors from "cors";

import { userModel } from "../database/Models/MongoUserModel.js";
import bcrypt from "bcrypt";

export function ExpressAdapter(
  registerClientUseCase,
  deletedClientUseCase,
  getAllClientUseCase,
  getoneClientUseCase,
  updateClientCase,

  registerUserUseCase,
  loginUserUseCase
) {
  const app = express();
  app.use(cors({
    origin: "*",
  }))
  app.use(express.json());


app.post("/auth/register", asyncHandler(async (req, res) => {
    const result = await registerUserUseCase.execute(req.body);
    console.log("✅ BACKEND: Login exitoso. Generando token para:", result.user.username);
    res.status(201).json({ success: true, message: "Usuario registrado", data: result });
  }));

  app.post("/auth/login", asyncHandler(async (req, res) => {
    const result = await loginUserUseCase.execute(req.body);
    res.status(200).json({ success: true, message: "Login exitoso", data: result });
  }));



  // --- REGISTRAR ---
  app.post("/insert/:locality/clients", asyncHandler(  async (req, res) => {
    const locality = req.params.locality.toLowerCase();
    const clientData = req.body;
    const result = await registerClientUseCase.execute(clientData, locality);
    

    res.status(201).json({
      success: true,
      message: "cliente registrado",
      data: result,
    });
  }));

  // --- ELIMINAR ---
  app.delete("/delete/:locality/clients/:clienteId", asyncHandler(async (req, res) => {
    const { clienteId, locality } = req.params; 
    await deletedClientUseCase.execute(clienteId, locality.toLowerCase());
    res.status(200).json({
      success: true,
      message: "cliente eliminado",
    });
  }));

  // --- OBTENER TODOS ---
  app.get('/getAll/:locality/clients', asyncHandler(async (req, res) => {
    const locality = req.params.locality.toLowerCase(); 
    const result = await getAllClientUseCase.execute(locality);
    
    res.status(200).json({ 
      success: true,
      data: result
    });
  }));

  // --- OBTENER UNO ---
  app.get("/getOne/:locality/clients", asyncHandler(async (req, res) => {
    const { locality } = req.params;
    const { name } = req.query;

    if (!name) {
      return res.status(200).json({ success: true, data: [] });
    }

    const suggestions = await getoneClientUseCase.execute(
      name,
      locality.toLowerCase(),
    );

    res.status(200).json({
      success: true,
      message: "Sugerencias obtenidas",
      data: suggestions,
    });
  }));

  // --- ACTUALIZAR ---
  app.put("/update/:locality/clients/:clienteId", asyncHandler(async (req, res) => {
    const { clienteId, locality } = req.params;
    const clientdata = req.body;

   
    if (!clienteId || !locality || !clientdata || Object.keys(clientdata).length === 0) {
      throw new Error("Los datos son incorrectos o están vacíos");
    }

    const result = await updateClientCase.execute(
      clienteId,
      locality.toLowerCase(),
      clientdata,
    );

    res.status(200).json({
      success: true,
      message: "Se ha actualizado el cliente",
      data: result,
    });
  }));

  return app;
}