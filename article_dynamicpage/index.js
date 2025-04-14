var container = document.getElementsByClassName('container');

var posts = [{
    imgURL  : '../_img/1.jpg',
    title   : 'How WhatsApp Swallowed Half The World',
    text    : 'When Facebook, Instagram and WhatsApp went through a six-hour outage on Monday, your immediate reaction was probably based on two things: where you live, and where your family lives.',
    linkURL : 'index.html'
  },{
    imgURL  : '../_img/2.jpg',
    title   : 'Microsoft reveals how to bypass its own system requirements for Windows 11',
    text    : 'Microsoft caused plenty of confusion and frustration with its stipulation that any machines wanting to upgrade to Windows 11 will need to have support for TPM 2.0. The reasoning being it will improve the overall security of its latest operating system. ',
    linkURL : 'index.html'
  },{
    imgURL  : '../_img/3.jpg',
    title   : 'Biotricity Launches Biocare Cardiac Application for Samsung',
    text    : '(NASDAQ:BTCY), a medical diagnostic and consumer healthcare technology company, today announced the upcoming release of Biocare Cardiac - a personal, cardiac health application for individuals diagnosed with or at risk for cardiovascular disease. Designed to be used with Samsungs Galaxy Watch4 series, the Biocare Cardiac application continuously collects users daily activities and provides critical information on their heart performance, empowering patients to better understand and manage their heart conditions.',
    linkURL : 'index.html'
  },{
    imgURL  : '../_img/4.jpg',
    title   : 'iOS 15: Here’s how to use the native iPhone 2FA code generator and autofill',
    text    : 'One of the handy, under-the-radar additions with iOS 15 is an integrated 2FA code generator that makes it more seamless to log in to your accounts that have enhanced security. Let’s look at how to use the native iOS 15 2FA code generator that comes with autofill on iPhone and iPad.',
    linkURL : 'index.html'
  }
];

function addPost(param) {
  var str = "";
  for(var i = 0; i < posts.length; i++) {
    str +=    `
      <div class="post-page">
        <img src="${param[i].imgURL}" alt="${'image-' + i}">
        <h2>${param[i].title}</h2>
        <p>${param[i].text}</p>
        <a href="${param[i].linkURL}">Read</a>
      </div>
    `;
  }
  return str;
}

container[0].innerHTML = addPost(posts);
/* Using foreach to loop blogPost
function insertBlogPost(blogPost) {
  var str = '';
  blogPost.forEach((element, i) => {
    str += 
    `<div class="blog-post">
      <div class="blog-thumbnail">
        <img src="${element.imgURL}" alt="${'image-' + i}">
      </div>
      <div class="blog-article">
        <h2>${element.title}</h2>
        <p>${element.text}</p>
      </div>
      <div class="blog-link">
        <a>${element.info}</a>
      </div>
    </div> `
  });
  return str;
}
*/