package org.amidani.labs.om.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.amidani.labs.om.server.model.Sheet;
import org.amidani.labs.om.server.service.SheetsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author Abdelkader Midani
 *
 */

@Controller
@RequestMapping("/sheets")
public class SheetsController {
	
	Logger log = Logger.getLogger(this.getClass().getName());
	
	@Autowired
	SheetsService sheetsService;
	
	@RequestMapping(method=RequestMethod.GET, value="/all")
	public void getAllSheets(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Retrieving sheets...");
		List<Sheet> l = sheetsService.getSheets();
		log.info("Write JSON in the output stream of the servlet");
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), l);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/current")
	public void getCurrentSheet(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Retrieving current sheet...");
		Sheet currentSheet = sheetsService.getCurrentSheet();
		log.info("Write JSON in the output stream of the servlet");
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), currentSheet);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/add/{name}")
	public void addSheet(@PathVariable String name, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Add new sheets...");
		Sheet result = sheetsService.addSheet(name);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(),result);
	}
	
	@RequestMapping(method=RequestMethod.PUT, value="/markspent/{outgoingId}")
	public void markOutgoingAsSpent(@PathVariable long outgoingId, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException{
		log.info("Add new sheets...");
		boolean result = sheetsService.markOutgoingAsSpent(outgoingId);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(),result);
	}
	
}
