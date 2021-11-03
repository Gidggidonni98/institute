const url = "http://localhost/institute/public/index.php";

const getSchoolById = async id =>{
    return await $.ajax({
        type: 'GET',
        url : 'http://localhost/institute/public/index.php/school/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);

};

const getDetails = async id =>{
   let school = await getSchoolById(id);
   var f = new Date(school.school[0].created.date).toLocaleString();
   if(school.school[0].updated == null){
       var h= "No ha habido actualización";
    }else{
       var h = new Date(school.school[0].updated.date).toLocaleString() ;
    };


   document.getElementById('name').value = school.school[0].name;
   document.getElementById('street').value = school.school[0].street;
   document.getElementById('created').value = f;
   document.getElementById('updated').value = h;
   document.getElementById('status').value = school.school[0].status ? "Activo" : "Inactivo";
};
const getInfoUpdate = async id =>{
    let school = await getSchoolById(id);
    var f = new Date(school.school[0].created.date).toLocaleString();
   if(school.school[0].updated == null){
       var h= "No ha habido actualización";
    }else{
       var h = new Date(school.school[0].updated.date).toLocaleString() ;
    };

    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = school.school[0].name;
    document.getElementById('street_update').value = school.school[0].street;
    document.getElementById('created_update').value = f;
    document.getElementById('updated_update').value = h;
};
const fill = listSchool => {
    let table = "";
    
    

    if(listSchool.length > 0){
        for(let i = 0; i < listSchool.length; i++) {
            var f = new Date(listSchool[i].created.date).toLocaleString();
            if(listSchool[i].updated == null){
                var h= "No ha habido actualización";
             }else{
                var h = new Date(listSchool[i].updated.date).toLocaleString() ;
             };
            
            
            
            table += `
            <tr>
                <td>${ i + 1 }</td>
                <td>${listSchool[i].name}</td>
                <td>${listSchool[i].street}</td>
                <td>${f}</td>
                <td>${h}</td>
                <td>${listSchool[i].status ? "Activo" : "Inactivo"}</td>
                <td>
                    <button type="button" onclick= getDetails(${listSchool[i].id}) class="btn btn-info" data-bs-toggle="modal" data-bs-target="#details">Detalles</button>
                    <button type="button" onclick= getInfoUpdate(${listSchool[i].id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i> Modificar</button>
                    <button type="button" onclick= getId(${listSchool[i].id}) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete">Eliminar</button>
                </td>
            </tr>
            `;
        }
    }else{
        table = `
        <tr class="text-center">
            <td colspan="5">No hay registros para mostrar</td>
        </tr>
        `;
    }
    $(`#table > tbody`).html(table);
};

const getSchools = () => {
 $.ajax({
        type: 'GET',
        url: url + '/schools'
    }).done(res => {
    
        fill(res.listSchool);
    });
};
const updateSchool = async () =>{
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let street = document.getElementById('street_update').value;

    $.ajax({
        type: 'POST', 
        url: 'http://localhost/institute/public/index.php/school/update/' + id,
        data:{name, street }
    }).done(function(res) {
        getSchools();
    });
};

const deleteSchool = async (id) => {
    await $.ajax({
        type: 'GET',
        url: 'http://localhost/institute/public/index.php/school/delete/' + id
    }).done(res => {
        getSchools();
    });
};

getSchools();
