package org.amidani.labs.om.server.service;

import java.util.List;
import java.util.logging.Logger;

import org.amidani.labs.om.server.dao.OutgoingsDao;
import org.amidani.labs.om.server.model.Outgoing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OutgoingsService {

Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	OutgoingsDao outgoingsDao;
	
	public List<Outgoing> getOutgoings(){
		log.info("SRV : Get outgoings");
		return outgoingsDao.getOutgoings(null);
	}
	
	public long addOutgoing(String label, int amount, String type, String sheetId){
		log.info("SRV : Add new outgoings");
		Outgoing outgoing = new Outgoing(null, label, amount, type);
		if(sheetId!=null){
			log.info("SRV : Add to sheet : "+sheetId);
			outgoing.setSheetId(sheetId);
		}
		return outgoingsDao.persistOutgoing(outgoing);
	}

	public boolean removeOutgoing(Long id) {
		log.info("SRV : Remove outgoings");
		try {
			outgoingsDao.removeOutgoing(id);
			return true;
		} catch (Exception e) {}
		return false;
	}
}
