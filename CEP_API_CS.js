const fieldCep = ZDK.Page.getField("CEP_API").getValue();
let formattedCep = fieldCep.replace(/\D+/g, "");
const sizeFormattedCep = formattedCep.toString().length;


console.log("Tamanho do Campo: " + sizeFormattedCep);

if (sizeFormattedCep == 'null' || sizeFormattedCep == 0 || sizeFormattedCep == 'Null') {
    return ZDK.Client.showAlert("Campo vazio!");
}

if (sizeFormattedCep >= 8 && sizeFormattedCep <= 10) {
    ZDK.Client.showAlert("Quantidade de digitos válidos!");
    ZDK.Client.showAlert(formattedCep);

    let verificationCepApi = ZDK.HTTP.request({
        url: `https://viacep.com.br/ws/${formattedCep}/json`,
        method: 'GET'

    }).getResponse();

    // ZDK.Client.showAlert(verificationCepApi);

    jsonCep = JSON.parse(verificationCepApi);

    ZDK.Page.getField("Cep_APi_CEP").setValue(jsonCep.cep);
    ZDK.Page.getField("Logradouro_API_CEP").setValue(jsonCep.logradouro);
    ZDK.Page.getField("Complemento_API_CEP").setValue(jsonCep.complemento);
    ZDK.Page.getField("Bairro_API_CEP").setValue(jsonCep.bairro);
    ZDK.Page.getField("Uf_API_CEP").setValue(jsonCep.uf);
    ZDK.Page.getField("Localidade_API_CEP").setValue(jsonCep.localidade);
    ZDK.Page.getField("Ibge_API_CEP").setValue(jsonCep.ibge);
    ZDK.Page.getField("Gia_API_CEP").setValue(jsonCep.gia);
    ZDK.Page.getField("Ddd_API_CEP").setValue(jsonCep.ddd);
    ZDK.Page.getField("Siafi_API_CEP").setValue(jsonCep.siafi);
    ZDK.Page.getField("Erro_API_CEP").setValue(jsonCep.erro);

    const cepErro = ZDK.Page.getField("Erro_API_CEP").getValue();
    if (cepErro == "true") {

        ZDK.Client.showAlert("CEP Inválido!");
       
   }

} else {
    return ZDK.Client.showAlert("CEP Inválido!");
}