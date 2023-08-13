$(document).ready(function () {
    $('#fileInput').change(function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        var contents = e.target.result;
        var jsonData = JSON.parse(contents);

        function createEventHTML(event, index) {
          return `
          <tr>
            <th scope="row">${new Date(event.eventDateTime).toDateString()}</th>
            <td>${index + 1}</td>
            <td>${event.eventPosition.status}<br/>${event.eventPosition.comments}</td>
            <td>${event.eventPosition.city}, ${event.eventPosition.country}</td>
          </tr>
          `;
        }

        var eventsHTML = '';
        jsonData.forEach(function (event, index) {
          eventsHTML += createEventHTML(event, index);
        });

        var outputDiv = $('#outputInner');
        outputDiv.html(eventsHTML);
      };

      reader.readAsText(file);
    });
  });

  