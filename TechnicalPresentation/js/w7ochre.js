// version with XHR
document.addEventListener('DOMContentLoaded', () => {
    const uuid = document.getElementById('ochreContainer').getAttribute('data-uuid');
    const ochre_url = "https://ochre.lib.uchicago.edu/ochre?uuid=";
    const link = ochre_url + uuid;

    loadXML();

    // load the XML
    function loadXML()
    {
      requestXML(link, {redirect: 'follow'});
      console.log('loadXML -- OK');
    }

    // make an Ochre API call using an xhr object
    function requestXML(link) 
    {
      var connect = new XMLHttpRequest();
      connect.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200) 
        {
          parseXML(this.responseXML);  // passes the requested xml file to the parseXML function 
        }
      };
      connect.open("GET", link, true);
      connect.send();
      console.log('requestXML -- OK');
    };

    // get title, properties, and desired images from Ochre xml
    function parseXML(sourceXML) 
    {

      // get title of item for the xml page
      var textTitle = sourceXML.getElementsByTagName('identification');
      var title_string = document.createTextNode(textTitle[1].textContent);
      document.getElementById('title').appendChild(title_string);


      // get properties of item for the xml page
      if (sourceXML.getElementsByTagName('property').length > 1)
      {
        const properties = sourceXML.querySelectorAll('property');
        i = 0;
        properties.forEach(p => {
          var tr = document.createElement('tr');
          tr.setAttribute('class', 'ochreTableRows');
          tr.setAttribute('id', 'row_' + i);
          document.getElementById('ochreTableBody').appendChild(tr);

          var property = document.createElement('td');
          property.setAttribute('id', 'property_' + i);
          property.textContent = p.querySelector('string').textContent;
          document.getElementById('row_' + i).appendChild(property);

          var value = document.createElement('td');
          value.setAttribute('id', 'property_value_' + i);
          value.textContent = p.querySelector('value').textContent;
          document.getElementById('row_' + i).appendChild(value);
          i++;
        });
      }
      

      // get preview image of item for the xml page
      if (sourceXML.getElementsByTagName('resource')[0].getAttribute("format") == 'image/jpeg')
      {
        var img = document.createElement('img');
        var src = link + "&preview";
        img.src = src;
        document.getElementById('preview').appendChild(img);
      }

    };

});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// // version with fetch() - for the 1st page
// document.addEventListener('DOMContentLoaded', function() {
//     const fetch_id = document.getElementById('ochreContainer').getAttribute('data-uuid');
//     const ochre_url = 'https://ochre.lib.uchicago.edu/ochre?uuid=';
//     var display = document.getElementById('ochreTableBody');
//     var table = null;

//     function getXml(uuid)
//     {
//         return fetch(ochre_url + uuid, {redirect:"follow"})
//         .then(output =>{
//             if(!output.ok) throw new Error(`Request Invalid ${error}`);
//             return output.text();
//         })
//         .then(text_output => {
//             const parser = new DOMParser();
//             return parser.parseFromString(text_output, 'text/xml')
//         });

//     }

//     function xml(data){
//         const property = data.querySelectorAll('property');
//         let add_uuid = '';
        
//         if(!table){
//             table = document.createElement('table');
//             table.setAttribute('class', 'table table-hover');
//             tbody = document.createElement('tbody');
//             table.appendChild(tbody);
//             display.appendChild(table);
//         }

//         property.forEach(p => {
//             const string = p.querySelector('string');
//             const value = p.querySelector('value');

//             if(string && value){
//                 var row = document.createElement('tr');
//                 var strCell = document.createElement('td');
//                 var valCell = document.createElement('td');
//                 strCell.innerHTML = `<strong>${string.textContent}</strong>`;
//                 valCell.innerHTML = `<strong>${value.textContent}</strong>`;
//                 row.appendChild(strCell);
//                 row.appendChild(valCell);
//                 tbody.appendChild(row);

//                 if(string.textContent == 'Associated text'){
//                     const titleLocation = document.getElementById('title');
//                     titleLocation.innerHTML = `<u><strong>~ ${value.textContent} ~</strong></u><br></br>`;
//                     add_uuid = value.getAttribute('uuid');
//                 }
//             }

//         });

//         display.appendChild(table);
//         return add_uuid;
//     }


//     getXml(fetch_id)
//       .then(xml)
//       .then(add_uuid => {
//           if(add_uuid){
//               return getXml(add_uuid)
//                   .then(xml)
//           }
//       })
//       .catch(error => {
//           display.innerHTML = "Error" + error.message;
//       });

    
// })