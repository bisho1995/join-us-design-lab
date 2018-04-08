
'use strict'
const router = require('express').Router();
const pm = require('../../model/users/peermotivators/peermotivator');

const winston = require('../../shared/logger');

router.get('/',(req, res, next)=>{	
	getAllPm().then(data=>{
		let formattedData = formatData(data)
		res.send(formattedData)
	}).catch(err=>
		{
			winston.error(err.stack)
			res.send('An err')
		})
});



/**
 * There is no need to send information such as password
 *  so this method only returns data which is needed to send
 * @param {array} datas This is the raw array of datas
 * which is given to it
 */
function formatData(datas){
	return datas.map(data=>
		{
			return {
				'name': data.name,
				 'email': data.email,
				 'id': data._id,
				 'start_time': data.start_time,
				 'end_time': data.end_time
			}
		})
}

/**
 * Get all the peer motivators registered in our system
 */
function getAllPm(){
	return new Promise((resolve, reejct)=>{
		pm.getAllPm().then(data=>resolve(data)).catch(err=>reject(err))
	});
}


module.exports = router;