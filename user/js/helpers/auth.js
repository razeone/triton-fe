function init(content, $auth, $storage, $location, service_call)
{
	var helper = {};

	var site = content.site;
	var home = site.home ? site.home : "#";
	var account = site.account ? site.account : "/account";


	var login = function(role, service, params)
	{
		service_call("auth", role, service, params, "post", function(response)
		{
			$auth.setToken(response.token);

			$storage.role = role;
			$storage.user = response;

			$location.path(account);
		});
	}

	var logout = function()
	{
		$auth.logout();
      $storage.user = null;

      $location.path(home);
	}

	var role = function()
	{
		return $storage.role;
	}

   var user = function()
   {
      return $storage.user;
   }

	var check = function(role)
	{
		if(role != $storage.role) $location.path(account);
	}

	helper.login = login;
	helper.logout = logout;
	helper.role = role;
	helper.user = user;
	helper.check = check;

	return helper;
}

module.exports = init;
