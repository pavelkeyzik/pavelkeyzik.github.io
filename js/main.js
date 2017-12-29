'use strict';

(function() {

  var object = document.getElementsByTagName('article');

  for (var i = 0; i < object.length; i++) {
    object[i].addEventListener('click', function() {
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);

          var modal = document.createElement('div');
          modal.setAttribute('class', 'js-modal');
          modal.innerHTML = createModal(response);

          document.body.insertBefore(modal, document.body.firstChild);
          
          var closeButton = document.getElementById('js-modal__close');
          closeButton.addEventListener('click', function() {
            modal.remove();
          });
        }
      };
      xhttp.open('GET', 'js/data/' + this.dataset.window + '.json', true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send();
    });
  };

  function createModal(item) {
    var technologies = '';
    for (var tech of item.technologies) {
      technologies += `<li>${tech}</li>`;
    }

    return `
      <div class="modal">
        <div id="js-modal__close"><i class="material-icons">close</i></div>
        <div class="modal__content">
          <div class="modal__preview">
            <img src="${item.full_image}" alt="${item.title} image">
          </div>
          <div class="modal__info">
            <div>
              <div class="modal__title">${item.title}</div>
              <span class="modal__used">Used technologies:</span>
              <ul class="modal__technologies">
                ${technologies}
              </ul>
            </div>
            <a href="${item.link}" target="_blank" class="modal__button">
              <i class="material-icons">launch</i>
              <span>Go to site</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

})();
