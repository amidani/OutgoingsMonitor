package org.amidani.labs.om.server.dao;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.amidani.labs.om.server.model.Earning;
import org.amidani.labs.om.server.model.Outgoing;
import org.amidani.labs.om.server.model.Sheet;
import org.springframework.stereotype.Repository;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;

@Repository
public class SheetsDao {
	
Logger log = Logger.getLogger(this.getClass().getName());
	
	static {
        ObjectifyService.register(Sheet.class);
    }
	
	public List<Sheet> getSheets(){
		log.info("DAO : Get sheets");
		Query<Sheet> sheetsList = ofy().load().type(Sheet.class);
		log.info("DAO : Sheets retrieved successfuly");
		return sheetsList.list();
	}
	
	public Sheet getSheetById(String sheetId){
		log.info("DAO : Get current sheet with id = "+sheetId);
		Sheet currentSheet = ofy().load().type(Sheet.class).id(sheetId).get();
		log.info("DAO : Current sheet found? "+(currentSheet!=null?"YES":"NO"));
		return currentSheet;
	}
	
	public Sheet persistSheet(Sheet sheet){
		String sheetId = new SimpleDateFormat("MM-yyyy").format(new Date());
		sheet.setId(sheetId); 
		log.info("DAO : Add and init new sheet");
		Key<Sheet> key = ofy().save().entity(sheet).now();    // async without the now();
		log.info("DAO : Sheets persisted successfuly with key=["+key.getId()+"]");
		log.info("DAO : Add earnings to the sheet");
		Map<Key<Earning>, Earning> keysEar = ofy().save().entities(sheet.getEarnings()).now();
		Map<Key<Outgoing>, Outgoing> keysOut = ofy().save().entities(sheet.getOutgoings()).now();
		
		return sheet;
	}
	
	

}
