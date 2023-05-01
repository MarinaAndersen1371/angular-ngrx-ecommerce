import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Admin",
    username: "Admin",
    email: "admin@web.de",
    phone: "490000000000",
    purpose: "Other",
    birthday: "1971-01-01",
    gender: "Male",
    password: bcrypt.hashSync("123456", 10),
    isadmin: true,
    cart: [],
  },
  {
    firstName: "Manager",
    username: "Manager",
    email: "manager@web.de",
    phone: "490000000001",
    purpose: "Other",
    birthday: "1971-02-01",
    gender: "Male",
    password: bcrypt.hashSync("123456", 10),
    isManager: true,
    cart: [],
  },
  {
    firstName: "Klava",
    username: "Novizki",
    email: "klava@web.de",
    phone: "8598526987456",
    birthday: "2000-02-02",
    gender: "Female",
    purpose: "Other",
    password: bcrypt.hashSync("123456", 10),
    cart: [],
  },
  {
    username: "Johnson",
    firstName: "John",
    email: "john@web.de",
    phone: "49589687965",
    birthday: "1996-06-06",
    gender: "Male",
    purpose: "Other",
    password: bcrypt.hashSync("123456", 10),
    cart: [],
  },
];

export default users;
