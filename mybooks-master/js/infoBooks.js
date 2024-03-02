document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=BrA7mpNm6gY3lxIWEAzCAXseAFDAtxwZ'

  fetch(baseUrl)
  .then((response) => {
      if(!response.ok){
          throw new Error('Erro de rede! Código:'+response.status);
      }
      return response.json()
  })
  .then((data) => {
      console.log(data)
      renderizarDescription(data)


  })
  .catch((err) => console.log(err))
});



function renderizarDescription(items){
  items.results.forEach((item, index) => {
    const divDescription = document.createElement('div');

    divDescription.innerHTML = `
    <div class="description-container">
        <img class="description-img" src="./img/img${index}.png" width="222px" height="300">
        <div class="description">
            <h2 class="description-title">${item.title}</h2>
            <p class="description-description">${item.description}</p>
            <p class="description-author">Author: ${item.author}</p>
            <p class="description-publisher">Publisher: ${item.publisher}</p>
            <a class="description-link" href="${item.amazon_product_url}" target="_blank">Buy on Amazon</a>
        </div>
    </div>
    `;
    divDescription.classList.add("description");
    
    // Crie um arquivo HTML separado para cada livro
    const blob = new Blob([`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${item.title}</title>
        <link rel="stylesheet" href="../style.css">
    </head>
    <body>
        <div class="container">${divDescription.innerHTML}</div>
    </body>
    </html>`], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    
    window.open(url, '_blank');

  });
}