
var customName = document.getElementById('customName');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}


var storyText = "2000 years ago there was a man named :insertx:. He decided he was no longer going to work at :inserty:. So he :insertz:. The End.";
var insertX = ['The Go Getter','Big Daddy','Frank the Red'];
var insertY = ['the soup kitchen','5 Below','the local arcade'];
var insertZ = ['faked his death and moved to Italy','drove his car off a cliff','turned into a slug and crawled away'];


randomize.addEventListener('click', result);

function result() {
  var newStory = storyText;
  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);
  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':inserty:',yItem);
  newStory = newStory.replace(':insertz:',zItem);

  if(customName.value !== '') {
    var name = customName.value;
    newStory = newStory.replace('Bob',name);
  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(300*0.0714286) + ' stone';
    var temperature =  Math.round((94-32) * 5 / 9) + ' centigrade';
    newStory = newStory.replace('94 fahrenheit',temperature);
    newStory = newStory.replace('300 pounds',weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}