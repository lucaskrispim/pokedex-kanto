
let classes; // vetor de objetos que irá guardar nomes de classes e urls delas 
let x; // variavél temporária 
let option; // variavél temporária que guarda os options
let url;  // variavél temporária que guarda os url
let temp; // vetor temporários que guarda nomes e urls de vários pokémons

function zeraTudo(){  // Zera os valores de atributos do pokémon no html
    document.getElementById("vf").innerHTML=" ";
    document.getElementById("vt").innerHTML=" ";
    document.getElementById("detalhes").innerHTML=" ";
    document.getElementById("nomePokemon").innerHTML=" ";
    document.getElementById("nomePokemon2").innerHTML=" ";
    document.getElementById("alturaPokemon").innerHTML=" ";
    document.getElementById("alturaPokemon2").innerHTML=" ";
    document.getElementById("pesoPokemon").innerHTML="";
    document.getElementById("pesoPokemon2").innerHTML=" ";
    document.getElementById("experienciaPokemon").innerHTML=" ";
    document.getElementById("experienciaPokemon2").innerHTML= " ";
    document.getElementById('myImg1').removeAttribute('src');
    document.getElementById('myImg2').removeAttribute('src');
}

function zeraSelect(string){
    x = document.getElementById(string);
    for(let i=x.length-1;i >=0;i--){
        x.remove(i); 
    }
    option = document.createElement("option");

    option.selected=true;
    option.disabled=true;
    option.hidden=true;
    option.text = "Escolha";
    x.add(option);
}

function inicia(){ // Função que preenche os options do select do html com nome das classes de pokémon

    zeraTudo(); // Função chamada para limpar a tela no onload do body

    const hostname = 'https://pokeapi.co/api/v2/type/'; // url para ser acessada e trazer os nomes das classes de pokémons

    fetch(hostname)  // método para trazer os dados das classes via get
      .then(response => response.json() )  
      .then(data => {
    
        zeraSelect("select1") // função que retira os options dos selects no html
        
        for(let i=0; i<data.results.length-2;i++){ // Preenche os options do select de classes com nomes das classes
            x = document.getElementById("select1");
            option = document.createElement("option");
            option.text = data.results[i].name;
            x.add(option);
        }
        classes = data.results.slice(0, data.results.length-2); // guarda os nomes das classes e urls num array de objetos
      })  
      .catch(err => console.log(err));  
}

function getPokemon(){

    zeraTudo(); 
    zeraSelect("select2"); // remove os options do select de pokémons caso o select de classes tenha sido alterado

    for(let i=0; i<classes.length;i++){ // Encontra o url da classe selecionada
        if(classes[i].name==document.getElementById("select1").value){
          url = classes[i].url;
          break;
        };
      };

      
    fetch(url)  // Acessa a url via get para trazer os nomes e urls dos pokémons da classe escolhida
    .then(response => response.json())  
    .then(data => {
        temp=[];
        for (let i=0;i<data.pokemon.length;i++){ // preenche o select de nomes de pokémons com aqueles pokémons de id<152 (região de kanto)
            num = data.pokemon[i].pokemon.url.split("/") // faz split da url
            if( num[num.length-2]<152 ){ // só pega pokémons de id<152 (região de kanto)
                temp.push(data.pokemon[i].pokemon) // Adiciona num vetor o objeto nome e url do pokémon
                x = document.getElementById("select2"); // Adiciona nos options do select de nome de pokémons 
                option = document.createElement("option");
                option.text = data.pokemon[i].pokemon.name;
                x.add(option);
            }
        } 
        })   
    .catch(err => console.log(err));  
}

function showPokemon(){


    for(let i=0; i<temp.length;i++){ // encontra url do pokémon selecionado
        if(temp[i].name==document.getElementById("select2").value){
          url = temp[i].url;
          break;
        };
      };
      
    fetch(url)  // Acessa a url via get para trazer os imagens e atributos dos pokémons da classe escolhida 
      .then(response => response.json())  
      .then(data => {
        document.getElementById("vf").innerHTML="Vista frontal"; // adiciona os atributos e fotos em componentes html
        document.getElementById("vt").innerHTML="Vista Trazeira";
        document.getElementById("detalhes").innerHTML="Detalhes";
        document.getElementById("nomePokemon").innerHTML="Nome";
        document.getElementById("nomePokemon2").innerHTML=data.name;
        document.getElementById("alturaPokemon").innerHTML="Altura";
        document.getElementById("alturaPokemon2").innerHTML=data.height;
        document.getElementById("pesoPokemon").innerHTML="Peso";
        document.getElementById("pesoPokemon2").innerHTML=data.weight;
        document.getElementById("experienciaPokemon").innerHTML="Base de experiência";
        document.getElementById("experienciaPokemon2").innerHTML= data.base_experience;

        document.getElementById("myImg1").src = data.sprites.front_default // adciona fotos frontal no html
        document.getElementById("myImg2").src = data.sprites.back_default // adciona fotos frontal no html
        })   
      .catch(err => console.log(err));  
    


}