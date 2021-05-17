


function test_1() {
	const http = require('http');
	const https = require('https');
	const Koa = require('koa');
	const app = new Koa();
	http.createServer(app.callback()).listen(3000);
	https.createServer(app.callback()).listen(3001);
}

function test_2() {
	const Koa = require('koa');
	const app = new Koa();

// logger
	
	app.use(async (ctx, next) => {
		await next();
		const rt = ctx.response.get('X-Response-Time');
		console.log(`${ctx.method} ${ctx.url} - ${rt}`);
	});

// x-response-time
	
	app.use(async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;
		ctx.set('X-Response-Time', `${ms}ms`);
	});

// response
	
	app.use(async ctx => {
		ctx.body = 'Hello World';
	});
	
	app.listen(3000);
	
}

function test_3() {
	'use strict';
	
	const Koa = require('koa');
	const Router = require('@koa/router');
	
	const app = new Koa();
	const router = new Router();
	
	router.get('koa-example', '/', (ctx) => {
		ctx.body = 'Hello World';
	});
	
	app
		.use(router.routes())
		.use(router.allowedMethods());
	
	app.listen(1234);
}

function test_4() {
	'use strict';
	
	const Koa = require('koa');
	const Router = require('@koa/router');
	const render = require('koa-ejs');
	const path = require('path');
	
	const app = new Koa();
	const router = new Router();
	
	render(app, {
		root: path.join(__dirname, 'views'),
		layout: 'index',
		viewExt: 'html',
		cache: false,
		debug: true
	});
	
	router.get('koa-example', '/', (ctx) => {
		ctx.body = 'Hello World';
	});
	
	app
		.use(router.routes())
		.use(router.allowedMethods());
	
	app.listen(1234);
}


function test_5() {
	const _ = require('koa-route');
	const Koa = require('koa');
	const app = new Koa();
	
	const db = {
		tobi: { name: 'tobi', species: 'ferret' },
		loki: { name: 'loki', species: 'ferret' },
		jane: { name: 'jane', species: 'ferret' }
	};
	
	const pets = {
		list: (ctx) => {
			const names = Object.keys(db);
			ctx.body = 'pets: ' + names.join(', ');
		},
		
		show: (ctx, name) => {
			const pet = db[name];
			if (!pet) return ctx.throw('cannot find that pet', 404);
			ctx.body = pet.name + ' is a ' + pet.species;
		}
	};
	
	app.use(_.get('/pets', pets.list));
	app.use(_.get('/pets/:name', pets.show));
	
	app.listen(3000);
	console.log('listening on port 3000');
}

function test_6() {
	const Koa = require('koa');
	const app = new Koa();
	const router = require('koa-router')();
	const koaBody = require('koa-body');
	
	router.post('/users', koaBody(),
		(ctx) => {
			console.log(ctx.request.body);
			// => POST body
			ctx.body = JSON.stringify(ctx.request.body);
		}
	);
	
	app.use(router.routes());
	
	app.listen(3000);
	console.log('curl -i http://localhost:3000/users -d "name=test"');
}

function test_7() {
	const fs = require('fs')
	const Koa = require('koa')
	const morgan = require('koa-morgan')

// create a write stream (in append mode)
	const accessLogStream = fs.createWriteStream(__dirname + '/access.log',
		{ flags: 'a' })
	const app = new Koa()

// setup the logger
	app.use(morgan('combined', { stream: accessLogStream }))
	
	app.use((ctx) => {
		ctx.body = 'hello, world!'
	})
	
	app.listen(2333)
}

function test_8() {
	// require packages
	const Koa = require('koa');
	const router = require('koa-router')();
	const mount = require('koa-mount');
// create an instance of the Koa object
	const app = new Koa();
// mount the route
	app.use(mount(require('./router/car.js')));
	app.use(router.routes()); // route middleware
	if(require.main === module) {
		app.listen(3000); // default
	}
	
	function route() {
		const Koa = require('koa');
		const router = require('koa-router')();
		const app = new Koa();
// a simple car object that we can serve
		const car = {
			make: 'Honda',
			year: '2012',
			model: 'Civic',
		};
// Route to handle GET request
		router.get('/car', async (ctx, next) => {
			ctx.body = car;
			await next();
		});
		app.use(router.routes()); // route middleware
		module.exports = app;
	}
}

function test_10() {
	const session = require('koa-session');
	const Koa = require('koa');
	const app = new Koa();
	
	app.keys = ['some secret hurr'];
	
	const CONFIG = {
		key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		autoCommit: true, /** (boolean) automatically commit headers (default true) */
		overwrite: true, /** (boolean) can overwrite or not (default true) */
		httpOnly: true, /** (boolean) httpOnly or not (default true) */
		signed: true, /** (boolean) signed or not (default true) */
		rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
		renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
		secure: true, /** (boolean) secure cookie*/
		sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
	};
	
	app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));
	
	app.use(ctx => {
		// ignore favicon
		if (ctx.path === '/favicon.ico') return;
		
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
		ctx.body = n + ' views';
	});
	
	app.listen(3000);
	console.log('listening on port 3000');
}

function test_11() {
	
	const Koa = require('koa');
	const app = module.exports = new Koa();

// look ma, error propagation!
	
	app.use(async function(ctx, next) {
		try {
			await next();
		} catch (err) {
			// some errors will have .status
			// however this is not a guarantee
			ctx.status = err.status || 500;
			ctx.type = 'html';
			ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>';
			
			// since we handled this manually we'll
			// want to delegate to the regular app
			// level error handling as well so that
			// centralized still functions correctly.
			ctx.app.emit('error', err, ctx);
		}
	});

// response
	
	app.use(async function() {
		throw new Error('boom boom');
	});

// error handler
	
	app.on('error', function(err) {
		if (process.env.NODE_ENV != 'test') {
			console.log('sent error %s to the cloud', err.message);
			console.log(err);
		}
	});
	
	if (!module.parent) app.listen(3000);
	
}


function test_12() {
	var Koa = require('koa');
	var jwt = require('koa-jwt');
	
	var app = new Koa();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
	app.use(function(ctx, next){
		return next().catch((err) => {
			if (401 == err.status) {
				ctx.status = 401;
				ctx.body = 'Protected resource, use Authorization header to get access\n';
			} else {
				throw err;
			}
		});
	});

// Unprotected middleware
	app.use(function(ctx, next){
		if (ctx.url.match(/^\/public/)) {
			ctx.body = 'unprotected\n';
		} else {
			return next();
		}
	});

// Middleware below this line is only reached if JWT token is valid
	app.use(jwt({ secret: 'shared-secret' }));

// Protected middleware
	app.use(function(ctx){
		if (ctx.url.match(/^\/api/)) {
			ctx.body = 'protected\n';
		}
	});
	
	app.listen(3000);
}

function test_13_1() {
	var Koa = require('koa');
	var jwt = require('koa-jwt');
	
	var app = new Koa();

// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/public'
	app.use(jwt({ secret: 'shared-secret' }).unless({ path: [/^\/public/] }));

// Unprotected middleware
	app.use(function(ctx, next){
		if (ctx.url.match(/^\/public/)) {
			ctx.body = 'unprotected\n';
		} else {
			return next();
		}
	});

// Protected middleware
	app.use(function(ctx){
		if (ctx.url.match(/^\/api/)) {
			ctx.body = 'protected\n';
		}
	});
	
	app.listen(3000);
}
