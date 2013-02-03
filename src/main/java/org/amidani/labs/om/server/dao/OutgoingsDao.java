package org.amidani.labs.om.server.dao;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;
import java.util.logging.Logger;

import org.amidani.labs.om.server.model.Earning;
import org.amidani.labs.om.server.model.Outgoing;
import org.springframework.stereotype.Repository;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;

@Repository
public class OutgoingsDao {
	Logger log = Logger.getLogger(this.getClass().getName());
	
	static {
        ObjectifyService.register(Outgoing.class);
    }
	
	public List<Outgoing> getOutgoings(){
		log.info("DAO : Get outgoings");
		Query<Outgoing> articlesList = ofy().load().type(Outgoing.class);
		log.info("DAO : Outgoings retrieved successfuly");
		return articlesList.list();
	}
	
	public long persistOutgoing(Outgoing outgoing){
		log.info("DAO : Add new outgoings");
		Key<Outgoing> key = ofy().save().entity(outgoing).now();    // async without the now();
		log.info("DAO : Outgoings persisted successfuly with key=["+key.getId()+"]");
		return key.getId();
	}
	
	public void removeOutgoing(Long id) throws Exception{
		log.info("DAO : Delete outgoings");
		try{
			ofy().delete().type(Outgoing.class).id(id);
		}catch(Exception e){throw new Exception("Unable to delete outgoings with id = ["+id+"]", e.getCause());}
	}
}
