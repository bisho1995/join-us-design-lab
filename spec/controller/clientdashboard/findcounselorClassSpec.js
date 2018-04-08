describe('Find Counselor', ()=>{
    let FindCounselor = require('../../../controller/clientdashboard/findCounselorClass')
    let findCounselor;

    beforeEach(()=>{
        findCounselor = new FindCounselor()
    })


    describe('getPageToken test suite',()=>{
        it('should get a token when there is a valid keyword 1', ()=>{
            let token = findCounselor.getPageToken('keyword')
            expect(token).toEqual('keyword')
        })
    
        it('should show throw error if token has space', ()=>{
            expect(()=>{findCounselor.getPageToken('adam apple sdfs sfd7848 */*/* wfsf fds')}).toThrow()
        })
    
        it('should get empty string if string is empty', ()=>{
            let token = findCounselor.getPageToken('')
            expect(token).toEqual('')
        })
    
    
        it('should get empty string if string is "null"', ()=>{
            let token = findCounselor.getPageToken('null')
            expect(token).toEqual('')
        })
    
        it('should get empty string if string is "undefined"', ()=>{
            let token = findCounselor.getPageToken('undefined')
            expect(token).toEqual('')
        })
    
    
        it('should throw error if argument is not string', ()=>{
            expect(()=>{findCounselor.getPageToken(5)}).toThrow()
            expect(()=>{findCounselor.getPageToken(bool)}).toThrow()
            expect(()=>{findCounselor.getPageToken(null)}).toThrow()
            expect(()=>{findCounselor.getPageToken(undefined)}).toThrow()
        })

        it('should return special chars as string', ()=>{
            let token = findCounselor.getPageToken('/')
            expect(token).toEqual('/')
        })

        it('should throw an error if nothing is passed', ()=>{
            let callback = function(){
                findCounselor.getPageToken()
            }
            expect(callback).toThrowError('Function expects only one argument')
        })

        it('should throw an error if more than one argument is passed', ()=>{
            let callback = function(){
                findCounselor.getPageToken(1,2,5)
            }
            expect(callback).toThrowError('Function expects only one argument')
        })

    })



    describe('getKeyword test suite',()=>{
        it('should get a keyword when there is a valid keyword 1', ()=>{
            let keyword = findCounselor.getKeyword('keyword')
            expect(keyword).toEqual('keyword')
        })
    
        it('should get a keyword when there is a valid keyword 2', ()=>{
            let keyword = findCounselor.getKeyword('adam apple sdfs sfd7848 */*/* wfsf fds')
            expect(keyword).toEqual('adam apple sdfs sfd7848 */*/* wfsf fds')
        })
    
        it('should get empty string if string is empty', ()=>{
            let keyword = findCounselor.getKeyword('')
            expect(keyword).toEqual('')
        })
    
        it('should get empty string if string is null', ()=>{
            let keyword = findCounselor.getKeyword(null)
            expect(keyword).toEqual('')
        })
    
        it('should get empty string if string is "null"', ()=>{
            let keyword = findCounselor.getKeyword('null')
            expect(keyword).toEqual('')
        })
    
        it('should get empty string if string is "undefined"', ()=>{
            let keyword = findCounselor.getKeyword('undefined')
            expect(keyword).toEqual('')
        })
    
    
        it('should get empty string if string is undefined', ()=>{
            let keyword = findCounselor.getKeyword(undefined)
            expect(keyword).toEqual('')
        })
    
    
        it('should return the number formatted to string', ()=>{
            let keyword = findCounselor.getKeyword(5)
            expect(keyword).toEqual('5')
        })

        it('should return special chars as string', ()=>{
            let keyword = findCounselor.getKeyword('/')
            expect(keyword).toEqual('/')
        })

        it('should throw an error if nothing is passed', ()=>{
            let callback = function(){
                findCounselor.getKeyword()
            }
            expect(callback).toThrowError('Function expects only one argument')
        })

        it('should throw an error if more than one argument is passed', ()=>{
            let callback = function(){
                findCounselor.getKeyword(1,2,5)
            }
            expect(callback).toThrowError('Function expects only one argument')
        })

    })


})