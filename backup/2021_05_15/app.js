'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-ejs');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const path = require('path');

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {
	try {
		await next()
	} catch(err) {
		console.log(err.status);
		ctx.status = err.status || 500;
		ctx.body = err.message;
	}
});

app.use(logger({
	transporter: (str, args) => {
		// ...
	}
}));


app.use(koaBody());


router.get('koa-example', '/', (ctx) => {
	let koalaFacts = [];
	
	koalaFacts.push({
		meta_name: 'Color',
		meta_value: 'Black and white'
	});
	
	koalaFacts.push({
		meta_name: 'Native Country',
		meta_value: 'Australia'
	});
	
	koalaFacts.push({
		meta_name: 'Animal Classification',
		meta_value: 'Mammal'
	});
	
	koalaFacts.push({
		meta_name: 'Life Span',
		meta_value: '13 - 18 years'
	});
	
	koalaFacts.push({
		meta_name: 'Are they bears?',
		meta_value: 'No'
	});
	
	return ctx.render('index', {
		attributes: koalaFacts
	});
});

router.get('status', '/status', (ctx) => {
	ctx.status = 200;
	ctx.body   = 'ok';
});

router.get('error', '/error', (ctx) => {
	ctx.throw(500, 'internal server error');
});

render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'index',
	viewExt: 'html',
	cache: false,
	debug: true
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(1234);


