// This version of the script leverages document.evaluate() instead of manual node traversal.
// https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate
// Not supported be IE
// For IE, use sourceXML.selectSingleNode('//project/identification/label')

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', loadXML);
})

// Define parent element
var parentElement = document.getElementById('ochreTableBody');

//Define API url
var url = "https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

//First function, called on <body>
//Everything else happens in the scope of this function
function loadXML(){
  //Chain the next funtion to create the XHR
  XMLrequest(url);
  console.log('loadXML -- OK');
};

function XMLrequest(link){
  //Create XHR object
  //Open the API call
  //Send the API call
  var connect = new XMLHttpRequest();
  connect.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      createXMLHeaders(this.responseXML);
      listTexts(this.responseXML);
      //createHeaders(this.responseXML);
    }
  };
  connect.open("GET", link, true);
  connect.send();
  console.log('XMLrequest -- OK');

}

// Set the base path to the meaningful data
var baseXPath = '/result/ochre'

// Create a custom namespace resolver
// A namespace resolver is necessary if a document has the same element in two namespaces, dc:name and ino:name for example.
// Or it is necessary if we use a namespace in our base path.
// Why not set the base path to //ochre?
// We use it here based on the reality that XPath // can be slow.
// This is not technically required if an XPath like '//project/identification/label' isn't too slow.
// We would need a very large document for testing.
function nsResolver(prefix) {
  var ns = {
    'ino' : 'http://namespaces.softwareag.com/tamino/response2',
    'xq' : 'http://namespaces.softwareag.com/tamino/XQuery/result'
  };
  return ns[prefix] || null;
}


// Create a helper function that will return a node-set result from given document and XPath expression.
// The XPathResult from SNAPSHOT_TYPE is an ordered node-set that allows the use of indexes to find a specific result.
// https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
// Parameters:
  // sourceXML is the XML document, usually from an XHR call
  // XPath is a string, e.g. '//project/identification/label'

  /* Old version required an index parameter; now we just add the index to a snapshotItem() function.
 function getXPathAll(sourceXML, XPath, i) {
  return sourceXML.evaluate(XPath, sourceXML, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).textContent;
} */

// Get the entire list of snapshots so we know the length.
function getXPathAll(sourceXML, XPath) {
  return sourceXML.evaluate(XPath, sourceXML, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add non-table data
function createXMLHeaders(sourceXML){
  document.getElementById('projectTitle').innerHTML = getXPathAll(sourceXML, baseXPath+'/metadata/description').snapshotItem(0).textContent;

  document.getElementById('setTitle').innerHTML = getXPathAll(sourceXML, baseXPath + '/set/identification/label').snapshotItem(0).textContent;
  document.getElementById('setDescription').innerHTML = getXPathAll(sourceXML, baseXPath + '/set/description').snapshotItem(0).textContent;
  var license = document.getElementById('license')
  license.innerHTML = getXPathAll(sourceXML, baseXPath + '/set/availability/license').snapshotItem(0).textContent;
  license.setAttribute('href', getXPathAll(sourceXML, baseXPath + '/set/availability/license/@target').snapshotItem(0).textContent);
}

// Create headers using the manual node selection method.
/* function createHeaders(sourceXML){
  document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
  document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML;
  document.getElementById('setDescription').innerText = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML;
  var licenseText = document.getElementById('license');
  licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
  licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue);
} */

// Add tabular data.
function listTexts(sourceXML){
  //console.log(sourceXML);
  //var textList = sourceXML.getElementsByTagName('text');
  var textList = getXPathAll(sourceXML, baseXPath +'/set/items/text');
  //console.log(textList);
  //for (i=0; i < textList.length; i++) { //based on getElementsByTagName
  for (i = 0; i < textList.snapshotLength; i++) { //based on snapshotLength
    //create one row per item
    var tr = document.createElement('tr');
    tr.setAttribute('class','ochreTableRows');
    tr.setAttribute('id','row_'+i);
    document.getElementById('ochreTableBody').appendChild(tr);
    //populate the cells in the row
    var td = document.createElement('td');
    td.setAttribute('id','td_name_'+i);
    td.textContent = getXPathAll(sourceXML, baseXPath + '/set/items/text/identification/label').snapshotItem(i).textContent
    document.getElementById('row_'+i).appendChild(td);
    var td2 = document.createElement('td');
    td2.setAttribute('id','td_desc_'+i);
    td2.textContent = getXPathAll(sourceXML, baseXPath + '/set/items/text/description').snapshotItem(i).textContent
    document.getElementById('row_' + i).appendChild(td2);
  };
}
