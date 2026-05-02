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

function isMale(gender) {
  const formatted = gender.trim().toLowerCase();
  return formatted === "m" || formatted === "male" || formatted === "masculino";
}

function setTextByGenderAndDegreeType(gender, degree) {
  const formattedDegree = degree.trim().toLowerCase();
  const isMaleStudent = isMale(gender);


  let degreeTitle = "";

  if (formattedDegree === "bachelor") {
    degreeTitle = isMaleStudent ? "Bacharel" : "Bacharela";
  }

  if (formattedDegree === "licentiate") {
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

  document.querySelector(".end-date").textContent = student.endDate;
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

  document.querySelector(".graduate-signature p").textContent = texts.words.graduate;

  // Diploma verso
  document.querySelector(".program-back").textContent = student.program;
  document.querySelector(".degree-back").textContent = student.degree;
  document.querySelector(".accreditation").textContent = student.accreditation;
}

const testStudent = {
  name: "Maria Eduarda Silva",
  gender: "feminino",
  degree: "bachelor",
  program: "Sistemas de Informação",
  birthState: "Minas Gerais",
  birthDate: "11 de janeiro de 1996",
  documentType: "RG",
  documentNumber: "MG-18.743.162",
  issuingAuthority: "PC-MG",
  endDate: "01/03/2024",
  graduationDate: "19 de dezembro de 2025",
  issueDate: "20 de dezembro de 2025",
  accreditation:
    "Renovação de Reconhecimento – Resolução SEE nº 4.787, de 09/11/2022, publicado em 11/11/2022."
};

fillDiploma(testStudent);