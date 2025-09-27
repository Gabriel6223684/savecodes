const Cep = document.getElementById('cep');
const Cnpj = document.getElementById('cnpj');

async function BuscarCep() {
    const cepValue = Cep.value;
    const cepFormatedValue = cepValue.replace(/[.\-\/]/g, '').trim();

    if (cepFormatedValue.length !== 8) {
        alert('Por favor, informe um CEP válido.');
        return;
    }
    const url = `https://viacep.com.br/ws/${cepFormatedValue}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
        
        console.log(json.logradouro);
        console.log(json.bairro);
        console.log(json.localidade);

        console.log(json.uf);

        document.getElementById('logradouro').value = json.logradouro || '';
        document.getElementById('bairro').value = json.bairro || '';
        document.getElementById('uf').value = json.uf || '';
        document.getElementById('localidade').value = json.localidade || '';
        document.getElementById('numero').value = json.numero || '';

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

const a = async () => {
    const cnpjValue = Cnpj.value;
    const cnpjFormatedValue = cnpjValue
        .replace(/\D/g, '')
        .trim();

    if (cnpjFormatedValue.length !== 14 || isNaN(Number(cnpjFormatedValue))) {
        alert('CNPJ inválido. Deve conter 14 dígitos numéricos.');
        return;
    }

    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpjFormatedValue}`;
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();

        document.getElementById('razao_social').value = json.razao_social || '';
        Cep.value = json.cep || '';
        await BuscarCep();

        console.log(json);

        document.getElementById('nome_fantasia').value = json.nome_fantasia || '';
        document.getElementById('razao_social').value = json.razao_social || '';
        document.getElementById('numero').value = json.numero || '';

    } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
        alert('Erro ao buscar o CNPJ. Verifique se o número está correto.');
    }
};

Cnpj.addEventListener('change', a);
Cep.addEventListener('change', BuscarCep);


document.getElementById('btnenviar').addEventListener('click', (event) => {
    event.preventDefault();
    a();
});