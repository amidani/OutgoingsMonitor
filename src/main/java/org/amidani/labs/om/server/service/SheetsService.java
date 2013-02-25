package org.amidani.labs.om.server.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.amidani.labs.om.server.dao.EarningsDao;
import org.amidani.labs.om.server.dao.OutgoingsDao;
import org.amidani.labs.om.server.dao.SheetsDao;
import org.amidani.labs.om.server.model.Earning;
import org.amidani.labs.om.server.model.Outgoing;
import org.amidani.labs.om.server.model.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.appengine.api.users.UserServiceFactory;

@Service
public class SheetsService {
	
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	EarningsDao earningsDao;
	@Autowired
	OutgoingsDao outgoingsDao;	
	@Autowired
	SheetsDao sheetsDao;
	
	public List<Sheet> getSheets(){
		log.info("SRV : Retrieve sheets");
		List<Sheet> sheetsList = sheetsDao.getSheets();
		for(Sheet sheet : sheetsList){
			sheet.setEarnings(earningsDao.getEarnings(sheet.getId()));
			sheet.setOutgoings(outgoingsDao.getOutgoings(sheet.getId()));
		}
		return sheetsList;
	}
	
	public Sheet getCurrentSheet(){
		String sheetId = new SimpleDateFormat("MM-yyyy").format(new Date());
		String userId = UserServiceFactory.getUserService().getCurrentUser().getUserId();
		log.info("SRV : Retrieve current sheet");
		Sheet currentSheet = sheetsDao.getSheetById(sheetId+"-"+userId);
		if(currentSheet!=null){
			currentSheet.setEarnings(earningsDao.getEarnings(currentSheet.getId()));
			currentSheet.setOutgoings(outgoingsDao.getOutgoings(currentSheet.getId()));
		}
		
		return currentSheet;
	}
	
	public Sheet addSheet(String name){
		String sheetId = new SimpleDateFormat("MM-yyyy").format(new Date());
		String userId = UserServiceFactory.getUserService().getCurrentUser().getUserId();
		log.info("SRV : Retrieve configured earnings");
		List<Earning> earnings = earningsDao.getEarnings(null);
		for(Earning earning : earnings){
			earning.setId(null);
			earning.setSheetId(sheetId+"-"+userId);
		}
		log.info("SRV : Retrieve configured outgoings");
		List<Outgoing> outgoings = outgoingsDao.getOutgoings(null);
		for(Outgoing outgoing : outgoings){
			outgoing.setId(null);
			outgoing.setSheetId(sheetId+"-"+userId);
		}
		log.info("SRV : Add and init new sheet");
		Sheet sheet = new Sheet(sheetId+"-"+userId, name);
		sheet.setEarnings(earnings);
		sheet.setOutgoings(outgoings);
		
		return sheetsDao.persistSheet(sheet);
	}

	public boolean markOutgoingAsSpent(long outgoingId) {
		log.info("SRV : Mark outgoing as spent (outgoingId="+outgoingId+")");
		return outgoingsDao.markAsSpent(outgoingId);
	}

}
