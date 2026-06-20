const btnFront = document.getElementById("btnFront");
const btnBack = document.getElementById("btnBack");

const front = document.querySelector(".front");
const back = document.querySelector(".back");

const spreadsheetFile = document.getElementById("spreadsheetFile");
const generateFile = document.getElementById("generateFile");

const previousStudent = document.getElementById("previousStudent");
const nextStudent = document.getElementById("nextStudent");

const downloadFile = document.getElementById("downloadFile");

let students = [];
let currentStudentIndex = 0;

btnFront.addEventListener("click", () => {
  front.classList.add("active");
  back.classList.remove("active");
});

btnBack.addEventListener("click", () => {
  back.classList.add("active");
  front.classList.remove("active");
});

previousStudent.addEventListener("click", () => {
  if (students.length === 0) {
    alert("Nenhuma planilha carregada.");
    return;
  }

  if (currentStudentIndex > 0) {
    currentStudentIndex--;
    fillDiploma(students[currentStudentIndex]);
    updateStudentCounter();
  }
});

nextStudent.addEventListener("click", () => {
  if (students.length === 0) {
    alert("Nenhuma planilha carregada.");
    return;
  }

  if (currentStudentIndex < students.length - 1) {
    currentStudentIndex++;
    fillDiploma(students[currentStudentIndex]);
    updateStudentCounter();
  }
});

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

    const studentsSheet = workbook.Sheets["Alunos"];
    const coursesSheet = workbook.Sheets["Cursos"];

    if (!studentsSheet) {
      alert("A aba 'Alunos' não foi encontrada na planilha.");
      return;
    }

    if (!coursesSheet) {
      alert("A aba 'Cursos' não foi encontrada na planilha.");
      return;
    }

    const courses = XLSX.utils.sheet_to_json(coursesSheet);

    students = XLSX.utils.sheet_to_json(studentsSheet).map((student) => {
      const course = courses.find((course) => {
        return (
          String(course.program).trim().toLowerCase() ===
          String(student.program).trim().toLowerCase()
        );
      });

      return {
        ...student,
        accreditation: course ? course.accreditation : "",
        degree: student.degree || (course ? course.degree : "")
      };
    });

    console.log(students);

    currentStudentIndex = 0;

    if (students.length > 0) {
      fillDiploma(students[currentStudentIndex]);
      updateStudentCounter();
    }
  };

  reader.readAsArrayBuffer(file);
});

downloadFile.addEventListener("click", () => {
  if (students.length === 0) {
    alert("Nenhum aluno carregado.");
    return;
  }

  const student = students[currentStudentIndex];

  // Clona a frente e o verso
  const frontPage = document.querySelector(".front").cloneNode(true);
  const backPage = document.querySelector(".back").cloneNode(true);

  // Força as duas páginas a aparecerem
  frontPage.classList.add("active");
  backPage.classList.add("active");

  frontPage.style.display = "block";
  backPage.style.display = "block";

  // Cria container temporário
  const pdfContainer = document.createElement("div");

  frontPage.style.pageBreakAfter = "always";

  pdfContainer.appendChild(frontPage);
  pdfContainer.appendChild(backPage);

  const options = {
    margin: 0,
    filename: `${student.name}.pdf`,
    image: {
      type: "jpeg",
      quality: 1
    },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "landscape"
    }
  };

  html2pdf()
    .set(options)
    .from(pdfContainer)
    .save();
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
  function formatDate(dateValue) {
  if (!dateValue) return "";

  let date;

  if (typeof dateValue === "number") {
    date = XLSX.SSF.parse_date_code(dateValue);
    date = new Date(date.y, date.m - 1, date.d);
  } else {
    const parts = String(dateValue).split("/");

    if (parts.length === 3) {
      date = new Date(parts[2], parts[1] - 1, parts[0]);
    } else {
      return dateValue;
    }
  }

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

  document.querySelector(".academicDegree").textContent = texts.degreeTitle;
  document.querySelector(".program").textContent = student.program;
  document.querySelector(".student-name").textContent = student.name;

  document.querySelector(".end-date").textContent = formatDate(student.conclusionDate);
  document.querySelector(".graduation-date").textContent = formatDate(student.graduationDate);
  document.querySelector(".issue-date").textContent = formatDate(student.issueDate);


  document.querySelector(".nationality").textContent = texts.words.nationality;
  document.querySelector(".birth-gender").textContent = texts.words.birth;
  document.querySelector(".birth-state").textContent = student.birthState;
  document.querySelector(".birth-date").textContent = formatDate(student.birthDate);
  document.querySelector(".holder-gender").textContent = texts.words.holder;

  document.querySelector(".document-type").textContent = student.documentType;
  document.querySelector(".document-number").textContent = student.documentNumber;
  document.querySelector(".issuing-authority").textContent = student.issuingAuthority;

  document.querySelector(".graduate-signature p").textContent = texts.words.graduate;

  document.querySelector(".program-back").textContent = student.program;
  document.querySelector(".back-degree-type").textContent = formatDegreeLabel
  (student.degree);
  document.querySelector(".accreditation").textContent = student.accreditation || "Reconhecimento não informado.";
}

function formatDegreeLabel(degree) {
  const formattedDegree = String(degree).trim().toLowerCase();

  if (formattedDegree === "bachelor" || formattedDegree === "bacharelado") {
    return "Bacharelado";
  }

  if (formattedDegree === "licentiate" || formattedDegree === "licenciatura") {
    return "Licenciatura";
  }

  return degree;
}

function updateStudentCounter() {
  document.getElementById("studentCounter").textContent =
    `Aluno ${currentStudentIndex + 1} de ${students.length}`;
}