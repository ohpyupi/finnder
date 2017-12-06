(function () {
  loadScript('https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js', e => {
    let fonts = ['Nunito', 'Merriweather', 'Titillium Web', 'Cabin', 'Crimson Text'];
    WebFont.load({
      google: {
        families: fonts, 
      }
    });
    let madness = setInterval(() => {
      let index = Math.floor(Math.random() * (fonts.length + 1));
      document.body.style.fontFamily = fonts[index];
    }, 100);
    let button = document.createElement('button');
    button.innerHTML = "Stop this madness!";
    button.style.marginTop = '30px';
    button.addEventListener('click', e => {
      clearInterval(madness);
      button.remove();
    }, false);
    document.body.appendChild(button);
  });
 })();

function loadScript(src, callback) {
  let s = document.createElement('script');
  s.src = src;
  s.type = 'text/javascript';
  document.body.appendChild(s);
  s.onload = e => callback(e);
};
