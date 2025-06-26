document.addEventListener("DOMContentLoaded", function() {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-level");
    const mediumLabel = document.getElementById("medium-level");
    const hardLabel = document.getElementById("hard-level");
    const cardStatsContainer = document.querySelector(".stats-cards");
    
    //return true or false based on a regex
    function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

//     const fetchUserDetails= async()=>{
//         if(validateUsername(usernameInput))
//             try{response=await Promise(fetch(`https://leetcode-api-faisalshohag.vercel.app/${usernameInput}`));
//         const parsedData=response.JSON();
// }
//         catch (error) {
//             console.error("Error fetching data:", error);
//             setError("An error occurred || LeetCode Server Down");
//           } finally {
//             setLoading(false);
//           }
//     }

   async function fetchUserDetails(username)
   {
    
 try{
        searchButton.textContent="searching...";
        searchButton.disabled=true;
        const response =await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        // console.log(response);
        
        if(!response.ok)
        {
            throw new Error("unable to fetch the user details");
        }
        const data=await response.json();
        console.log(data);
        displayUserData(data);
        
       
        
     }
     catch(error)
     {
        console.log(error);
        
     }
     finally{
        searchButton.textContent="search...";
        searchButton.disabled=false;
     }
   }
   
function displayUserData(data)
{
    const totalHardQues=data.totalHard;
    const totalmedQues=data.totalMedium
    const totalEasyQues=data.totalEasy;
    const total=data.totalSolved;
    // const totalsolved
    const easy=data.easySolved;
    const medium=data.mediumSolved;
    const hard=data.hardSolved;
    // console.log(easy,totalEasyQues);
    // console.log(medium,totalmedQues);
    // console.log(hard,totalHardQues);
    
    updateProgress(easy,totalEasyQues,easyLabel,easyProgressCircle);
    updateProgress(medium,totalmedQues,mediumLabel,mediumProgressCircle);
    updateProgress(hard,totalHardQues,hardLabel,hardProgressCircle);
      const cardsData = [
            {label: "Overall Submissions", value:data.totalSubmissions[0].submissions },
            {label: "Overall Easy Submissions", value:data.totalSubmissions[1].submissions },
            {label: "Overall Medium Submissions", value:data.totalSubmissions[2].submissions },
            {label: "Overall Hard Submissions", value:data.totalSubmissions[3].submissions },
        ];
        console.log(cardStatsContainer);
         cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                    </div>`
        ).join("")
     
    
}
function updateProgress(solved,total,label,circle)
{
    const progressDegree=(solved/total)*100;
    console.log(solved,total,progressDegree);
    
    circle.style.setProperty("--progress-degree",`${progressDegree}%`);
    label.textContent=`${solved}/${total}`;
}


    

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("logggin username: ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })

})