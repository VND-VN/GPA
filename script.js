let courseCount = 1;

function addCourse() {
  courseCount++;

  const coursesDiv = document.getElementById('courses');

  const newCourseDiv = document.createElement('div');
  newCourseDiv.classList.add('course');

  newCourseDiv.innerHTML = `
    <label for="course${courseCount}GPA">Course ${courseCount} GPA (out of 10):</label>
    <input type="number" class="originalGPA" min="0" max="10" step="0.1" required oninput="calculateIndividualGPA(this)">
    <label for="course${courseCount}Credits">Credits:</label>
    <input type="number" class="credits" min="1" required>
    <span class="convertedGPA"></span>
    <button onclick="removeCourse(this)">Remove</button>
  `;

  coursesDiv.appendChild(newCourseDiv);
}

function removeCourse(button) {
  const courseDiv = button.parentElement;
  courseDiv.remove();
}

function calculateIndividualGPA(input) {
  const courseDiv = input.parentElement;
  const originalGPA = parseFloat(input.value);
  const credits = parseFloat(courseDiv.querySelector('.credits').value);
  const convertedGPAElement = courseDiv.querySelector('.convertedGPA');

  let convertedGPA;

  if (originalGPA >= 8.5 && originalGPA <= 10) {
    convertedGPA = 4;
  } else if (originalGPA >= 8.0 && originalGPA < 8.5) {
    convertedGPA = 3.5;
  } else if (originalGPA >= 7.0 && originalGPA < 8.0) {
    convertedGPA = 3;
  } else if (originalGPA >= 6.0 && originalGPA < 7.0) {
    convertedGPA = 2.5;
  } else if (originalGPA >= 5.5 && originalGPA < 6.0) {
    convertedGPA = 2;
  } else if (originalGPA >= 5.0 && originalGPA < 5.5) {
    convertedGPA = 1.5;
  } else if (originalGPA >= 4.0 && originalGPA < 5.0) {
    convertedGPA = 1;
  } else {
    convertedGPA = 0; // Điểm dưới 4
  }

  const calculatedGPA = convertedGPA.toFixed(2);
  convertedGPAElement.innerText = `Converted GPA (out of 4): ${calculatedGPA}`;
}

function calculateTotalGPA() {
  const convertedGPAs = document.querySelectorAll('.convertedGPA');
  let totalConvertedGPA = 0;
  let totalCredits = 0;

  convertedGPAs.forEach(convertedGPAElement => {
    const text = convertedGPAElement.innerText.split(': ');
    const convertedGPA = parseFloat(text[1]);
    totalConvertedGPA += convertedGPA;
    totalCredits++;
  });

  const finalGPA = totalConvertedGPA / totalCredits;
  document.getElementById('totalGPA').innerText = `Your GPA (out of 4) is: ${finalGPA.toFixed(2)}`;
}
