package org.amidani.labs.om.server.dao;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;
import java.util.logging.Logger;

import org.amidani.labs.om.server.model.Outgoing;
import org.springframework.stereotype.Repository;

import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.repackaged.com.google.common.base.StringUtil;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;

@Repository
public class OutgoingsDao {
	Logger log = Logger.getLogger(this.getClass().getName());
	
	static {
        ObjectifyService.register(Outgoing.class);
    }
	
	public List<Outgoing> getOutgoings(String sheetId){
		log.info("DAO : Get outgoings by sheetId");
		Query<Outgoing> outgoingsList;
		if(StringUtil.isEmptyOrWhitespace(sheetId)){
			String userId = UserServiceFactory.getUserService().getCurrentUser().getUserId();
			outgoingsList = ofy().load().type(Outgoing.class).filter("userId", userId).filter("sheetId", null);
		}else{
			outgoingsList = ofy().load().type(Outgoing.class).filter("sheetId", sheetId);
		}
			
		log.info("DAO : Outgoings retrieved successfuly");
		return outgoingsList.list();
	}
	
	public long persistOutgoing(Outgoing outgoing){
		String userId = UserServiceFactory.getUserService().getCurrentUser().getUserId();
		outgoing.setUserId(userId);
		log.info("DAO : Add new outgoings");
		Key<Outgoing> key = ofy().save().entity(outgoing).now();    // async without the now();
		log.info("DAO : Outgoings persisted successfuly with key=["+key.getId()+"]"+outgoing.getId());
		return key.getId();
	}
	
	public void removeOutgoing(Long id) throws Exception{
		log.info("DAO : Delete outgoings");
		try{
			ofy().delete().type(Outgoing.class).id(id);
		}catch(Exception e){throw new Exception("Unable to delete outgoings with id = ["+id+"]", e.getCause());}
	}

	public boolean markAsSpent(long id) {
		log.info("DAO : Mark outgoing as spent");
		Outgoing outgoing = ofy().load().type(Outgoing.class).id(id).get();
		if(outgoing!=null){
			outgoing.setSpent(!outgoing.isSpent());
			persistOutgoing(outgoing);
			return outgoing.isSpent();
		}
		return false;
	}
}
