"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const USERS = [
    { id: '01', userName: 'admin', password: '123456' },

];
const PRODUCTS = [
    { pid: '01', pName: '奶茶', pNumber: '1000' },

];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
app.post('/login', function (req, resp) {
    console.log(req.body);
    const userName = req.body.userName;
    const password = req.body.password;

    for (let user of USERS) {
        if (user.userName === userName && user.password === password) {
            resp.send({ succ: true })
        }
        else {
            resp.send({ succ: false })
        }
        resp.end();
    }
})
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});
app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.post('/user', function (req, resp) {

    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
})

// 修改用户 
app.put('/user', function (req, resp) {
    // json 
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户' });
    } resp.end();
});



app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true; break;
        } index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});



//产品
app.get('/products', function (req, resp) {
    resp.send(PRODUCTS);
    resp.end();
});
app.get('/products/:pid', function (req, resp) {
    console.log(req.params);
    const pid = req.params.pid;
    for (let product of PRODUCTS) {
        if (product.pid === pid) {
            resp.send([product]);
            break;
        }
    }
    resp.end();
});

app.post('/product', function (req, resp) {

    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
})

// 修改用户 
app.put('/product', function (req, resp) {
    // json 
    let founded = false;
    for (let product of PRODUCTS) {
        if (product.pid === req.body.pid) {
            product.pName = req.body.pName;
            product.pNumber= req.body.pNumber;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户' });
    } resp.end();
});



app.delete('/product/:pid', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let product of PRODUCTS) {
        if (product.pid === req.params.pid) {
            PRODUCTS.splice(index, 1);
            founded = true; break;
        } index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});