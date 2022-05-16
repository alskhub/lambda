let openRequest = indexedDB.open('Notes', version);

openRequest.onupgradeneeded = function() {
    // срабатывает, если на клиенте нет базы данных
    // ...выполнить инициализацию...
};

openRequest.onerror = function() {
    console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
    let db = openRequest.result;
    // продолжить работу с базой данных, используя объект db
};