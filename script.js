window.onload = function(){
    displayandGetAmount()
}

    const range = document.getElementById("amountOfGroups").oninput = function(){
        displayandGetAmount();

    }




    function displayandGetAmount(){
        let number = document.getElementById("amountOfGroups").value
        const numberOfTeams = document.getElementById("numberOfTeams")
        numberOfTeams.innerText = number;
        return +number
    }


    const addBtn = document.querySelector(".addBtn")

    addBtn.addEventListener("click",addStudentToList)

    function addStudentToList(){
        const name = document.getElementById("name")
        const studentList = document.getElementById("list-of-students");
        let classesToAdd = ["list-group-item","rounded","newStudent"]

        const newStudent = document.createElement("li")
        newStudent.innerText = name.value
        newStudent.classList.add(...classesToAdd)
        studentList.appendChild(newStudent)
        
        if(name.value === ''){
            return null
        }

    }

const assignTeams = document.getElementById("assigToTeams")

assignTeams.addEventListener("click",assignStudentsToTeams)

    function assignStudentsToTeams(){
        const studentList = document.querySelectorAll(".newStudent");
        const studentArray = []

        if(studentList.length !=0){
            for(let student of studentList){
                studentArray.push(student.nodeValue)
            }
        }

        //-- add to student array
        console.log(studentList);
    
    }
    assignStudentsToTeams()