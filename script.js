// variables for user data;
var followerData;
var streamers;
//var krakenFollowers;// deprecated endpoints change using full ajax requests to see fail... current is helix. 
var streamData;
var logo;
var live= 'offline';
var description;
var name;
var game;
var online;
// variables for stream data;



var followers;
$.ajax({
  type: "GET",
  url: "https://api.twitch.tv/helix/users/follows?from_id=80238324",
  headers: {
    "Client-ID":"mjynz2ii6lgoxv2v5ew6a1yckut7l2"},
  success: function(user) 
  { var followIds= [];
 
    for(i=0;i<user.data.length;i++)
    {
      followIds[i]=user.data[i].to_id;
      
    }
   // same id's different end points users: id, streams: user_id;
    followers= followIds.join('&id='); 
    streamers= followIds.join('&user_id=');
  getStreams(); 
  followerDetails();
  
   
  },
  error: function()
  {
    alert('fail');
  },
  stop: function()
  {
    alert("there are no more requests");
       
     } 
    
    
});




function followerDetails()
{
  $.ajax({
  type: "GET",
  url: "https://api.twitch.tv/helix/users?id="+followers,
  headers: {
    "Client-ID":"mjynz2ii6lgoxv2v5ew6a1yckut7l2"},
  success: function(follower) 
  { 
    followerData=follower;
  
   
    update();
  },
  error: function()
  {
    alert('fail');
  }
});
}

function getStreams()
{
   $.ajax({
  type: "GET",
  url: "https://api.twitch.tv/helix/streams?user_id="+streamers,
  headers: {
    "Client-ID":"mjynz2ii6lgoxv2v5ew6a1yckut7l2"},
  success: function(streams) 
  { 
      console.log(followers);
      streamData=streams;
      console.log(streamData);
     
  },
  error: function()
  {
    alert('fail');
  },
     complete: function()
     {
       
     }
});
}
function update()
{
  $('#online').text("Streaming: "+streamData.data.length);  
  for(j=0;j<followerData.data.length;j++)
     {
       online='';
        live='offline';
        game=''; 
      name=followerData.data[j].display_name;
      logo=followerData.data[j].profile_image_url;
      description=followerData.data[j].description;
     for(i=0;i<streamData.data.length;i++)
     {
       if(streamData.data[i].user_id===followerData.data[j].id)
       {
         live=streamData.data[i].type;
        game=streamData.data[i].title;
        online="highlight";
         
       }
        
     }
      
      $('div .insert').after('<div class="borders panel-body"><div class="media"><div class="media-left"><a href="https://www.twitch.tv/'+name+'"target="_blank"><img class="small"src="'+logo+'"></a></div><div class="media-body"><h4 class="streaming media-heading">'+name+'<br /></h4><p class="sub">'+game+'</p>'+live+'<span class="glyphicon '+online+' glyphicon-signal"</span></div></div></div>'); 
        
     }

}

