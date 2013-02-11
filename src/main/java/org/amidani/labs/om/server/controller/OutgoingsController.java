package org.amidani.labs.om.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.amidani.labs.om.server.model.Outgoing;
import org.amidani.labs.om.server.service.OutgoingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/outgoings")
public class OutgoingsController {
	
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	OutgoingsService outgoingsService;
	
	@RequestMapping(method=RequestMethod.GET, value="/all")
	public void getAllOutgoings(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Retrieving earnings...");
		List<Outgoing> l = outgoingsService.getOutgoings();
		log.info("Write JSON in the output stream of the servlet"+l.size());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), l);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/add/{label}/{amount}/{type}")
	public void addOutgoing(@PathVariable String label, @PathVariable int amount, @PathVariable String type, 
							HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Add new earnings...");
		long id = outgoingsService.addOutgoing(label, amount, type);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(),id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/delete/{id}")
	public void removeOutgoing(@PathVariable Long id, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Delete earnings...");
		boolean result = outgoingsService.removeOutgoing(id);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(),result);
	}
}
