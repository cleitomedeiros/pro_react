const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    // Registrar novo usuário
    register: async (req, res) => {
        try {
            const { name, email, password, phone } = req.body;

            // Validar campos obrigatórios
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
            }

            // Validar se usuário já existe
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Criar usuário
            const userId = await User.create({
                name,
                email,
                password: hashedPassword,
                phone
            });

            // Gerar token JWT
            const token = jwt.sign(
                { userId, email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE || '7d' }
            );

            res.status(201).json({
                message: 'Usuário criado com sucesso',
                token,
                user: {
                    id: userId,
                    name,
                    email,
                    phone
                }
            });
        } catch (error) {
            console.error('Erro no registro:', error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    },

    // Login de usuário
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validar campos obrigatórios
            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios' });
            }

            // Buscar usuário
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Email ou senha incorretos' });
            }

            // Validar senha
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Email ou senha incorretos' });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE || '7d' }
            );

            res.json({
                message: 'Login realizado com sucesso',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({ message: 'Erro ao fazer login' });
        }
    },

    // Obter perfil do usuário
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error('Erro no perfil:', error);
            res.status(500).json({ message: 'Erro ao buscar perfil' });
        }
    }
};

module.exports = authController;