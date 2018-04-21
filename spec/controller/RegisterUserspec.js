describe('RegisterUser', ()=>{
    let RegisterUser = require('../../controller/register/RegisterUser')
    let register;

    beforeEach(()=>{
        //register = new RegisterUser()
    })

describe('register test suite',()=>{
    it('should get a data',()=>{
        let obj = {
            'full_name': 'gg',
            'email': 'gg@xyz.com',
            'password': 'password'
        }
        let output = RegisterUser.getRequestData(obj)
        //register.getRequestData(obj)

        expect(typeof output).toEqual('object')
        expect(output.name).toEqual(obj.full_name)
        expect(output.email).toEqual(obj.email)
        expect(output.password).toEqual(obj.password)
    })})
 
    
    
 it('should throw an error if some parameter gets missing',()=>{
     let callback=function(){
         register.getRequestData()
          

     }
     expect(callback).toThrowError("Some parameters are missing") })
     it("should throw an error if all parameters are missing",()=>{         let callback=function(){
             getRequestData.getData()
         }
             expect(callback).toThrowError("All parameters are missing") 
         }
     )
})
