import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			// throw Array.isArray(message) ? message : [ message ];
			return message;
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let response = await this.request(`companies/${handle}`);
		return response.company;
	}

	// Get entire list of companies & handle search queries.

	static async getAllCompanies(name) {
		let response;
		name
			? (response = await this.request(`companies?name=${name}`))
			: (response = await this.request(`companies/`));
		return response.companies;
	}

	// Get entire list of jobs & handle search queries.

	static async getAllJobs(title) {
		let response;
		title ? (response = await this.request(`jobs?title=${title}`)) : (response = await this.request(`jobs/`));
		return response.jobs;
	}

	// Register someone in with this function, that should return a token.

	static async registerUser(registerInfo) {
		let response = await this.request('auth/register', registerInfo, 'post');
		JoblyApi.token = response.token;
		return response;
	}

	// Log someone in with this function, that should return a token.

	static async loginUser(loginInfo) {
		let response = await this.request('auth/token', loginInfo, 'post');
		JoblyApi.token = response.token;
		return response;
	}

	// Get user by username.

	static async getUser(username) {
		let response = await this.request(`users/${username}`);
		return response.user;
	}

	// Edit user's profile information.

	static async patchUser(username, newUserInfo) {
		let response = await this.request(`users/${username}`, newUserInfo, 'patch');
		return response;
	}

	// Add job application to user's info.

	static async applyToJob(username, jobId) {
		let response = await this.request(`users/${username}/jobs/${jobId}`, undefined, 'post');
		return response;
	}
}

export default JoblyApi;
