const log = require('debug-level').log('webinar-api');

const errorMiddleware = {};

errorMiddleware.errorHandler = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		if (err.status >= 500) console.log('Error handler:', err);
		ctx.status = err.status || 500;
		ctx.body = {
			status: 'failed',
			message: err.message || 'Internal server error',
		};
		// ctx.app.emit('error', err, ctx);
	}
};

errorMiddleware.custom404 = async function (ctx, next) {
	await next();
	if (ctx.body || !ctx.idempotent) return;
	ctx.redirect('/404.html');
};

module.exports = errorMiddleware;
