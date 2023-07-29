const Papa = require('papaparse');  //read files 
const fileInput = document.getElementById('files'); //Lê o input

const handleFiles = () => {
  const geladeira = [...fileInput.files].map((file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        delimiter: ';',
        complete: (convento)=>{resolve(convento)}
      })
    })
  } )
console.log(geladeira)
const fechamentoPromise = Promise.all(geladeira)

// aiaiaiaiaiaiiaiaiaiaiaiaiiaiaiaiaiiaiaiaiaiiaiaiaiia

fechamentoPromise.then((dfCompletos) => {
  console.log(dfCompletos)
  let totalmerged = []
  for ( const [index, f] of dfCompletos.entries()) {
    for (const [index2, g] of dfCompletos.entries()) {
      if (index !== index2) {
        criaTabela(f.data, g.data, totalmerged)
      }
    }
  }
  var temp=[ ]
  totalmerged=totalmerged.filter((item)=>{
  if(!temp.includes(item.Produto)){
    temp.push(item.Produto)
    return true;
  }
  })
  console.log(totalmerged);
  console.log(temp);
  const csv = Papa.unparse(totalmerged);
  downloadCSV(csv)
})
};

// uiuiuiuiuiuiuiuiuiuiuiuiu

function criaTabela(tabela1, tabela2, totalmerged) {
  const dfmerged = tabela1.filter(item1 => {
    const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
    return item2 !== undefined;
  }).map(item1 => {
    const item2 = tabela2.find(item2 => item1['Produto'] === item2['Produto']);
    return { ...item1, ...item2 };
  });
  totalmerged.push(...dfmerged)
};
fileInput.addEventListener("change", handleFiles); //chama função ao mudar os valores do input 'files'
 
// oioiopipipipoipoipoipoi

function downloadCSV(margarina)
{
    var csvData = new Blob([margarina], {type: 'text/csv;charset=utf-8;'});
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
    tempLink.setAttribute('download', 'download.csv');
    tempLink.click();
}

