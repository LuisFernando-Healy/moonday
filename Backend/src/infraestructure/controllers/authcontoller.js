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
      const result = await this.authService.login(username, password);

      res.status(200).json({
        success: true,
        message: "Login exitoso",
        data: result
      });

    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}