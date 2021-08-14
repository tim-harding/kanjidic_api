export abstract class KanjidicError<R> extends Error {
	readonly reason: R
	readonly context: Error | undefined

	constructor(reason: R, message?: string, context?: Error) {
		super(message)
		this.context = context
		this.reason = reason
		this.name = this.constructor.name
		switch (typeof (Error as any).captureStackTrace) {
			case "function": {
				(Error as any).captureStackTrace(this, this.constructor)
			}
			default: {
				this.stack = (new Error(message)).stack
			}
		}
	}
}