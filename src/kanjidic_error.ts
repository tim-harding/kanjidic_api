export abstract class KanjidicError<E> extends Error {
	readonly reason: E

	constructor(reason: E) {
		super(undefined)
		this.reason = reason
		const message = this.reasonToMessage(reason)
		this.message = message
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
	
	protected abstract reasonToMessage(reason: E): string;
}