class DataManager {

    static save(key, data){
        if(localStorage.getItem(key) == null){
            console.log("Saving data...");
            localStorage.setItem(key, JSON.stringify(data));
        } 
    }

    static update(key, data){
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static clear(){
        localStorage.clear();
    }
}