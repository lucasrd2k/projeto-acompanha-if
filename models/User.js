const Sequelize = require('sequelize');
const db = require('./db.js');

const User = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

// Métodos CRUD
User.criar = async function (dados) {
    try {
        const usuario = await User.create(dados);
        return usuario;
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        throw erro;
    }
};

User.buscarTodos = async function () {
    try {
        const usuarios = await User.findAll();
        return usuarios;
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
        throw erro;
    }
};

User.buscarPorId = async function (id) {
    try {
        const usuario = await User.findByPk(id);
        return usuario;
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        throw erro;
    }
};

User.buscarPorEmail = async function (email) {
    try {
        const usuario = await User.findOne({ where: { email } });
        return usuario;
    } catch (erro) {
        console.error('Erro ao buscar usuário por e-mail:', erro);
        throw erro;
    }
};

User.atualizar = async function (id, campos) {
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await usuario.update(campos);
        return usuario;
    } catch (erro) {
        console.error('Erro ao atualizar usuário:', erro);
        throw erro;
    }
};

User.deletar = async function (id) {
    try {
        const usuario = await User.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await usuario.destroy();
        return true;
    } catch (erro) {
        console.error('Erro ao deletar usuário:', erro);
        throw erro;
    }
};

// Criar a tabela
User.sync();
// Verificar se há alguma diferença na tabela, realiza a alteração
// User.sync({ alter: true });

module.exports = User;