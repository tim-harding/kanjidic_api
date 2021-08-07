import { ACCESS_TOKEN_ENDPOINT, API_ENDPOINT } from "./constants";

export class Access {
	private accessToken: string | undefined = undefined;

	async query(graphql: string): Promise<void> {
		if (this.accessToken === undefined) {
			await this.updateAccessToken();
		}
		const result = await this.makeRequest(graphql, false);
		return result;
	}

	private async updateAccessToken(): Promise<void> {
		this.accessToken = await getApiToken();
	}

	private async makeRequest(graphql: string, isRetry: boolean): Promise<any> {
		const body = {
			query: graphql,
		}
		const result = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.accessToken}`,
			},
			body: JSON.stringify(body),
		});
		if (result.status === 401 && !isRetry) {
			await this.updateAccessToken();
			return await this.makeRequest(graphql, true);
		}
		const json = await result.json();
		if (!result.ok) {
			const { error } = json;
			if (typeof error === "string") {
				throw new Error(error);
			} else {
				throw new Error(result.statusText);
			}
		}
		return json;
	}
}

async function getApiToken(): Promise<string> {
	const result = await fetch(ACCESS_TOKEN_ENDPOINT);
	const json = await result.json();
	const { access_token } = json;
	if (typeof access_token !== "string") {
		throw new Error("No access token in the server response");
	}
	return access_token;
}