const Usuario = require("../model/usuarioModel");

module.exports = class usuarioController{
  //Método Criar usuário
  static async UsuarioCreate(req,res){
  try{
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    const usuario = {
      nome: nome,
      email: email,
      senha: senha
    }
    await Usuario.create(usuario);
    res.json({message: "Usuário cadastrado com sucesso"});
  }catch(erro){
    res.status(500).json({error:"Erro ao criar usuário"});
  }
 }
  static async UsuarioListar(req, res) {
  try {
    // início da consulta
    console.log("Iniciando a consulta de usuários...");

    const usuarios = await Usuario.findAll();

    //quantidade de usuários encontrados
    console.log(`Encontrados ${usuarios.length} usuários:`);
    console.log(usuarios);

    // lista de usuários
    res.json(usuarios);
  } catch (error) {
    // erro
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ error: "Erro ao listar usuário" });
  }
}

  static async UsuarioUpdate(req,res){
    try{
      const id_usuario = req.params.id;
      let nome = req.body.nome;
      let email = req.body.email;
      let senha = req.body.senha;
      const usuario = {
        nome: nome,
        email: email,
        senha: senha
      };
      await Usuario.update(usuario, {where: {id_usuario:id_usuario}});
      res.json({message: "Cadastro atualizado com sucesso! Foram atualizadas as seguintes informações: ", dados: usuario});
    } catch(error) {
      res.status(500).json({error: "Erro ao atualizar as informações do usuário" })
    }
  }
  static async UsuarioDelete(req,res){
    try{
      const id_usuario = req.params.id;
      
      await Usuario.destroy({where:{id_usuario: id_usuario}});

      res.json({message: "Usuário excluído com sucesso"});      
    } catch(error){
      res.status(500).json({error: "Erro ao excluir usuário!"});
    }
  }
}