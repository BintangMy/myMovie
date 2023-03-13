const mainUrl = 'http://localhost:3000'
export const logout = () => {
	return (dispatch) => {
		localStorage.clear();
	};
};

export function login(body) {
	return async () => {
		try {
			let data = await fetch(`${mainUrl}/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			let convert = await data.json();

			if (!data.ok) {
				throw convert;
			}

			localStorage.setItem("access_token", convert.access_token);
			localStorage.setItem("username", convert.username);
			localStorage.setItem("email", convert.email);
		} catch (err) {
			throw err;
		}
	};
}