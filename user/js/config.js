var config =
{
	auth:
	{
		api: "http://microservicios.org/v1",
		social:
		{
			facebook: "1016222861747131",
			twitter: "",
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
		templates: "templates/",
		screens:
		[
			{
				url: "/",
				tpl: "index.html",
				ctrl: "IndexController",
				resolve: 0
			},
			{
				url: "/login",
				tpl: "login.html",
				ctrl: "AccessController",
				resolve: 2
			},
			{
				url: "/signup",
				tpl: "signup.html",
				ctrl: "AccessController",
				resolve: 2
			},
			{
				url: "/forgot",
				tpl: "forgot.html",
				ctrl: "ForgotController",
				resolve: 2
			},
			{
				url: "/reset/:token",
				tpl: "reset.html",
				ctrl: "ResetController",
				resolve: 2
			},
			{
				url: "/home",
				tpl: "home.html",
				ctrl: "IndexController",
				resolve: 1
			},
			{
				url: "/profiles",
				tpl: "profiles.html",
				ctrl: "ProfileController",
				resolve: 1
			},
			{
				url: "/add_profiles",
				tpl: "add_profile.html",
				ctrl: "ProfileController",
				resolve: 1
			}
		]
	}
};

module.exports = config;
