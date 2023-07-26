var fs = require('browserify-fs');  //read files 
const csv = require('csvtojson'); // convert csv files into json
const createCsvWriter = require('csv-writer').createObjectCsvWriter; // enabling js to create a new csv file
const fileInput = document.getElementById('files'); //Lê o input
var loop=[];
var totalmerged=[]; //rode nyan por favor
const handleFiles = () => {
  const selectedFiles = [...fileInput.files]; //função para transformar em lista
  loop=selectedFiles;
  for (const f of selectedFiles) {
    console.log(f);
    for (const i of selectedFiles) {
       //conferir se f e I são iguais 
       recuperaDado(f);
       recuperaDado(i);
    criaTabela(f, i, totalmerged) //itens vão ser duplicados em totalmerged
    }
    console.log(loop);
  };
  // Escrevendo os dados em um arquivo CSV
  const csvWriter = createCsvWriter({
    path: 'Ruptura.csv',
    header: Object.keys(totalmerged[0]).map(column => ({ id: column, title: column })),
    encoding: 'utf8',
  });
  csvWriter.writeRecords(totalmerged)
    .then(() => console.log('Arquivo Ruptura.csv salvo com sucesso!'));
};

//transformar csv em array

function recuperaDado(nomeTabela) { 
  console.log(nomeTabela)
  return csv({
      delimiter:';'
    })
    .fromFile(nomeTabela);    
};

//filtrar tabelas e registrar progresso

function criaTabela(tabela1, tabela2, totalmerged) {
  const dfmerged = tabela1.filter(item1 => {
      const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
      return item2 !== undefined;
    }).map(item1 => {
      const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
      return { ...item1, ...item2 };
    });
};
fileInput.addEventListener("change", handleFiles); //chama função ao mudar os valores do input 'files'
/*
let input = document.querySelector('input[type="file"]');
input.addEventListener('change', function() {
  let reader = new FileReader();
  reader.onload = function() {
    let lines = reader.result.split('\n').map(function(line){
      return line.split(',');
    });
    const tabela1 = input.files[0];
    const tabela2 = input.files[1];
    const tabela3 = input.files[2];
    const tabela4 = input.files[3];
    console.log(tabela1);
    console.log(tabela2);
    console.log(tabela3);
    console.log(tabela4);
  };
  reader.readAsText(input.files[0]);
}, false);
*/
/*
function createVariables(){
  var accounts = [];
  
  for (const f of selectedFiles) {
    accounts[f] = selectedFiles[f];
  }
  console.log(accounts);  
  return accounts;
}
*/ 
/*
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("files");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    document.write(text);
  };
  reader.readAsText(input);
}); 
*/
/*
const enviar = document.getElementById('enviar')
enviar.addEventListener('click', enviarArquivos())

enviarArquivos();
*/
/*
if (files != null && files.count()>0) {
  return Content(files.count() + ' files uploaded!');
} else {
  return Content('No files to upload.');
}
*/