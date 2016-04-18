
	$("document").ready(function(){
		$("#loginForm").validate({
			rules: {
				username:{
					minlength:8,
					required:true
				},
				usermail:{
					required:true,
					email:true
				},

				password:{
					minlength:6,
					required:true
				},
				confirmuserpass:{
					minlength:6,
					equalTo: "#userpass",
					required:true
					
				},
				name:{
					required:true
				},
				location:{
					required:true
				},
				amount:{
					required:true
				}
				
				
			},
			messages:{
				username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 8 characters"
                },
				usermail: "Please enter a valid email address",
                agree: "Please accept our policy",
				checkbox:"checkbox can't be empty",
				 password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                },
				confirmuserpass: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long",
                    equalTo:  "Please enter the same password as above"
                },
                name: {
                    required: "Please enter a housetype"
                },
                location: {
                    required: "Please enter a location"
                },
                amount: {
                    required: "Please enter an amount"
                },
                
                
			},

			
		});

	});