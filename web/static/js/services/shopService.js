/**
 * Created by arnab on 22/11/17.
 */
class ShopService{
    constructor($http){
        this.$http= $http
        this.newzDetails=[]
        this.publisher =[]
        this.newzList = []
        this.sortedArray = []
        this.slected_Order = "TIMESTAMP"
        this.sortReverse = false
    }

    getNews(){
        this.$http({
            url: ' https://api.myjson.com/bins/10ijyt',
            method: 'GET'
        }).then((response)=>{
                this.newzDetails = response.data
                this.newzList = response.data
                console.log("this.newzDetails",this.newzDetails)
                for(var i =0; i<response.data.length; i++){
                    this.publisher.indexOf(response.data[i].PUBLISHER) === -1 ? this.publisher.push(response.data[i].PUBLISHER):console.log("This item already exists")
                }
        },(error)=>{
            console.log("inside Error part in design service....")

        })
    }

    sortingnewzBasedCategory(category){
        console.log(category)
        this.newzDetails = []
        for(var i=0;i<this.newzList.length; i++){
            if(this.newzList[i].CATEGORY === category){
                console.log("Executing.....")
                this.newzDetails.push(this.newzList[i])
            }
        }
        console.log("this.newzDetails",this.newzDetails)
    }

    sortingnewzBasedpublisher(publisher){
        console.log(publisher)
        this.newzDetails = []
        for(var i=0;i<this.newzList.length;i++){
            if(this.newzList[i].PUBLISHER === publisher){
                console.log("Executing.....")
                this.newzDetails.push(this.newzList[i])
            }
        }
        console.log("this.newzDetails",this.newzDetails)
    }

    sortingBasedonTime(){

        for(var i=0;i<this.newzList.length;i++){
            this.sortedArray.push([this.newzList[i].TIMESTAMP, this.newzList[i]]);
        }

    }




}
ShopService.$inject =['$http']
angular.module('mobilesolution').service('ShopService', ShopService)