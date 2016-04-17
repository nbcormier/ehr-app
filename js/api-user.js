var API = {
  GetUser : function(callback){
    jQuery.get('wordpress/api.php?action=getuser',function(data){
      callback.call(null, data);
    },'json');
  },
  
  IsLoggedIn : function(callback){
    jQuery.get('wordpress/api.php?action=isloggedin',function(data){
      callback.call(null, data);
    },'json');
  },
  
  Authenticate : function(un, pw, callback){
    jQuery.get('wordpress/api.php?action=authenticate',
              {un : un, pw : pw},
              function(data){
                callback.call(null, data);
              },'json');
  }
};



