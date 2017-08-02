
$("#registrationForm").submit(function(e){
    
    //e.preventDefault();
    var self = $(this);
    self.validate();
    var data = self.serialize();
    console.log(data);

    $.ajax({
        url:"/student/register",
        method:"POST",
        data:data,
        success:function(data){
            console.log(data);
        },
        error:function(err){
            console.log(err);
        }
    })
    return false;
})

$("#loginForm").submit(function(){
    var self = $(this);
    self.validate();
    return true;
});