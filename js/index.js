$(document).ready(function(){
	document.addEventListener('deviceready',function(){
		getRepos();
		$(".ui-input-clear").click(function(){
			$("#search_list").hide();
			$("#user_info").hide();
		});
		$("#search_btn").click(function(e){
			e.preventDefault();
			var search_html="";
			var user_html="";
			var username=$("#search_input").val();
			var user_url="https://api.github.com/users/"+username;
			var repo_url="https://api.github.com/users/"+username+"/repos";
			//console.log("Search for "+username);
			$.ajax({
				url:repo_url,
				dataType:"jsonp",
				success:function(response){
					//console.log(response);
					$.ajax({
						url:user_url,
						dataType:"jsonp",
						success:function(response1){
							console.log(response1);
							user_html+='<h3><img class="thumbnail" src="'+response1.data.avatar_url+'"><a href="'+response1.data.html_url+'" target="_blank">'+response1.data.name+'</a></h3><div style="clear:both;"></div><br><br>';
							$("#user_info").html(user_html);
						}
					});
					$.each(response.data,function(i,item){
						search_html+='<li>'+
								'<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>'+
								'<p>By '+this.owner.login+'</p>'+
								'</li>';
					});
					$("#search_list").append(search_html);
					$("#search_list").listview("refresh");
				}
			});
		});
	});
});
function getRepos(){
	var html='';
	$.ajax({
		url:'https://api.github.com/repositories',
		dataType:"jsonp",
		success:function(response){
			$.each(response.data,function(i,item){
				if (i<10){
					html+='<li><img class="thumbnail" src="'+this.owner.avatar_url+'">'+
						'<h1><a href="'+this.html_url+'" target="_blank">'+this.name+'</a></h1>'+
						'<p>By '+this.owner.login+'</p>'+
						'</li>';
				}
			});
			$("#repolist").append(html);
			$("#repolist").listview("refresh");
		}
		
	});
}