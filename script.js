window.onload = function(){
    displayandGetAmount()
}


const range = document.getElementById("amountOfGroups")
range.addEventListener("input",displayandGetAmount)
        





function displayandGetAmount(){
        let number = document.getElementById("amountOfGroups").value
        const numberOfTeams = document.getElementById("numberOfTeams")
        numberOfTeams.innerText = number;
        return +number
}


const addBtn = document.querySelector(".addBtn")
const nameInput = document.getElementById("name")

addBtn.addEventListener("click",addStudentToList)
nameInput.addEventListener("keypress",function(e){
    if (e.key === 'Enter' && nameInput.value != ''){
        addStudentToList()
    }
})

function addStudentToList(){
        
        const studentList = document.getElementById("list-of-students");
        let classesToAdd = ["list-group-item","rounded","newStudent"]

        const newStudent = document.createElement("li")
        newStudent.classList.add(...classesToAdd)
        newStudent.innerText = nameInput.value
        studentList.appendChild(newStudent)
        nameInput.value = ''



    }


function generateTeamContainers(){

        const teams = document.getElementById("teams")
        //-- amount of teams
        let amountOfTeams =displayandGetAmount()

        let divClassesToAdd = ["col-xl-3","col-md-4","col-sm-6","team-card"]
        let subDivClassesToAdd = ["card","shadow-sm"]
        let carClassToAdd = "card-header"

        // let ulClassesToAdd = ["list-group","list-group-flush"]
        // let liClassesToAdd = "list-group-item"

        for(let i=0;i<amountOfTeams;i++){
            const newTeam = document.createElement("div");
            const newTeamCard = document.createElement("div");
            const newCardHeader = document.createElement("div")
            newTeam.classList.add(...divClassesToAdd)
            newTeamCard.classList.add(...subDivClassesToAdd)
            newCardHeader.classList.add("card-header")
            newCardHeader.innerText = `Team ${i+1}`
            teams.appendChild(newTeam)
            newTeam.appendChild(newTeamCard)
            newTeamCard.appendChild(newCardHeader)
        }

}
//generateTeamContainers()

const assignTeams = document.getElementById("assigToTeams")
assignTeams.addEventListener("click",function(){
    displayandGetAmount()
    generateTeamContainers()
    generateStudentArray()
    splitIntoTeams()
})



function generateStudentArray(){
        const studentList = document.querySelectorAll(".newStudent");
        const studentArray = []
        if(studentList.length !=0){
            for(let student of studentList){
                studentArray.push(student.innerText)
            }
        }else{
            console.log("Empty List");
        }
        return studentArray
    
}


//-- everything should happend with the button click
function splitIntoTeams(){
    let studentArray = generateStudentArray();
    let numberOfTeams = displayandGetAmount();
    let amountOfStudents = studentArray.length

    let limit= Math.round(amountOfStudents/numberOfTeams)
    
    //-- array to hold all teams
    let teams = []

    //-- check that there are more students than teams
    if(studentArray.length>numberOfTeams){
    //-- make as many arrays as there are teams
    for(let i=0;i<numberOfTeams;i++){
        teams[i]=[];
        //-- make teams
        for(let b=0;b<limit;b++){
            let getRandomStudent = Math.floor(Math.random()*amountOfStudents) 
            if(teams[i].indexOf(studentArray[getRandomStudent])==-1){
                teams[i].push(studentArray[getRandomStudent])
                studentArray.splice(getRandomStudent,1);
                amountOfStudents = studentArray.length
            }
            }           
    }
    }


    console.log(teams);
    console.log(studentArray);
}

