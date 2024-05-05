document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', loadXML);
})

//Define parent element
var parentElement = document.getElementById('ochreTableBody');
//Define API url
var url = "https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";
//var url = 'media/sample.xml';
//var url = 'xml/w6rsti.xml';


// First function, invoked with event listener
// Everything else happens in the scope of this function
function loadXML() {
  //const xmlFilePath = 'media/sample.xml';
  const xmlFilePath = 'xml/w6rsti.xml';
  //fetch(xmlFilePath)
  fetch(url)
  .then(response => response.text())
  .then(data =>
    parseData(data)
  )
  .catch(error => {
    console.error('Error loading XML file:', error);
  })
};

// NOTE how this is different from the XHR approach
function parseData(xmlData){
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
  createHeaders(xmlDoc),
  listTexts(xmlDoc);
};

function createHeaders(sourceXML){
  document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
  document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML;
  document.getElementById('setDescription').innerText = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML;
  var licenseText = document.getElementById('license');
  licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
  licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue);
}

function listTexts(sourceXML){
  console.log(sourceXML);
  var textList = sourceXML.getElementsByTagName('text');
  console.log(textList);
  for (i=0; i < textList.length; i++) {
    //create one row per item
    var tr = document.createElement('tr');
    tr.setAttribute('class','ochreTableRows');
    tr.setAttribute('id','row_'+i);
    document.getElementById('ochreTableBody').appendChild(tr);
    //populate the cells in the row
    var td = document.createElement('td');
    td.setAttribute('id','td_name_'+i);
    td.textContent = textList[i].children[0].children[0].innerHTML;
    document.getElementById('row_'+i).appendChild(td);
    var td2 = document.createElement('td');
    td2.setAttribute('id','td_desc_'+i);
    td2.textContent = textList[i].children[3].innerHTML;
    document.getElementById('row_' + i).appendChild(td2);
  };
}

