document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=BrA7mpNm6gY3lxIWEAzCAXseAFDAtxwZ';

  fetch(baseUrl)
  .then((response) => {
      if (!response.ok) {
          throw new Error('Erro de rede! Código:' + response.status);
      }
      return response.json();
  })
  .then((data) => {
      console.log(data)
      renderizarTitulo(data);
  })
  .catch((err) => console.log(err));
});


function renderizarTitulo(items) {
  const container = document.getElementById('titulo-container');
  container.innerHTML = ''; 
  items.results.forEach((item, index) => {
      const divTitulos = document.createElement('div');
      const price = getRandomPrice(15, 150); 

      divTitulos.innerHTML = `
          <div class="titulo-caixa">
              <img class="titulo-img" src="./img/img${index}.png" width="222px" height="300">
              <div>
                  <h3 class="title">${item.title}</h3>
                  <h3 class="author">${item.author}</h3>
                  <h3 class="title">R$ ${price}</h3>
                    <button class="bnt" onclick="window.location.href = './pages/infoBooks.html?livro=${index}'">Descrição</button>
              </div>
          </div>
      `;

      divTitulos.classList.add("titulo");
      container.appendChild(divTitulos);
  });
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
    