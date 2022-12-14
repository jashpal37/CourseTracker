class ApiFeatures{
    constructor(query,queryStr,uid){
        this.query = query;
        this.queryStr = queryStr;
        this.uid = uid;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } :{};

        this.query = this.query.find({"user":this.uid,...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
    }
}

module.exports = ApiFeatures;