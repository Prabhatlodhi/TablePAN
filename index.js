showtask();
const Name = document.getElementById("Input_Name_Data");
const Date = document.getElementById("Input_Date");
const PanNumber = document.getElementById("Input_PanNum");
const MobileNum = document.getElementById("Input_MobileNum");
const Age = document.getElementById("Input_Age");
let SubmitBtn = document.getElementById("Submit_Btn");
const ATOZ = document.getElementById("atoz");
const ZTOA = document.getElementById("ztoa");

function resetForm() {
  Name.value = "";
  Date.value = "";
  PanNumber.value = "";
  MobileNum.value = "";
  Age.value = "";
}

console.log(ZTOA.innerText);

SubmitBtn.addEventListener("click", function () {
  let NameInput = Name.value;
  let DateInput = Date.value;
  let PanNumberInput = PanNumber.value;
  let MobileInput = MobileNum.value;
  let AgeInput = Age.value;

  if (NameInput.trim() != 0) {
    let webtask = localStorage.getItem("localtask");

    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push({
      NameOfUser: NameInput,
      DateOfBirth: DateInput,
      PannumberOfUser: PanNumberInput,
      MobileNum: MobileInput,
      AgeOfUser: AgeInput,
    });
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
  }
  resetForm();
});

function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  const second_table = document.getElementById("second_table");
  taskObj.forEach((item, index) => {
    html += `<tr>   
                    <td> ${item.NameOfUser} </td>
                    <td> ${item.DateOfBirth} </td>
                    <td class="xx"> ${item.PannumberOfUser} </td>
                    <td> ${item.MobileNum} </td>
                    <td> ${item.AgeOfUser} </td>
                    <td><button type="button" onclick="edittask(${index})" class="text_primary button-89" role="button"">  Edit</button>
                    <button type="button" onclick="deleteitem (${index})" class="text_danger button-89" role="button""> Delete</button>
                    </td>
                </tr>`;
  });
  second_table.innerHTML = html;
}

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;

  taskObj[saveindex].NameOfUser = Name.value;

  taskObj[saveindex].DateOfBirth = Date.value;
  taskObj[saveindex].PannumberOfUser = PanNumber.value;
  taskObj[saveindex].MobileNum = MobileNum.value;
  taskObj[saveindex].AgeOfUser = Age.value;

  // = taskObj[saveindex]

  // let aa =      taskObj[saveindex].NameOfUser
  console.log(taskObj[saveindex].NameOfUser);

  savetaskbtn.style.display = "none";
  SubmitBtn.style.display = "block";

  localStorage.setItem("localtask", JSON.stringify(taskObj));
  resetForm();

  showtask();
});

function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let SubmitBtn = document.getElementById("Submit_Btn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  saveindex.value = index;

  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  Name.value = taskObj[index].NameOfUser;
  Date.value = taskObj[index].DateOfBirth;
  PanNumber.value = taskObj[index].PannumberOfUser;
  MobileNum.value = taskObj[index].MobileNum;
  Age.value = taskObj[index].AgeOfUser;

  SubmitBtn.style.display = "none";
  savetaskbtn.style.display = "block";
}

function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

let searchBox = document.getElementById("searchbox");

searchBox.addEventListener("input", function () {
  let trlist = document.querySelectorAll("tr");

  Array.from(trlist).forEach(function (item) {
    let searchedtext = item.getElementsByTagName("td")[2].innerText;

    console.log(searchedtext);

    let searchboxVal = searchBox.value;
    let re = new RegExp(searchboxVal, "gi");
    if (searchedtext.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});

function showtask2(taskObj) {
  let html = "";
  const second_table = document.getElementById("second_table");
  taskObj.forEach((item, index) => {
    html += `<tr>   
                    <td> ${item.NameOfUser} </td>
                    <td> ${item.DateOfBirth} </td>
                    <td> ${item.PannumberOfUser} </td>
                    <td> ${item.MobileNum} </td>
                    <td> ${item.AgeOfUser} </td>
                    <td><button type="button" onclick="edittask(${index})" class="text_primary button-89" role="button"">  Edit</button>
                    <button type="button" onclick="deleteitem (${index})" class="text_danger button-89" role="button""> Delete</button>
                    </td>
                </tr>`;
  });
  second_table.innerHTML = html;
}

function sortingByName() {
  console.log("ko");
  // e.preventDefault();

  if (ATOZ.innerText == "A-Z") {
    function ascending(a, b) {
      if (a.NameOfUser < b.NameOfUser) {
        // console.log(a.NameOfUser)
        return -1;
      }
      if (a.NameOfUser > b.NameOfUser) {
        return 1;
      }
      return 0;
    }
    taskObj.sort(ascending);
    // console.log( taskObj)
    // taskObj.map((obj)=>{
    showtask2(taskObj);
    // })
  }
}

function sortingByName2() {
  if (ZTOA.innerText == "Z-A") {
    function descending(a, b) {
      if (a.NameOfUser < b.NameOfUser) {
        return 1;
      }
      if (a.NameOfUser > b.NameOfUser) {
        return -1;
      }
      return 0;
    }
    taskObj.sort(descending);

    showtask2(taskObj);
  }
}

// let filterAtoZ = document.getElementById("atoz");
// let desc = false;

//  filterAtoZ.addEventListener('click', ()=>{
//     let array = sort_array_by(taskObj, 'NameOfUser', desc);

//     // showtask(array);

//     desc = !desc;
//  });

//  function sort_array_by (array, sort, desc){
//     array.sort(function(a,b){
//         if(a[sort] < b[sort]) return -1;
//         if(a[sort] < b[sort]) return 1;
//         return 0;
//     });

//     if(desc) array.reverse();

//     return array;
//  }

// let filterAtoZ = document.getElementById("atoz");

// filterAtoZ.addEventListener( "click", sortOn (taskObj,  NameOfUser) {
//     arr.sort(function (a, b) {

//         if (a[prop] < b[prop]) {
//           return -1;
//         } else if (a[prop] > b[prop]) {
//           return 1;
//         } else {
//           return 0;
//         }

//       })
//  })
