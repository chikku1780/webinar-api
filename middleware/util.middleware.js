const log = require('debug-level').log('webinar-api:utilMiddleware');

const utilMiddleware = {};

utilMiddleware.ignoreAssets = async (ctx, next) => {
	if (/(\.js|\.css|\.ico)$/.test(ctx.path)) {
		await next();
	} else {
		// must .call() to explicitly set the receiver
		await next.call(this, ctx, next);
	}
};

utilMiddleware.appendResponseTimeToHeaders = async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
};

module.exports = utilMiddleware;
