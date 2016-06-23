function init(api, services, $http, error_alert)
{
	var helper = {};


	var webservice = function(type, role, service)
	{
		return api[type] + services[role][service];
	}

	var call = function(type, role, service, params, method, callback, callback_error)
	{
		var ws = webservice(type, role, service);

		var handler = function(response)
		{
			var data = response.data;
			callback(data);
		};

		var handler_error = callback_error ? callback_error : function(error)
		{
			var data = error.data;
			var message = data ? (data.error ? data.error : "service not found") : "service not available";
			error_alert(message);
		};

		$http[method](ws, params).then(handler, handler_error);
	}

	helper.webservice = webservice;
	helper.call = call;

	return helper;
}

module.exports = init;
