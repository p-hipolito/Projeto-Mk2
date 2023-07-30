const Papa = require('papaparse');  //analisador de arquivos
const fileInput = document.getElementById('files'); //Lê o input
const icone = document.getElementById('imagem');
const botao = document.getElementById('jona');
const handleFiles = () => {
  const parser = [...fileInput.files].map((file) => {     //converte todos os arquivos
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        delimiter: ';',
        complete: (conversor)=>{resolve(conversor)}
      })
    })
  } )
console.log(parser)
const fechamentoPromise = Promise.all(parser)   //coleta todas as promises criadas acima

//assim que todas as promises forem completas chama a função criaTabela:

fechamentoPromise.then((dfCompletos) => {  
  console.log(dfCompletos)
  let totalmerged = []
  for ( const [index, f] of dfCompletos.entries()) {
    for (const [index2, g] of dfCompletos.entries()) {
      if (index !== index2) {    //filtra para que uma tabela não seja comparada consigo mesma
        criaTabela(f.data, g.data, totalmerged)
      }
    }
  }
  //filtra arquivos repetidos dentro do arquivo final:
  var temp = [ ]
  totalmerged = totalmerged.filter((item)=>{    
  if(!temp.includes(item.Produto)){
    temp.push(item.Produto)
    return true;
  }
  })
  console.log(totalmerged);
  console.log(temp);
  const csv = Papa.unparse(totalmerged);    //transforma arquivo em csv 
  downloadCSV(csv)
})
};

// Filtra dentre as tabelas criadas:

function criaTabela(tabela1, tabela2, totalmerged) {      
  const dfmerged = tabela1.filter(item1 => {
    const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
    return item2 !== undefined;
  }).map(item1 => {
    const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
    return { ...item1, ...item2 };
  });
  totalmerged.push(...dfmerged)   //adiciona resultado ao final do array
};
botao.addEventListener("click", handleFiles); //chama função ao clicar no botão 'enviar'
 
//Fazer download do arquivo final:

function downloadCSV(csv)   
{
    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    var csvURL =  null;
    if (navigator.msSaveBlob)
    {
        csvURL = navigator.msSaveBlob(csvData, 'download.csv');
    }
    else
    {
        csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'reincidencia.csv');
    tempLink.click();
}

//usar algo além do botão feiozo do caralho q é o padrão
icone.addEventListener('click', () => {
  fileInput.click();
})

