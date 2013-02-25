package org.amidani.labs.om.server.service;

import java.util.List;
import java.util.logging.Logger;

import org.amidani.labs.om.server.dao.EarningsDao;
import org.amidani.labs.om.server.model.Earning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EarningsService {
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	EarningsDao earningsDao;
	
	public List<Earning> getEarnings(){
		log.info("SRV : Get earnings");
		return earningsDao.getEarnings(null);
	}
	
	public long addEarning(String label, int amount, String sheetId){
		log.info("SRV : Add new earnings");
		Earning earning = new Earning(null, label, amount);
		if(sheetId!=null)
			earning.setSheetId(sheetId);
		return earningsDao.persistEarning(earning);
	}

	public boolean removeEarning(Long id) {
		log.info("SRV : Remove earnings");
		try {
			earningsDao.removeEarning(id);
			return true;
		} catch (Exception e) {}
		return false;
	}
}
