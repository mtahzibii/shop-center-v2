import bcrypt from 'bcryptjs';

const users = [
 {
  name: 'Admin User',
  email: 'admin@example.com',
  password: bcrypt.hashSync('123456', 10),
  isAdmin: true,
 },
 {
  name: 'John Doe',
  email: 'john@example.com',
  password: bcrypt.hashSync('123456', 10),
 },
 {
  name: 'Mohammadreza Tahzibi',
  email: 'm.r.tahzibi@gmail.com',
  password: bcrypt.hashSync('q1', 10),
 },
];

export default users;
