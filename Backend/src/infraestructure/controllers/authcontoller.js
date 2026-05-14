export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Faltan credenciales" });
      }

      // Ejecutamos el servicio de login
      const result = await this.authService.login(username, password);

      // Respondemos a React con el token
      res.status(200).json({
        success: true,
        message: "Login exitoso",
        data: result // Aquí viajan el token y los datos del usuario
      });

    } catch (error) {
      // Si el servicio tira un error (ej. contraseña incorrecta), respondemos con un 401
      res.status(401).json({ success: false, message: error.message });
    }
  }
}