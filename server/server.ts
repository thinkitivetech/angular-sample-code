const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
var employees=[];
var managers=[];
var isLoadedData=false;
server.use(middlewares);
server.use(jsonServer.bodyParser);

// login
server.post('/login', (req, res, next) => {
  const user = managers.filter(
    (m) => m.email === req.body.email && m.password === req.body.password
  )[0];
  if (user) {
    res.status(200).send({ responsePayload: { message: 'Login successful.', data: user } });
  } else {
    res.status(401).send({ responsePayload: { message: 'Incorrect email or password' } });
  }
});

// sign up
server.post('/signup', (req, res) => {
  const manager = managers.filter((m) => m.email === req.body.email)[0];
  if (manager === undefined || manager === null) {
    res.status(200).send({ responsePayload: req.body });
    db.managers.push(req.body);
  } else {
    res.status(404).send({ responsePayload: { message: 'Manager with same email already exists' } });
  }
});

// get employee list
server.get('/employees', (req, res) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
   
    res.send({ responsePayload: employees });
  } else {
    res.sendStatus(401);
  }
});

// save employee
server.post('/employee', (req, res) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    const employee = req.body;
    employees.push(employee);
    db.employees.push(employees);
    res.status(200).send({ responsePayload: employees });
  } else {
    res.sendStatus(401);
  }
});

// update employee
server.put('/employee/:id', (req, res) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    
    let employeeExit = false;
    let employeeFoundAtIndex = -1
    employees.map((e, i) => {
      if (e.id == req.body.id) {
        employeeExit = true;
        employeeFoundAtIndex = i;
        e = req.body;
      }
    });
    if (employeeExit) {
      employees[employeeFoundAtIndex] = req.body;
      db.employees.push(employees);
      res.status(200).send({ responsePayload: employees });
    } else {
      res.status(404).send({ responsePayload: { message: 'Employee not found' } });
    }
  } else {
    res.sendStatus(401);
  }
});

// delete employee
server.delete('/employee/:id', (req, res) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    
    let filteredEmployeeData = employees.filter((e) => { return e.id != req.params['id']; });
    db.employees.push(filteredEmployeeData);
    res.send({ responsePayload: filteredEmployeeData });
  } else {
    res.sendStatus(401);
  }
});
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
 if(!isLoadedData){
  managers = readManagers();
  employees = readEmployees();
  isLoadedData=!isLoadedData;
}
});

function isAuthorized(req) {
  //check awt token
  return true;
}

function readEmployees() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const employees = JSON.parse(dbRaw).employees;
  return employees;
}

function readManagers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const managers = JSON.parse(dbRaw).managers;
  return managers;
}
