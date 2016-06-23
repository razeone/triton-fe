function init()
{
	var helper = {};


	var params = function(form, required, optional)
	{
		var values = {};

		for(k in required)
		{
			var key = required[k];
			if(typeof form[key] == "undefined")
			{
				return null;
			}
			values[key] = form[key];
		}

		if(optional)
		{
			for(k in optional)
			{
				var key = optional[k];
				values[key] = form[key];
			}
		}

		return values;
	}

	var field = function(form, fieldname)
	{
		return !(typeof form[fieldname] == "undefined" || form[fieldname].length == 0);
	}

	var email = function(value)
	{
		var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return expression.test(value);
	}

	helper.params = params;
	helper.field = field;
	helper.email = email;

	return helper;
}

module.exports = init;
