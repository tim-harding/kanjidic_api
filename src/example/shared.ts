export const ENDPOINT = "http://localhost:8000"

let nextId: number = 0

export function uniqueId(): string {
	return `unique-id-${nextId++}`
}