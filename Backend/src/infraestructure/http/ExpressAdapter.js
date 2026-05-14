import express from "express";
import {asyncHandler} from "../middlewares/asyncHandler.js";
import cors from "cors";

import { userModel } from "../database/Models/user.js";
import bcrypt from "bcrypt";

export function ExpressAdapter(
  registerClientUseCase,
  deletedClientUseCase,
  getAllClientUseCase,
  getoneClientUseCase,
  updateClientCase,
  authController
) {
  const app = express();
  app.use(cors({
    origin: "*",
  }))
  app.use(express.json());

  //ruta temporal
  app.post("/setup-admin", asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const adminExists = await userModel.findOne({ username });

    if (adminExists) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await userModel.create({
      username: username,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({ success: true, message: "Admin creado exitosamente", data: { username: newAdmin.username, role: newAdmin.role } });
  }));

  //Ruta de login
  app.post("/login", (req, res) => {
    authController.login(req, res)
  });

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