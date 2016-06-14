function init(content)
{
	var helper = {};

	var services = content.services;
	var home = services.home ? services.home : "/";
	var login = services.login ? services.login : "/login";


	var resolver = {};

	resolver.default = function($q, $location, $auth)
	{
		var deferred = $q.defer();
		deferred.resolve();

		return deferred.promise;
	};

	resolver.login_required = function($q, $location, $auth)
	{
		var deferred = $q.defer();
		if($auth.isAuthenticated()) { deferred.resolve(); }
		else { $location.path(login); }

		return deferred.promise;
	};

	resolver.skip_if_logged = function($q, $location, $auth)
	{
		var deferred = $q.defer();
		if($auth.isAuthenticated()) { $location.path(home); }
		else { deferred.resolve(); }

		return deferred.promise;
	};

	var createNavigation = function($routeProvider)
	{
		var navigation = content.navigation;

		for(n in navigation)
		{
			var nav = navigation[n];

			$routeProvider.when(nav.url,
			{
				templateUrl: 'templates/' + nav.template,
				controller: nav.controller,
				resolve: { resolve: resolver[nav.resolve] }
			});
		}

		$routeProvider.otherwise
		({
			redirectTo: home
		});
	}

	helper.create = createNavigation;

	return helper;
};

module.exports = init;
