var config =
{
	auth:
	{
		api: "http://microservicios.org:8085/v1",
		social:
		{
			facebook: "1016222861747131",
			google: "62366115293-ig015o6ffhfqjdtvu4tujuungvqjcp0f.apps.googleusercontent.com",
			github: "b0ba2b064f12c26025ce"
		}
	},
	app:
	{
		api: "http://microservicios.org/v1"
	},
	endpoints:
	{
		login: "/auth/login",
		signup: "/auth/users",
		logout: "/auth/logout",
		recover: "/auth/recover",
		recover_request: "/auth/recover_request",
		profile: "/profile/profile"
	},
	navigation:
	{
		test: false,
		templates: "templates/",
		screens:
		[
			{
				url: "/",
				tpl: "index.html",
				controller: "IndexController",
				login: true
			},
			{
				url: "/login",
				tpl: "login.html",
				controller: "AccessController",
				login: false
			},
			{
				url: "/signup",
				tpl: "signup.html",
				controller: "AccessController",
				login: false
			},
			{
				url: "/forgot",
				tpl: "forgot.html",
				controller: "IndexController",
				login: false
			},
			{
				url: "/reset/:token",
				tpl: "reset.html",
				controller: "IndexController",
				login: false
			},
			{
				url: "/reset/:token",
				tpl: "reset.html",
				controller: "IndexController",
				login: false
			},
			{
				url: "/home",
				tpl: "home.html",
				controller: "IndexController",
				login: true
			},
			{
				url: "/profiles",
				tpl: "profiles.html",
				controller: "IndexController",
				login: true
			},
			{
				url: "/add_profiles",
				tpl: "add_profile.html",
				controller: "IndexController",
				login: true
			}
		]
	}
};

module.exports = config;
