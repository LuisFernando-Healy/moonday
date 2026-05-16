import http from "http";
import {Server} from 'socket.io';
import mongoose from "mongoose";
import dontenv from "dotenv";
import express from "express";

import { AuthService } from "./domain/services/authservice.js";
import { AuthController } from "./infraestructure/controllers/authcontoller.js";


//adaptadores y repositorios
import { MongoClientRepository } from './infraestructure/database/MongoClientRepository.js';
import { SocketService } from './infraestructure/RealTime/SocketService.js';
import { ExpressAdapter } from './infraestructure/http/ExpressAdapter.js';
//adaptadores de clientes register login
import { MongoUserRepository } from './infraestructure/database/MongoUserRepository.js';
import { RegisterUser } from './application/RegisterUser.js';
import { LoginUser } from './application/LoginUser.js';
import { UpdateUser } from "./application/UpdateUser.js";
import { GetUserProfile } from "./application/GetUserProfile.js";

//adaptadores de pagos
import { MongoPaymentRepository } from './infraestructure/database/MongoPaymentRepository.js';
import { RegisterPayment } from "./application/RegisterPayment.js";
import { GetPaymentsByMonth } from "./application/GetPaymentsByMonth.js";
import { GetAllPayments } from "./application/GetAllPayments.js";

//casos de uso
import { RegisterClient } from './application/RegisterClient.js';
import { DeleteClient } from './application/DeleteClient.js';
import { GetallClient } from "./application/GetallClient.js";
import { GetoneClient } from "./application/GetoneClient.js"; 
import { UpdateClient } from "./application/UpdateClient.js";
import { errorHandler } from "./infraestructure/middlewares/errorhandler.js";
import { promise} from "zod";



dontenv.config();

//conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conectado a mongoDB"))
.catch((error) => console.log("error al conectar a mongoDB",error));

const clientRepository = new MongoClientRepository();
const userRepository = new MongoUserRepository(); 

const httserver = http.createServer();
const io = new Server(httserver, {
    cors:{ origin: "*"}
});

const socketService = new SocketService(io);

// casos de uso usando -- el mongoclient repository
const registerUserUseCase = new RegisterUser(userRepository);
const loginUserUseCase = new LoginUser(userRepository);
const updateUserUseCase = new UpdateUser(userRepository);
const getUserProfileUseCase = new GetUserProfile(userRepository);

// 2. DESPUÉS instanciamos RegisterClient, pasándole el registerUserUseCase al final
const registerClientUseCase = new RegisterClient(clientRepository, socketService, registerUserUseCase);

// 3. El resto se queda igual...
const deletedClient = new DeleteClient(clientRepository,socketService);
const getAllClient = new GetallClient(clientRepository);
const getoneClient = new GetoneClient (clientRepository);
const updateClient = new UpdateClient (clientRepository,socketService);

const paymentRepository = new MongoPaymentRepository();
const registerPaymentUseCase = new RegisterPayment(paymentRepository);
const getPaymentsByMonthUseCase = new GetPaymentsByMonth(paymentRepository);
const getAllPaymentsUseCase = new GetAllPayments(paymentRepository);

const apps = ExpressAdapter(
    registerClientUseCase,
    deletedClient,
    getAllClient,
    getoneClient,
    updateClient,
    registerUserUseCase,
    loginUserUseCase,
    updateUserUseCase,
    getUserProfileUseCase,
    registerPaymentUseCase,
    getPaymentsByMonthUseCase,
    getAllPaymentsUseCase
);

httserver.on("request", apps);

io.on('connection', (socket) => {
    console.log('Dispositivos conectados', socket.id);

});

//si hay un error en Expressadapter lo maneja en el middleware con errorhandler y lanza el error dependiendo del tipo
apps.use(errorHandler);



const PORT = process.env.PORT ;
httserver.listen(PORT, () => {  
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

process.on('unhandledRejection', error => console.error("crashh evitado",error));
process.on('uncaughtException', (reason, promise) => console.error("crashh evitado",reason));

/*
    app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
    })); 

*/