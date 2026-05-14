import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {


console.error(`[${new Date().toISOString()}] Error en ${req.method} ${req.url}: ${err.message}`);


  if (err instanceof ZodError) {
    return res.status(400).json({
      succes: false,
      message: "Error de la validacion de datos",

      errors: err.issues?.map((e) => ({
        campo: e.path.join('.'),
        mensaje: e.message,
      })),
    });
  }


  const msg = err.message || "";
  const isBusinessError = ["obligatoria", "encontrado", "error"].some(word => 
    msg.toLowerCase().includes(word.toLowerCase())
  );

  if (isBusinessError) {
    return res.status(400).json({
      success: false,
      message: msg
    });
  }

    console.error(`[server error] ${new Date().toISOString()}:`, err.stack);
    return res.status(500).json({
          succes: false,
          message: "Error interno del servidor",
    })

};
