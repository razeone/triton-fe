function init(toaster)
{
	var helper = {};


	var success = function(message)
   {
      toaster.pop
      ({
         type: "alert",
         body: message,
         showCloseButton: true,
         timeout: 2000
      });
   }

   var error = function(message)
   {
      toaster.pop
      ({
         body: message,
         type: "error",
         showCloseButton: true,
         timeout: 3000
      });
   }

	helper.success = success;
	helper.error = error;

	return helper;
}

module.exports = init;
