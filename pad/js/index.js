let navButtons = document.querySelectorAll('.header a');
let contentSections = document.querySelectorAll('.l-content-ui');
let currentSection = location.hash;
console.log(location.hash);
console.log(location.hash.length);

if (location.hash.length !== "") {
  console.log('Currently at ' + currentSection)
  for(let section = 0; section < contentSections.length; section++) {
    if (contentSections[section].id !== currentSection.substr(1)) {
      contentSections[section].classList.add('closed')
      console.log('Closed ' + contentSections[section].id)
    } else {
      contentSections[section].classList.remove('closed')
      console.log('Opened ' + contentSections[section].id)
    }
  }
}

for(let button = 0; button < navButtons.length; button++) {
  navButtons[button].addEventListener('click', function() {
    console.log('click');
    for(let section = 0; section < contentSections.length; section++) {
      contentSections[section].classList.add('closed')
      console.log('Closed ' + contentSections[section].id)
    }
    for(let section = 0; section < contentSections.length; section++) {
      if (contentSections[section].id == navButtons[button].getAttribute("href").substr(1)) {
        contentSections[section].classList.remove('closed')
        console.log('Opened ' + contentSections[section].id)
      }
    }
  })
}