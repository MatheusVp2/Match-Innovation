// Inportação das Bibliotecas e Modulos
const express = require('express')
const routes = express.Router()

// Simples middleware como se fosse o token de autenticação, utilizando apenas o usuario em questao
const authRouters = require('../middlewares/authRouters')

// Controllers das Rotas
const UsuarioController = require('../controllers/UsuarioController')
const FrontController = require('../controllers/FrontController')
const MatchController = require('../controllers/MatchController')
const Email_Chat_Controller = require('../controllers/Email_Chat_Controller')

// Rota de Cadastro e Login do Usuario

// => Requisição para logar o usuario como se fosse o retorno de um JWT, porem simples retornando apenas o proprio usuario
routes.get("/usuario", UsuarioController.logarUsuario)
// => Requisição para o cadastro das informaçoes do usuario
routes.post("/usuario", UsuarioController.cadastrarUsuario)
// => Requisição para atualizaçao das informaçoes do usuario
routes.put("/usuario", authRouters, UsuarioController.atualizaUsuario)

// Rotas para Alimentar o Front

// => Requisição para retorno de informaçoes te todos os usuarios que não tiveram interação com o usuario logado
routes.get("/front/usuario", authRouters, FrontController.getListUsers)
// => Requisição para retorno de todos os usuario matchs com o usuario logado
routes.get("/front/matchs", authRouters, FrontController.getMatchs)

// Rota para Like e Deslike

// => Requisição para dar like no usuario assim possibilitando o match
routes.post("/like/:user", authRouters, MatchController.like_user)
// => Requisição para dar deslike no usuario assim não possibilitando o match
routes.post("/deslike/:user", authRouters, MatchController.deslike_user)

// Rotas de controle de email de chat

// => Requisição pedir permissao para o Nit
routes.post("/email/auth", authRouters, Email_Chat_Controller.enviaEmailNit)
// => Requisição para liberação do chat ou não peo Nit
routes.get("/chat/:token/:resp", Email_Chat_Controller.autorizaNit)

// Exportando rotas
module.exports = routes