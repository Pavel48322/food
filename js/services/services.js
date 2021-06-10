  // вот так мы отправляем данные
    const postData = async (url, data) => { //В функции будет какойто асинхронный код, поэтому мы написали async
        const res = await fetch(url, { // тут мы пишем куда // использовали его парный оператор await, перед теми
        // операциями, которые нужно дождаться. Эти операторы всегда используются в паре!
            method: "POST", 
            headers: {
                'Content-type': 'application/json' // каким образом
            },
            body: data   // что именно
        });

        return await res.json(); //Дожидается работы этого промиса и только потом его возвращает
    };

    const getResource = async (url) => { //В функции будет какойто асинхронный код, поэтому мы написали async
        const res = await fetch(url); // тут мы пишем куда // использовали его парный оператор await, перед теми
        // операциями, которые нужно дождаться. Эти операторы всегда используются в паре!
        if(!res.ok) {
            throw new Error(`Coul not fetch ${url}, status: ${res.status}`); // Это на слуяай если будет ошибка
        }

        return await res.json(); //Дожидается работы этого промиса и только потом его возвращает
    };

    export {postData};
    export {getResource};