import { count } from "./count.js";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";


let pdfinput = document.querySelector(".selectpdf"); 
let pwd = document.querySelector(".pwd"); 
let upload = document.querySelector(".upload"); 
let afterupload = document.querySelector(".afterupload"); 
let select = document.querySelector("select"); 
let pdftext = document.querySelector("#text"); 

var modal = document.getElementById("modal");


upload.addEventListener("click", () => {
  let file = pdfinput.files[0]; 
  if (file != undefined && file.type == "application/pdf") {
    alltext = []; 
    select.innerHTML = ""; 
    let fr = new FileReader(); 
    fr.readAsDataURL(file); 
    fr.onload = () => {
      let res = fr.result; 
      console.log("carregando");
      modal.style.display = "block";

      if (pwd.value == "") {
        extractText(res, false); 
      } else {
        extractText(res, true); 
      }
    };
  } else {
    alert("Selecione um PDF válido!");
  }
});

let alltext = []; 


async function extractText(url) {
  try {
    let pdf;
    try {
      pdf = await pdfjsLib.getDocument({ url: url, password: pwd.value })
        .promise;
    } catch (err) {
      if (err.name === "PasswordException") {
        if (pwd.value) {
          alert("Senha incorreta, tente novamente...");
          modal.style.display = "none";
        } else {
          alert("Este PDF requer uma senha.");
          modal.style.display = "none";
        }
        return;
      } else {
        throw err; 
      }
    }
    let pages = pdf.numPages; 

    for (let i = 1; i <= pages; i++) {
      let page = await pdf.getPage(i); 
      let txt = await page.getTextContent(); 
      let text = txt.items.map((s) => s.str).join(""); 
      alltext.push(text); 

      select.innerHTML += `<option value="${i}">${i}</option>`; 
    }

    select.innerHTML += `<option value="all">Todas</option>`; 

    afterProcess(); 
  } catch (err) {
    alert(err.message);
  }
}

select.addEventListener("change", afterProcess); 


function afterProcess() {
  if (select.value === "all") {
    pdftext.value = alltext.join("\n\n");
  } else {
    pdftext.value = alltext[select.value - 1];
  }
  afterupload.style.display = "flex";
  count();
  pdfinput.value = "";
  pwd.value = "";
  console.log("carregado finalizado");
  modal.style.display = "none";
}
