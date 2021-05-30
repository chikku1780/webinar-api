const log = require('debug-level').log('webinar-api:errorMiddleware');

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

errorMiddleware.custom401 = async function (ctx, next) {
	try {
		await next();
	} catch (err) {
		if (err.status === 401) {
			ctx.status = 401;
			let errMessage = err.originalError ?
				err.originalError.message :
				err.message;
			// ctx.body = {
			// 	error: errMessage
			// };
			ctx.json = ctx.body;
			ctx.set("X-Status-Reason", errMessage)
		} else {
			throw err;
		}
	}
};

module.exports = errorMiddleware;
