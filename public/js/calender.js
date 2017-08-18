$('.month-item').click(function(e)
{	
			var month = '#' + $(this).attr('id') + '-month';
			
			// genero l'effetto tocco material
			var parent, ink, d, x, y;
			parent = $('.view-year');
			//creo elemento .ink se non esiste
			if(parent.find(".ink").length == 0)
				parent.prepend("<span style='background:" + $(month).children('.title').css('background-color') + "' class='ink'></span>");
				
			ink = parent.find(".ink");
			//incase of quick double clicks stop the previous animation
			//ink.removeClass("animate");
			
			//setto dimensioni di .ink
			if(!ink.height() && !ink.width())
			{
				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
				d = Math.max(parent.innerWidth(), parent.innerHeight());
				//ink.css({height: d, width: d});
			}
			
			//get click coordinates
			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
			x = e.pageX - parent.offset().left - ink.width()/2;
			y = e.pageY - parent.offset().top - ink.height()/2;
			
			//set the position and add class .animate
			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
			
			$(month).delay(500).fadeIn();
			setTimeout(function(){
				$(month).children('.title').removeClass('active');
			}, 500);
			
		});
		
		
		$('.clickable').click(function(e){	
			var month = $(this).parent().parent().parent().children('.title').children('.month-name').text();
			var day = $(this).text();
			
			// genero l'effetto tocco material
			var parent, ink, d, x, y;
			parent = $(this).parent().parent().parent('.view-month');
			//creo elemento .ink se non esiste
			if(parent.find(".ink").length == 0)
				parent.prepend("<span style='background-color:" + $(this).parent().parent().parent().children('.title').css('background-color') + "' class='ink'></span>");
				
			ink = parent.find(".ink");
			//incase of quick double clicks stop the previous animation
			//ink.removeClass("animate");
			
			//setto dimensioni di .ink
			if(!ink.height() && !ink.width())
			{
				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
				d = Math.max(parent.innerWidth(), parent.innerWidth());
				//ink.css({height: d, width: d});
			}
			
			//get click coordinates
			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
			x = e.pageX - parent.offset().left - ink.width()/2;
			y = e.pageY - parent.offset().top - ink.height()/2;
			
			//set the position and add class .animate
			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
			
			$('.view-month').prepend("<div class='view-day'><div class='title active transition'><div onclick='gobackDay();' class='go-back-day transition'><span></span></div>" + "<span class='day-name'>" + day + "</span> " + "<span class='month-name small'>" + month + "</span>" + " <span class='date-year'>2015</span></div><div class='grid'><p class='centred'>No events today, relax.</p></div></div>");
			
			$('.view-day').delay(500).fadeIn();
			setTimeout(function(){
				$('.view-day').children('.title').removeClass('active');
			}, 500);
			
		});
		
		function gobackDay(){
			$('.go-back-day').parent().parent('.view-day').fadeOut();
			setTimeout(function(){
				$('.view-day').children('.title').addClass('active');
			}, 500);
			setTimeout(function(){
				$('.view-month').children('.ink').removeClass('animate');
				$('.view-day').remove();
			}, 500);
			setTimeout(function(){
				$('.view-month').children('.ink').remove();
			}, 1000);
		}
				
		$('.go-back-month').click(function(e){
			$(this).parent().parent('.view-month').fadeOut();
			setTimeout(function(){
				$('.view-month').children('.title').addClass('active');
			}, 500);
			setTimeout(function(){
				$('.view-year').children('.ink').removeClass('animate');
			}, 500);
			setTimeout(function(){
				$('.view-year').children('.ink').remove();
			}, 1000);
		});		