import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@geekshop.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'John kumar',
        email: 'John@geekshop.com',
        password: bcrypt.hashSync('12345', 10),        
    },
    {
        name: 'ram doe',
        email: 'ram@geekshop.com',
        password: bcrypt.hashSync('12345', 10),        
    },
]

export default users