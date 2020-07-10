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
      "preco":$("#preco").val(),   
      "dt_compra":$("#dt_compra").val(),   
      "sinopse":$("#sinopse").val()      
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"", //pra onde vai enviar os dados
      data:parametros,//o que será enviado

      //se funcionar
      success: function(data){
        navigator.notification.alert(data);
        $("#nome").val(""),
        $("#ano").val(""),
        $("#genero").val(""),
        $("#classificacao").val(""),    
        $("#preco").val(""),    
        $("#dt_compra").val(""),    
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
    url: "",
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
    url: " ",
    data:parametro,
    dataType:"json",// o que vai receber e como vai receber
    success: function(data){
        $("#codigo").val(data.filmes.codigo);
        $("#nome").val(data.filmes.nome);      
        $("#ano").val(data.filmes.ano);
        $("#genero").val(data.filmes.genero);
        $("#classificacao").val(data.filmes.classificacao);
        $("#preco").val(data.filmes.preco);
        $("#dt_compra").val(data.filmes.dt_compra);
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
    $("#preco").prop("readonly",false);
    $("#dt_compra").prop("readonly",false);
    $("#sinopse").prop("readonly",false);
}

function desabilitarCampos(){
    $("#nome").prop("readonly",true);
    $("#ano").prop("readonly",true);
    $("#genero").prop("readonly",true);
    $("#classificacao").prop("readonly",true);
    $("#preco").prop("readonly",true);
    $("#dt_compra").prop("readonly",true);
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
    $("#preco").val("");    
    $("#dt_compra").val("");    
    $("#sinopse").val(""); 
});

$(document).on("click","#salvarEdicao",function(){
  var parametros = {
      "codigo":$("#codigo").val(),
      "nome":$("#nome").val(),
      "ano":$("#ano").val(),
      "genero":$("#genero").val(),   
      "classificacao":$("#classificacao").val(),   
      "preco":$("#preco").val(),   
      "dt_compra":$("#dt_compra").val(),   
      "sinopse":$("#sinopse").val()   
    }
    $.ajax({
      type:"post", //como vai enviar os dados
      url:"", //pra onde vai enviar os dados
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
      url:"", //pra onde vai enviar os dados
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
