const btnFront = document.getElementById("btnFront");
const btnBack = document.getElementById("btnBack");

const front = document.querySelector(".front");
const back = document.querySelector(".back");

btnFront.addEventListener("click", () => {
  front.classList.add("active");
  back.classList.remove("active");
});

btnBack.addEventListener("click", () => {
  back.classList.add("active");
  front.classList.remove("active");
});

let students = [];
let currentStudentIndex = 0;

const spreadsheetFile = document.getElementById("spreadsheetFile");
const generateFile = document.getElementById("generateFile");

generateFile.addEventListener("click", () => {
  const file = spreadsheetFile.files[0];

  if (!file) {
    alert("Selecione uma planilha primeiro");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    students = XLSX.utils.sheet_to_json(worksheet);

    console.log(students);

    currentStudentIndex = 0;

    if (students.length > 0) {
      fillDiploma(students[currentStudentIndex]);
    }
  };

  reader.readAsArrayBuffer(file);
});

function isMale(gender) {
  const formatted = String(gender).trim().toLowerCase();

  return (
    formatted === "true" ||
    formatted === "m" ||
    formatted === "male" ||
    formatted === "masculino"
  );
}

function setTextByGenderAndDegreeType(gender, degree) {
  const formattedDegree = String(degree).trim().toLowerCase();
  const isMaleStudent = isMale(gender);

  let degreeTitle = "";

  if (formattedDegree === "bachelor" || formattedDegree === "bacharelado") {
    degreeTitle = isMaleStudent ? "Bacharel" : "Bacharela";
  }

  if (formattedDegree === "licentiate" || formattedDegree === "licenciatura") {
    degreeTitle = isMaleStudent ? "Licenciado" : "Licenciada";
  }

  return {
    gender: isMaleStudent,
    words: {
      birth: isMaleStudent ? "nascido" : "nascida",
      holder: isMaleStudent ? "portador" : "portadora",
      graduate: isMaleStudent ? "Diplomado" : "Diplomada",
      nationality: isMaleStudent ? "Brasileiro" : "Brasileira"
    },
    degreeTitle
  };
}

function fillDiploma(student) {
  const texts = setTextByGenderAndDegreeType(
    student.gender,
    student.degree
  );

  // Diploma frente
  document.querySelector(".academicDegree").textContent = texts.degreeTitle;
  document.querySelector(".program").textContent = student.program;
  document.querySelector(".student-name").textContent = student.name;

  document.querySelector(".end-date").textContent = student.conclusionDate;
  document.querySelector(".graduation-date").textContent = student.graduationDate;
  document.querySelector(".issue-date").textContent = student.issueDate;

  document.querySelector(".nationality").textContent = texts.words.nationality;
  document.querySelector(".birth-gender").textContent = texts.words.birth;
  document.querySelector(".birth-state").textContent = student.birthState;
  document.querySelector(".birth-date").textContent = student.birthDate;
  document.querySelector(".holder-gender").textContent = texts.words.holder;

  document.querySelector(".document-type").textContent = student.documentType;
  document.querySelector(".document-number").textContent = student.documentNumber;
  document.querySelector(".issuing-authority").textContent =
    student.issuingAuthority;

  document.querySelector(".graduate-signature p").textContent =
    texts.words.graduate;

  // Diploma verso
  document.querySelector(".program-back").textContent = student.program;
  document.querySelector(".back-degree-type").textContent = student.degree;
  document.querySelector(".accreditation").textContent = student.accreditation;
}