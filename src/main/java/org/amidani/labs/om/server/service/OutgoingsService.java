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
	
	public long addOutgoing(String label, int amount, String type){
		log.info("SRV : Add new outgoings");
		return outgoingsDao.persistOutgoing(new Outgoing(null, label, amount, type));
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
