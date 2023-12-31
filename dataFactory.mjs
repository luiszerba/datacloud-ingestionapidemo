class DataFactory {

    purchaseCategories = [
        "Grocery",
        "Education",
        "Food",
        "Shopping",
        "Gas"
    ];

    cities = [
        "Guarulhos",
        "São Paulo",
        "São José dos Campos",
        "Santo André",
        "São Bernardo do Campo",
        "Sorocaba",
        "Mauá",
        "Diadema",
        "Osasco"
    ];

    contacts = [
        "Henrique Souza",
        "Pedro Pires",
        "Eloah Souza",
        "João Cunha",
        "Alice Gomes",
        "Diogo Almeida",
        "Felipe Alves",
        "Samuel Melo",
        "Nicole Moreira",
        "Bernardo Castro",
        "Lucas Carvalho",
        "Isabella Teixeira",
        "Beatriz Jesus",
        "Letícia Viana",
        "Miguel Vieira",
        "Sophia Cunha",
        "Enrico Caldeira",
        "Maria Luz",
        "Rafaela Barbosa",
        "Rafael Rezende",
        "Heitor Rezende",
        "Isabella Teixeira",
        "Pedro Alves",
        "Lorenzo Conceição",
        "Elisa Cunha",
        "Luiz Conceição",
        "Mirella Cunha",
        "Daniela Carvalho",
        "Daniel Almeida",
        "Miguel Oliveira"
      ];

    generateRandomData(numOfEntries) {

        const template = {
            data: []
        };

        const currentTime = new Date().getTime();
        const maxTimeAhead = 24 * 60 * 60 * 1000;

        const fullNameMap = new Map();

        for (let i = 0; i < numOfEntries; i++) {
            const randomTimeOffset = Math.random() * maxTimeAhead;
            const randomDate = new Date(currentTime + randomTimeOffset).toISOString();

            const fullName = this.getRandomElement(this.contacts);
            const [firstName, lastName] = fullName.split(' ');

            let identifier;
            if (fullNameMap.has(fullName)) {
                identifier = fullNameMap.get(fullName);
            } else {
                identifier = Math.random().toString().substring(2, 13);
                fullNameMap.set(fullName, identifier);
            }

            const entry = {
                blocked: Math.random() < 0.5 ? "Yes" : "No",
                city: this.getRandomElement(this.cities),
                cpf: identifier.toString().padStart(11, "0").substring(0, 11),
                date: randomDate,
                first_name: firstName,
                last_name: lastName,
                purchase_category: this.getRandomElement(this.purchaseCategories),
                transaction_id: "T-"+(i + 1) * 1000000,
                value: Number((Math.random() * 10000).toFixed(2)),
                virtual_transaction: Math.random() < 0.5 ? "Yes" : "No",
                with_installments: Math.random() < 0.5 ? "Yes" : "No"
            };

            template.data.push(entry);
        }

        return JSON.stringify(template, null, 2);
    }

    getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
      
}

export default DataFactory;