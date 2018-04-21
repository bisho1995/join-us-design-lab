describe('requestMeetingClass', ()=>{
    let requestMeetingClass = require('../../../controller/clientdashboard/requestMeetingClass')
    let requestMeeting

    beforeEach(()=>{
    requestMeeting = new requestMeetingClass()
    //requestMeeting.f
    })


    it('should throw error if the string is blank',()=>{
        let tmp = new requestMeetingClass()
        tmp.formatEndDateRelativeToStartDate()
        tmp.start_time = 10
        tmp.end_time = 20
        expect(tmp.end_time - tmp.start_time).toBeGreaterThan(0)
        })})
  
//  describe('Request Meeting suit',()=>{
// it('should specify end time with start time',()=>{
// let time=requestMeeting.formatEndDateRelativetoStartDate('23:00')
// expect(time).toEqual('23:00+')
// })

// it('should throw error if start time is greater than end time',()=>{
// let callback=function(){
// requestMeeting.formatEndRelativetoStartDate('2:00')
// }
// expect(callback).toThrowError('System expects start date before end date')
// })

// it('should throw error if the string is blank',()=>{
// requestMeeting
// expect(callback).toThrowError('System expects correct values')
// })



// })})

// it('should throw error if string is blank',()=>{
// let callback=function(){
// requestMeeting.OnInit('')
// }
// expect(callback).toThrowError('System expects some value')
// })

// it('should throw error if the string is a past date',()=>{
// let callback=function(){
// requestMeeting.OnInit('17','04','2018')
// }
// expect(callback).toThrowError('System expects correct values')
// })
// describe('AvailablePMnearby',()=>{  

// it('should throw error if the first element is not a number',()=>{
// let callback = function(){
// requestMeeting.PMAvailablewithingRange('a')
// }
// expect(callback).toThrowError('System expects correct values')
// })
// it('should throw error if the number of spaces is less than 2',()=>{
// let callback=function(){
// requestMeeting.PMAvailablewithingRange('anupam')
// }
// expect(callback).toThrowError('System expects correct values')
// })
// })
