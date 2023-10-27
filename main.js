var form = document.getElementById('use-data');

form.addEventListener('submit',addlocalStorage)


function fetchDataFromApi() {
    return axios.get('https://crudcrud.com/api/8ceb27b185ac4e7496e63739dbb80b26/appointmentData')
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
        editButton.addEventListener('click', editBun);

        function delBun(recordId) {
            axios.delete(`https://crudcrud.com/api/8ceb27b185ac4e7496e63739dbb80b26/appointmentData/${recordId}`)
                .then(response => {
                    ul.removeChild(li);
                    alert('Record deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                    alert('Error deleting record.');
                });
        }

        function editBun(e) {
            var userData = JSON.parse(localStorage.getItem(record.email));

            document.getElementById('name').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;

            localStorage.removeItem(record.email);
            ul.removeChild(li);
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


function addlocalStorage(e){
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var obj ={name:name,email:email,phone:phone};

    var userJSON = JSON.stringify(obj);

    // localStorage.setItem(email, userJSON);

    // const obj = {
    //     Name,
    //     email,
    //     phonenumber
    // }
    
    axios.post('https://crudcrud.com/api/8ceb27b185ac4e7496e63739dbb80b26/appointmentData',obj)
    .then((response) =>{
        console.log(response.data)
    })
    .catch(err => console.log(err))


}