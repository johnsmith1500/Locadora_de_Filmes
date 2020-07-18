// This is a JavaScript file

//ações de mudança de tela
$(document).on("click","#listar", function(){
  $(location).attr("href","listar.html");
});

//ações do banco
$(document).on("click","#salvar",function(){
    var parametros = {
      "nome":$("#nome").val(),
      "ano":$("#ano").val(),
      "genero":$("#genero").val(),
      "classificacao":$("#classificacao").val(),   
      "sinopse":$("#sinopse").val()      
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://walled-ranks.000webhostapp.com/webservice/cadastrar.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
        $("#nome").val(""),
        $("#ano").val(""),
        $("#genero").val(""),
        $("#classificacao").val(""),       
        $("#sinopse").val("")    
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao cadastrar");
      }
    });
});

function listar(){
  $.ajax({
    type: "post",
    url: "https://walled-ranks.000webhostapp.com/webservice/listar.php",
    dataType:"json", //o que vai receber ou como vai receber
    success: function(data){
      var itemLista = "";
      $.each(data.filmes, function(i,dados){
        itemLista += "<option value="+dados.codigo+">"+dados.nome+"</option>";
      });
      $("#listaFilmes").html(itemLista);
    },
    error: function(data){
        navigator.notification.alert("Erro ao buscar registro");
      }
  });
}

$(document).on("change","#listaFilmes",function(){
  var parametros = {
    "codigo": $("option:selected",("#listaFilmes")).val()
  }

  $.ajax({
    type: "post",
    url: "https://walled-ranks.000webhostapp.com/webservice/listar-um-registro.php",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
        $("#codigo").val(data.filmes.codigo);
        $("#nome").val(data.filmes.nome);      
        $("#ano").val(data.filmes.ano);
        $("#genero").val(data.filmes.genero);
        $("#classificacao").val(data.filmes.classificacao);
        $("#sinopse").val(data.filmes.sinopse);
    },
    error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
    }
  });
});

function habilitarCampos(){
    $("#nome").prop("readonly",false);
    $("#ano").prop("readonly",false);
    $("#genero").prop("readonly",false);
    $("#classificacao").prop("readonly",false);
    $("#sinopse").prop("readonly",false);
}

function desabilitarCampos(){
    $("#nome").prop("readonly",true);
    $("#ano").prop("readonly",true);
    $("#genero").prop("readonly",true);
    $("#classificacao").prop("readonly",true);
    $("#sinopse").prop("readonly",true);
}

$(document).on("click","#editar",function(){
  habilitarCampos();
});

$(document).on("click","#cancelar",function(){
    desabilitarCampos();
    $("#codigo").val("");
    $("#nome").val("");
    $("#ano").val("");
    $("#genero").val("");
    $("#classificacao").val("");        
    $("#sinopse").val(""); 
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "codigo":$("#codigo").val(),
      "nome":$("#nome").val(),
      "ano":$("#ano").val(),
      "genero":$("#genero").val(),   
      "classificacao":$("#classificacao").val(),     
      "sinopse":$("#sinopse").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://walled-ranks.000webhostapp.com/webservice/atualizar.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao cadastrar");
      }
    });
});

$(document).on("click","#excluir",function(){
  var parametros = {
      "codigo":$("#codigo").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"https://walled-ranks.000webhostapp.com/webservice/deletar.php", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
        desabilitarCampos();  
      },

      //se não funcionar
      error: function(data){
        navigator.notification.alert("Erro ao excluir");
      }
    });
});
