describe('Request Meeting suit',()=>){
    it('should specify end time with start time',()=>{
    let time=RequestMeeting.formatEndDaterelativetoStartDate('23:00');
    expect(time).toEqual('23:00+')
    })
    
    it('should throw error if start time is greater than end time',()=>{
    let callback=function(){
    RequestMeeting.formatEndRelativetoStartDate(2:00)
    }
    expect(callback).toThrowError('System expects start date before end date');
    })
    
    it('should throw error if the string is blanck',()=>{
    let callback=function(){
    RequestMeeting.formatEndate('')
    }
    expect(callback).toThrowError('System expects correct values');
    })
    }
    
    it('should throw error if string is blank',()=>{
    let callback=function(){
    RequestMeeting.onInit('')
    }
    expect(callback).toThrowError('System expects some value');
    })
    
    it('should throw error if the string is a past date',()=>{
    let callback=function(){
    RequestMeeting.onInit('17','04','2018');
    }
    expect(callback).toThrowError('System expects correct values');
    })
    describe('AvailablePMnearby',()=>){
    
    it('should throw error if the first element is not a number',()=>{
    let callback=function(){
    RequestMeeting.getPMAvailablewithinRange('a')
    }
    expect(callback).toThrowError('System expects correct values');
    })
    it('should throw error if the number of spaces is less than 2',()=>{
    let callback=function(){
    RequestMeeting.getPMAvailablewithinRange('anupam')
    }
    expect(callback).toThrowError('System expects correct values');
    })
    }