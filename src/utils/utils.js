let getOptions = function(callback) {
  // NOTE: $ (jQuery) is in scope because it is in a script tag in home.html
  // this should probably be changed, maybe use bower?

  $.get('/api/v1/options', (data) => {
    //console.log(data);
    let options = JSON.parse(data);
    callback(options);
  });
}

let getUser = function(callback) {
  $.get('/api/v1/users/me', (data) => {
    //console.log(data);
    let user = JSON.parse(data);
    callback(user);
  });
}

export { getOptions, getUser };