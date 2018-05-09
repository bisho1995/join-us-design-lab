const moment = require('moment')


describe("Request meeting ", ()=>{
    let RequestMeeting = require('../../../controller/clientdashboard/requestMeetingClass')
    let requestMeeting


    beforeEach(()=>{
        requestMeeting =  new RequestMeeting()
        requestMeeting.OnInit({
            date: moment().format('YYYY/MM/DD'),
            start_time: 14,
            end_time: 19 
        }, "bishoatiem@gmail.cim")
    })


    describe("getPmAvailableWithinRange", ()=>{


        it("should get list of pms",async ()=>{
            let docs = await requestMeeting.getPmAvailableWithingRange(14, 19)
            expect(docs.length).toBeGreaterThan(0)
        })

        it("should throw error if arguments are missing", ()=>{
            expect(()=>{
                requestMeeting.getPmAvailableWithingRange(14)
            }).toThrow()
        })

        it("wrong email id",async (done)=>{
            let requestMeeting1 =  new RequestMeeting()
            requestMeeting1.OnInit({
                date: moment().format('YYYY/MM/DD'),
                start_time: 14,
                end_time: 19 
            }, "")

            requestMeeting1.getPmAvailableWithingRange(12, 14).then(docs=>{
                expect(typeof docs).toEqual('object')
                done()
            })
            .catch(err=>{
                console.log(err)
                done()
            })
        })



        it("end time less than start time",async (done)=>{
            let requestMeeting1 =  new RequestMeeting()
            requestMeeting1.OnInit({
                date: moment().format('YYYY/MM/DD'),
                start_time: 14,
                end_time: 19 
            }, "")

            expect(()=>{
                requestMeeting1.getPmAvailableWithingRange(12, 10)
            }).toThrowError('End time has to be greater than or equal to start time')
            done()
        })



        it("start time and end time should be more than 0", (done)=>{
            let requestMeeting1 =  new RequestMeeting()
            requestMeeting1.OnInit({
                date: moment().format('YYYY/MM/DD'),
                start_time: 14,
                end_time: 19 
            }, "")

            expect(()=>{
                requestMeeting1.getPmAvailableWithingRange(-12, -10)
            }).toThrowError('End time and start time has to be more than 0')
            done()
        })


        it("start time and end time should not be greater than 48", (done)=>{
            expect(()=>{
                requestMeeting.getPmAvailableWithingRange(65,75)
            }).toThrowError('End time and start time has to be less than 48')
            done()
        })













    })
            

        



    



})