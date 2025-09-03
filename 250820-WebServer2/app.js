import chalk from "chalk";
import fs from "fs";
 
const msg = "A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.)";
 
// console.log(chalk.bgRed("Olá mundo"));
// console.log(chalk.bgGreenBright.blue("Olá mundo2"));
 
// const palavra = chalk.green("Aqui tem um texto");
 
// function texto (string){
//     return string;
// }
 
function trataErro(erro){
    throw new Error(chalk.bgRed.white(erro.code, "Erro detectado..."));
}
 
function extraiLinks(msg){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultados = [];
 
    let temp;
    while((temp = regex.exec(msg)) != null){
        arrayResultados.push({[temp[1]]:[temp[2]]})
    }
    return arrayResultados.length === 0 ? "Não ha links" : arrayResultados;
}
 
pegaArquivo("./arquivos/texto.md");
 
/*CALLBACK
 function pegaArquivoCallback(caminhoArquivo){
     const encoding = "utf-8";
     fs.readFile(caminhoArquivo,encoding, (erro, texto) => {
         if(erro){
             trataErro(erro);
         }
         console.log(chalk.green(texto));
     })
 }
pegaArquivoCallback("./arquivos/texto.md");
*/
//Asyn Await
async function pegaArquivo(caminhoArquivo) {
     const encoding = "utf-8";
     try{
         const texto = await fs.promises.readFile(caminhoArquivo, encoding);
         return(extraiLinks(texto));
     }
     catch(erro){
         trataErro(erro);
     }
 }
// pegaArquivo("./arquivos/texto.md");
 
export default pegaArquivo;
 
/*PROMISSES
// function pegaArquivo(caminhoArquivo){
//     const encoding = "utf-8";
//     fs.promises
//     .readFile(caminhoArquivo, encoding)
//     .then((texto) => console.log(chalk.bgMagenta(texto)))
//     .catch((erro) => trataErro(erro));
// }
pegaArquivo("./arquivos/texto.md");
*/
 
 