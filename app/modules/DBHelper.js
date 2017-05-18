class DBHelper {
    constructor(databaseName) {
        let self = this;
        self.databaseName = databaseName;
    }

    getTableList() {
        let self = this;

        return new Promise((resolve, reject) => {
            indexedDB.open(self.databaseName).onsuccess = (event) => {
                let objectStoreNames = event.target.result.objectStoreNames
                    , eventKeys = Object.keys(objectStoreNames)
                    , tableList = []
                ;

                eventKeys.forEach(key => {
                    tableList.push({
                        name: objectStoreNames[key]
                    });
                });

                resolve(tableList);
            };
        });
    }

    createTable(tableName, params) {
        let self = this
        ;
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(self.databaseName, +(new Date()));
            request.onupgradeneeded = (event) => {
                let dbObject = event.target.result;
                dbObject.createObjectStore(tableName, params);
                resolve(tableName);
            };
        });
    }

    static getDatabaseNames() {
        return new Promise((reslove, reject) => {
            indexedDB.webkitGetDatabaseNames().onsuccess = (event) => {
                let result = event.target.result
                    , eventKeys = Object.keys(result)
                    , databaseNames = []
                ;
                eventKeys.forEach(key => {
                    databaseNames.push(result[key]);
                });
                reslove(databaseNames);
            };
        });
    }

    static createDatabase(name) {
        return new Promise((reslove, reject) => {
            indexedDB.open(name).onsuccess = (event) => {
                let result = event.target.result;
                reslove(result);
            };
        });
    }

    static deleteDatabase(name) {
        return new Promise((reslove, reject) => {
            indexedDB.deleteDatabase(name).onsuccess = (event) => {
                let result = event.target.result;
                reslove(result);
            };
        });
    }
}

export default DBHelper