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

function setTextByGenderAndDegreeType(gender, degree) {
  const formattedGender = gender.trim().toLowerCase();
  const formattedDegree = degree.trim().toLowerCase();

  const isMale =
    formattedGender === "m" || formattedGender === "masculino";

  let degreeTitle = "";

  if (formattedDegree === "bacharelado") {
    degreeTitle = isMale ? "Bacharel" : "Bacharela";
  }

  if (formattedDegree === "licenciatura") {
    degreeTitle = isMale ? "Licenciado" : "Licenciada";
  }

  return {
    birth: isMale ? "nascido" : "nascida",
    holder: isMale ? "portador" : "portadora",
    graduate: isMale ? "Diplomado" : "Diplomada",
    nationality: isMale ? "Brasileiro" : "Brasileira",
    degreeTitle: degreeTitle
  };
}

function fillDiploma(student) {
  const texts = setTextByGenderAndDegreeType(
    student.gender,
    student.degree
  );

  document.querySelector(".academicDegree").textContent = texts.degreeTitle;
  document.querySelector(".program").textContent = student.program;
  document.querySelector(".student-name").textContent = student.name;

  document.querySelector(".end-date").textContent = student.startDate;
  document.querySelector(".graduation-date").textContent = student.endDate;
  document.querySelector(".issue-date").textContent = student.issueDate;

  document.querySelector(".nationality").textContent = texts.nationality;
  document.querySelector(".birth-gender").textContent = texts.birth;
  document.querySelector(".birth-state").textContent = student.birthState;
  document.querySelector(".birth-date").textContent = student.birthDate;
  document.querySelector(".holder-gender").textContent = texts.holder;
  document.querySelector(".document-type").textContent = student.documentType;
  document.querySelector(".document-number").textContent = student.documentNumber;
  document.querySelector(".issuing-authority").textContent =
    student.issuingAuthority;

  document.querySelector(".graduate-signature p").textContent = texts.graduate;

  document.querySelector(".program-back").textContent = student.program;
  document.querySelector(".back-degree-type").textContent = student.degree;
  document.querySelector(".accreditation").textContent = student.accreditation;
}

const testStudent = {
  name: "Maria Eduarda Silva",
  gender: "feminino",
  degree: "bacharelado",
  program: "Sistemas de Informação",
  birthState: "Minas Gerais",
  birthDate: "11 de janeiro de 1996",
  documentType: "RG",
  documentNumber: "MG-18.743.162",
  issuingAuthority: "PC-MG",
  startDate: "01/01/2024",
  endDate: "01/03/2024",
  issueDate: "20 de dezembro de 2025",
  accreditation:
    "Renovação de Reconhecimento – Resolução SEE nº 4.787, de 09/11/2022, publicado em 11/11/2022."
};

fillDiploma(testStudent);