var content =
{
	roles:
	[
		"user"
	],
	services:
	{
		user:
		{
			login: "/auth/login",
			signup: "/auth/users",
			logout: "/auth/logout",
			recover: "/auth/recover_password",
			recover_request: "/auth/recover_request",
			profile: "/profile/profile"
		}
	},
	site:
	{
		navigation:
		[
			{
				url: '/',
				template: 'home.html',
				controller: 'HomeController',
				resolve: 'default'
			},
			{
				url: '/login',
				template: 'login.html',
				controller: 'AccessController',
				resolve: 'skip_if_logged'
			},
			{
				url: '/signup',
				template: 'signup.html',
				controller: 'AccessController',
				resolve: 'skip_if_logged'
			},
			{
				url: '/forgot',
				template: 'forgot.html',
				controller: 'ForgotController',
				resolve: 'skip_if_logged'
			},
			{
				url: '/reset/:token',
				template: 'reset.html',
				controller: 'ResetController',
				resolve: 'skip_if_logged'
			},
			{
				url: '/account',
				template: 'account.html',
				controller: 'AccountController',
				resolve: 'login_required'
			},
			{
				url: '/profile',
				template: 'profile.html',
				controller: 'ProfileController',
				resolve: 'login_required'
			}
		]
	}
};

module.exports = content;
