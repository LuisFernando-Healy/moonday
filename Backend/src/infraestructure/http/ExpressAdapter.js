import express from "express";
import {asyncHandler} from "../middlewares/asyncHandler.js";
export function ExpressAdapter(
  registerClientUseCase,
  deletedClientUseCase,
  getAllClientUseCase,
  getoneClientUseCase,
  updateClientCase,
) {
  const app = express();
  app.use(express.json());

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
  app.delete("/delete/:locality/clients/:id", asyncHandler(async (req, res) => {
    const { id, locality } = req.params; 
    await deletedClientUseCase.execute(id, locality.toLowerCase());
    
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
  app.put("/update/:locality/clients/:name", asyncHandler(async (req, res) => {
    const { name, locality } = req.params;
    const clientdata = req.body;

   
    if (!name || !locality || !clientdata || Object.keys(clientdata).length === 0) {
      throw new Error("Los datos son incorrectos o están vacíos");
    }

    const result = await updateClientCase.execute(
      name,
      locality.toLowerCase(),
      clientdata,
    );

    res.status(200).json({
      success: true,
      message: "Se ha actualizado un usuario",
      data: result,
    });
  }));

  return app;
}