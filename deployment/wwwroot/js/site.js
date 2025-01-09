// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var gsName;

function addButtonListeners()
{
    //These buttons are removed from the bed page
//    const getTest = document.getElementById('btnTest');
//    getTest.addEventListener('click', () => { ShowTest(); });

//    const getSave = document.getElementById('btnSave');
//    getSave.addEventListener('click', () => { SaveTest(); });
}

const ShowTest = () =>
{
    //alert('Help');
    fetch("api/testget/1")
        .then(response => response.json())
        .then(result => { alert(result.value); });
}

const SaveTest = () =>
{
    const testinfo = {
        id: document.getElementById('testInfo_Id').value,
        testtext: document.getElementById('testInfo_TestText').value,
    };

    var objOut = [];

    var object1 = new Object;
    object1.id = 7;
    object1.testtext = document.getElementById('testInfo_TestText').value;
        
    var object2 = new Object;
    object2.id = 9;
    object2.testtext = document.getElementById('testInfo_TestText').value + ' sone extra text';

    objOut[0] = object1;
    objOut[1] = object2;
    objOut[2] = testinfo;

    fetch('api/save', {
        method: 'post',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(objOut)
    });

}
