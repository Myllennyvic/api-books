const ParamUrl = new URLSearchParams(window.location.search);
const product = ParamUrl.get('livro')
console.log(product)

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


let url =``
function renderizarDescription(items){
    console.log(items.results[Number(product)].title)
    const divDescription = document.createElement('div');
 
    divDescription.innerHTML = `
    <div class="description-container">
        <div class="description">
            <h2 class="description-title">${items.results[Number(product)].title}</h2>
            <p class="description-description">${items.results[Number(product)].description}</p>
            <p class="description-author">Author: ${items.results[Number(product)].author}</p>
            <p class="description-publisher">Publisher: ${items.results[Number(product)].publisher}</p>
            <a class="description-link" href="${items.results[Number(product)].amazon_product_url}" target="_blank">Buy on Amazon</a>
        </div>
    </div>
    `;
    divDescription.classList.add("description");
    
    
    const blob = new Blob([`<!DOCTYPE html>
    <html lang="en">
    <head>
    <style>
    body{
        font-family: "League Spartan", sans-serif;
        background-color: #dbdbdb;
    }

        .description-container{
            padding:20px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            max-width: 1500px;
            border-radius: 10px;
          }
        .description{
            text-align: center;
        }
        .description-description{
            font-size: 25px;
        }
        .description-title{
            font-weight: bold;
            color: #D5463C;
            font-size: 30px;
        }
        </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet">
        <title>${items.results[Number(product)].title}</title>
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <div class="container">${divDescription.innerHTML}</div>
    </body>
    </html>`], { type: 'text/html' });
    
    url= URL.createObjectURL(blob);
    
  window.open(url,'_blank')  

};
 
