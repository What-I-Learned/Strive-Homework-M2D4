window.onload = function () {
  displayandGetAmount();
  generateTeamContainers();
};

// some animation for team amount element
function animationTranslateXLeft(element) {
  element.animate(
    [
      // keyframes
      { transform: "translateY(-30px)" },
      { transform: "translateY(0px)" },
    ],
    {
      // timing options
      duration: 200,
      iterations: 1,
    }
  );
}

function animationTranslateYUp(element) {
  element.animate(
    [
      // keyframes

      { transform: "translateY(30px)" },
      { transform: "translateY(0px)" },
    ],
    {
      // timing options
      duration: 200,
      iterations: 1,
    }
  );
}

// display number of teams
function displayandGetAmount() {
  let number = document.getElementById("amountOfGroups").value;
  const numberOfTeams = document.querySelector("#numberOfTeams h5");
  numberOfTeams.innerText = number;
  if (number != 1) {
    animationTranslateYUp(numberOfTeams);
  }

  return +number;
}

const addBtn = document.querySelector(".addBtn");
const nameInput = document.getElementById("name");
const range = document.getElementById("amountOfGroups");
const assignToteamBtn = document.getElementById("randomlySelectAndAssign");
const studentList = document.getElementById("list-of-students");

let studentArray = [];

range.addEventListener("input", generateTeamContainers);
// add names to the list
addBtn.addEventListener("click", addStudentToList);
nameInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && nameInput.value !== "") {
    addStudentToList();
  }
});
assignToteamBtn.addEventListener("click", assignToteam);

// add students function
function addStudentToList() {
  let classesToAdd = ["list-group-item", "rounded", "newStudent"];
  if (nameInput.value !== "") {
    const newStudent = document.createElement("li");
    newStudent.classList.add(...classesToAdd);
    newStudent.innerText = nameInput.value;
    studentList.appendChild(newStudent);
    studentArray.push(newStudent.innerText);
    animationTranslateXLeft(newStudent);
    nameInput.value = "";
  }
}

function generateTeamContainers() {
  const teams = document.getElementById("teams");
  console.log(teams);
  //-- amount of teams
  let amountOfTeams = displayandGetAmount();

  let divClassesToAdd = ["col-xl-3", "col-md-4", "col-sm-6", "team-card"];
  let subDivClassesToAdd = ["card", "shadow-sm"];
  let carClassToAdd = "card-header";

  let ulClassesToAdd = ["list-group", "list-group-flush"];
  // let liClassesToAdd = "list-group-item"
  teams.innerHTML = "";

  for (let i = 0; i < amountOfTeams; i++) {
    const newTeam = document.createElement("div");
    const newTeamCard = document.createElement("div");
    const newCardHeader = document.createElement("div");
    const newList = document.createElement("ul");

    newTeam.classList.add(...divClassesToAdd);
    newTeamCard.classList.add(...subDivClassesToAdd);
    newList.classList.add(...ulClassesToAdd);
    newCardHeader.classList.add("card-header");
    newCardHeader.innerText = `Team ${i + 1}`;
    teams.appendChild(newTeam);
    newTeam.appendChild(newTeamCard);
    newTeamCard.appendChild(newCardHeader);
    newTeamCard.appendChild(newList);
  }
}
//generateTeamContainers()

// take a random student from the array
function assignToteam() {
  // if array of students is not Empty
  if (studentArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * studentArray.length);
    let randomStudent = studentArray.splice(randomIndex, 1);
    let teams = document.querySelectorAll(".team-card");
    let randomTeam = teams[Math.floor(Math.random() * teams.length)];
    console.log(randomTeam);
    // select list container
    let list = randomTeam.getElementsByClassName("list-group")[0];
    console.log(list);
    // create containers
    let listItem = document.createElement("li");
    let deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", function () {
      this.parentNode.parentNode.removeChild(listItem);

      // this needs refracturing and should be a function
      let classesToAdd = ["list-group-item", "rounded", "newStudent"];
      const newStudent = document.createElement("li");
      newStudent.classList.add(...classesToAdd);
      newStudent.innerText = randomStudent;
      studentList.appendChild(newStudent);
      studentArray.push(newStudent.innerText);
      animationTranslateXLeft(newStudent);
    });
    //add class
    listItem.classList.add("list-group-item");
    listItem.innerText = randomStudent;
    // add delete button on hover to the list item
    // remove element
    let studentToRemove = document.querySelectorAll(".newStudent")[randomIndex];
    studentList.removeChild(studentToRemove);
    // append
    list.appendChild(listItem);
    listItem.appendChild(deleteBtn);
  } else {
    alert("Empty list");
  }
}

// just additional function that doesn't work
// //-- everything should happend with the button click
// function splitIntoTeams() {
//   let studentArray = generateStudentArray();
//   let numberOfTeams = displayandGetAmount();
//   let amountOfStudents = studentArray.length;

//   let limit = Math.round(amountOfStudents / numberOfTeams);

//   //-- array to hold all teams
//   let teams = [];

//   //-- check that there are more students than teams
//   if (studentArray.length > numberOfTeams) {
//     //-- make as many arrays as there are teams
//     for (let i = 0; i < numberOfTeams; i++) {
//       teams[i] = [];
//       //-- make teams
//       for (let b = 0; b <= amountOfStudents; b++) {
//         let getRandomStudent = Math.floor(Math.random() * amountOfStudents);
//         if (
//           teams[i].indexOf(studentArray[getRandomStudent]) == -1 &&
//           teams[i].length < 6
//         ) {
//           teams[i].push(studentArray[getRandomStudent]);
//           studentArray.splice(getRandomStudent, 1);
//           amountOfStudents = studentArray.length;
//         }
//       }
//     }
//   }

//   console.log(teams);
//   console.log(studentArray);
// }
