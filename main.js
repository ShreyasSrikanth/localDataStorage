var form = document.getElementById('use-data');

form.addEventListener('submit', addlocalStorage);

function fetchDataFromApi() {
    return axios.get('https://crudcrud.com/api/ea76a5fe12b7412d95d0ba59057acc40/appointmentData')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return [];
        });
}

function displayRecords(records, displayDiv) {
    var ul = document.createElement('ul');

    records.forEach(record => {
        var li = document.createElement('li');
        li.textContent = 'Name: ' + record.name + ' Email: ' + record.email + ' Phone: ' + record.phone;

        var deleteButton = document.createElement('button');
        var editButton = document.createElement('button');

        deleteButton.textContent = 'Delete';
        editButton.textContent = 'Edit';

        deleteButton.style.margin = '0 5px';
        editButton.style.margin = '0 5px';

        deleteButton.addEventListener('click', () => delBun(record._id));
        editButton.addEventListener('click', () => editBun(record));

        function delBun(recordId) {
            axios.delete(`https://crudcrud.com/api/ea76a5fe12b7412d95d0ba59057acc40/appointmentData/${recordId}`)
                .then(response => {
                    ul.removeChild(li);
                    alert('Record deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert('Error deleting record.');
                });
        }

        function editBun(record) {
            document.getElementById('name').value = record.name;
            document.getElementById('email').value = record.email;
            document.getElementById('phone').value = record.phone;

            form.removeEventListener('submit', addlocalStorage);

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                var updatedName = document.getElementById('name').value;
                var updatedEmail = document.getElementById('email').value;
                var updatedPhone = document.getElementById('phone').value;

                axios.put(`https://crudcrud.com/api/ea76a5fe12b7412d95d0ba59057acc40/appointmentData/${record._id}`, {
                    name: updatedName,
                    email: updatedEmail,
                    phone: updatedPhone
                })
                .then(response => {
                    alert('User data updated successfully!');
                    form.removeEventListener('submit', arguments.callee);
                })
                .catch(error => {
                    console.error(error);
                    alert('Error updating user data.');
                });
            });
        }

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        ul.appendChild(li);
    });

    displayDiv.appendChild(ul);

    alert('User data displayed in the specified div!');
}

var displayDiv = document.getElementById('display-data');

fetchDataFromApi()
    .then(records => displayRecords(records, displayDiv));

function addlocalStorage(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var obj = { name: name, email: email, phone: phone };

    var userJSON = JSON.stringify(obj);

    axios.post('https://crudcrud.com/api/ea76a5fe12b7412d95d0ba59057acc40/appointmentData', obj)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => console.log(err));
}
