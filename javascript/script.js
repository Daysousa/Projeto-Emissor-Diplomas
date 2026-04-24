const btnFrente = document.getElementById("btnFrente");
const btnVerso = document.getElementById("btnVerso");

const anverso = document.querySelector(".anverso");
const verso = document.querySelector(".verso");

btnFrente.addEventListener("click", () => {
  anverso.classList.add("ativo");
  verso.classList.remove("ativo");
});

btnVerso.addEventListener("click", () => {
  verso.classList.add("ativo");
  anverso.classList.remove("ativo");
});

function definirTextoPorGeneroEModalidade(genero, modalidade) {
  const generoFormatado = genero.trim().toLowerCase();
  const modalidadeFormatada = modalidade.trim().toLowerCase();

  const masculino =
    generoFormatado === "m" || generoFormatado === "masculino";

  let titulacao = "";

  if (modalidadeFormatada === "bacharelado") {
    titulacao = masculino ? "Bacharel" : "Bacharela";
  }

  if (modalidadeFormatada === "licenciatura") {
    titulacao = masculino ? "Licenciado" : "Licenciada";
  }

  return {
    nascimento: masculino ? "nascido" : "nascida",
    portador: masculino ? "portador" : "portadora",
    diplomado: masculino ? "Diplomado" : "Diplomada",
    nacionalidade: masculino ? "Brasileiro" : "Brasileira",
    titulacao: titulacao
  };
}

function preencherDiploma(aluno) {
  const textos = definirTextoPorGeneroEModalidade(
    aluno.genero,
    aluno.modalidade
  );

  document.querySelector(".titulacao").textContent = textos.titulacao;
  document.querySelector(".curso").textContent = aluno.curso;
  document.querySelector(".nome-aluno").textContent = aluno.nome;

  document.querySelector(".data-inicio").textContent = aluno.dataInicio;
  document.querySelector(".data-fim").textContent = aluno.dataFim;
  document.querySelector(".data-emissao").textContent = aluno.dataEmissao;

  document.querySelector(".nacionalidade").textContent = textos.nacionalidade;
  document.querySelector(".nascimento-genero").textContent = textos.nascimento;
  document.querySelector(".estado-nascimento").textContent =
    aluno.estadoNascimento;
  document.querySelector(".data-nascimento").textContent =
    aluno.dataNascimento;
  document.querySelector(".portador-genero").textContent = textos.portador;
  document.querySelector(".tipo-documento").textContent = aluno.tipoDocumento;
  document.querySelector(".numero-documento").textContent =
    aluno.numeroDocumento;
  document.querySelector(".orgao-emissor").textContent = aluno.orgaoEmissor;

  document.querySelector(".assinatura-diplomado p").textContent =
    textos.diplomado;

  document.querySelector(".curso-verso").textContent = aluno.curso;
  document.querySelector(".modalidade-verso").textContent = aluno.modalidade;
  document.querySelector(".reconhecimento").textContent = aluno.reconhecimento;
}

const alunoTeste = {
  nome: "Maria Eduarda Silva",
  genero: "feminino",
  modalidade: "bacharelado",
  curso: "Sistemas de Informação",
  estadoNascimento: "Minas Gerais",
  dataNascimento: "11 de janeiro de 1996",
  tipoDocumento: "RG",
  numeroDocumento: "MG-18.743.162",
  orgaoEmissor: "PC-MG",
  dataInicio: "01/01/2024",
  dataFim: "01/03/2024",
  dataEmissao: "20 de dezembro de 2025",
  reconhecimento:
    "Renovação de Reconhecimento – Resolução SEE nº 4.787, de 09/11/2022, publicado em 11/11/2022."
};

preencherDiploma(alunoTeste);