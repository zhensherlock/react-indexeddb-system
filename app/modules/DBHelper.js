export default class DBHelper {
    static getDatabaseNames(func) {
        indexedDB.webkitGetDatabaseNames().onsuccess = (event) => {
            let result = event.target.result
                , eventKeys = Object.keys(result)
                , databaseNames = []
            ;
            eventKeys.forEach(key => {
                databaseNames.push(result[key]);
            });
            func(databaseNames);
        };
    }
    static createDatabase(name, func) {
        indexedDB.open(name).onsuccess = (event) => {
            let result = event.target.result;
            func(result);
        };
    }
    static deleteDatabase(name, func) {
        indexedDB.deleteDatabase(name).onsuccess = (event) => {
            let result = event.target.result;
            func(result);
        };
    }
}