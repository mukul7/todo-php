class Time {
	constructor(){
		const date = new Date()
		this.seconds = date.getSeconds()
		this.minutes = date.getMinutes()
		this.hours = date.getHours()
		this.$timeWrapper = document.querySelector('.time')
		this.updateDom()
		setInterval(()=>{
			this.updateSeconds()
		},1000)
	}

	updateSeconds() {
		this.seconds++
		if(this.seconds >= 60) {
			this.seconds = 0
			this.updateMinutes()
		}
	}

	updateMinutes() {
		this.minutes++
		if(this.minutes >= 60) {
			this.minutes = 0
			this.updateHours()
		}
		this.updateDom()
	}

	updateHours() {
		this.hours++
		if(this.hours >= 24) {
			this.hours = 0
		}
	}

	updateDom() {
		this.$timeWrapper.innerHTML = `${this.hours}:${this.minutes}`
	}

}

	// this.$li = document.createElement('li')
	// this.$li.setAttribute('class', 'todo-item')
	// this.$li.innerHTML = `

 //         `


function getAllTasks(){
	arr = null;
 	$.ajax({
      	url: "list.php",
        type: "get",
        success: function (response) {
           	if(response.trim()!=="failed"){
           		arr = JSON.parse(response);
           		for(var elem in arr){
			  		addTodo(arr[elem]['ID'],arr[elem]['caption'],arr[elem]['is_completed']);
				}
       		}
       	},
       	error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus, errorThrown);
		}
	});
	
}


		
$("#addInput").keyup(function (evt) {
	if(evt.key === "Enter"){
		var todoItem = $("#addInput").val();
		if(todoItem!="" && todoItem!=null){ 
		$("#addInput").val("");
 		$.ajax({
        	url: "todo-db-utils.php",
        	type: "post",
        	data: {
        		"todoItem" : todoItem
        	},
        	success: function (response) {
           		if(response.trim()!=="failed")                 
           			addTodo(response.trim(),todoItem,0);
        	},
        	error: function(jqXHR, textStatus, errorThrown) {
			    console.log(textStatus, errorThrown);
			}
		});}
	}
});
	

function addTodo(id,todoItem,status) {
	ht = `<div `;
	if(status==1){
		ht = ht+`class="done"`;
	}
	ht=ht+`>`;


	chil = $("<li></li").addClass("todo-item").html(ht+`
                    <input type="hidden" id="taskid" value="`+id+`">
                    <div class="todo-title ">
                      `
                        +todoItem+
                       ` 
                    </div>
                  <div class="todo-button pull-right hover-light" onclick="deleteTask(this);">
                    <i class="fa fa-trash-o"> </i>
                  </div>
                  <div class="todo-button pull-right hover-light complete" onclick="completeTask(this);">
                    <i class="fa fa-check"> </i>
                  </div>
                  <div class="todo-button pull-right hover-light redo" onclick="redoTask(this);">
                    <i class="fa fa-repeat"></i>
                  </div>
                </div>`);
	$(".todo-list").append(chil);
}

function deleteTask(butt){
	id = $(butt).parent().find("#taskid").val();
	$.ajax({
        url: "todo-db-utils.php",
        type: "delete",
        data: {
        	"todoItemId" : id
        },
        success: function (response) {
           	if(response.trim()==="success")                 
           		$(butt).parent().parent().remove();
        },
        error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus, errorThrown);
		}
	});
}

function redoTask(butt){
	id = $(butt).parent().find("#taskid").val();
	// console.log(id);
	$.ajax({
        url: "todo-db-utils.php",
        type: "PUT",
        data: {
        	"todoItemId" : id
        },
        success: function (response) {
           	if(response.trim()==="success")                 
           		$(butt).parent().removeClass("done");
       	},
        error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus, errorThrown);
		}
	});	
}

function completeTask(butt){
	id = $(butt).parent().find("#taskid").val();
	$.ajax({
        url: "todo-db-utils.php",
        type: "get",
        data: {
        	"todoItemId" : id
        },
        success: function (response) {
           	if(response.trim()==="success"){
           		$(butt).parent().addClass("done");
           	}                 
        },
        error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus, errorThrown);
		}
	});
}

$(document).ready(getAllTasks());


new Time();